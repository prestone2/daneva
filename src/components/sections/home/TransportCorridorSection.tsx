import { corridorContent } from '../../../data/home'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'

export function TransportCorridorSection() {
  return (
    <section className="home-editorial corridor-section" aria-labelledby="corridor-heading">
      <Container>
        <p className="eyebrow editorial-eyebrow">{corridorContent.eyebrow}</p>
        <h2 id="corridor-heading" className="editorial-heading">{corridorContent.heading}</h2>
        <figure className="corridor-diagram" aria-label={corridorContent.diagramLabel} aria-describedby="corridor-caption">
          <ol className="corridor-stops" role="list">
            {corridorContent.stops.map(({ city, role }) => (
              <li key={city}>
                <span className="corridor-node" aria-hidden="true" />
                <div><h3>{city}</h3><p>{role}</p></div>
              </li>
            ))}
          </ol>
          <figcaption id="corridor-caption">{corridorContent.caption}</figcaption>
        </figure>
        <Button to={corridorContent.cta.to}>{corridorContent.cta.label}</Button>
      </Container>
    </section>
  )
}
