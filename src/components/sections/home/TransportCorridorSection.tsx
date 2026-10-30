import { CorridorMap } from '../../maps/CorridorMap'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { corridorContent } from '../../../data/home'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'

const details = [
  'Clearing and cargo coordination at the gateway to the Northern Corridor.',
  'A key commercial and transit hub connecting the port with inland destinations.',
  'Containerised and bulk freight connections to Kampala’s inland container depots.',
]
export function TransportCorridorSection() {
  const [active, setActive] = useState(0)
  return (
    <section className="home-editorial corridor-section" aria-labelledby="corridor-heading">
      <Container className="corridor-layout">
        <div className="corridor-copy"><p className="eyebrow editorial-eyebrow">{corridorContent.eyebrow}</p><h2 id="corridor-heading" className="editorial-heading">Transport Corridor</h2><p className="editorial-description">Across Kenya. Into Uganda. Connecting the coast with the businesses and inland depots that keep trade moving.</p><Button to={corridorContent.cta.to}>View Corridors</Button></div>
        <div className="route-experience">
          <CorridorMap active={active} onSelect={setActive} />
          <div className="route-selector" aria-label="Explore corridor stops">{corridorContent.stops.map(({ city }, index) => <button type="button" key={city} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{city}<ArrowUpRight size={16} aria-hidden="true" /></button>)}</div>
          <div className="route-detail" aria-live="polite"><p className="eyebrow">{corridorContent.stops[active].role}</p><p>{details[active]}</p></div>
        </div>
      </Container>
    </section>
  )
}
