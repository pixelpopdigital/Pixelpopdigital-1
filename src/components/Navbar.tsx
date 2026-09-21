import { useEffect, useState, type MouseEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavbarProps {
  visible?: boolean
}

export default function Navbar({ visible = true }: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeNav, setActiveNav] = useState('Home')

  const isWorkPage = location.pathname === '/work'
  const navItems = ['Home', 'Services', 'Work', 'About', 'Contact']

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
      // Navigate to home and pass target section
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

  const handleContactClick = (e: MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('contact')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#contact')
      setTimeout(() => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav className={`top-docked-nav ${visible ? 'nav-visible' : ''}`}>
      <div className="docked-nav-container">
        <div className="docked-nav-links">
          {navItems.map((item) => (
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
          ))}
        </div>

        <a href="#contact" className="docked-cta-btn" onClick={handleContactClick}>
          <span>Let's Talk</span>
          <span className="cta-arrow">→</span>
        </a>
      </div>
    </nav>
  )
}
