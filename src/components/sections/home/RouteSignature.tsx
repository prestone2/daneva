import { ArrowUpRight } from 'lucide-react'
import { Container } from '../../ui/Container'

export function RouteSignature() {
  return <div className="route-signature"><Container className="route-signature-inner">
    <div className="route-signature-label"><span>THE CONNECTION</span><strong>One corridor. More possibilities.</strong></div>
    <ol aria-label="Daneva regional freight connections">{[{city:'Mombasa',role:'THE COASTAL GATEWAY'},{city:'Nairobi',role:'THE COMMERCIAL HUB'},{city:'Kampala',role:'THE INLAND CONNECTION'}].map(({city,role},index)=><li key={city}><span className="route-signature-dot" aria-hidden="true" /><small>0{index+1} / {role}</small><strong>{city}</strong></li>)}</ol>
    <a href="/transport-corridors" aria-label="Explore the Mombasa Nairobi Kampala corridor"><ArrowUpRight aria-hidden="true" /></a>
  </Container></div>
}
