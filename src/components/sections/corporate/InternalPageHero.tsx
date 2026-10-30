import type { ReactNode } from 'react'
import { serviceVisuals } from '../../../config/service-assets'
import { assets } from '../../../config/assets'
import { Link } from 'react-router-dom'
import type { InternalHeroContent } from '../../../types/corporate'
import { Container } from '../../ui/Container'

const bannerImages: Record<string, { src: string; position: string; label: string }> = {
  'About Us': { src: assets.trucks.general, position: '65% 48%', label: 'THE PEOPLE BEHIND THE JOURNEY' },
  Services: { src: serviceVisuals[1].src, position: '65% 50%', label: 'TRANSPORT. CLEARING. CONNECTIONS.' },
  'Transport Corridors': { src: serviceVisuals[0].src, position: '60% 52%', label: 'MOMBASA / NAIROBI / KAMPALA' },
  'Fleet & Operations': { src: assets.trucks.curtainside, position: '70% 50%', label: 'PREPARED FOR THE ROAD AHEAD' },
  'Safety & Compliance': { src: assets.trucks.tipper, position: '68% 50%', label: 'CARE AT EVERY STAGE' },
  Contact: { src: assets.trucks.delivery, position: '65% 48%', label: 'LET’S START A CONVERSATION' },
  'Request a Quote': { src: assets.trucks.lowloader, position: '65% 53%', label: 'YOUR NEXT JOURNEY STARTS HERE' },
}

export function InternalPageHero({ content, variant = 'dark', image }: { content: InternalHeroContent; variant?: 'dark' | 'light'; image?: ReactNode }) {
  const banner = bannerImages[content.breadcrumb] ?? bannerImages.Services
  return (
    <header className={`internal-hero internal-hero--${variant} internal-hero--styled`}>
      <img className="internal-banner-photo" src={banner.src} alt="" fetchPriority="high" />
      <div className="internal-banner-shade" aria-hidden="true" />
      <div className="internal-banner-lines" aria-hidden="true" />
      <Container>
        <nav className="internal-breadcrumb" aria-label="Breadcrumb">
          <ol><li><Link to="/">Home</Link></li><li><span aria-hidden="true">/</span><span aria-current="page">{content.breadcrumb}</span></li></ol>
        </nav>
        <div className={`internal-hero-layout ${image ? 'internal-hero-layout--image' : ''}`}>
          <div>
            <p className="internal-banner-kicker"><span />{banner.label}</p>
            <h1>{content.breadcrumb === 'About Us' ? 'About Daneva' : content.breadcrumb === 'Services' ? 'Our Services' : content.breadcrumb}</h1>
            <p className="internal-introduction">{content.introduction}</p>
          </div>
          {image && <div className="internal-hero-image">{image}</div>}
        </div>
      </Container>
    </header>
  )
}
