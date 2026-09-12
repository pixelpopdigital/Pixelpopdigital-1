import React from 'react'

const SERVICES = [
  'BRANDING',
  'SOCIAL STRATEGY',
  'CAMPAIGNS',
  'CONTENT',
  'DIGITAL',
  'MOTION',
  'ADVERTISING',
  'PR',
]

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    background: '#0A0A0A',
    padding: '48px 0',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 10,
  },
  band: {
    background: '#C81D1D',
    transform: 'rotate(-1deg)',
    borderTop: '3px solid #0A0A0A',
    borderBottom: '3px solid #0A0A0A',
    overflow: 'hidden',
    width: '104%',
    marginLeft: '-2%',
  },
  track: {
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    padding: '18px 0',
    willChange: 'transform',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  word: {
    fontFamily:
      "'Archivo Black', 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 900,
    fontSize: 'clamp(28px, 4vw, 56px)',
    letterSpacing: '-0.02em',
    color: '#0A0A0A',
    padding: '0 28px',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  },
  marker: {
    width: '12px',
    height: '12px',
    background: '#0A0A0A',
    flexShrink: 0,
    transform: 'rotate(45deg)',
  },
}

export default function MarqueeTicker() {
  // Duplicate the list so the scroll loops seamlessly
  const track = [...SERVICES, ...SERVICES]

  return (
    <div style={styles.wrap}>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 22s linear infinite;
        }
        .ticker-band:hover .ticker-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>

      <div className="ticker-band" style={styles.band}>
        <div className="ticker-track" style={styles.track}>
          {track.map((word, i) => (
            <span key={i} style={styles.item}>
              <span style={styles.word}>{word}</span>
              <span style={styles.marker} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
