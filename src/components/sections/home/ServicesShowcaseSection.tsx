import { ArrowUpRight, Boxes, FileCheck2, Truck } from 'lucide-react'
import { servicesContent } from '../../../data/home'
import { serviceVisuals } from '../../../config/service-assets'
import { Container } from '../../ui/Container'

const icons = [Truck, Boxes, FileCheck2]
export function ServicesShowcaseSection() {
  return (
    <section className="services-showcase" aria-labelledby="services-heading">
      <Container>
        <div className="services-showcase-heading"><div><span className="home-section-label">BUILT AROUND YOUR SHIPMENT</span><h2 id="services-heading">One journey. Connected services.</h2></div><p>From the road to the port, explore the support that brings each part of your freight journey together.</p></div>
        <ol className="service-photo-grid" role="list">
          {servicesContent.services.map(({ title, description }, index) => {
            const visual = serviceVisuals[index]
            const Icon = icons[index]
            return <li key={title}><a href={`/services#${visual.id}`} className="service-photo-card" aria-labelledby={`service-title-${index}`} aria-describedby={`service-description-${index}`}>
              <div className="service-card-media"><img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" width="1440" height="960" /><span className="service-card-number">0{index + 1}</span><span className="service-card-icon"><Icon size={23} aria-hidden="true" /></span></div>
              <div className="service-card-content"><span className="service-card-label">{visual.label}</span><h3 id={`service-title-${index}`}>{title}</h3><p id={`service-description-${index}`}>{description}</p><div className="service-card-tags">{visual.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="service-card-link">Explore Service<ArrowUpRight size={18} aria-hidden="true" /></span></div>
            </a></li>
          })}
        </ol>
        <p className="service-imagery-note">Illustrative service imagery.</p>
      </Container>
    </section>
  )
}
