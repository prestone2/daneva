import { fleetContent } from '../../../data/home'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { OperationsImage } from './OperationsImage'

export function FleetOperationsSection() {
  return (
    <section className="home-editorial fleet-section" aria-labelledby="fleet-heading">
      <Container className="fleet-layout">
        <OperationsImage className="fleet-image" />
        <div className="editorial-copy">
          <p className="eyebrow editorial-eyebrow">{fleetContent.eyebrow}</p>
          <h2 id="fleet-heading" className="editorial-heading">{fleetContent.heading}</h2>
          <p className="editorial-description">{fleetContent.description}</p>
          <ol className="fleet-features">
            {fleetContent.features.map(({ title, description }, index) => (
              <li key={title}>
                <span className="operation-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
          <Button to={fleetContent.cta.to}>{fleetContent.cta.label}</Button>
        </div>
      </Container>
    </section>
  )
}
