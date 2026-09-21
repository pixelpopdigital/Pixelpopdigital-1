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
    <div className="agency-viewport">
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

      {/* Footer */}
      {!loading && <Footer />}
    </div>
  )
}
