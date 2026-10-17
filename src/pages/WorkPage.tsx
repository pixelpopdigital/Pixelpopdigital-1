import { useState, useEffect, useRef } from 'react'
import {
  ArrowRight,
  X,
  TrendingUp,
  CheckCircle2,
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
  challenge: string
  solution: string
  results: string[]
  quote: {
    text: string
    author: string
    role: string
  }
  deliverables: string[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'hair-candy',
    client: 'Hair Candy Luxury Salon',
    year: '2024',
    category: 'Branding & Social',
    title: "Hair Candy Ashok Vihar: Engineering Delhi's Defining Luxury Salon Identity",
    shortDescription:
      'Opulent visual identity, bespoke champagne gold brand architecture, and viral social content engines elevating Hair Candy Ashok Vihar into a premier beauty destination.',
    monogram: 'HC',
    logoImg: '/logo-ashokvihar.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(212, 175, 55, 0.22) 0%, rgba(28, 24, 18, 0.92) 60%, #0a0a0a 100%)',
    highlightStat: '+240%',
    statLabel: 'VIP Salon Inquiries & Bookings',
    tags: ['Luxury Branding', 'Content Engine', 'Social Strategy', 'Art Direction'],
    challenge:
      'Standing out in a competitive luxury salon market in Ashok Vihar requires an unmistakable visual signature and social content that exudes effortless prestige.',
    solution:
      'We forged an editorial identity featuring bespoke luxury typography, high-contrast hair transformation reels, and a VIP experiential salon aesthetic.',
    results: [
      '+240% increase in weekly VIP appointments and bridal bookings',
      'Over 3.4M organic video views across regional beauty audiences',
      'Cemented Hair Candy as the benchmark luxury salon in Ashok Vihar',
    ],
    quote: {
      text: 'Pixelpop brought an authentic haute-couture energy to Hair Candy. Our clientele immediately connected with the new aesthetic.',
      author: 'Creative Director',
      role: 'Hair Candy Luxury Salon (Ashok Vihar)',
    },
    deliverables: [
      'Comprehensive Brand Identity & Guidelines',
      'High-Fashion Video Production & Reels',
      'In-Salon Luxury Menu & Printed Collateral',
      'Targeted Digital Booking Launch Campaign',
    ],
  },
  {
    id: 'detailing-street',
    client: 'Detailing Street',
    year: '2024',
    category: 'Motion & Acquisition',
    title: 'Precision in Motion: Scaling High-Performance Automotive Aesthetics DTC',
    shortDescription:
      'High-octane visual identity, 4K macro ceramic coating reels, and customer acquisition engine scaling Detailing Street into full studio booking capacity.',
    monogram: 'DS',
    logoImg: '/logo-ds.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(200, 29, 29, 0.24) 0%, rgba(26, 18, 18, 0.92) 60%, #080808 100%)',
    highlightStat: '3.8x',
    statLabel: 'Supercar & Ceramic Bookings',
    tags: ['Automotive Branding', 'Cinematic Motion', 'Lead Acquisition', 'Social Growth'],
    challenge:
      'Supercar and luxury vehicle owners require absolute trust and technical transparency before committing to paint protection and ceramic treatments.',
    solution:
      'We captured cinema-grade 4K macro footage of hydrophobic water sheeting and paint correction, packaged in an authoritative high-velocity brand identity.',
    results: [
      '3.8x increase in inbound ceramic coating & PPF inquiries',
      '4.8M organic views across automotive detailing reels',
      'Studio booked out 6 weeks in advance consistently',
    ],
    quote: {
      text: 'The sheer visual craft Pixelpop delivered established immediate credibility with exotic car collectors and enthusiasts.',
      author: 'Studio Director',
      role: 'Detailing Street',
    },
    deliverables: [
      'Shield & Wing Automotive Logomark Suite',
      'Macro 4K Video Production & Viral Reels',
      'High-Converting Studio Booking Funnels',
      'Targeted Enthusiast Paid Media Strategy',
    ],
  },
  {
    id: 'astro-kirti',
    client: 'Astro Kirti',
    year: '2025',
    category: 'Digital & Growth',
    title: 'Cosmic Wisdom Reimagined: Sacred Astrology Meets Modern Digital Resonance',
    shortDescription:
      'Celestial visual identity, sacred geometry digital art, daily horoscope reels, and personalized consultation funnel for Astro Kirti.',
    monogram: 'AK',
    logoImg: '/logo-astrokirti.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(42, 114, 76, 0.26) 0%, rgba(18, 28, 22, 0.92) 60%, #080a08 100%)',
    highlightStat: '+310%',
    statLabel: 'Consultation Booking Surge',
    tags: ['Digital Identity', 'Sacred Design', 'Community Growth', 'Consultation Funnel'],
    challenge:
      'Online astrological guidance often struggles to balance sacred ancient authenticity with an approachable, contemporary visual standard.',
    solution:
      'We crafted a deep emerald and celestial gold visual world, combining sacred zodiac iconography, episodic transit videos, and automated booking funnels.',
    results: [
      '+310% surge in one-on-one astrological consultations',
      'Built a devoted community of 180K+ engaged cosmic followers',
      'Over 5.6M organic views on weekly planetary transit forecasts',
    ],
    quote: {
      text: 'Pixelpop Digital elevated our sacred astrological craft into a modern, beautifully respected digital presence.',
      author: 'Kirti',
      role: 'Founder & Astrologer, Astro Kirti',
    },
    deliverables: [
      'Sacred Zodiac Visual Identity & Sacred Emblem',
      'Episodic Planetary Transit Reels & Stories',
      'Seamless 1-on-1 Consultation Booking Experience',
      'Custom Astrological Chart Templates',
    ],
  },
  {
    id: 'preeti-sethi',
    client: 'Preeti Sethi',
    year: '2025',
    category: 'Brand Identity',
    title: 'Crafting a Timeless Personal Brand for a Visionary Leader',
    shortDescription:
      'Bespoke personal brand identity, professional content strategy, and digital presence building for Preeti Sethi — establishing authority and authentic connection.',
    monogram: 'PS',
    logoImg: '/logo-preetisethi.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(180, 140, 200, 0.22) 0%, rgba(22, 18, 28, 0.92) 60%, #0a0a0a 100%)',
    highlightStat: '+320%',
    statLabel: 'Profile Reach & Engagement',
    tags: ['Personal Branding', 'Content Strategy', 'Art Direction'],
    challenge:
      'Building a distinctive personal brand that authentically represents expertise while resonating with a broad professional and lifestyle audience.',
    solution:
      'We crafted a refined personal brand system - elegant typography, curated visual palette, and a storytelling content framework that elevated Preeti Sethi\'s digital presence.',
    results: [
      '+320% increase in profile reach within the first quarter',
      'Established authoritative thought-leadership presence across platforms',
      'Consistent high-engagement content resulting in partnerships and collaborations',
    ],
    quote: {
      text: 'Pixelpop Digital truly understood my vision and translated it into a brand that feels completely authentic to who I am.',
      author: 'Preeti Sethi',
      role: 'Founder & Creative Director',
    },
    deliverables: [
      'Personal Brand Identity & Visual System',
      'Content Strategy & Monthly Calendar',
      'Professional Photography Direction',
      'Social Media Templates & Brand Guidelines',
    ],
  },
  {
    id: 'rr-films',
    client: 'RR Films',
    year: '2025',
    category: 'Film & TV Productions',
    title: 'Building a Cinematic Identity for the Next Era of Indian Film',
    shortDescription:
      'Bold production house identity, cinematic social presence, and compelling promotional campaigns that position RR Films at the forefront of Indian entertainment.',
    monogram: 'RR',
    logoImg: '/logo-rajatraj.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(220, 60, 40, 0.22) 0%, rgba(28, 16, 14, 0.92) 60%, #0a0808 100%)',
    highlightStat: '5M+',
    statLabel: 'Campaign Impressions',
    tags: ['Production Branding', 'Motion Design', 'Social Campaigns'],
    challenge:
      'Standing out in the competitive Indian film and TV production landscape requires a brand identity that commands respect while capturing popular cultural imagination.',
    solution:
      'We created a bold cinematic logomark, high-impact motion graphics for trailers and promos, and a cohesive social presence that drives anticipation and buzz.',
    results: [
      '5M+ organic campaign impressions on launch promotions',
      'Dramatic increase in brand recall and production house recognition',
      'Successfully positioned RR Films as a premier emerging production house',
    ],
    quote: {
      text: 'The branding Pixelpop crafted for us gave RR Films the gravitas and cinematic presence we always envisioned.',
      author: 'Rajat Raj',
      role: 'Founder, RR Films',
    },
    deliverables: [
      'Cinematic Production House Identity & Logomark',
      'Motion Graphics & Promo Templates',
      'Social Media Campaign Direction',
      'Theatrical Poster & Key Art Direction',
    ],
  },
  {
    id: 'shyam-paints',
    client: 'Shyam Paints',
    year: '2025',
    category: 'Logo Design',
    title: 'Reimagining a Legacy Paint Brand for the Modern Era',
    shortDescription:
      'Fresh logo identity and brand refresh that modernises Shyam Paints while honouring its trusted legacy — driving stronger customer recognition and retail presence.',
    monogram: 'SP',
    logoImg: '/logo-shyampaints.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(255, 165, 0, 0.20) 0%, rgba(28, 22, 12, 0.92) 60%, #0a0800 100%)',
    highlightStat: '+180%',
    statLabel: 'Brand Recognition & Footfall',
    tags: ['Logo Design', 'Brand Refresh', 'Retail Identity'],
    challenge:
      'Refreshing a trusted local brand without alienating loyal customers, while making a bold enough statement to attract a new generation of homeowners.',
    solution:
      'We designed a clean, confident new logomark with a vibrant modern palette — preserving brand heritage while projecting professionalism and quality.',
    results: [
      '+180% improvement in brand recognition in local market surveys',
      'Increased footfall at retail outlets following signage refresh',
      'Strengthened supplier and trade partnerships through elevated brand image',
    ],
    quote: {
      text: 'Our new logo and brand look has completely transformed how customers and partners perceive us.',
      author: 'Owner',
      role: 'Shyam Paints',
    },
    deliverables: [
      'Modern Logomark & Full Brand Identity',
      'Retail Signage & Shopfront Design',
      'Brand Guidelines Document',
      'Stationery & Packaging Templates',
    ],
  },
  {
    id: 'sibling-spaces',
    client: 'Sibling Spaces',
    year: '2025',
    category: 'Real Estate Branding',
    title: 'Positioning Sibling Spaces as the Defining Urban Real Estate Brand',
    shortDescription:
      'Premium real estate identity, elevated property marketing collateral, and digital campaigns that connect modern buyers with aspirational living.',
    monogram: 'SS',
    logoImg: '/logo-siblingspaces.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(120, 180, 200, 0.20) 0%, rgba(14, 20, 26, 0.92) 60%, #080a0c 100%)',
    highlightStat: '+290%',
    statLabel: 'Qualified Buyer Inquiries',
    tags: ['Real Estate Branding', 'Digital Campaigns', 'Property Marketing'],
    challenge:
      'Real estate buyers are inundated with generic property marketing. Sibling Spaces needed a brand that communicated lifestyle, trust, and investment value.',
    solution:
      'We developed a sophisticated brand identity — clean architectural typography, aspirational lifestyle imagery, and high-converting digital campaigns targeting modern urban buyers.',
    results: [
      '+290% increase in qualified buyer inquiries',
      'Established Sibling Spaces as a premium brand in the urban real estate market',
      'High-impact property launch campaigns sold out units ahead of schedule',
    ],
    quote: {
      text: 'Pixelpop gave Sibling Spaces a brand identity that truly speaks to today\'s discerning property buyers.',
      author: 'Founding Partner',
      role: 'Sibling Spaces',
    },
    deliverables: [
      'Real Estate Brand Identity & Guidelines',
      'Property Launch Campaign Design',
      'Digital & Print Marketing Collateral',
      'Social Media Templates & Strategy',
    ],
  },
  {
    id: 'wsh-mouth',
    client: 'WSH Mouth',
    year: '2025',
    category: 'Brand Identity',
    title: 'A Bold New Identity for the Future of Oral Care',
    shortDescription:
      'Clean, clinical-yet-approachable brand identity and digital presence for WSH Mouth — making premium oral care feel aspirational and accessible.',
    monogram: 'WM',
    logoImg: '/logo-wshmouth.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(100, 200, 220, 0.20) 0%, rgba(12, 20, 24, 0.92) 60%, #080c0e 100%)',
    highlightStat: '+250%',
    statLabel: 'Online Brand Engagement',
    tags: ['Brand Identity', 'Health & Wellness', 'Digital Presence'],
    challenge:
      'The oral care market is dominated by clinical, sterile aesthetics. WSH Mouth needed a brand that felt premium, modern, and genuinely inviting.',
    solution:
      'We created a fresh, confident brand identity — clean design language, a sophisticated palette, and an engaging social presence that makes oral care feel like self-care.',
    results: [
      '+250% increase in social media engagement post-launch',
      'Built a loyal community around premium oral wellness',
      'Strong retail and influencer partnership interest driven by brand appeal',
    ],
    quote: {
      text: 'Pixelpop transformed WSH Mouth from a product into a brand people genuinely love and talk about.',
      author: 'Founder',
      role: 'WSH Mouth',
    },
    deliverables: [
      'Complete Brand Identity & Logo System',
      'Product Packaging Design',
      'Social Media Strategy & Templates',
      'Brand Launch Campaign Direction',
    ],
  },
  {
    id: 'drivenchy',
    client: 'Drivenchy',
    year: '2025',
    category: 'Automotive Styling & Performance',
    title: 'Drivenchy: High-Velocity Identity for Bespoke Automotive Craft',
    shortDescription:
      'Aggressive brand emblem, supercar livery guidelines, and high-conversion digital presence for Drivenchy — defining precision automotive enhancement.',
    monogram: 'DV',
    logoImg: '/logo-drivenchy.jpg',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(220, 24, 24, 0.22) 0%, rgba(26, 12, 12, 0.92) 60%, #080606 100%)',
    highlightStat: '+280%',
    statLabel: 'Custom Build Inquiries',
    tags: ['Automotive Branding', 'Brand Identity', 'Custom Styling'],
    challenge:
      'In the elite automotive performance and tuning space, Drivenchy needed a powerful, unmistakable visual identity that commanded authority and connected with supercar enthusiasts.',
    solution:
      'We developed a high-impact emblem fusing an aerodynamic supercar silhouette, tachometer tach-band, and precision gear iconography with aggressive modern typography.',
    results: [
      '+280% increase in custom styling and build inquiries',
      'Established Drivenchy as a premier automotive styling name',
      'High engagement across supercar communities and social channels',
    ],
    quote: {
      text: 'Pixelpop designed a badge and brand system that carries real horsepower and luxury presence on every build.',
      author: 'Founder',
      role: 'Drivenchy',
    },
    deliverables: [
      'Complete Automotive Identity & Emblems',
      'Vehicle Decals & Livery Guidelines',
      'Digital Showcase & Social Templates',
      'Merchandise & Studio Signage',
    ],
  },
  {
    id: 'elite-fitness',
    client: 'Elite Fitness Club',
    year: '2025',
    category: 'Logo Design',
    title: "Forging the Identity of Delhi's Premier Fitness Destination",
    shortDescription:
      'Bold, high-energy logo identity and brand system for Elite Fitness Club — built to command attention, inspire commitment, and drive membership growth.',
    monogram: 'EF',
    logoImg: '/logo-elitefitness.png',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(220, 50, 30, 0.22) 0%, rgba(26, 14, 12, 0.92) 60%, #0a0606 100%)',
    highlightStat: '+200%',
    statLabel: 'Membership Inquiries',
    tags: ['Logo Design', 'Brand Identity', 'Fitness Branding'],
    challenge:
      'In a crowded fitness market, Elite Fitness Club needed a brand identity strong enough to stand out, command authority, and inspire confidence in serious athletes and everyday members alike.',
    solution:
      'We crafted a bold, dynamic logomark featuring a powerful running figure paired with strong athletic typography — projecting energy, dedication, and elite performance.',
    results: [
      '+200% increase in membership inquiries following rebrand',
      'Established Elite Fitness Club as the go-to premium gym brand in the area',
      'Strong brand recall driving walk-in traffic and social referrals',
    ],
    quote: {
      text: 'Our new logo gave Elite Fitness Club the visual identity it deserved. Members and prospects immediately noticed the difference.',
      author: 'Founder',
      role: 'Elite Fitness Club',
    },
    deliverables: [
      'Logomark & Full Brand Identity System',
      'Gym Signage & Interior Branding',
      'Membership Card & Merchandise Design',
      'Social Media Templates & Brand Guidelines',
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
                <div className="case-modal-section-title">The Challenge</div>
                <p className="case-modal-text">{activeModalProject.challenge}</p>

                <div className="case-modal-section-title">The Solution & Approach</div>
                <p className="case-modal-text">{activeModalProject.solution}</p>

                <div className="case-modal-section-title">Key Impact & Outcomes</div>
                <div className="case-modal-results-list">
                  {activeModalProject.results.map((res, i) => (
                    <div key={i} className="case-modal-result-row">
                      <CheckCircle2 size={16} color="#E8DCC8" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>

                <div className="case-modal-quote">
                  &ldquo;{activeModalProject.quote.text}&rdquo;
                  <div className="case-modal-quote-author">
                    — {activeModalProject.quote.author}, {activeModalProject.quote.role}
                  </div>
                </div>
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
                    {activeModalProject.tags.map((tag) => (
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


