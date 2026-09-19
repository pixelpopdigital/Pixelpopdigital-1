import { useEffect, useRef, useState, type CSSProperties } from 'react'

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      style={styles.section}
      className={`about-section ${inView ? 'is-in-view' : ''}`}
    >
      <style>{`
        .about-section {
          overflow: hidden;
        }
        .about-eyebrow {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C81D1D;
          text-align: center;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .about-headline {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(36px, 5.6vw, 74px);
          line-height: 1.18;
          text-align: center;
          color: #E8DCC8;
          max-width: 18ch;
          margin: 0 auto 48px auto;
          letter-spacing: -0.01em;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s,
                      transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s;
          will-change: opacity, transform;
        }
        .about-headline em {
          font-style: italic;
          color: #E8DCC8;
        }
        .about-copy {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 16px;
          line-height: 1.75;
          color: rgba(232, 220, 200, 0.65);
          text-align: center;
          max-width: 58ch;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.34s,
                      transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.34s;
          will-change: opacity, transform;
        }
        .about-section.is-in-view .about-eyebrow,
        .about-section.is-in-view .about-headline,
        .about-section.is-in-view .about-copy {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 600px) {
          .about-headline { max-width: 100%; }
        }
      `}</style>

      <div className="about-eyebrow">About Pixelpop</div>

      <h2 className="about-headline">
        We're the studio that makes brands <em>impossible to scroll past.</em>
      </h2>

      <p className="about-copy">
        Pixelpop is a marketing and social studio built for brands who'd
        rather be talked about than blend in. We handle strategy,
        production and distribution under one roof — so the idea that
        gets pitched is the one that actually ships, looking exactly as
        sharp as it did on day one.
      </p>
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  section: {
    background: "#0A0A0A",
    padding: "120px 8vw",
    border: "none",
    position: "relative",
    zIndex: 10,
  },
}
