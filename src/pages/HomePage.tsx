import { useRef, useEffect } from 'react'
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

function FoundersSection() {
  return (
    <section id="founders" style={{ background: '#0A0A0A' }}>
      <style>{`
        .fc-section {
          background: #0A0A0A;
          padding: 100px 72px;
        }
        .fc-eyebrow {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(232,220,200,0.35);
          margin-bottom: 20px;
        }
        .fc-heading {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(32px, 4.5vw, 60px);
          line-height: 1.1;
          color: #E8DCC8;
          letter-spacing: -0.02em;
          margin: 0 0 64px 0;
        }
        .fc-card {
          background: rgba(232,220,200,0.03);
          border: 1px solid rgba(232,220,200,0.08);
          border-radius: 28px;
          padding: 64px 72px;
          display: flex;
          justify-content: center;
          gap: 100px;
        }
        .fc-founder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .fc-avatar {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(232,220,200,0.15);
          box-shadow: 0 0 0 8px rgba(232,220,200,0.04), 0 24px 70px rgba(0,0,0,0.55);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .fc-avatar:hover {
          transform: scale(1.04);
          box-shadow: 0 0 0 14px rgba(232,220,200,0.07), 0 32px 80px rgba(0,0,0,0.65);
        }
        .fc-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .fc-founder-name {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #E8DCC8;
          letter-spacing: -0.01em;
          text-align: center;
        }
        .fc-founder-role {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 12px;
          color: rgba(232,220,200,0.38);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-align: center;
          margin-top: -14px;
        }
        @media (max-width: 700px) {
          .fc-section { padding: 72px 28px; }
          .fc-card {
            flex-direction: column;
            padding: 48px 32px;
            gap: 56px;
            align-items: center;
          }
          .fc-avatar { width: 180px; height: 180px; }
        }
      `}</style>

      <div className="fc-section">
        <p className="fc-eyebrow">The people behind it</p>
        <h2 className="fc-heading">Meet our founders.</h2>

        <div className="fc-card">
          <div className="fc-founder">
            <div className="fc-avatar">
              <img src="/naman.png" alt="Naman" />
            </div>
            <span className="fc-founder-name">Naman</span>
            <span className="fc-founder-role">Director</span>
          </div>
          <div className="fc-founder">
            <div className="fc-avatar">
              <img src="/guneesh.png" alt="Guneesh" />
            </div>
            <span className="fc-founder-name">Guneesh</span>
            <span className="fc-founder-role">Director</span>
          </div>
        </div>
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

      {/* Founders Card */}
      {!loading && <FoundersSection />}

      {/* Footer */}
      {!loading && <Footer />}
    </div>
  )
}
