import React, { useEffect, useState } from "react";

const PLATFORM_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Query", href: "https://forms.gle/NSNfKBNK6jVb6o917" },
];

const LEGAL_MODALS = {
  privacy: {
    label: "Privacy Policy",
    body: [
      "We collect only what's needed to run this site and respond to enquiries — things like your name, email and any project details you choose to share with us.",
      "We never sell your data, and we don't share it with third parties beyond the tools we use to run the brand (email, hosting, analytics). You can ask us to delete anything we hold on you at any time.",
    ],
  },
  terms: {
    label: "Terms of Use",
    body: [
      "By using this site, you agree to browse it for its intended purpose — learning about Pixelpop Digital and getting in touch about your project.",
      "All content, design and code on this site belongs to Pixelpop Digital unless otherwise credited. Don't reproduce it elsewhere without asking us first.",
    ],
  },
  inquiries: {
    label: "Inquiries",
    body: [
      "New project? Press request? General question? Fill out our Query Form or send an email to hello@pixelpopdigital.com and we'll get back to you within two working days.",
      "For anything urgent, mention it in the subject line and we'll bump it up the queue.",
    ],
    formUrl: "https://forms.gle/NSNfKBNK6jVb6o917",
  },
};

type ModalKey = keyof typeof LEGAL_MODALS;

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <radialGradient id="footer-ig-grad" cx="30%" cy="107%" r="130%" fx="30%" fy="107%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#footer-ig-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.8" stroke="#ffffff" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" fill="none" />
      <circle cx="15.8" cy="8.2" r="1" fill="#ffffff" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <rect width="24" height="24" rx="6.5" fill="#1DA1F2" />
      <path
        fill="#ffffff"
        d="M18.8 7.5a6.4 6.4 0 0 1-1.8.5 3.2 3.2 0 0 0 1.4-1.7 6.4 6.4 0 0 1-2 .8 3.16 3.16 0 0 0-5.4 2.9A9 9 0 0 1 4.5 6.8a3.16 3.16 0 0 0 1 4.2 3.1 3.1 0 0 1-1.4-.4v.04a3.16 3.16 0 0 0 2.5 3.1 3.2 3.2 0 0 1-1.4.05 3.16 3.16 0 0 0 2.9 2.2A6.35 6.35 0 0 1 4 17.3a8.96 8.96 0 0 0 4.9 1.4c5.8 0 9-4.8 9-9v-.4a6.5 6.5 0 0 0 1.6-1.6z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <rect width="24" height="24" rx="6.5" fill="#0A66C2" />
      <path
        fill="#ffffff"
        d="M7.4 6.2a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0zM4.8 8.6h2.5v7.6H4.8V8.6zm3.9 0h2.4v1.1h.03c.34-.64 1.18-1.32 2.43-1.32 2.6 0 3.08 1.71 3.08 3.94v3.88H14.1v-3.44c0-.82-.01-1.87-1.14-1.87-1.14 0-1.32.89-1.32 1.81v3.5H9.2v-7.6h-.5z"
      />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/pixelpopdigital_/",
    icon: <InstagramIcon />,
  },
  {
    label: "Twitter",
    href: "https://x.com/pixelpopdigital",
    icon: <TwitterIcon />,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: <LinkedInIcon />,
  },
];

