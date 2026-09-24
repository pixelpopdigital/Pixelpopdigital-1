import { useState } from 'react'
import {
  ArrowRight,
  X,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react'
import Carousel from '../components/viscose-carousel/Carousel'
import Footer from '../components/Footer'
import './WorkPage.css'

interface CaseStudy {
  id: string
  client: string
  year: string
  category: 'Branding' | 'Social Strategy' | 'Digital & Web' | 'Production' | 'Growth & Media'
  title: string
  shortDescription: string
  featured?: boolean
  monogram: string
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
    id: 'northline',
    client: 'Northline Sportswear',
    year: '2024',
    category: 'Branding',
    featured: true,
    title: 'Transforming Athletic Performance into an Inescapable Cultural Uniform',
    shortDescription:
      'Complete identity overhaul, packaging systems, and digital launch campaign that propelled Northline into 200+ retail storefronts nationwide.',
    monogram: 'NL',
    bgGradient: 'radial-gradient(circle at 60% 40%, #7A1616 0%, #360B0B 50%, #120404 100%)',
    highlightStat: '+340% ROAS',
    statLabel: 'Launch Window Performance',
    tags: ['Brand Identity', 'Custom Typography', 'Packaging', 'Art Direction'],
    challenge:
      'Northline entered a crowded performance athletic wear market with exceptional materials but zero distinct visual differentiation or cultural resonance.',
    solution:
      'We forged a high-contrast editorial identity rooted in raw kinetics, stark typography, bespoke monogram iconography, and visceral campaign photography.',
    results: [
      '+340% ROAS across initial launch sprint',
      '8.4M Organic video views within 60 days',
      'Secured 220+ high-tier boutique retail accounts',
    ],
    quote: {
      text: "Pixelpop took our socials and identity from ignorable to inescapable in eight weeks flat. We've never had a launch move that fast.",
      author: 'Priya Nair',
      role: 'Founder & CEO',
    },
    deliverables: [
      'Comprehensive Brand Architecture',
      'Modular Design System & Guidelines',
      'Sustainable Custom Packaging Suite',
      'Global Launch Campaign & Video Direction',
    ],
  },
  {
    id: 'fathom-audio',
    client: 'Fathom Audio',
    year: '2024',
    category: 'Growth & Media',
    title: 'The Resonance Launch: Scaling High-Fidelity Hardware DTC',
    shortDescription:
      'Full-funnel paid media strategy and high-converting launch storytelling for a premier audiophile studio monitor rollout.',
    monogram: 'FA',
    bgGradient: 'radial-gradient(circle at 40% 50%, #B08D57 0%, #4D3C21 55%, #141008 100%)',
    highlightStat: '$2.4M',
    statLabel: 'Direct DTC Revenue in 90 Days',
    tags: ['Paid Acquisition', 'Motion Design', 'Conversion Funnels'],
    challenge:
      'High price point audiophile audio gear requires extensive education and deep trust before a buyer converts online.',
    solution:
      'We designed interactive sound demo visualizers, hyper-targeted creator seeding campaigns, and rigorous conversion rate optimized landing funnels.',
    results: [
      '4.2x Revenue multiplier compared to previous launch',
      '$2.4M DTC revenue generated in 90 days',
      '38% lower blended customer acquisition cost (CAC)',
    ],
    quote: {
      text: 'The campaign strategy paid for itself twice over before the launch window even closed. Rare to see that kind of clarity.',
      author: 'Marcus Webb',
      role: 'CMO, Fathom Audio',
    },
    deliverables: [
      'Multi-Platform Paid Media Funnels',
      '3D Product Explainer Animations',
      'Interactive Spec Comparison Landing Pages',
      'Lifecycle Email Automation Series',
    ],
  },
  {
    id: 'meridian-coffee',
    client: 'Meridian Coffee Co.',
    year: '2024',
    category: 'Branding',
    title: 'Crafting Everyday Rituals into Sacred Modern Artifacts',
    shortDescription:
      'A tactile rebrand, bespoke tin & pouch packaging architecture, and eCommerce platform celebrating single-origin roasting traditions.',
    monogram: 'MC',
    bgGradient: 'radial-gradient(circle at 50% 50%, #3E5C54 0%, #1D2E29 55%, #0B1210 100%)',
    highlightStat: '+185%',
    statLabel: 'Subscription DTC Growth',
    tags: ['Rebrand', 'Sustainable Packaging', 'Shopify Plus'],
    challenge:
      'Meridian had loyal local cafe patrons but struggled to retain online subscription customers due to outdated packaging and fragmented brand cues.',
    solution:
      'We crafted an earthy yet elevated minimalist packaging hierarchy, bespoke foil stamp accents, and an intuitive recurring subscription web portal.',
    results: [
      '+185% increase in monthly recurring coffee subscriptions',
      'Nominated for Pentawards Best Beverage Packaging 2024',
      '+42% average order value increase',
    ],
    quote: {
      text: 'Finally an agency that ships the same idea they pitch. No watered-down version three revisions in.',
      author: 'Elena Cross',
      role: 'Brand Director, Meridian',
    },
    deliverables: [
      'Complete Visual Identity System',
      '6 SKU Retail Box & Foil Bag Packaging',
      'Custom Shopify Plus Headless Store',
      'Micro-Batch Tasting Note Iconography',
    ],
  },
  {
    id: 'harbor-ash',
    client: 'Harbor & Ash',
    year: '2025',
    category: 'Digital & Web',
    title: 'Editorial Luxury Redefined for the Architectural Living Era',
    shortDescription:
      'Next-generation 3D spatial web catalog and brand editorial elevating bespoke lighting & artisanal home goods.',
    monogram: 'HA',
    bgGradient: 'radial-gradient(circle at 60% 30%, #8A4B3B 0%, #3D1C14 55%, #140805 100%)',
    highlightStat: '+220%',
    statLabel: 'Trade Inquiries & Conversion',
    tags: ['3D Web Experience', 'UI/UX Design', 'Art Direction'],
    challenge:
      'Bridging the tactile essence of handcrafted luxury furniture and lighting into a digital web experience that appeals to elite interior architects.',
    solution:
      'We built an editorial lookbook platform featuring real-time WebGL material inspection, interactive lighting simulators, and a dedicated VIP trade portal.',
    results: [
      '+220% increase in high-ticket architect trade inquiries',
      'Awwwards Site of the Day Winner',
      'Average session time increased from 1m 12s to 4m 38s',
    ],
    quote: {
      text: 'Sharpest creative team we’ve worked with, full stop. They think like editors, not just designers.',
      author: 'Jordan Lee',
      role: 'Founder, Harbor & Ash',
    },
    deliverables: [
      'Immersive WebGL & React Web Experience',
      'Editorial Lookbook Photography Direction',
      'Architect Trade Spec Builder',
      'CMS Design System Architecture',
    ],
  },
  {
    id: 'verve-botanicals',
    client: 'Verve Botanicals',
    year: '2024',
    category: 'Social Strategy',
    title: 'Viral Botanical Chemistry: Driving Organic Cultural Obsession',
    shortDescription:
      'Turnkey social-first content engine and community play generating tens of millions of views for clean clinical skincare.',
    monogram: 'VB',
    bgGradient: 'radial-gradient(circle at 35% 65%, #2A4736 0%, #15241B 55%, #080D0A 100%)',
    highlightStat: '16.8M',
    statLabel: 'Viral Organic Views',
    tags: ['TikTok & Reels Native', 'Influencer Strategy', 'Community'],
    challenge:
      'Skincare space is saturated with pseudo-science claims. Verve needed authentic, relatable, yet scientifically authoritative content.',
    solution:
      'We designed an editorial studio series breaking down clinical ingredients into ASMR micro-documentaries, dermatologist reactions, and daily routine hooks.',
    results: [
      '16.8M combined organic video impressions in Q3/Q4',
      '480K+ new engaged social followers across channels',
      'Sold out flagship serum inventory three times consecutively',
    ],
    quote: {
      text: 'Every single deliverable felt considered. Nothing generic, nothing rushed, and it showed directly in the community numbers.',
      author: 'Sofia Reyes',
      role: 'Head of Marketing',
    },
    deliverables: [
      'Social Strategy & Content Playbook',
      '45+ Monthly High-Performing Video Reels/TikToks',
      'Creator Partner Gifting Framework',
      'Bi-Weekly Trend & Velocity Reports',
    ],
  },
  {
    id: 'hyperion-labs',
    client: 'Hyperion Labs',
    year: '2025',
    category: 'Production',
    title: 'Kinetic 3D Motion & Sound Architecture for Spatial Computing',
    shortDescription:
      'Futuristic CGI film, sonic branding, and spatial interface prototypes exploring next-generation neural audio synthesis.',
    monogram: 'HL',
    bgGradient: 'radial-gradient(circle at 50% 50%, #331A4D 0%, #1B0C2B 55%, #0A0410 100%)',
    highlightStat: 'Red Dot',
    statLabel: 'Design Award Distinction',
    tags: ['3D CGI Film', 'Sonic Identity', 'Spatial Computing'],
    challenge:
      'Communicating an invisible, abstract deep-tech breakthrough in acoustic engineering to non-technical institutional investors and partners.',
    solution:
      'We visualized sound wave physics into mesmerizing liquid chrome and dynamic particles through cinema-grade 3D renders and spatial audio cues.',
    results: [
      'Secured $14M Series A funding post-launch teaser',
      'Red Dot Best of the Best Design Award 2025',
      'Featured globally in Wired and TechCrunch',
    ],
    quote: {
      text: 'Pixelpop translated our proprietary audio mathematics into an unforgettable visual masterpiece.',
      author: 'Dr. Aaron Vance',
      role: 'Co-Founder & Chief Scientist',
    },
    deliverables: [
      '3-Minute CGI Product Manifesto Film',
      'Dynamic Sonic Logo & Acoustic Library',
      'Interactive Interactive Product Teaser',
      'Keynote Presentation Master Deck',
    ],
  },
]

