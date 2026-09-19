import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
  color: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Pixelpop took our socials from ignorable to inescapable in eight weeks flat. We've never had a launch move that fast.",
    name: "Priya Nair",
    role: "Founder, Northline Sportswear",
    initials: "PN",
    color: "#C81D1D",
  },
  {
    quote:
      "The campaign strategy paid for itself twice over before the launch window even closed. Rare to see that kind of clarity.",
    name: "Marcus Webb",
    role: "CMO, Fathom Audio",
    initials: "MW",
    color: "#B08D57",
  },
  {
    quote:
      "Finally an agency that ships the same idea they pitch. No watered-down version three revisions in.",
    name: "Elena Cross",
    role: "Brand Director, Meridian Coffee Co.",
    initials: "EC",
    color: "#3E5C54",
  },
  {
    quote:
      "Sharpest creative team we've worked with, full stop. They think like editors, not just designers.",
    name: "Jordan Lee",
    role: "Founder, Harbor & Ash",
    initials: "JL",
    color: "#8A4B3B",
  },
  {
    quote:
      "Every deliverable felt considered. Nothing generic, nothing rushed, and it showed in the numbers.",
    name: "Sofia Reyes",
    role: "Marketing Lead, Ledger Studio",
    initials: "SR",
    color: "#5A5040",
  },
]

function useInView(): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

function StarRow() {
  return (
    <div className="testimonial-stars" aria-hidden="true">
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>{s}</span>
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="testimonial-card">
      <StarRow />
      <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
      <div className="testimonial-person">
        <span
          className="testimonial-avatar"
          style={{ background: t.color }}
        >
          {t.initials}
        </span>
        <span>
          <span className="testimonial-name">{t.name}</span>
          <span className="testimonial-role">{t.role}</span>
        </span>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const track = [...TESTIMONIALS, ...TESTIMONIALS]
  const [headingRef, headingInView] = useInView()

  return (
    <section style={styles.section}>
      <style>{`
        .testimonial-heading-block {
          /* container only — each child animates individually */
        }
        .testimonial-subcopy {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 15.5px;
          line-height: 1.6;
          text-align: center;
          color: rgba(232,220,200,0.55);
          max-width: 46ch;
          margin: 0 auto 64px auto;
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s,
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
        }
        .testimonial-eyebrow {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C81D1D;
          text-align: center;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .testimonial-headline {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(30px, 4.6vw, 54px);
          line-height: 1.15;
          text-align: center;
          color: #E8DCC8;
          max-width: 18ch;
          margin: 0 auto 20px auto;
          letter-spacing: -0.01em;
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
        }
        .testimonial-heading-block.is-in .testimonial-eyebrow,
        .testimonial-heading-block.is-in .testimonial-headline,
        .testimonial-heading-block.is-in .testimonial-subcopy {
          opacity: 1;
          transform: translateY(0);
        }
        .testimonial-viewport {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right, transparent 0%, black 6%, black 94%, transparent 100%
          );
          mask-image: linear-gradient(
            to right, transparent 0%, black 6%, black 94%, transparent 100%
          );
        }
        .testimonial-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: testimonial-scroll 46s linear infinite;
        }
        .testimonial-viewport:hover .testimonial-track {
          animation-play-state: paused;
        }
        @keyframes testimonial-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-track { animation: none; }
        }

        .testimonial-card {
          flex-shrink: 0;
          width: 340px;
          background: rgba(232,220,200,0.05);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(232,220,200,0.14);
          border-radius: 18px;
          padding: 32px 28px;
          transition: border-color 0.35s ease, transform 0.35s ease;
        }
        .testimonial-card:hover {
          border-color: rgba(232,220,200,0.32);
          transform: translateY(-4px);
        }
        .testimonial-stars {
          color: #F2B705;
          font-size: 15px;
          letter-spacing: 2px;
          margin-bottom: 18px;
        }
        .testimonial-quote {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(232,220,200,0.85);
          margin: 0 0 28px 0;
          min-height: 130px;
        }
        .testimonial-person {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .testimonial-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #0A0A0A;
        }
        .testimonial-name {
          display: block;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          color: #E8DCC8;
        }
        .testimonial-role {
          display: block;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          color: rgba(232,220,200,0.5);
          margin-top: 2px;
        }
        @media (max-width: 500px) {
          .testimonial-card { width: 280px; }
        }
      `}</style>

      <div
        className={
          "testimonial-heading-block" + (headingInView ? " is-in" : "")
        }
        ref={headingRef}
      >
        <div className="testimonial-eyebrow">Client feedback</div>
        <h2 className="testimonial-headline">
          Loved by brands who don't blend in.
        </h2>
        <p className="testimonial-subcopy">
          A few words from the people we've helped turn ideas into
          campaigns worth stopping for.
        </p>
      </div>

      <div className="testimonial-viewport">
        <div className="testimonial-track">
          {track.map((t, i) => (
            <TestimonialCard t={t} key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const styles: { [key: string]: CSSProperties } = {
  section: {
    background: "#0A0A0A",
    padding: "110px 0",
  },
}
