import { useEffect, useRef, useState } from 'react';
import logo from '../assets/dxlabs-logo.svg';
import presentationOne from '../assets/meded-africa-2026-presentation-1.jpeg';
import conferenceVenue from '../assets/meded-africa-2026-venue.jpeg';
import gideonPhoto from '../assets/dr-gideon-saningo.png';

const contactEmail = 'dxlabssupport@gmail.com';
const linkedInUrl = import.meta.env.VITE_DXLABS_LINKEDIN_URL?.trim() || '';
const whatsappNumber = (import.meta.env.VITE_DXLABS_WHATSAPP_NUMBER || '').replace(/\D/g, '');
const defaultWhatsappMessage = 'Hello DxLabs, I would like to discuss a possible collaboration.';

function mailtoUrl({ subject = '', body = '' } = {}) {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.join('&');
  return `mailto:${contactEmail}${query ? `?${query}` : ''}`;
}

function whatsappUrl(message = defaultWhatsappMessage) {
  if (!whatsappNumber) return '';

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getContactChannels() {
  return [
    {
      key: 'email',
      shortLabel: 'Email',
      accessibleLabel: 'Email DxLabs',
      icon: 'email',
      href: mailtoUrl(),
      external: false,
      footerLabel: contactEmail,
    },
    linkedInUrl
      ? {
          key: 'linkedin',
          shortLabel: 'LinkedIn',
          accessibleLabel: 'Connect with DxLabs on LinkedIn',
          icon: 'linkedin',
          href: linkedInUrl,
          external: true,
          footerLabel: 'LinkedIn',
        }
      : null,
    whatsappNumber
      ? {
          key: 'whatsapp',
          shortLabel: 'WhatsApp',
          accessibleLabel: 'Chat with DxLabs on WhatsApp',
          icon: 'whatsapp',
          href: whatsappUrl(),
          external: true,
          footerLabel: 'WhatsApp',
        }
      : null,
  ].filter(Boolean);
}

function ContactIcon({ type }) {
  const icons = {
    contact: (
      <>
        <path d="M7 9.5h10" />
        <path d="M7 13.5h6" />
        <path d="M5.8 18.2 4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10.2a2 2 0 0 1-2 2z" />
      </>
    ),
    close: (
      <>
        <path d="m7 7 10 10" />
        <path d="M17 7 7 17" />
      </>
    ),
    email: (
      <>
        <path d="M4.5 6.5h15v11h-15z" />
        <path d="m5 7 7 6 7-6" />
      </>
    ),
    linkedin: (
      <>
        <path d="M7.5 10v7" />
        <path d="M11.5 17v-4a3 3 0 0 1 6 0v4" />
        <path d="M7.5 7.5v.01" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M7.3 18.4 4.8 19l.7-2.4a7.4 7.4 0 1 1 1.8 1.8z" />
        <path d="M9.2 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.3c.1.2 0 .5-.1.6l-.4.5c.5.9 1.2 1.6 2.1 2.1l.5-.4c.2-.2.4-.2.7-.1l1.3.6c.3.1.4.3.4.6v.5c0 .3-.1.5-.4.7-.5.3-1.1.5-1.8.3-2.8-.7-5-2.9-5.7-5.7-.2-.7 0-1.3.3-1.8z" />
      </>
    ),
    send: (
      <>
        <path d="M20 4 9.5 14.5" />
        <path d="m20 4-5 16-5.5-5.5L4 12z" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" className="contact-icon" fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {icons[type]}
      </g>
    </svg>
  );
}

const navItems = [
  ['Company', '#about'],
  ['Wardle', '#wardle'],
  ['Areas', '#focus'],
  ['News', '#news'],
  ['Leadership', '#leadership'],
  ['Contact', '#contact'],
];

function Brand({ footer = false }) {
  return (
    <a aria-label="DxLabs home" className={`brand${footer ? ' footer-brand-link-v8' : ''}`} href="#top">
      <img alt="" aria-hidden="true" className="brand-logo" src={logo} />
      <span>DxLabs</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Brand />
        <nav aria-label="Primary navigation" className={`nav-links${open ? ' open' : ''}`}>
          {navItems.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-primary desktop-cta" href="#contact">
          Contact
        </a>
        <button
          aria-expanded={open}
          aria-label="Open navigation"
          className={`menu-toggle${open ? ' active' : ''}`}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid-v5">
        <div className="reveal">
          <div className="eyebrow">Clinician-led health technology</div>
          <h1>
            Better tools for healthcare <span>learning and practice.</span>
          </h1>
          <p className="lede">
            DxLabs develops digital health products that strengthen clinical learning and address selected
            challenges in healthcare delivery.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#wardle">
              Explore Wardle
            </a>
            <a className="button button-secondary" href="#contact">
              Contact DxLabs
            </a>
          </div>
          <div className="hero-caption">Medical education - Health systems - Diagnostic innovation - Imaging science</div>
        </div>
        <div aria-label="Abstract clinical signal graphic" className="signal-panel reveal">
          <div className="signal-grid" />
          <div className="signal-content">
            <div className="signal-head">
              <span>DxLabs</span>
              <span className="signal-badge">Clinician-led</span>
            </div>
            <div className="signal-core">
              <small>DxLabs perspective</small>
              <strong>Knowledge. Judgement. Practice.</strong>
              <svg aria-hidden="true" viewBox="0 0 520 100">
                <path d="M4 58h92l20-28 27 52 34-72 35 48h63l19-22 27 44 28-22h167" />
              </svg>
            </div>
            <div className="signal-foot">
              <span>Clinician-led</span>
              <span>Built with African health systems in view</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const principles = [
    ['Clinical relevance', 'Products begin with real learning and healthcare needs.'],
    ['Built for context', 'African health systems remain central to how we think and design.'],
    ['Evidence before hype', 'Practical value and responsible development take priority over novelty.'],
    ['Accessible by design', 'Technology should be clear, usable and appropriate for its setting.'],
  ];

  return (
    <section className="mission-section-v5" id="about">
      <div className="container">
        <div className="mission-header-v5 reveal">
          <div>
            <div className="eyebrow light">Why DxLabs</div>
            <h2>Closing the space between knowing and doing.</h2>
          </div>
          <p>
            Healthcare depends on more than access to knowledge. It depends on whether knowledge becomes sound
            judgement, coordinated work and reliable action. DxLabs develops clinically grounded digital products for
            that space, beginning with medical education and extending to selected challenges in healthcare delivery.
          </p>
        </div>
        <div className="mission-grid-v5">
          <article className="mission-card-v5 reveal">
            <span>Mission</span>
            <p>To build digital health products that empower healthcare professionals through better learning, smarter workflows and accessible technology.</p>
          </article>
          <article className="mission-card-v5 reveal">
            <span>Vision</span>
            <p>To become a leading African digital health company, creating products that improve healthcare education, clinical practice and patient outcomes.</p>
          </article>
        </div>
        <div aria-label="What guides DxLabs" className="principles-v11 reveal">
          <div className="principles-intro-v11">
            <span>What guides us</span>
            <p>Clear principles connect our current work with the company we are building.</p>
          </div>
          <div className="principles-list-v11">
            {principles.map(([title, text]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Wardle({ onDemo }) {
  const stages = [
    {
      step: '01 - Interpret',
      title: 'Review progressive clinical evidence',
      text: 'History, examination and investigation findings are revealed as the case develops.',
    },
    {
      step: '02 - Commit',
      title: 'Choose the most likely diagnosis',
      text: 'Learners make a decision before seeing the explanation.',
    },
    {
      step: '03 - Review',
      title: 'Understand the reasoning',
      text: 'The breakdown connects key clues, differentials and practical learning points.',
    },
  ];

  return (
    <section className="section wardle-v5" id="wardle">
      <div className="container wardle-grid-v5">
        <div className="wardle-copy-v5 reveal">
          <div className="product-kicker">Current product</div>
          <h2>Clinical reasoning, practised daily.</h2>
          <p>
            Wardle is a case-based learning platform for medical students and early-career clinicians. Learners work
            through progressive clinical evidence, commit to a diagnosis and review the reasoning behind the case.
          </p>
          <div className="wardle-actions-v5">
            <a className="button button-primary wardle-primary-cta-v18" href="https://wardle.it.com" rel="noopener noreferrer" target="_blank">
              Play today's case <span aria-hidden="true">↗</span>
            </a>
            <button className="button button-secondary wardle-secondary-cta-v18" onClick={onDemo} type="button">
              <ContactIcon type="send" />
              Watch the demo
            </button>
          </div>
          <span className="product-attribution-v9">Wardle is DxLabs' first product.</span>
        </div>
        <div className="demo-card-v5 wardle-loop-card-v18 reveal">
          <div className="wardle-loop-head-v18">
            <span>How Wardle works</span>
            <strong>Wardle learning loop</strong>
          </div>
          <div className="wardle-loop-stages-v18" aria-label="Wardle learning loop stages">
            {stages.map((stage) => (
              <article className="wardle-loop-stage-v18" key={stage.step}>
                <span>{stage.step}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Focus() {
  const areas = [
    ['01', 'Medical education', 'Digital learning experiences that strengthen clinical reasoning and support continued professional development.', 'Current focus'],
    ['02', 'Health systems', 'Tools that improve the flow of clinical work, information and essential services across care settings.', 'Product interest'],
    ['03', 'Diagnostic innovation', 'Responsible technologies that support the interpretation and use of clinical information without replacing professional judgement.', 'Exploration'],
    ['04', 'Imaging science', 'Research into improving the quality, accessibility and practical value of medical imaging.', 'Research interest'],
  ];

  return (
    <section className="section focus-v5" id="focus">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Where we are focused</div>
          <h2>One healthcare purpose, four connected areas.</h2>
          <p className="lede">
            Our interests are connected by one question: how can technology help healthcare professionals learn, work
            and use information more effectively?
          </p>
        </div>
        <div className="focus-list-v5">
          {areas.map(([num, title, text, status]) => (
            <article className="focus-row-v5 reveal" key={title}>
              <span className="num">{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="status">{status}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  const [activeImage, setActiveImage] = useState(0);
  const images = [
    {
      src: presentationOne,
      alt: 'DxLabs presenting Wardle beta pilot data at MedEd Africa 2026',
      label: 'Oral presentation',
      caption: 'Wardle beta pilot data shared with the regional medical education community.',
      stat: '85 trainees',
    },
    {
      src: conferenceVenue,
      alt: 'DxLabs founders at MedEd Africa 2026 in Addis Ababa',
      label: 'Founders',
      caption: 'DxLabs founders at MedEd Africa 2026 after sharing the Wardle beta pilot story.',
      stat: 'DxLabs team',
    },
  ];
  const active = images[activeImage];
  const previous = () => setActiveImage((index) => (index === 0 ? images.length - 1 : index - 1));
  const next = () => setActiveImage((index) => (index + 1) % images.length);

  return (
    <section className="section news-v7" id="news">
      <div className="container">
        <div className="news-head-v7">
          <div className="reveal">
            <div className="eyebrow">News &amp; events</div>
            <h2>A MedEd Africa milestone.</h2>
          </div>
          <p className="reveal">
            Wardle's beta pilot moved from product build to public medical education conversation, with early
            feasibility data presented at MedEd Africa 2026 in Addis Ababa.
          </p>
        </div>
        <article className="event-card-v7 reveal">
          <div aria-label="Photographs from MedEd Africa 2026" className="event-gallery-v7">
            <div className="event-social-head">
              <div className="event-avatar">Dx</div>
              <div>
                <strong>DxLabs</strong>
                <span>MedEd Africa 2026</span>
              </div>
            </div>
            <figure className="event-image-v7">
              <img alt={active.alt} loading="lazy" src={active.src} />
              <figcaption>
                <span>{active.label}</span>
                <strong>{activeImage + 1} / {images.length}</strong>
              </figcaption>
            </figure>
            <div className="event-carousel-controls" aria-label="MedEd Africa photo controls">
              <button aria-label="Previous MedEd Africa photo" onClick={previous} type="button">
                ‹
              </button>
              <button aria-label="Next MedEd Africa photo" onClick={next} type="button">
                ›
              </button>
            </div>
            <div className="event-social-thumbs" aria-label="MedEd Africa photo thumbnails">
              {images.map((image, index) => (
                <button
                  aria-label={`Preview ${image.label}`}
                  className={activeImage === index ? 'active' : ''}
                  key={`${image.label}-thumb`}
                  onClick={() => setActiveImage(index)}
                  type="button"
                >
                  <img alt="" aria-hidden="true" src={image.src} />
                </button>
              ))}
            </div>
          </div>
          <div className="event-copy-v7">
            <div className="event-meta-v7">
              <span>Conference presentation</span>
              <time dateTime="2026">2026</time>
            </div>
            <h3>Wardle beta pilot presented at MedEd Africa 2026</h3>
            <p>
              DxLabs shared Wardle's four-week beta pilot with 85 medical trainees in Kenya, highlighting early
              feasibility, learner engagement and the role of daily case practice in strengthening clinical reasoning.
            </p>
            <div className="event-slide-note" aria-live="polite">
              <strong>{active.stat}</strong>
              <span>{active.caption}</span>
            </div>
            <div className="event-tags-v7" aria-label="News tags">
              <span>Beta pilot</span>
              <span>Medical education</span>
              <span>Wardle</span>
            </div>
            <div className="event-location-v7">Addis Ababa, Ethiopia</div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="section team-v5" id="leadership">
      <div className="container">
        <div className="team-intro-v5 reveal">
          <div>
            <div className="eyebrow">Leadership</div>
            <h2>Clinician-led, product-minded.</h2>
          </div>
          <p>
            DxLabs brings clinical training, product design and technology together around practical problems in
            healthcare learning and delivery.
          </p>
        </div>
        <div className="team-grid-v5">
          <article className="team-card-v5 reveal">
            <div className="team-photo-v5 initials">FK</div>
            <div className="team-copy-v5">
              <span className="role">Co-founder &amp; Chief Executive Officer</span>
              <h3>Dr Faith Keru</h3>
              <p>Leads company direction, clinical education strategy and institutional partnerships.</p>
            </div>
          </article>
          <article className="team-card-v5 reveal">
            <div className="team-photo-v5">
              <img alt="Dr Gideon Saningo, Co-founder and Chief Technology Officer of DxLabs" src={gideonPhoto} />
            </div>
            <div className="team-copy-v5">
              <span className="role">Co-founder &amp; Chief Technology Officer</span>
              <h3>Dr Gideon Saningo</h3>
              <p>Guides technology, product design and clinical innovation.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitState, setSubmitState] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const isSubmitting = submitState === 'submitting';

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    if (!event.currentTarget.reportValidity()) {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      organisation: data.get('organisation'),
      message: data.get('message'),
      website: data.get('website'),
      startedAt: formStartedAt,
      source: 'dxlabs-website',
    };

    setSubmitState('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok !== true) {
        setSubmitState('error');
        setStatusMessage('We could not send your enquiry. Please try again or use one of the direct contact options.');
        return;
      }

      form.reset();
      setFormStartedAt(Date.now());
      setSubmitState('success');
      setStatusMessage(result.message || 'Thank you. Your enquiry has been sent to DxLabs.');
      window.requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setSubmitState('error');
      setStatusMessage('We could not send your enquiry. Please try again or use one of the direct contact options.');
    }
  }

  return (
    <section className="contact-v5" id="contact">
      <div className="container">
        <div className="contact-shell-v5">
          <div className="contact-copy-v5 reveal">
            <div>
              <div className="eyebrow light">Contact</div>
              <h2>Start the right conversation.</h2>
              <p>
                Tell us about your institution, project or healthcare challenge. We welcome conversations with
                educators, researchers and health-system partners.
              </p>
            </div>
            <div aria-label="Enquiry areas" className="contact-scope-v11">
              <span>Medical education</span>
              <span>Institutional collaboration</span>
              <span>Health systems and research</span>
            </div>
            <p className="contact-support-v15">Use the form to provide enough context for a focused response.</p>
          </div>
          <form aria-busy={isSubmitting} className="contact-form-v5 reveal" onSubmit={handleSubmit} ref={formRef}>
            <div className="contact-form-head-v13">
              <span className="contact-form-icon-v13">
                <ContactIcon type="send" />
              </span>
              <div>
                <h3>Send a message</h3>
                <p>Share the context, organisation involved and the outcome you would like to discuss.</p>
              </div>
            </div>
            <div className="form-row-v5">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input autoComplete="name" id="name" maxLength="100" minLength="2" name="name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input autoComplete="email" id="email" maxLength="254" name="email" required type="email" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="organisation">
                Organisation <em>optional</em>
              </label>
              <input autoComplete="organization" id="organisation" maxLength="150" name="organisation" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                maxLength="5000"
                minLength="10"
                name="message"
                placeholder="Describe the opportunity, project or question you would like to discuss."
                required
              />
            </div>
            <div aria-hidden="true" className="contact-honeypot-v17">
              <label htmlFor="website">Website</label>
              <input autoComplete="off" id="website" name="website" tabIndex="-1" />
            </div>
            <div className="contact-submit-area-v16">
              <div className="contact-submit-row-v16">
                <button
                  className="button button-primary contact-submit-v5"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <ContactIcon type="send" />
                  {isSubmitting ? 'Sending...' : 'Send enquiry'}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
              {statusMessage && (
                <p
                  aria-live={submitState === 'error' ? 'assertive' : 'polite'}
                  className={`contact-status-v17 ${submitState}`}
                  ref={statusRef}
                  role={submitState === 'error' ? 'alert' : 'status'}
                  tabIndex="-1"
                >
                  {statusMessage}
                </p>
              )}
            </div>
            <p className="form-note-v5">
              Your enquiry is sent securely through the DxLabs website. Direct contact options remain available.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer-v8">
      <div className="container">
        <div className="footer-main-v8">
          <div className="footer-brand-v8">
            <Brand footer />
          </div>
          <nav aria-label="Company" className="footer-column-v8">
            <h2>Company</h2>
            <a href="#about">About</a>
            <a href="#focus">Areas</a>
            <a href="#leadership">Leadership</a>
            <a href="#news">News</a>
          </nav>
          <div className="footer-column-v8">
            <h2>Product</h2>
            <a href="#wardle">Wardle</a>
            <a href="https://wardle.it.com" rel="noopener noreferrer" target="_blank">
              Visit Wardle <span aria-hidden="true">↗</span>
            </a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-contact-v8">
            <h2>Work with us</h2>
            <p>Interested in medical education, healthcare technology or research collaboration?</p>
            <a className="footer-contact-cta-v15" href="#contact">
              Start a conversation
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="footer-rule-v8" />
        <div className="footer-bottom-v8">
          <span>© 2026 DxLabs Limited.</span>
          <span>Wardle is a product of DxLabs Limited.</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingContactMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const channels = getContactChannels();

  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="floating-contact-v14" ref={menuRef}>
      {open && (
        <div className="floating-contact-options-v14" id="floating-contact-options">
          {channels.map((channel, index) => (
            <a
              aria-label={channel.accessibleLabel}
              className={`floating-contact-option-v14 floating-contact-${channel.key}`}
              href={channel.href}
              key={channel.key}
              onClick={() => setOpen(false)}
              rel={channel.external ? 'noopener noreferrer' : undefined}
              style={{ '--contact-index': index }}
              target={channel.external ? '_blank' : undefined}
            >
              <span className="floating-contact-label-v14">{channel.shortLabel}</span>
              <span className="floating-contact-icon-v14">
                <ContactIcon type={channel.icon} />
              </span>
            </a>
          ))}
        </div>
      )}
      <button
        aria-controls="floating-contact-options"
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        className={`floating-contact-trigger-v14${open ? ' open' : ''}`}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <ContactIcon type={open ? 'close' : 'contact'} />
      </button>
    </div>
  );
}

function DemoModal({ open, onClose, pageShellRef, returnFocusRef }) {
  const [videoError, setVideoError] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const video = videoRef.current;
    const pageShell = pageShellRef?.current;

    document.body.classList.add('modal-open');
    if (pageShell) {
      if ('inert' in pageShell) {
        pageShell.inert = true;
      } else {
        pageShell.setAttribute('aria-hidden', 'true');
      }
    }

    setVideoError(false);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    if (video) {
      video.currentTime = 0;
      const playAttempt = video.play();
      if (playAttempt?.catch) {
        playAttempt.catch(() => {});
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), video[controls], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);

      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      if (pageShell) {
        if ('inert' in pageShell) {
          pageShell.inert = false;
        } else {
          pageShell.removeAttribute('aria-hidden');
        }
      }

      window.requestAnimationFrame(() => returnFocusRef?.current?.focus());
    };
  }, [open, onClose, pageShellRef, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      aria-describedby="demoDescription"
      aria-labelledby="demoTitle"
      aria-modal="true"
      className="modal open"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      tabIndex="-1"
    >
      <div className="modal-dialog" ref={dialogRef}>
        <div className="modal-head">
          <strong id="demoTitle">Wardle product demo</strong>
          <button aria-label="Close demo" className="modal-close" onClick={onClose} ref={closeButtonRef} type="button">
            ×
          </button>
        </div>
        <p className="video-mobile-note" id="demoDescription">Recorded on desktop. Rotate your phone for a wider view if helpful.</p>
        <div className="video-frame">
          <video
            autoPlay
            controls
            muted
            playsInline
            preload="metadata"
            ref={videoRef}
            tabIndex="0"
            onCanPlay={() => setVideoError(false)}
            onError={() => setVideoError(true)}
          >
            <source src="/wardle-demo.mp4" type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          {videoError && (
            <div className="video-fallback">
              <div>
                <strong>The Wardle demo could not be loaded.</strong>
                <a href="https://wardle.it.com" rel="noopener noreferrer" target="_blank">
                  Open Wardle and try today's case
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const pageShellRef = useRef(null);
  const demoTriggerRef = useRef(null);

  function openDemo(trigger) {
    demoTriggerRef.current = trigger;
    setDemoOpen(true);
  }

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={pageShellRef}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Wardle onDemo={(event) => openDemo(event.currentTarget)} />
          <Focus />
          <News />
          <Leadership />
          <Contact />
        </main>
        <Footer />
        {!demoOpen && <FloatingContactMenu />}
      </div>
      <DemoModal
        onClose={() => setDemoOpen(false)}
        open={demoOpen}
        pageShellRef={pageShellRef}
        returnFocusRef={demoTriggerRef}
      />
    </>
  );
}
