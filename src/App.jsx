import { useEffect, useRef, useState } from 'react';
import logo from '../assets/dxlabs-logo.svg';
import presentationOne from '../assets/meded-africa-2026-presentation-1.jpeg';
import presentationTwo from '../assets/meded-africa-2026-presentation-2.jpeg';
import conferenceVenue from '../assets/meded-africa-2026-venue.jpeg';
import gideonPhoto from '../assets/dr-gideon-saningo.png';

const contactEmail = 'dxlabssupport@gmail.com';
const linkedInUrl = import.meta.env.VITE_DXLABS_LINKEDIN_URL?.trim() || '';
const whatsappNumber = (import.meta.env.VITE_DXLABS_WHATSAPP_NUMBER || '').replace(/\D/g, '');
const defaultWhatsappMessage = 'Hello DxLabs, I would like to discuss a possible collaboration.';

function gmailComposeUrl({ subject = '', body = '' } = {}) {
  const params = [`view=cm`, `fs=1`, `to=${encodeURIComponent(contactEmail)}`];
  if (subject) params.push(`su=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `https://mail.google.com/mail/?${params.join('&')}`;
}

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

function buildEnquiry(form) {
  if (!form.reportValidity()) {
    return null;
  }

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const organisation = String(data.get('organisation') || '').trim() || 'Not provided';
  const message = String(data.get('message') || '').trim();

  return {
    subject: `DxLabs enquiry from ${name}`,
    body:
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Organisation: ${organisation}\n\n` +
      `Message:\n${message}`,
  };
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
  return (
    <section className="section wardle-v5" id="wardle">
      <div className="container wardle-grid-v5">
        <div className="wardle-copy-v5 reveal">
          <div className="product-kicker">Current product</div>
          <h2>Clinical reasoning, practised daily.</h2>
          <p>
            Wardle is a case-based learning platform for medical students and early-career clinicians. Progressive
            cases ask learners to interpret evidence, commit to a diagnosis and review the reasoning behind it,
            turning diagnostic thinking into a regular habit.
          </p>
          <div className="wardle-actions-v5">
            <span className="product-attribution-v9">Wardle is DxLabs' first product.</span>
            <a className="text-link" href="https://wardle.it.com" rel="noopener noreferrer" target="_blank">
              Visit Wardle <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="demo-card-v5 reveal">
          <div aria-hidden="true" className="demo-ui-v5">
            <div className="demo-head-v5">
              <strong>Wardle</strong>
              <span>Demonstration</span>
            </div>
            <div className="demo-case-v5">
              <span>Product demonstration</span>
              <h3>See how a case moves from evidence to diagnosis.</h3>
              <div className="demo-lines-v5">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="demo-foot-v5">Progressive case-based learning</div>
          </div>
          <button aria-label="Watch the Wardle demo" className="demo-play-v5" onClick={onDemo} type="button">
            <span>
              <b aria-hidden="true">▶</b> Play demo
            </span>
          </button>
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
      src: presentationTwo,
      alt: 'Wardle presentation on stage at MedEd Africa 2026 in Addis Ababa',
      label: 'Conference stage',
      caption: 'A product milestone from daily case practice to conference-stage discussion.',
      stat: 'Addis Ababa',
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
  const [deliveryChoiceOpen, setDeliveryChoiceOpen] = useState(false);
  const [pendingEnquiry, setPendingEnquiry] = useState(null);
  const deliveryChoiceRef = useRef(null);
  const sendButtonRef = useRef(null);
  const firstDeliveryActionRef = useRef(null);

  function closeDeliveryChoice({ restoreFocus = true } = {}) {
    setDeliveryChoiceOpen(false);
    setPendingEnquiry(null);
    if (restoreFocus) {
      window.requestAnimationFrame(() => sendButtonRef.current?.focus());
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const enquiry = buildEnquiry(event.currentTarget);

    if (!enquiry) return;

    setPendingEnquiry(enquiry);
    setDeliveryChoiceOpen(true);
  }

  function handleOpenGmail() {
    if (!pendingEnquiry) return;

    const composeUrl = gmailComposeUrl(pendingEnquiry);
    const newWindow = window.open('', '_blank');

    closeDeliveryChoice({ restoreFocus: false });

    if (!newWindow) {
      window.location.assign(composeUrl);
      return;
    }

    newWindow.opener = null;
    newWindow.location.href = composeUrl;
  }

  function handleOpenEmailApp() {
    if (!pendingEnquiry) return;

    const emailUrl = mailtoUrl(pendingEnquiry);

    closeDeliveryChoice({ restoreFocus: false });
    window.location.assign(emailUrl);
  }

  function handleFormChange() {
    if (deliveryChoiceOpen) {
      closeDeliveryChoice({ restoreFocus: false });
    }
  }

  useEffect(() => {
    if (!deliveryChoiceOpen) return undefined;

    firstDeliveryActionRef.current?.focus();

    function handlePointerDown(event) {
      if (deliveryChoiceRef.current && !deliveryChoiceRef.current.contains(event.target)) {
        closeDeliveryChoice();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeDeliveryChoice();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [deliveryChoiceOpen]);

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
          <form className="contact-form-v5 reveal" onChange={handleFormChange} onSubmit={handleSubmit}>
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
                <input autoComplete="name" id="name" name="name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input autoComplete="email" id="email" name="email" required type="email" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="organisation">
                Organisation <em>optional</em>
              </label>
              <input autoComplete="organization" id="organisation" name="organisation" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Describe the opportunity, project or question you would like to discuss."
                required
              />
            </div>
            <div className="contact-submit-area-v16">
              <div className="contact-submit-row-v16">
                <button
                  aria-controls="contact-delivery-options"
                  aria-expanded={deliveryChoiceOpen}
                  className="button button-primary contact-submit-v5"
                  ref={sendButtonRef}
                  type="submit"
                >
                  <ContactIcon type="send" />
                  Send enquiry
                  <span aria-hidden="true">→</span>
                </button>
              </div>
              {deliveryChoiceOpen && pendingEnquiry && (
                <div
                  aria-label="Choose how to open your enquiry"
                  className="contact-delivery-choice-v16"
                  id="contact-delivery-options"
                  ref={deliveryChoiceRef}
                >
                  <div className="contact-delivery-head-v16">
                    <strong>Choose email option</strong>
                    <button
                      aria-label="Close email options"
                      className="contact-delivery-close-v16"
                      onClick={() => closeDeliveryChoice()}
                      type="button"
                    >
                      <ContactIcon type="close" />
                    </button>
                  </div>
                  <button
                    className="contact-delivery-option-v16"
                    onClick={handleOpenGmail}
                    ref={firstDeliveryActionRef}
                    type="button"
                  >
                    <span className="contact-delivery-icon-v16">
                      <ContactIcon type="send" />
                    </span>
                    <span>
                      <strong>Open in Gmail</strong>
                      <small>Continue in Gmail using your browser</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </button>
                  <button className="contact-delivery-option-v16" onClick={handleOpenEmailApp} type="button">
                    <span className="contact-delivery-icon-v16">
                      <ContactIcon type="email" />
                    </span>
                    <span>
                      <strong>Use email app</strong>
                      <small>Requires a default mail application</small>
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <p className="contact-delivery-note-v16">Your enquiry will open as a draft for review.</p>
                </div>
              )}
            </div>
            <p className="form-note-v5">
              Choose Gmail or your device's email application after preparing the enquiry. Nothing is sent
              automatically.
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

function DemoModal({ open, onClose }) {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;

    setVideoError(false);
    video.currentTime = 0;
    const playAttempt = video.play();
    if (playAttempt?.catch) {
      playAttempt.catch(() => {});
    }
  }, [open]);

  if (!open) return null;

  return (
    <div aria-labelledby="demoTitle" aria-modal="true" className="modal open" role="dialog">
      <div className="modal-dialog">
        <div className="modal-head">
          <strong id="demoTitle">Wardle product demo</strong>
          <button aria-label="Close demo" className="modal-close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <p className="video-mobile-note">Recorded on desktop. Rotate your phone for the best view.</p>
        <div className="video-frame">
          <video
            autoPlay
            controls
            muted
            playsInline
            preload="auto"
            ref={videoRef}
            onCanPlay={() => setVideoError(false)}
            onError={() => setVideoError(true)}
          >
            <source src="/wardle-demo.mp4" type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          {videoError && (
            <div className="video-fallback">
              <div>
                <strong>Wardle demo video</strong>
                Place <code>wardle-demo.mp4</code> in the project root or public folder.
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

  useEffect(() => {
    document.body.classList.toggle('modal-open', demoOpen);
    function onKeyDown(event) {
      if (event.key === 'Escape') setDemoOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [demoOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Wardle onDemo={() => setDemoOpen(true)} />
        <Focus />
        <News />
        <Leadership />
        <Contact />
      </main>
      <Footer />
      {!demoOpen && <FloatingContactMenu />}
      <DemoModal onClose={() => setDemoOpen(false)} open={demoOpen} />
    </>
  );
}
