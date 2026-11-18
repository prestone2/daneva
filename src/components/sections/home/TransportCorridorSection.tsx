import { CorridorMap } from '../../maps/CorridorMap'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { corridorContent } from '../../../data/home'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'

const details = [
  'Mombasa port collections for Uganda, Uganda exports to the port, and wheat collections for Kampala.',
  'Wheat grain collections from Nairobi’s Embakasi area for transport to Kampala in bulk and loose form.',
  'Wheat grain deliveries to Kampala and export cargo collections in Uganda for Mombasa port.',
]
export function TransportCorridorSection() {
  const [active, setActive] = useState(0)
  return (
    <section className="home-editorial corridor-section" aria-labelledby="corridor-heading">
      <Container className="corridor-layout">
        <div className="corridor-copy"><p className="eyebrow editorial-eyebrow">{corridorContent.eyebrow}</p><h2 id="corridor-heading" className="editorial-heading">Trade moving.<br />In both directions.</h2><p className="editorial-description">Uganda exports to Mombasa port. Containers and loose cargo into Uganda. Wheat grains from Nairobi’s Embakasi area and Mombasa to Kampala.</p><Button to={corridorContent.cta.to}>View Routes</Button></div>
        <div className="route-experience">
          <CorridorMap active={active} onSelect={setActive} />
          <div className="route-selector" aria-label="Explore corridor stops">{corridorContent.stops.map(({ city }, index) => <button type="button" key={city} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{city}<ArrowUpRight size={16} aria-hidden="true" /></button>)}</div>
          <div className="route-detail" aria-live="polite"><p className="eyebrow">{corridorContent.stops[active].role}</p><p>{details[active]}</p></div>
        </div>
      </Container>
    </section>
  )
}
