import { Boxes, Check, FileCheck2, Truck } from 'lucide-react'
import { servicesPage } from '../data/services'
import { serviceVisuals } from '../config/service-assets'
import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { EnterpriseCTA } from '../components/sections/corporate/EnterpriseCTA'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

const icons = [Truck, Boxes, FileCheck2]
export function ServicesPage() {
  return <><InternalPageHero content={servicesPage.hero} variant="light" />
    <nav className="service-page-navigation" aria-label="Explore services"><Container>{serviceVisuals.map(({ id, label }, index) => <a href={`#${id}`} key={id}><span>0{index + 1}</span>{label}</a>)}</Container></nav>
    {servicesPage.sections.map((section, index) => {
      const visual = serviceVisuals[index]
      const Icon = icons[index]
      return <section key={section.id} id={section.id} className={`service-detail ${index % 2 ? 'service-detail--reverse' : ''}`} aria-labelledby={`${section.id}-heading`}><Container className="service-detail-layout">
        <figure className="service-detail-visual"><div><img src={visual.src} alt={visual.alt} width="1440" height="960" loading="lazy" decoding="async" /><span className="service-detail-image-label"><Icon size={20} aria-hidden="true" />{visual.label}</span></div><figcaption>Illustrative service image</figcaption></figure>
        <div className="service-detail-copy"><span className="home-section-label">{section.eyebrow} / DANEVA</span><h2 id={`${section.id}-heading`}>{section.heading}</h2><p className="service-detail-lead">{visual.short}</p>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.highlights && <ul>{section.highlights.map(item => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul>}{section.note && <p className="service-detail-note">{section.note}</p>}<Button to="/request-quote">Discuss Your Shipment</Button></div>
      </Container></section>
    })}<EnterpriseCTA /></>
}
