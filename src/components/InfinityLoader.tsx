import { useEffect, useState } from 'react'
import './InfinityLoader.css'

interface InfinityLoaderProps {
  /** Duration in ms before the loader fades out. Default: 2200 */
  duration?: number
  onDone?: () => void
}

export default function InfinityLoader({ duration = 2200, onDone }: InfinityLoaderProps) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), duration)
    const doneTimer = setTimeout(() => onDone?.(), duration + 600)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [duration, onDone])

  return (
    <div className={`il-overlay${fading ? ' il-overlay--fade' : ''}`}>
      <div className="il-wrap">
        <div className="il-ambient" />

        <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" className="il-svg">
          <defs>
            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#4dd8ff" />
              <stop offset="50%"  stopColor="#ffffff" />
              <stop offset="100%" stopColor="#7c5cff" />
            </linearGradient>
          </defs>

          {/* faint full track */}
          <path
            className="il-path il-track"
            d="M 75,75
               C 75,45 105,25 135,45
               C 155,58 165,92 185,105
               C 215,125 245,105 245,75
               C 245,45 215,25 185,45
               C 165,58 155,92 135,105
               C 105,125 75,105 75,75 Z"
          />

          {/* animated glowing runner */}
          <path
            className="il-path il-runner"
            d="M 75,75
               C 75,45 105,25 135,45
               C 155,58 165,92 185,105
               C 215,125 245,105 245,75
               C 245,45 215,25 185,45
               C 165,58 155,92 135,105
               C 105,125 75,105 75,75 Z"
          />
        </svg>

        <div className="il-label">Loading</div>
      </div>
    </div>
  )
}
