import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { servicesContent } from '../../../data/home'
import { Container } from '../../ui/Container'

export function ServicesShowcaseSection() {
  return (
    <section className="home-editorial services-section" aria-labelledby="services-heading">
      <Container>
        <p className="eyebrow editorial-eyebrow">{servicesContent.eyebrow}</p>
        <h2 id="services-heading" className="editorial-heading">{servicesContent.heading}</h2>
        <ol className="service-rows" role="list">
          {servicesContent.services.map(({ title, description, to }, index) => (
            <li key={title}>
              <Link to={to} className="service-row" aria-labelledby={`service-title-${index}`} aria-describedby={`service-description-${index}`}>
                <span className="operation-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3 id={`service-title-${index}`}>{title}</h3>
                <p id={`service-description-${index}`}>{description}</p>
                <ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