const CATEGORIES = [
  'All Work',
  'Branding',
  'Social Strategy',
  'Digital & Web',
  'Production',
  'Growth & Media',
]

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Work')
  const [activeModalProject, setActiveModalProject] = useState<CaseStudy | null>(null)

  const filteredProjects =
    selectedCategory === 'All Work'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((p) => p.category === selectedCategory)

  return (
    <div className="work-page-container">
      {/* Viscose Carousel Hero */}
      <section className="carousel-hero-section">
        <Carousel />
        <button
          type="button"
          className="carousel-scroll-cue"
          onClick={() => {
            const target = document.getElementById('case-studies')
            if (target) target.scrollIntoView({ behavior: 'smooth' })
          }}
          aria-label="Scroll to case studies"
        >
          <span className="carousel-scroll-cue-text">Explore Case Studies</span>
          <ChevronDown size={20} />
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
            A curated showcase of identities we’ve built, digital platforms we’ve engineered,
            and high-velocity campaigns that captured global attention.
          </p>
        </div>

        {/* Studio Metrics Strip */}
        <div className="work-metrics-strip">
          <div className="work-metric-item">
            <div className="work-metric-number">$48M+</div>
            <div className="work-metric-label">Client Revenue Scaled</div>
          </div>
          <div className="work-metric-item">
            <div className="work-metric-number">120M+</div>
            <div className="work-metric-label">Organic Video Impressions</div>
          </div>
          <div className="work-metric-item">
            <div className="work-metric-number">14</div>
            <div className="work-metric-label">Industry & Design Awards</div>
          </div>
          <div className="work-metric-item">
            <div className="work-metric-number">98.4%</div>
            <div className="work-metric-label">Client Retention Rate</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="work-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`work-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="work-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`work-card ${project.featured ? 'work-grid-featured' : ''}`}
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
                  <TrendingUp size={14} color="#FF6666" />
                  <span>{project.highlightStat}</span>
                </div>

                <div className="work-card-center-art">
                  <div className="work-card-monogram">{project.monogram}</div>
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
                    Explore Case Study <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Work CTA Banner */}
        <div className="work-cta-banner">
          <h2 className="work-cta-title">Ready to build something unforgettable?</h2>
          <p className="work-cta-subtext">
            Whether launching a category-defining brand or scaling your existing reach, our team is
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

      {/* Case Study Detail Modal */}
      {activeModalProject && (
        <div
          className={`case-modal-overlay ${activeModalProject ? 'open' : ''}`}
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="case-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="case-modal-close-btn"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div
              className="case-modal-hero"
              style={{ background: activeModalProject.bgGradient }}
            >
              <div className="case-modal-eyebrow">
                {activeModalProject.client} &bull; {activeModalProject.category} &bull; {activeModalProject.year}
              </div>
              <h2 className="case-modal-title">{activeModalProject.title}</h2>

              <div className="case-modal-stats-row">
                <div className="case-modal-stat-box">
                  <div className="case-modal-stat-val">{activeModalProject.highlightStat}</div>
                  <div className="case-modal-stat-lbl">{activeModalProject.statLabel}</div>
                </div>
              </div>
            </div>

            <div className="case-modal-body">
              <div>
                <div className="case-modal-section-title">The Challenge</div>
                <p className="case-modal-text">{activeModalProject.challenge}</p>

                <div className="case-modal-section-title">The Solution & Approach</div>
                <p className="case-modal-text">{activeModalProject.solution}</p>

                <div className="case-modal-section-title">Key Impact & Outcomes</div>
                <div style={{ marginBottom: '24px' }}>
                  {activeModalProject.results.map((res, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                        fontSize: '14.5px',
                        color: '#F3F1EA',
                      }}
                    >
                      <CheckCircle2 size={16} color="#22C55E" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>

                <div className="case-modal-quote">
                  &ldquo;{activeModalProject.quote.text}&rdquo;
                  <div
                    style={{
                      fontFamily: 'Helvetica Neue, sans-serif',
                      fontSize: '13px',
                      fontStyle: 'normal',
                      color: 'rgba(232, 220, 200, 0.6)',
                      marginTop: '8px',
                    }}
                  >
                    — {activeModalProject.quote.author}, {activeModalProject.quote.role}
                  </div>
                </div>
              </div>

              <div>
                <div className="case-modal-section-title">Deliverables</div>
                <ul className="case-modal-deliverables-list">
                  {activeModalProject.deliverables.map((item, idx) => (
                    <li key={idx} className="case-modal-deliverable-item">
                      <span className="case-modal-deliverable-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
