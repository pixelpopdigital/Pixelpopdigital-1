import { useState, useEffect, useRef } from 'react'
import {
  ArrowRight,
  X,
  TrendingUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
// @ts-expect-error - Carousel is a JSX component
import Carousel from '../components/viscose-carousel/Carousel'
import Footer from '../components/Footer'
import './WorkPage.css'

export interface CaseStudy {
  id: string
  client: string
  year: string
  category: string
  title: string
  shortDescription: string
  monogram: string
  logoImg?: string
  invertLogo?: boolean
  bgGradient: string
  highlightStat: string
  statLabel: string
  tags: string[]
  brandOverview: string
  contribution: string
  deliverables: string[]
  capabilities: string[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'hair-candy',
    client: 'Hair Candy Luxury Salon',
    year: '2024',
    category: 'Luxury Salon',
    title: 'Hair Candy Luxury Salon — Ashok Vihar',
    shortDescription:
      'Hair Candy is a luxury salon in Ashok Vihar, offering premium hair styling, beauty services, and bridal transformations for a style-conscious clientele.',
    monogram: 'HC',
    logoImg: '/logo-ashokvihar.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(212, 175, 55, 0.22) 0%, rgba(28, 24, 18, 0.92) 60%, #0a0a0a 100%)',
    highlightStat: '+240%',
    statLabel: 'VIP Salon Inquiries & Bookings',
    brandOverview:
      'Hair Candy is a luxury salon in Ashok Vihar, offering premium hair styling, beauty services, and bridal transformations for a style-conscious clientele.',
    contribution:
      'As their marketing partner, Pixelpop Digital focused on elevating Hair Candy’s digital presence through premium visual storytelling, engaging reels, and a cohesive luxury brand aesthetic designed to attract and engage the right audience.',
    deliverables: [
      'Social Media Management & Strategy',
      'Creative Content Production & Reels',
      'Brand Visual Identity & Art Direction',
      'Digital Marketing & Audience Engagement',
    ],
    capabilities: [
      'Luxury Branding',
      'Content Creation',
      'Social Media Strategy',
      'Creative Direction',
      'Digital Marketing',
    ],
    tags: [
      'Luxury Branding',
      'Content Creation',
      'Social Media Strategy',
      'Creative Direction',
      'Digital Marketing',
    ],
  },
  {
    id: 'detailing-street',
    client: 'Detailing Street',
    year: '2024',
    category: 'Automotive Detailing',
    title: 'Detailing Street — Pitampura',
    shortDescription:
      'Detailing Street is an automotive detailing brand in Pitampura, specializing in premium car care, Paint Protection Film (PPF), ceramic coating, and vehicle enhancement services.',
    monogram: 'DS',
    logoImg: '/logo-ds.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(200, 29, 29, 0.24) 0%, rgba(26, 18, 18, 0.92) 60%, #080808 100%)',
    highlightStat: '3.8x',
    statLabel: 'Supercar & Ceramic Bookings',
    brandOverview:
      'Detailing Street is an automotive detailing brand in Pitampura, specializing in premium car care, Paint Protection Film (PPF), ceramic coating, and vehicle enhancement services.',
    contribution:
      'Pixelpop Digital partnered with Detailing Street to strengthen its digital presence through premium automotive visuals, engaging reels, and strategic social media content that showcases the quality of its services and builds trust among car enthusiasts.',
    deliverables: [
      'Social Media Management & Strategy',
      'Automotive Reels & Video Production',
      'Creative Branding & Art Direction',
      'Service Promotion & Digital Campaigns',
    ],
    capabilities: [
      'Automotive Branding',
      'Content Creation',
      'Social Media Strategy',
      'Video Production',
      'Digital Marketing',
    ],
    tags: [
      'Automotive Branding',
      'Content Creation',
      'Social Media Strategy',
      'Video Production',
      'Digital Marketing',
    ],
  },
  {
    id: 'astro-kirti',
    client: 'Astrokriti',
    year: '2025',
    category: 'Numerology',
    title: 'Astrokriti — Numerology',
    shortDescription:
      'Astrokriti is a numerology-focused brand offering insights into numbers and their connection with personal growth, self-discovery, and life decisions.',
    monogram: 'AK',
    logoImg: '/logo-astrokirti.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(42, 114, 76, 0.26) 0%, rgba(18, 28, 22, 0.92) 60%, #080a08 100%)',
    highlightStat: '+310%',
    statLabel: 'Consultation Booking Surge',
    brandOverview:
      'Astrokriti is a numerology-focused brand offering insights into numbers and their connection with personal growth, self-discovery, and life decisions.',
    contribution:
      'Pixelpop Digital helps Astrokriti build a strong digital identity through educational content, engaging social media creatives, and strategic storytelling that makes numerology more accessible while building audience trust and brand awareness.',
    deliverables: [
      'Social Media Management & Strategy',
      'Educational Content & Reel Production',
      'Creative Design & Brand Communication',
      'Audience Engagement & Digital Growth',
    ],
    capabilities: [
      'Personal Branding',
      'Content Creation',
      'Social Media Strategy',
      'Creative Direction',
      'Digital Marketing',
    ],
    tags: [
      'Personal Branding',
      'Content Creation',
      'Social Media Strategy',
      'Creative Direction',
      'Digital Marketing',
    ],
  },
  {
    id: 'preeti-sethi',
    client: 'Preeti Sethi Designs',
    year: '2025',
    category: 'Interior Design',
    title: 'Preeti Sethi Designs — Interior Design',
    shortDescription:
      'Preeti Sethi Designs is an interior design brand focused on creating thoughtfully designed, elegant spaces that blend functionality with refined aesthetics.',
    monogram: 'PS',
    logoImg: '/logo-preetisethi.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(180, 140, 200, 0.22) 0%, rgba(22, 18, 28, 0.92) 60%, #0a0a0a 100%)',
    highlightStat: '+320%',
    statLabel: 'Profile Reach & Engagement',
    brandOverview:
      'Preeti Sethi Designs is an interior design brand focused on creating thoughtfully designed, elegant spaces that blend functionality with refined aesthetics.',
    contribution:
      'Pixelpop Digital partnered with Preeti Sethi Designs to elevate its digital presence through visually compelling interior content, premium design-led creatives, and strategic social media storytelling that showcases the brand’s design philosophy and attracts potential clients.',
    deliverables: [
      'Social Media Management & Strategy',
      'Interior Photography & Reel Production',
      'Creative Content & Visual Storytelling',
      'Brand Positioning & Digital Marketing',
    ],
    capabilities: [
      'Luxury Branding',
      'Interior Content',
      'Social Media Strategy',
      'Art Direction',
      'Digital Marketing',
    ],
    tags: [
      'Luxury Branding',
      'Interior Content',
      'Social Media Strategy',
      'Art Direction',
      'Digital Marketing',
    ],
  },
  {
    id: 'rr-films',
    client: 'RR Films',
    year: '2025',
    category: 'Film & Video Production',
    title: 'RR Films — Film & Video Production',
    shortDescription:
      'RR Films is a film and video production brand focused on visual storytelling, bringing creative ideas to life through impactful cinematic content and production.',
    monogram: 'RR',
    logoImg: '/logo-rajatraj.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(220, 60, 40, 0.22) 0%, rgba(28, 16, 14, 0.92) 60%, #0a0808 100%)',
    highlightStat: '5M+',
    statLabel: 'Campaign Impressions',
    brandOverview:
      'RR Films is a film and video production brand focused on visual storytelling, bringing creative ideas to life through impactful cinematic content and production.',
    contribution:
      'Pixelpop Digital partnered with RR Films to strengthen its digital presence through engaging visual content, creative storytelling, and strategic social media communication that showcases its work and connects with a wider audience.',
    deliverables: [
      'Social Media Management & Strategy',
      'Creative Video Content & Reels',
      'Visual Storytelling & Art Direction',
      'Digital Branding & Audience Engagement',
    ],
    capabilities: [
      'Creative Branding',
      'Video Content',
      'Social Media Strategy',
      'Art Direction',
      'Digital Marketing',
    ],
    tags: [
      'Creative Branding',
      'Video Content',
      'Social Media Strategy',
      'Art Direction',
      'Digital Marketing',
    ],
  },
  {
    id: 'shyam-paints',
    client: 'Shyam Paints',
    year: '2025',
    category: 'Paints & Surface Solutions',
    title: 'Shyam Paints — Paints & Surface Solutions',
    shortDescription:
      'Shyam Paints is a paint and surface solutions brand catering to customers looking to enhance and transform their spaces with quality colours and finishes.',
    monogram: 'SP',
    logoImg: '/logo-shyampaints.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(255, 165, 0, 0.20) 0%, rgba(28, 22, 12, 0.92) 60%, #0a0800 100%)',
    highlightStat: '+180%',
    statLabel: 'Brand Recognition & Footfall',
    brandOverview:
      'Shyam Paints is a paint and surface solutions brand catering to customers looking to enhance and transform their spaces with quality colours and finishes.',
    contribution:
      'Pixelpop Digital partnered with Shyam Paints to build a stronger digital presence through engaging product-focused content, creative promotional campaigns, and strategic social media communication designed to showcase its offerings and increase brand awareness.',
    deliverables: [
      'Social Media Management & Strategy',
      'Product-Focused Creative Content',
      'Promotional Reels & Campaigns',
      'Brand Communication & Digital Marketing',
    ],
    capabilities: [
      'Branding',
      'Content Creation',
      'Social Media Strategy',
      'Creative Direction',
      'Digital Marketing',
    ],
    tags: [
      'Branding',
      'Content Creation',
      'Social Media Strategy',
      'Creative Direction',
      'Digital Marketing',
    ],
  },
  {
    id: 'sibling-spaces',
    client: 'Sibling Spaces',
    year: '2025',
    category: 'Real Estate & Interior Design',
    title: 'Sibling Spaces — Real Estate & Interior Design',
    shortDescription:
      'Sibling Spaces brings real estate and interior design together, helping transform properties into thoughtfully designed spaces that balance functionality, aesthetics, and modern living.',
    monogram: 'SS',
    logoImg: '/logo-siblingspaces.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(120, 180, 200, 0.20) 0%, rgba(14, 20, 26, 0.92) 60%, #080a0c 100%)',
    highlightStat: '+290%',
    statLabel: 'Qualified Buyer Inquiries',
    brandOverview:
      'Sibling Spaces brings real estate and interior design together, helping transform properties into thoughtfully designed spaces that balance functionality, aesthetics, and modern living.',
    contribution:
      'Pixelpop Digital partnered with Sibling Spaces to strengthen its digital identity through visually engaging property showcases, design-focused content, and strategic social media storytelling that highlights its expertise across real estate and interiors.',
    deliverables: [
      'Social Media Management & Strategy',
      'Property & Interior Showcase Reels',
      'Creative Content Production & Art Direction',
      'Brand Positioning & Digital Marketing',
    ],
    capabilities: [
      'Real Estate Branding',
      'Interior Content',
      'Social Media Strategy',
      'Visual Storytelling',
      'Digital Marketing',
    ],
    tags: [
      'Real Estate Branding',
      'Interior Content',
      'Social Media Strategy',
      'Visual Storytelling',
      'Digital Marketing',
    ],
  },
  {
    id: 'wsh-mouth',
    client: 'Wshmouth',
    year: '2025',
    category: 'Oral Care & Toothpaste',
    title: 'Wshmouth — Oral Care & Toothpaste',
    shortDescription:
      'Wshmouth is an oral care brand focused on teeth whitening and gum care, offering toothpaste solutions designed to support everyday dental hygiene and a confident smile.',
    monogram: 'WM',
    logoImg: '/logo-wshmouth.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(100, 200, 220, 0.20) 0%, rgba(12, 20, 24, 0.92) 60%, #080c0e 100%)',
    highlightStat: '+250%',
    statLabel: 'Online Brand Engagement',
    brandOverview:
      'Wshmouth is an oral care brand focused on teeth whitening and gum care, offering toothpaste solutions designed to support everyday dental hygiene and a confident smile.',
    contribution:
      'Pixelpop Digital partnered with Wshmouth to build a distinctive digital identity through bold product creatives, engaging social media content, and strategic brand storytelling that highlights product benefits and connects with modern consumers.',
    deliverables: [
      'Brand Identity & Visual Direction',
      'Product-Focused Creative Campaigns',
      'Social Media Content & Reels',
      'Digital Brand Awareness Strategy',
    ],
    capabilities: [
      'Product Branding',
      'Creative Direction',
      'Content Creation',
      'Social Media Strategy',
      'Digital Marketing',
    ],
    tags: [
      'Product Branding',
      'Creative Direction',
      'Content Creation',
      'Social Media Strategy',
      'Digital Marketing',
    ],
  },
  {
    id: 'drivenchy',
    client: 'Drivenchy',
    year: '2025',
    category: 'Automotive',
    title: 'Drivenchy — Automotive',
    shortDescription:
      'Drivenchy is an automotive brand built around a passion for cars, distinctive styling, and automotive culture, catering to enthusiasts who appreciate performance, aesthetics, and individuality.',
    monogram: 'DV',
    logoImg: '/logo-drivenchy.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(220, 24, 24, 0.22) 0%, rgba(26, 12, 12, 0.92) 60%, #080606 100%)',
    highlightStat: '+280%',
    statLabel: 'Custom Build Inquiries',
    brandOverview:
      'Drivenchy is an automotive brand built around a passion for cars, distinctive styling, and automotive culture, catering to enthusiasts who appreciate performance, aesthetics, and individuality.',
    contribution:
      'Pixelpop Digital partnered with Drivenchy to strengthen its digital presence through bold automotive visuals, engaging reels, and creative storytelling that captures the brand’s identity and connects with car enthusiasts.',
    deliverables: [
      'Social Media Management & Strategy',
      'Automotive Photography & Reel Production',
      'Creative Content & Visual Storytelling',
      'Brand Positioning & Digital Campaigns',
    ],
    capabilities: [
      'Automotive Branding',
      'Content Creation',
      'Social Media Strategy',
      'Art Direction',
      'Digital Marketing',
    ],
    tags: [
      'Automotive Branding',
      'Content Creation',
      'Social Media Strategy',
      'Art Direction',
      'Digital Marketing',
    ],
  },
  {
    id: 'elite-fitness',
    client: 'Eliter Fitness Club',
    year: '2025',
    category: 'Fitness & Wellness',
    title: 'Eliter Fitness Club — Fitness & Wellness',
    shortDescription:
      'Eliter Fitness Club is a fitness and wellness brand dedicated to helping individuals build strength, improve endurance, and embrace a healthier, more active lifestyle.',
    monogram: 'EF',
    logoImg: '/logo-elitefitness.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(220, 50, 30, 0.22) 0%, rgba(26, 14, 12, 0.92) 60%, #0a0606 100%)',
    highlightStat: '+200%',
    statLabel: 'Membership Inquiries',
    brandOverview:
      'Eliter Fitness Club is a fitness and wellness brand dedicated to helping individuals build strength, improve endurance, and embrace a healthier, more active lifestyle.',
    contribution:
      'Pixelpop Digital partnered with Eliter Fitness Club to build a stronger digital presence through high-energy fitness content, engaging reels, and strategic social media communication that showcases the club’s atmosphere, motivates its audience, and attracts potential members.',
    deliverables: [
      'Social Media Management & Strategy',
      'Fitness Reels & Video Production',
      'Promotional Creatives & Campaigns',
      'Brand Communication & Audience Engagement',
    ],
    capabilities: [
      'Fitness Branding',
      'Content Creation',
      'Social Media Strategy',
      'Creative Direction',
      'Digital Marketing',
    ],
    tags: [
      'Fitness Branding',
      'Content Creation',
      'Social Media Strategy',
      'Creative Direction',
      'Digital Marketing',
    ],
  },
]

export default function WorkPage() {
  const [activeModalProject, setActiveModalProject] = useState<CaseStudy | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Close modal on ESC key and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null)
      }
    }

    if (activeModalProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeModalProject])

  // Staggered scroll-triggered fade-in animation using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="work-page-container">
      {/* Viscose Carousel Hero */}
      <section className="carousel-hero-section">
        <Carousel />
        <button
          type="button"
          className="carousel-scroll-cue carousel-scroll-cue--glass"
          onClick={() => {
            const target = document.getElementById('case-studies')
            if (target) target.scrollIntoView({ behavior: 'smooth' })
          }}
          aria-label="Scroll to case studies"
        >
          <span className="carousel-scroll-cue-text">Ideas Into Impact</span>
          <ChevronDown size={18} strokeWidth={1.8} />
        </button>
      </section>

      <div className="work-bg-ambient" />

      <div id="case-studies" className="work-content-wrapper">
        {/* Header Hero */}
        <div className="work-hero-header">
          <div className="work-eyebrow-badge">
            <span className="work-eyebrow-dot" />
            Selected Portfolio & Case Studies
          </div>

          <h1 className="work-hero-title">
            Crafting ideas that become <em>impossible to ignore.</em>
          </h1>

          <p className="work-hero-subcopy">
            A curated showcase of defining projects across branding, high-velocity acquisition,
            bespoke digital architecture, and cinematic production.
          </p>
        </div>

        {/* Brand Metrics Strip */}
        <div className="work-metrics-strip">
          <div className="work-metric-item">
            <div className="work-metric-number">100%</div>
            <div className="work-metric-label">Founder-Led Projects</div>
          </div>
          <div className="work-metric-item">
            <div className="work-metric-number">24hr</div>
            <div className="work-metric-label">Average Response Time</div>
          </div>
          <div className="work-metric-item">
            <div className="work-metric-number">1-on-1</div>
            <div className="work-metric-label">Dedicated Attention per Client</div>
          </div>
          <div className="work-metric-item">
            <div className="work-metric-number">Unlimited</div>
            <div className="work-metric-label">Revisions Until You Love It</div>
          </div>
        </div>


        {/* All Projects Grid */}
        <div className="work-grid">
          {CASE_STUDIES.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[idx] = el }}
              className="work-card"
              style={{ animationDelay: `${(idx % 3) * 120}ms` }}
              onClick={() => setActiveModalProject(project)}
            >
              <div className="work-card-visual">
                <div
                  className="work-card-bg-gradient"
                  style={{ background: project.bgGradient }}
                />
                <div className="work-card-grid-pattern" />
                <div className="work-card-noise-layer" />

                <div className="work-card-category-pill">{project.category}</div>
                <div className="work-card-stat-pill">
                  <TrendingUp size={13} color="#E8DCC8" />
                  <span>{project.highlightStat}</span>
                </div>

                <div className="work-card-center-art">
                  {project.logoImg ? (
                    <img
                      src={project.logoImg}
                      alt={project.client + ' logo'}
                      className="work-card-brand-logo"
                      style={project.invertLogo ? { filter: 'invert(1) brightness(0.92) drop-shadow(0 4px 16px rgba(0,0,0,0.5))' } : undefined}
                    />
                  ) : (
                    <div className="work-card-monogram">{project.monogram}</div>
                  )}
                </div>
              </div>

              <div className="work-card-body">
                <div>
                  <div className="work-card-client-row">
                    <span className="work-card-client-name">{project.client}</span>
                    <span className="work-card-year">{project.year}</span>
                  </div>
                  <h2 className="work-card-title">{project.title}</h2>
                  <p className="work-card-description">{project.shortDescription}</p>
                </div>

                <div className="work-card-footer">
                  <div className="work-card-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="work-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="work-card-action">
                    Explore Case Study <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Work CTA Banner */}
        <div className="work-cta-banner">
          <div className="work-cta-badge">
            <Sparkles size={14} /> Next Project Sprint
          </div>
          <h2 className="work-cta-title">Ready to build something unforgettable?</h2>
          <p className="work-cta-subtext">
            Whether launching a category-defining brand or scaling your existing reach, our founder-led team is
            ready to make it extraordinary.
          </p>
          <a
            href="#contact"
            className="work-cta-button"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Start a Conversation <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Case Study Detail Modal (Click to Expand) */}
      {activeModalProject && (
        <div
          className={`case-modal-overlay ${activeModalProject ? 'open' : ''}`}
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-title"
        >
          <div
            className="case-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="case-modal-close-btn"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close case study details"
            >
              <X size={18} />
            </button>

            <div
              className="case-modal-hero"
              style={{ background: activeModalProject.bgGradient }}
            >
              <div className="case-modal-hero-top">
                <div style={{ flex: 1 }}>
                  <div className="case-modal-eyebrow">
                    {activeModalProject.client} &bull; {activeModalProject.category} &bull; {activeModalProject.year}
                  </div>
                  <h2 id="modal-case-title" className="case-modal-title">{activeModalProject.title}</h2>
                </div>
                {activeModalProject.logoImg && (
                  <div className="case-modal-logo-badge">
                    <img
                      src={activeModalProject.logoImg}
                      alt={activeModalProject.client + ' logo'}
                      className="case-modal-brand-logo"
                    />
                  </div>
                )}
              </div>

              <div className="case-modal-stats-row">
                <div className="case-modal-stat-box">
                  <div className="case-modal-stat-val">{activeModalProject.highlightStat}</div>
                  <div className="case-modal-stat-lbl">{activeModalProject.statLabel}</div>
                </div>
              </div>
            </div>

            <div className="case-modal-body">
              <div className="case-modal-main-col">
                <div className="case-modal-section-title">Brand Overview</div>
                <p className="case-modal-text">{activeModalProject.brandOverview}</p>

                <div className="case-modal-section-title">Our Contribution</div>
                <p className="case-modal-text">{activeModalProject.contribution}</p>
              </div>

              <div className="case-modal-side-col">
                <div className="case-modal-section-title">Key Deliverables</div>
                <ul className="case-modal-deliverables-list">
                  {activeModalProject.deliverables.map((item, idx) => (
                    <li key={idx} className="case-modal-deliverable-item">
                      <span className="case-modal-deliverable-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="case-modal-tags-box">
                  <div className="case-modal-section-title" style={{ marginTop: '24px' }}>Capabilities</div>
                  <div className="case-modal-tags-flex">
                    {activeModalProject.capabilities.map((tag) => (
                      <span key={tag} className="case-modal-tag-item">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  )
}


