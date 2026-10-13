import { useEffect, useState, useRef, type MouseEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Mail, Phone, X } from 'lucide-react'

interface NavbarProps {
  visible?: boolean
}

export default function Navbar({ visible = true }: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeNav, setActiveNav] = useState('Home')
  const [contactOpen, setContactOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const isWorkPage = location.pathname === '/work'
  const navItems = ['Home', 'Services', 'Work', 'About', 'Contact']

  // Close popup on outside click
  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setContactOpen(false)
      }
    }
    if (contactOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [contactOpen])

  // Update active state based on route
  useEffect(() => {
    if (isWorkPage) {
      setActiveNav('Work')
      return
    }

    // Scrollspy for Home page sections
    const sectionIds = ['home', 'about', 'services', 'work', 'contact']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPosition) {
          const matched = navItems.find((item) => item.toLowerCase() === sectionIds[i])
          if (matched) {
            setActiveNav(matched)
          }
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isWorkPage])

  const handleNavClick = (e: MouseEvent, item: string) => {
    e.preventDefault()

    if (item === 'Contact') {
      setContactOpen(prev => !prev)
      return
    }

    if (item === 'Work') {
      if (isWorkPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/work')
      }
      return
    }

    const sectionId = item.toLowerCase()
    if (isWorkPage) {
      navigate(`/#${sectionId}`)
      setTimeout(() => {
        const target = document.getElementById(sectionId)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    } else {
      setActiveNav(item)
      const target = document.getElementById(sectionId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <style>{`
        .contact-popup-anchor {
          position: relative;
        }
        .contact-popup {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          background: #111110;
          border: 1px solid rgba(232,220,200,0.12);
          border-radius: 18px;
          padding: 24px 28px;
          min-width: 260px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03);
          z-index: 9999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
        }
        .contact-popup.open {
          opacity: 1;
          pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }
        .contact-popup-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(232,220,200,0.06);
          border: none;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(232,220,200,0.45);
          transition: background 0.2s, color 0.2s;
        }
        .contact-popup-close:hover {
          background: rgba(232,220,200,0.12);
          color: #E8DCC8;
        }
        .contact-popup-label {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(232,220,200,0.3);
          margin-bottom: 18px;
        }
        .contact-popup-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(232,220,200,0.06);
          text-decoration: none;
          transition: gap 0.2s ease;
        }
        .contact-popup-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .contact-popup-item:first-of-type {
          padding-top: 0;
        }
        .contact-popup-item:hover {
          gap: 16px;
        }
        .contact-popup-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(232,220,200,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #E8DCC8;
          transition: background 0.2s;
        }
        .contact-popup-item:hover .contact-popup-icon {
          background: rgba(232,220,200,0.12);
        }
        .contact-popup-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .contact-popup-type {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 10px;
          color: rgba(232,220,200,0.35);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .contact-popup-value {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #E8DCC8;
          letter-spacing: -0.01em;
        }
      `}</style>

      <nav className={`top-docked-nav ${visible ? 'nav-visible' : ''}`}>
        <div className="docked-nav-container">
          <div className="docked-nav-links">
            {navItems.map((item) =>
              item === 'Contact' ? (
                <div key={item} className="contact-popup-anchor" ref={popupRef}>
                  <a
                    href="#contact"
                    className={`docked-nav-link ${activeNav.toLowerCase() === 'contact' ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item}
                  </a>

                  <div className={`contact-popup ${contactOpen ? 'open' : ''}`}>
                    <button
                      className="contact-popup-close"
                      onClick={() => setContactOpen(false)}
                      aria-label="Close"
                    >
                      <X size={12} />
                    </button>

                    <p className="contact-popup-label">Get in touch</p>

                    <a
                      href="mailto:hello@pixelpopdigital.com"
                      className="contact-popup-item"
                    >
                      <div className="contact-popup-icon">
                        <Mail size={15} />
                      </div>
                      <div className="contact-popup-text">
                        <span className="contact-popup-type">Email</span>
                        <span className="contact-popup-value">hello@pixelpopdigital.com</span>
                      </div>
                    </a>

                    <a
                      href="tel:+919810267738"
                      className="contact-popup-item"
                    >
                      <div className="contact-popup-icon">
                        <Phone size={15} />
                      </div>
                      <div className="contact-popup-text">
                        <span className="contact-popup-type">Phone</span>
                        <span className="contact-popup-value">+91 98102 67738</span>
                      </div>
                    </a>

                    <a
                      href="tel:+917292065202"
                      className="contact-popup-item"
                    >
                      <div className="contact-popup-icon">
                        <Phone size={15} />
                      </div>
                      <div className="contact-popup-text">
                        <span className="contact-popup-type">Phone</span>
                        <span className="contact-popup-value">+91 72920 65202</span>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                <a
                  key={item}
                  href={item === 'Work' ? '/work' : `/#${item.toLowerCase()}`}
                  className={`docked-nav-link ${
                    activeNav.toLowerCase() === item.toLowerCase() ? 'active' : ''
                  }`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item}
                </a>
              )
            )}
          </div>

          <a
            href="https://forms.gle/NSNfKBNK6jVb6o917"
            target="_blank"
            rel="noopener noreferrer"
            className="docked-cta-btn"
          >
            <span>Let's Talk</span>
            <span className="cta-arrow">→</span>
          </a>
        </div>
      </nav>
    </>
  )
}
