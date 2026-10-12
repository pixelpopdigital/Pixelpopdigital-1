import { useRef, useEffect, useState } from 'react'
import InfinityLoader from '../components/InfinityLoader'
import MarqueeTicker from '../components/MarqueeTicker'
import TestimonialsSection from '../components/TestimonialsSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import Footer from '../components/Footer'
import videoSrc from '../assets/feature-video.mp4'

interface HomePageProps {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const FOUNDERS = [
  {
    name: 'Naman',
    role: 'Director',
    img: '/founder-1.png',
    quote: '"We started Pixelpop Digital because great brands deserve more than templates and trends."',
  },
  {
    name: 'Guneesh',
    role: 'Director',
    img: '/founder-2.png',
    quote: '"Every pixel has a purpose. Every campaign should have a soul."',
  },
]

function FoundersSection() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + FOUNDERS.length) % FOUNDERS.length)
  const next = () => setActive(i => (i + 1) % FOUNDERS.length)

  // Auto-advance every 4 s; resets on manual nav
  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % FOUNDERS.length)
    }, 4000)
    return () => clearInterval(id)
  }, [active])

  return (
    <section
      id="founders"
      style={{ background: '#0A0A0A', overflow: 'hidden', position: 'relative' }}
    >
      <style>{`
        /* ── Founders Slider ───────────────────────────────── */
        .fsl-viewport {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        .fsl-track {
          display: flex;
          transition: transform 0.7s cubic-bezier(0.77, 0, 0.18, 1);
          will-change: transform;
        }
        .fsl-slide {
          min-width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 90vh;
          background: #0A0A0A;
        }

        /* ── Photo half ────────────────────────────────────── */
        .fsl-photo {
          position: relative;
          overflow: hidden;
        }
        .fsl-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        /* ── Text half ─────────────────────────────────────── */
        .fsl-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 72px;
          background: #0A0A0A;
        }
        .fsl-label {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(232, 220, 200, 0.35);
          margin-bottom: 48px;
        }
        .fsl-quote {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-size: clamp(22px, 2.6vw, 36px);
          line-height: 1.5;
          color: #E8DCC8;
          margin: 0 0 56px 0;
          font-weight: 400;
          max-width: 26ch;
        }
        .fsl-name {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #E8DCC8;
          letter-spacing: -0.02em;
          display: block;
          margin-bottom: 6px;
        }
        .fsl-role {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(232, 220, 200, 0.45);
          letter-spacing: 0.04em;
          display: block;
        }

        /* ── Nav bar below slider ──────────────────────────── */
        .fsl-nav {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 32px 72px;
          background: #0A0A0A;
          border-top: 1px solid rgba(232,220,200,0.07);
        }
        .fsl-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(232,220,200,0.18);
          background: transparent;
          color: #E8DCC8;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.25s ease, background 0.25s ease;
          line-height: 1;
        }
        .fsl-arrow:hover {
          border-color: rgba(232,220,200,0.55);
          background: rgba(232,220,200,0.06);
        }
        .fsl-progress {
          flex: 1;
          height: 1px;
          background: rgba(232,220,200,0.1);
          position: relative;
          overflow: hidden;
          border-radius: 1px;
        }
        .fsl-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: rgba(232,220,200,0.55);
          border-radius: 1px;
          transition: width 0.7s cubic-bezier(0.77, 0, 0.18, 1);
        }
        .fsl-count {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 12px;
          color: rgba(232,220,200,0.35);
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        /* ── Section header ────────────────────────────────── */
        .fsl-header {
          padding: 100px 72px 60px;
          background: #0A0A0A;
        }
        .fsl-eyebrow {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(232,220,200,0.35);
          margin-bottom: 20px;
        }
        .fsl-heading {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(32px, 4.5vw, 60px);
          line-height: 1.1;
          color: #E8DCC8;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 18ch;
        }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 768px) {
          .fsl-slide {
            grid-template-columns: 1fr;
            grid-template-rows: 55vw 1fr;
            min-height: unset;
          }
          .fsl-text {
            padding: 48px 28px;
          }
          .fsl-header {
            padding: 72px 28px 44px;
          }
          .fsl-nav {
            padding: 24px 28px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="fsl-header">
        <p className="fsl-eyebrow">The people behind it</p>
        <h2 className="fsl-heading">Meet our<br />founders.</h2>
      </div>

      {/* Slider */}
      <div className="fsl-viewport">
        <div
          className="fsl-track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {FOUNDERS.map((f, i) => (
            <div className="fsl-slide" key={i}>
              {/* Photo */}
              <div className="fsl-photo">
                <img src={f.img} alt={f.name} />
              </div>
              {/* Text */}
              <div className="fsl-text">
                <span className="fsl-label">Founders — 0{i + 1}</span>
                <p className="fsl-quote">{f.quote}</p>
                <span className="fsl-name">{f.name}</span>
                <span className="fsl-role">{f.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div className="fsl-nav">
        <button className="fsl-arrow" onClick={prev} aria-label="Previous founder">&#8592;</button>
        <button className="fsl-arrow" onClick={next} aria-label="Next founder">&#8594;</button>
        <div className="fsl-progress">
          <div
            className="fsl-progress-fill"
            style={{ width: `${((active + 1) / FOUNDERS.length) * 100}%` }}
          />
        </div>
        <span className="fsl-count">0{active + 1} / 0{FOUNDERS.length}</span>
      </div>
    </section>
  )
}

export default function HomePage({ loading, setLoading }: HomePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (loading) return

    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.loop = true

    const playVideo = () => {
      if (video && video.paused) {
        video.play().catch(() => {})
      }
    }

    playVideo()

    // Ensure the video keeps looping and playing continuously even if paused
    const handlePause = () => {
      playVideo()
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        playVideo()
      }
    }

    video.addEventListener('pause', handlePause)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      video.removeEventListener('pause', handlePause)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [loading])

  return (
    <div className="brand-viewport">
      {/* Infinity Loader on initial mount */}
      {loading && <InfinityLoader duration={2200} onDone={() => setLoading(false)} />}

      {/* Hero Video Section */}
      <section id="home" className={`hero-video-section ${!loading ? 'bg-video-visible' : ''}`}>
        <video
          ref={videoRef}
          src={videoSrc}
          className="bg-video"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>

      {/* About Section */}
      {!loading && <AboutSection />}

      {/* Services Section */}
      {!loading && <ServicesSection />}

      {/* Services Marquee Ticker */}
      {!loading && <MarqueeTicker />}

      {/* Client Feedback Testimonials */}
      {!loading && <TestimonialsSection />}

      {/* Founders Carousel */}
      {!loading && <FoundersSection />}

      {/* Footer */}
      {!loading && <Footer />}
    </div>
  )
}
