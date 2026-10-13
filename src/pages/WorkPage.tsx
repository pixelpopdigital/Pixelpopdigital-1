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
    title: 'Hair Candy Ashok Vihar: Engineering Delhi’s Defining Luxury Salon Identity',
    shortDescription:
      'Opulent visual identity, bespoke champagne gold brand architecture, and viral social content engines elevating Hair Candy Ashok Vihar into a premier beauty destination.',
    monogram: 'HC',
    logoImg: '/logo-haircandy.png',
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
    logoImg: '/logo-detailingstreet.png',
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
    id: 'fathom-audio',
    client: 'Fathom Audio',
    year: '2024',
    category: 'Growth & Media',
    title: 'The Resonance Launch: Scaling High-Fidelity Audio Hardware DTC',
    shortDescription:
      'Full-funnel paid media strategy, interactive frequency visualizers, and conversion storytelling for a premier audiophile monitor rollout.',
    monogram: 'FA',
    bgGradient: 'radial-gradient(circle at 45% 45%, rgba(232, 220, 200, 0.16) 0%, rgba(26, 23, 19, 0.9) 60%, #0a0a0a 100%)',
    highlightStat: '$2.4M',
    statLabel: 'Direct DTC Revenue in 90 Days',
    tags: ['Paid Acquisition', 'Motion Design', 'Conversion Funnels'],
    challenge:
      'High-ticket audiophile hardware requires profound sensory trust and technical education before customers commit to purchase online.',
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
    id: 'northline-sportswear',
    client: 'Northline Sportswear',
    year: '2024',
    category: 'Branding',
    title: 'Transforming Athletic Kinetics into an Inescapable Cultural Uniform',
    shortDescription:
      'Complete identity overhaul, packaging systems, and digital launch campaign that propelled Northline into 200+ retail storefronts nationwide.',
    monogram: 'NL',
    bgGradient: 'radial-gradient(circle at 55% 40%, rgba(220, 205, 175, 0.15) 0%, rgba(24, 23, 21, 0.9) 60%, #080808 100%)',
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
      text: "Pixelpop Digital took our socials and identity from ignorable to inescapable in eight weeks flat. We've never had a launch move that fast.",
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
    id: 'meridian-coffee',
    client: 'Meridian Coffee Co.',
    year: '2024',
    category: 'Branding',
    title: 'Crafting Everyday Rituals into Sacred Modern Artifacts',
    shortDescription:
      'A tactile rebrand, bespoke tin & pouch packaging architecture, and eCommerce platform celebrating single-origin roasting traditions.',
    monogram: 'MC',
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(215, 198, 168, 0.15) 0%, rgba(25, 23, 19, 0.9) 60%, #0a0908 100%)',
    highlightStat: '+185%',
    statLabel: 'Subscription DTC Growth',
    tags: ['Rebrand', 'Sustainable Packaging', 'Shopify Plus'],
    challenge:
      'Meridian had loyal local cafe patrons but struggled to retain online subscription customers due to fragmented digital brand cues.',
    solution:
      'We crafted an earthy yet elevated minimalist packaging hierarchy, bespoke foil stamp accents, and an intuitive recurring subscription web portal.',
    results: [
      '+185% increase in monthly recurring coffee subscriptions',
      'Nominated for Pentawards Best Beverage Packaging 2024',
      '+42% average order value increase',
    ],
    quote: {
      text: 'Finally a brand that ships the same idea they pitch. No watered-down version three revisions in.',
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
      'Next-generation 3D spatial web catalog and brand editorial elevating bespoke lighting & artisanal interior fixtures.',
    monogram: 'HA',
    bgGradient: 'radial-gradient(circle at 45% 45%, rgba(235, 222, 198, 0.16) 0%, rgba(28, 25, 22, 0.9) 60%, #0c0b0a 100%)',
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
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(210, 202, 180, 0.14) 0%, rgba(22, 23, 20, 0.9) 60%, #090a09 100%)',
    highlightStat: '16.8M',
    statLabel: 'Viral Organic Views',
    tags: ['TikTok & Reels Native', 'Influencer Strategy', 'Community'],
    challenge:
      'Skincare space is saturated with pseudo-science claims. Verve needed authentic, relatable, yet scientifically authoritative content.',
    solution:
      'We designed an editorial brand series breaking down clinical ingredients into ASMR micro-documentaries, dermatologist reactions, and daily routine hooks.',
    results: [
      '16.8M combined organic video impressions in Q3/Q4',
      '480K+ new engaged social followers across channels',
      'Sold out flagship serum inventory three times consecutively',
    ],
    quote: {
      text: 'Every single deliverable felt considered. Nothing generic, nothing rushed, and it showed directly in the community numbers.',
      author: 'Sofia Reyes',
      role: 'Head of Brand',
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
    bgGradient: 'radial-gradient(circle at 55% 45%, rgba(228, 218, 198, 0.17) 0%, rgba(27, 25, 24, 0.9) 60%, #0a0a0c 100%)',
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
      text: 'Pixelpop Digital translated our proprietary audio mathematics into an unforgettable visual masterpiece.',
      author: 'Dr. Aaron Vance',
      role: 'Co-Founder & Chief Scientist',
    },
    deliverables: [
      '3-Minute CGI Product Manifesto Film',
      'Dynamic Sonic Logo & Acoustic Library',
      'Interactive Product Teaser',
      'Keynote Presentation Master Deck',
    ],
  },
  {
    id: 'aethel-horology',
    client: 'Aethel Horology',
    year: '2025',
    category: 'Branding',
    title: 'Horological Precision Meets Contemporary Monochromatic Identity',
    shortDescription:
      'Timeless Swiss watchmaking identity, engraved collector packaging, and bespoke typography for limited numbered micro-editions.',
    monogram: 'AH',
    bgGradient: 'radial-gradient(circle at 50% 45%, rgba(235, 226, 210, 0.18) 0%, rgba(25, 24, 22, 0.9) 60%, #080808 100%)',
    highlightStat: '3.8x',
    statLabel: 'Collector Edition Oversubscription',
    tags: ['Brand Identity', 'Packaging Suite', 'Luxury Typography'],
    challenge:
      'Independent timepiece micro-brands struggle against legacy Swiss heritage houses without deeply compelling provenance and tactile design excellence.',
    solution:
      'We engineered a bespoke serif typeface, milled aluminum packaging cases, and an archival certificate verification experience.',
    results: [
      'All 500 initial timepiece allocations sold out in 14 minutes',
      '3.8x oversubscribed waitlist with 4,200 verified buyers',
      'Featured in Hodinkee and Wallpaper* Design Awards',
    ],
    quote: {
      text: 'Pixelpop Digital brought an authentic haute-horlogerie sensibility that rivaled centurylong heritage houses.',
      author: 'Maximilian Brandt',
      role: 'Founder & Master Watchmaker',
    },
    deliverables: [
      'Custom Bespoke Logotype & Emblem',
      'Milled Aluminum & Leather Case System',
      'Numbered Edition Authenticity Ledger',
      'Cinematic Macro Product Photography',
    ],
  },
  {
    id: 'solstice-health',
    client: 'Solstice Health',
    year: '2025',
    category: 'Digital & Web',
    title: 'Next-Gen Longevity Intelligence: Precision Bio-Tracking Interface',
    shortDescription:
      'Minimalist web dashboard and mobile interface translating complex biomarkers into clear, actionable daily longevity protocols.',
    monogram: 'SH',
    bgGradient: 'radial-gradient(circle at 45% 55%, rgba(220, 210, 185, 0.15) 0%, rgba(24, 23, 20, 0.9) 60%, #090909 100%)',
    highlightStat: '94%',
    statLabel: 'Active 90-Day Member Retention',
    tags: ['UI/UX Design', 'Design System', 'HealthTech Web App'],
    challenge:
      'Biomarker analysis dashboards overwhelm members with dense medical charts, leading to user fatigue and high churn after month one.',
    solution:
      'We designed an ethereal, serene data interface utilizing warm beige gradients, ambient progress rings, and narrative daily health summaries.',
    results: [
      '94% active member retention past 90 days',
      'Reduced average onboarding friction time by 62%',
      'Acquired 45,000+ active beta subscribers',
    ],
    quote: {
      text: 'Our members describe opening the app as calming rather than stressful. That single UX shift changed our retention metrics entirely.',
      author: 'Dr. Camille Laurent',
      role: 'Chief Medical Officer',
    },
    deliverables: [
      'End-to-End Web & Mobile App UI/UX',
      'Comprehensive Multi-State Design System',
      'Interactive Biomarker Trend Charts',
      'Physician Portal & Clinical Dashboard',
    ],
  },
  {
    id: 'kroma-ceramics',
    client: 'Kroma',
    year: '2024',
    category: 'Production',
    title: 'Cinematic Lighting & Brand Film Direction for Scandinavian Ceramics',
    shortDescription:
      '35mm film capture, tactile physical textures, and global campaign direction celebrating artisanal Nordic stoneware craft.',
    monogram: 'KS',
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(230, 218, 195, 0.16) 0%, rgba(26, 24, 21, 0.9) 60%, #0a0a09 100%)',
    highlightStat: '5x',
    statLabel: 'International Design Awards',
    tags: ['Art Direction', '35mm Film', 'Editorial Photography'],
    challenge:
      'Industrial mass production has dulled consumer appreciation for handmade stoneware irregularities and natural earth glazes.',
    solution:
      'We directed a meditative slow-cinema docuseries documenting kiln firings, raw clay foraging, and Michelin-star restaurant table settings.',
    results: [
      '5 international design & cinematography awards',
      'Partnership agreements with 18 Michelin-starred venues',
      '+310% wholesale international export volume',
    ],
    quote: {
      text: 'Their lens captured the warmth and soul of our pottery in ways words never could.',
      author: 'Astrid Lindholm',
      role: 'Creative Director, Kroma',
    },
    deliverables: [
      '35mm Brand Documentary Film',
      'High-Resolution Lookbook Photography',
      'Printed Linen Hardcover Catalog',
      'International Exhibition Visual Assets',
    ],
  },
  {
    id: 'aura-fragrance',
    client: 'Aura Fragrance',
    year: '2024',
    category: 'Growth & Media',
    title: 'Scent Without Borders: Niche Perfumery Scale via Olfactory Storytelling',
    shortDescription:
      'Multi-channel creator seeding and hyper-sensory video vignettes driving record launch day sell-outs across Europe & US.',
    monogram: 'AF',
    bgGradient: 'radial-gradient(circle at 55% 45%, rgba(232, 222, 202, 0.17) 0%, rgba(27, 24, 20, 0.9) 60%, #0c0b0a 100%)',
    highlightStat: '+410%',
    statLabel: 'Launch Day ROAS',
    tags: ['Paid Acquisition', 'Creator Seeding', 'E-Commerce Growth'],
    challenge:
      'Selling bespoke perfume without physical scent testing requires evocative narrative hooks that trigger emotional resonance online.',
    solution:
      'We created a discovery sampler funnel paired with micro-mood films evoking memory, rain, smoke, and coastal midnight air.',
    results: [
      '+410% ROAS during global launch sprint',
      'Discovery sampler kit converted 48% of buyers into full bottle orders',
      'Achieved profitability in month one of acquisition',
    ],
    quote: {
      text: 'Pixelpop Digital solved our online fragrance conversion problem through pure visual poetry and ruthless funnel optimization.',
      author: 'Julian Thorne',
      role: 'Head of Growth, Aura',
    },
    deliverables: [
      'Paid Social Video Ad Engine',
      'Interactive Discovery Quiz Landing Experience',
      'Micro-Sample Unboxing Experience Design',
      'Retention & VIP Replenishment Automations',
    ],
  },
  {
    id: 'nomad-goods',
    client: 'Nomad Goods Co.',
    year: '2025',
    category: 'Social Strategy',
    title: 'Cultivating Modern Wilderness: Documentary Storytelling for Field Gear',
    shortDescription:
      'Immersive field testing expeditions and episodic Reels/YouTube series transforming utilitarian luggage into an explorer icon.',
    monogram: 'NG',
    bgGradient: 'radial-gradient(circle at 45% 50%, rgba(218, 206, 182, 0.15) 0%, rgba(24, 23, 20, 0.9) 60%, #090908 100%)',
    highlightStat: '2.1M',
    statLabel: 'Engaged Community Members',
    tags: ['Social Content Engine', 'Adventure Doc', 'Community Strategy'],
    challenge:
      'Travel gear brands frequently rely on generic stock landscapes that fail to inspire modern discerning adventurers.',
    solution:
      'We deployed expedition creators to Iceland, Patagonia, and Japan to stress-test gear in real conditions while documenting cinematic field journals.',
    results: [
      '2.1M highly engaged community members across channels',
      '+260% increase in user-generated content submissions',
      'Zero paid ad spend needed for new duffle line sellout',
    ],
    quote: {
      text: 'They don’t just make social content—they build authentic cultural movements with staying power.',
      author: 'Kai Sutherland',
      role: 'Founder & Expedition Lead',
    },
    deliverables: [
      'Multi-Continental Expedition Production',
      'Weekly Episodic Social Mini-Series',
      'Ambassador Athlete Program Guidelines',
      'Community Dispatch Newsletter Architecture',
    ],
  },
  {
    id: 'vespera-living',
    client: 'Vespera Living',
    year: '2025',
    category: 'Digital & Web',
    title: 'Monolithic Architecture & Spatial Web Presence for Modern Villas',
    shortDescription:
      'Minimalist architectural showcase, real-time sunlight path rendering, and high-net-worth buyer portal for custom luxury residences.',
    monogram: 'VL',
    bgGradient: 'radial-gradient(circle at 50% 40%, rgba(238, 228, 210, 0.18) 0%, rgba(27, 26, 23, 0.9) 60%, #0a0a0b 100%)',
    highlightStat: '+265%',
    statLabel: 'Qualified Private Buyer Inquiries',
    tags: ['3D Web Experience', 'Luxury Real Estate', 'Web Architecture'],
    challenge:
      'Ultra-luxury architectural developments need digital presentations that match the gravity, serenity, and craftsmanship of the physical buildings.',
    solution:
      'We engineered a silent, contemplative digital gallery with ambient architectural soundscapes, high-res blueprint zooms, and private broker scheduling.',
    results: [
      '+265% qualified buyer inquiries in first quarter',
      'Average private browsing time of 6m 40s per visit',
      'Pre-sold 8 bespoke residences prior to groundbreaking',
    ],
    quote: {
      text: 'The website became our most powerful sales asset. It conveys prestige with remarkable subtlety.',
      author: 'Dominic Sterling',
      role: 'Managing Principal, Vespera',
    },
    deliverables: [
      'Bespoke WebGL Architectural Gallery',
      'Private VIP Buyer Client Portal',
      'Interactive Solar Path & Material Inspector',
      'Printed Architectural Monograph Layouts',
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
            A curated showcase of 12 defining projects across branding, high-velocity acquisition,
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
