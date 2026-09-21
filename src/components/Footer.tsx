import React, { useEffect, useState } from "react";

const PLATFORM_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
];

const LEGAL_MODALS = {
  privacy: {
    label: "Privacy Policy",
    body: [
      "We collect only what's needed to run this site and respond to enquiries — things like your name, email and any project details you choose to share with us.",
      "We never sell your data, and we don't share it with third parties beyond the tools we use to run the studio (email, hosting, analytics). You can ask us to delete anything we hold on you at any time.",
    ],
  },
  terms: {
    label: "Terms of Use",
    body: [
      "By using this site, you agree to browse it for its intended purpose — learning about Pixelpop and getting in touch about your project.",
      "All content, design and code on this site belongs to Pixelpop unless otherwise credited. Don't reproduce it elsewhere without asking us first.",
    ],
  },
  inquiries: {
    label: "Inquiries",
    body: [
      "New project? Press request? General question? Send it to hello@pixelpop.studio and we'll get back to you within two working days.",
      "For anything urgent, mention it in the subject line and we'll bump it up the queue.",
    ],
  },
};

type ModalKey = keyof typeof LEGAL_MODALS;

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/pixelpopdigital_/" },
  { label: "Twitter", href: "https://x.com/pixelpopdigital" },
  { label: "LinkedIn", href: "#" },
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
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          color: rgba(243,241,234,0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-bottom-link:hover { color: #C81D1D; }

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
            Pixelpop<sup>*</sup>
          </h2>
          <p className="footer-tagline">
            A marketing and social studio that turns brands into things
            people actually stop scrolling for.
          </p>
        </div>

        <div>
          <div className="footer-col-label">Studio</div>
          {PLATFORM_LINKS.map((link) => (
            <a className="footer-link" href={link.href} key={link.label}>
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
          © {year} Pixelpop. All rights reserved. Built to be seen.
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
              {s.label}
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
