import { useState } from 'react'
import { CorridorMap } from '../../maps/CorridorMap'
import { corridorNetwork } from '../../../data/corridors'
import { Container } from '../../ui/Container'

export function CorridorNetwork() {
  const [active, setActive] = useState(0)
  return <section className="corporate-section corporate-network" aria-label="Regional transport map"><Container><CorridorMap expanded active={active} onSelect={setActive} /><div className="network-city-buttons">{corridorNetwork.stops.map(({ city, role }, index) => <button type="button" key={city} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span><strong>{city}</strong><small>{role}</small></button>)}</div></Container></section>
}
