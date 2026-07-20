import { Resend } from 'resend';

const MAX_BODY_BYTES = 12_000;
const MIN_COMPLETION_MS = 2500;
const SOURCE_LABEL = 'DxLabs website contact form';

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim().replace(/\r\n/g, '\n') : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);

  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error('Payload too large');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return JSON.parse(rawBody || '{}');
}

function validatePayload(payload) {
  const name = normalizeString(payload.name);
  const email = normalizeString(payload.email).toLowerCase();
  const organisation = normalizeString(payload.organisation);
  const message = normalizeString(payload.message);
  const honeypot = normalizeString(payload.website);
  const startedAt = Number(payload.startedAt);
  const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : 0;
  const errors = {};

  if (honeypot) errors.form = 'Invalid submission.';
  if (!Number.isFinite(startedAt) || elapsedMs < MIN_COMPLETION_MS) errors.form = 'Invalid submission.';
  if (name.length < 2 || name.length > 100) errors.name = 'Name must be between 2 and 100 characters.';
  if (!email || email.length > 254 || !isValidEmail(email)) errors.email = 'A valid email is required.';
  if (organisation.length > 150) errors.organisation = 'Organisation must be 150 characters or fewer.';
  if (message.length < 10 || message.length > 5000) {
    errors.message = 'Message must be between 10 and 5,000 characters.';
  }

  return {
    data: { name, email, organisation, message, source: SOURCE_LABEL, submittedAt: new Date().toISOString() },
    errors,
  };
}

function buildEmail({ name, email, organisation, message, source, submittedAt }) {
  const subject = `DxLabs website enquiry from ${name}`;
  const organisationLabel = organisation || 'Not provided';
  const text =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Organisation: ${organisationLabel}\n` +
    `Submitted: ${submittedAt}\n` +
    `Source: ${source}\n\n` +
    `Message:\n${message}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#10233f;line-height:1.5">
      <h2 style="margin:0 0 16px">DxLabs website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Organisation:</strong> ${escapeHtml(organisationLabel)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <p><strong>Source:</strong> ${escapeHtml(source)}</p>
      <hr style="border:0;border-top:1px solid #dbe6f2;margin:20px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  return { subject, text, html };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { ok: false, message: 'Method not allowed.' });
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return sendJson(res, 413, { ok: false, message: 'Request payload is too large.' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return sendJson(res, 400, { ok: false, message: 'Invalid request.' });
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch (error) {
    const status = error.statusCode === 413 ? 413 : 400;
    return sendJson(res, status, { ok: false, message: status === 413 ? 'Request payload is too large.' : 'Invalid request.' });
  }

  const { data, errors } = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    return sendJson(res, 400, { ok: false, message: 'Please check the form and try again.', errors });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Contact endpoint configuration is incomplete.');
    return sendJson(res, 500, { ok: false, message: 'The enquiry service is temporarily unavailable.' });
  }

  const resend = new Resend(RESEND_API_KEY);
  const email = buildEmail(data);

  try {
    const result = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (result.error || !result.data?.id) {
      console.error('Contact email provider rejected the message.', {
        error: result.error,
        to: CONTACT_TO_EMAIL,
        from: CONTACT_FROM_EMAIL,
      });
      return sendJson(res, 502, { ok: false, message: 'We could not send your enquiry. Please try again later.' });
    }

    console.info('Contact email accepted by provider.', {
      id: result.data.id,
      to: CONTACT_TO_EMAIL,
      from: CONTACT_FROM_EMAIL,
    });

    return sendJson(res, 201, { ok: true, message: 'Thank you. Your enquiry has been sent to DxLabs.' });
  } catch (error) {
    console.error('Contact email provider failed.', error);
    return sendJson(res, 502, { ok: false, message: 'We could not send your enquiry. Please try again later.' });
  }
}
