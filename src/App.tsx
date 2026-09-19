import { useState, useRef, useEffect } from 'react'
import InfinityLoader from './components/InfinityLoader'
import MarqueeTicker from './components/MarqueeTicker'
import TestimonialsSection from './components/TestimonialsSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import Footer from './components/Footer'
import videoSrc from './assets/feature-video.mp4'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [activeNav, setActiveNav] = useState('Home')
  const videoRef = useRef<HTMLVideoElement>(null)

  const navItems = ['Home', 'Services', 'Work', 'About', 'Contact']

  useEffect(() => {
    if (loading) return

    const video = videoRef.current
    if (!video) return

    // Attempt to unmute and play with sound directly
    video.muted = false
    video.volume = 1.0

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If browser autoplay policy blocks unmuted audio without gesture,
        // start muted first, then unmute on first scroll/gesture
        video.muted = true
        video.play().catch(() => {})

        const enableAudioOnInteraction = () => {
          if (videoRef.current) {
            videoRef.current.muted = false
            videoRef.current.volume = 1.0
            videoRef.current.play().catch(() => {})
          }
          window.removeEventListener('wheel', enableAudioOnInteraction)
          window.removeEventListener('scroll', enableAudioOnInteraction)
          window.removeEventListener('pointerdown', enableAudioOnInteraction)
          window.removeEventListener('keydown', enableAudioOnInteraction)
          window.removeEventListener('touchstart', enableAudioOnInteraction)
        }

        window.addEventListener('wheel', enableAudioOnInteraction, { passive: true })
        window.addEventListener('scroll', enableAudioOnInteraction, { passive: true })
        window.addEventListener('pointerdown', enableAudioOnInteraction, { passive: true })
        window.addEventListener('keydown', enableAudioOnInteraction, { passive: true })
        window.addEventListener('touchstart', enableAudioOnInteraction, { passive: true })
      })
    }

    // Unmute when user scrolls/is on this screen
    const handleScrollOrWheel = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false
        videoRef.current.volume = 1.0
      }
    }

    window.addEventListener('scroll', handleScrollOrWheel, { passive: true })
    window.addEventListener('wheel', handleScrollOrWheel, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScrollOrWheel)
      window.removeEventListener('wheel', handleScrollOrWheel)
    }
  }, [loading])

  return (
    <div className="agency-viewport">
      {/* Infinity Loader on initial mount */}
      {loading && <InfinityLoader duration={2200} onDone={() => setLoading(false)} />}

      {/* Hero Video Section */}
      <section className={`hero-video-section ${!loading ? 'bg-video-visible' : ''}`}>
        <video
          ref={videoRef}
          src={videoSrc}
          className="bg-video"
          autoPlay
          loop
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

      {/* Footer */}
      {!loading && <Footer />}

      {/* Top Docked Pill Navbar */}
      <nav className={`top-docked-nav ${!loading ? 'nav-visible' : ''}`}>
        <div className="docked-nav-container">
          <div className="docked-nav-links">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`docked-nav-link ${activeNav === item ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveNav(item)
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <a href="#contact" className="docked-cta-btn">
            <span>Let's Talk</span>
            <span className="cta-arrow">→</span>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default App