function LegalModal({
  modalKey,
  onClose,
}: {
  modalKey: ModalKey | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!modalKey) return null;
  const content = LEGAL_MODALS[modalKey];

  return (
    <div
      className="legal-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="legal-modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={content.label}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="legal-modal-close" onClick={onClose} aria-label="Close">
          <span className="legal-modal-close-mark" aria-hidden="true" />
        </button>
        <h3 className="legal-modal-title">{content.label}</h3>
        {content.body.map((para, i) => (
          <p className="legal-modal-para" key={i}>
            {para}
          </p>
        ))}
        {'formUrl' in content && content.formUrl && (
          <div style={{ marginTop: 20 }}>
            <a
              href={content.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-join"
              style={{ display: "inline-block", textDecoration: "none", color: "#0A0A0A" }}
            >
              Open Query Form ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);
  const year = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("subscribe:", email);
  };

  return (
    <footer id="contact" style={styles.footer}>
      <style>{`
        .footer-brand-mark {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(30px, 3vw, 40px);
          margin: 0 0 20px 0;
          letter-spacing: -0.01em;
        }
        .footer-brand-mark sup { color: #C81D1D; font-size: 0.55em; }
        .footer-tagline {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(243,241,234,0.6);
          max-width: 34ch;
          margin: 0;
        }
        .footer-col-label {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(243,241,234,0.9);
          margin-bottom: 22px;
        }
        .footer-link {
          display: block;
          width: 100%;
          text-align: left;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 15px;
          color: rgba(243,241,234,0.6);
          text-decoration: none;
          background: none;
          border: none;
          padding: 6px 0;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .footer-link:hover { color: #F3F1EA; }
        .footer-newsletter-copy {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(243,241,234,0.6);
          margin: 0 0 20px 0;
          max-width: 30ch;
        }
        .footer-form { display: flex; gap: 10px; }
        .footer-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: 1px solid rgba(243,241,234,0.25);
          color: #F3F1EA;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          padding: 12px 14px;
          transition: border-color 0.3s ease;
        }
        .footer-input::placeholder { color: rgba(243,241,234,0.35); }
        .footer-input:focus { outline: none; border-color: #C81D1D; }
        .footer-join {
          all: unset;
          cursor: pointer;
          background: #C81D1D;
          color: #0A0A0A;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          padding: 12px 22px;
          text-align: center;
          transition: background 0.3s ease;
          flex-shrink: 0;
        }
        .footer-join:hover { background: #F3F1EA; }
        .footer-bottom-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          color: rgba(243,241,234,0.7);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .footer-social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 5px;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease;
        }
        .footer-bottom-link:hover {
          color: #F3F1EA;
          transform: translateY(-1.5px);
        }
        .footer-bottom-link:hover .footer-social-icon {
          transform: scale(1.15);
          filter: drop-shadow(0 2px 6px rgba(255,255,255,0.25));
        }

        .legal-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10,10,10,0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 1000;
          animation: modal-fade 0.25s ease;
        }
        .legal-modal-card {
          position: relative;
          background: #0A0A0A;
          border: 1px solid rgba(243,241,234,0.2);
          max-width: 480px;
          width: 100%;
          padding: 44px 36px;
          animation: modal-rise 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .legal-modal-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 400;
          font-size: 28px;
          color: #F3F1EA;
          margin: 0 0 20px 0;
          padding-right: 24px;
        }
        .legal-modal-para {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 14.5px;
          line-height: 1.65;
          color: rgba(243,241,234,0.65);
          margin: 0 0 14px 0;
        }
        .legal-modal-para:last-child { margin-bottom: 0; }
        .legal-modal-close {
          all: unset;
          position: absolute;
          top: 28px;
          right: 28px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .legal-modal-close-mark {
          width: 14px;
          height: 14px;
          position: relative;
        }
        .legal-modal-close-mark::before,
        .legal-modal-close-mark::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: rgba(243,241,234,0.6);
          transition: background 0.25s ease;
        }
        .legal-modal-close-mark::before { transform: rotate(45deg); }
        .legal-modal-close-mark::after { transform: rotate(-45deg); }
        .legal-modal-close:hover .legal-modal-close-mark::before,
        .legal-modal-close:hover .legal-modal-close-mark::after {
          background: #C81D1D;
        }
        @keyframes modal-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-rise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .legal-modal-backdrop, .legal-modal-card { animation: none; }
        }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; row-gap: 44px !important; }
          .footer-brand-block { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-form { flex-direction: column; }
          .footer-bottom { flex-direction: column; align-items: flex-start !important; gap: 14px; }
          .footer-bottom-links { gap: 16px !important; }
        }
      `}</style>

      <div className="footer-grid" style={styles.grid}>
        <div className="footer-brand-block">
          <h2 className="footer-brand-mark">
            Pixelpop Digital<sup>*</sup>
          </h2>
          <p className="footer-tagline">
            A brand that turns ideas into things
            people actually stop scrolling for.
          </p>
        </div>

        <div>
          <div className="footer-col-label">Brand</div>
          {PLATFORM_LINKS.map((link) => (
            <a
              className="footer-link"
              href={link.href}
              key={link.label}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div>
          <div className="footer-col-label">Legal</div>
          {(Object.keys(LEGAL_MODALS) as ModalKey[]).map((key) => (
            <button
              className="footer-link"
              key={key}
              onClick={() => setOpenModal(key)}
            >
              {LEGAL_MODALS[key].label}
            </button>
          ))}
        </div>

        <div>
          <div className="footer-col-label">Newsletter</div>
          <p className="footer-newsletter-copy">
            Subscribe for the occasional look behind the work.
          </p>
          <form className="footer-form" onSubmit={handleSubmit}>
            <input
              className="footer-input"
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="footer-join" type="submit">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom" style={styles.bottom}>
        <span style={styles.copy}>
          © {year} Pixelpop Digital. All rights reserved. Built to be seen.
        </span>
        <div className="footer-bottom-links" style={styles.bottomLinks}>
          {SOCIALS.map((s) => (
            <a
              className="footer-bottom-link"
              href={s.href}
              key={s.label}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span className="footer-social-icon">{s.icon}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>

      <LegalModal modalKey={openModal} onClose={() => setOpenModal(null)} />
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    background: "#0A0A0A",
    color: "#F3F1EA",
    padding: "96px 8vw 32px",
    position: "relative",
    zIndex: 10,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1fr 1.3fr",
    gap: "24px",
    paddingBottom: "56px",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "28px",
    borderTop: "1px solid rgba(243,241,234,0.15)",
  },
  copy: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: "13px",
    color: "rgba(243,241,234,0.45)",
  },
  bottomLinks: {
    display: "flex",
    gap: "28px",
  },
};
