import { useEffect, useRef, useState } from 'react';
import logo from '../assets/dxlabs-logo.svg';
import presentationOne from '../assets/meded-africa-2026-presentation-1.jpeg';
import presentationTwo from '../assets/meded-africa-2026-presentation-2.jpeg';
import conferenceVenue from '../assets/meded-africa-2026-venue.jpeg';
import gideonPhoto from '../assets/dr-gideon-saningo.png';

const contactEmail = 'dxlabssupport@gmail.com';

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
            <h2>DxLabs in practice.</h2>
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
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`DxLabs enquiry from ${data.get('name')}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nOrganisation: ${
        data.get('organisation') || 'Not provided'
      }\n\nMessage:\n${data.get('message')}`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${subject}&body=${body}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  return (
    <section className="contact-v5" id="contact">
      <div className="container">
        <div className="contact-shell-v5">
          <div className="contact-copy-v5 reveal">
            <div>
              <div className="eyebrow light">Contact</div>
              <h2>Start the right conversation.</h2>
              <p>DxLabs welcomes conversations with educators, institutions, researchers and health-system partners.</p>
            </div>
            <div aria-label="Enquiry areas" className="contact-scope-v11">
              <span>Medical education</span>
              <span>Institutional collaboration</span>
              <span>Health systems and research</span>
            </div>
            <a
              className="contact-email-v5"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <small>Direct email</small>
              <strong>{contactEmail}</strong>
            </a>
          </div>
          <form className="contact-form-v5 reveal" onSubmit={handleSubmit}>
            <h3>Send a message</h3>
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
              <textarea id="message" name="message" placeholder="Briefly describe what you would like to discuss." required />
            </div>
            <button className="button button-primary contact-submit-v5" type="submit">
              Prepare email <span aria-hidden="true">→</span>
            </button>
            <p className="form-note-v5">Your email application will open with the message prepared.</p>
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
            <p>Clinician-led health technology for medical learning, healthcare delivery and thoughtful diagnostic innovation.</p>
            <span className="footer-location-v8">Kenya - Built with African health systems in view</span>
          </div>
          <nav aria-label="Company" className="footer-column-v8">
            <h2>Company</h2>
            <a href="#about">About</a>
            <a href="#focus">Areas of interest</a>
            <a href="#leadership">Leadership</a>
            <a href="#news">News &amp; events</a>
          </nav>
          <div className="footer-column-v8">
            <h2>Product</h2>
            <a href="#wardle">Wardle overview</a>
            <a href="https://wardle.it.com" rel="noopener noreferrer" target="_blank">
              Visit Wardle <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer-contact-v8">
            <h2>Contact</h2>
            <p>Institutional collaboration, research and general company enquiries.</p>
            <a
              className="footer-email-v8"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {contactEmail}
            </a>
            <a className="footer-contact-link-v8" href="#contact">
              Send an enquiry <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="footer-rule-v8" />
        <div className="footer-bottom-v8">
          <div>
            <span>© 2026 DxLabs Limited.</span>
            <span>All rights reserved.</span>
          </div>
          <p>Wardle is a product of DxLabs Limited. Educational content does not replace qualified clinical judgement.</p>
        </div>
      </div>
    </footer>
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
      <DemoModal onClose={() => setDemoOpen(false)} open={demoOpen} />
    </>
  );
}
