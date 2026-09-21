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

    video.muted = false
    video.volume = 1.0

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
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
      <section id="home" className={`hero-video-section ${!loading ? 'bg-video-visible' : ''}`}>
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
    </div>
  )
}
