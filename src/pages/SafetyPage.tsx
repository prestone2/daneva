import { Truck, Wrench, Users } from 'lucide-react'
import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { EnterpriseCTA } from '../components/sections/corporate/EnterpriseCTA'
import { Container } from '../components/ui/Container'

const team = [
  { icon: Truck, title: 'Meet Our Drivers', description: 'The people who take your cargo on its journey. Route preparation, careful handling and responsible driving are central to the work.' },
  { icon: Wrench, title: 'Meet Our Mechanics', description: 'The people who keep Daneva moving. Inspections, servicing and repairs support vehicle readiness before the next journey.' },
  { icon: Users, title: 'Meet Our Office Team', description: 'Your connection to transport and clearing. Shipment details, documentation and collection arrangements come together through clear communication.' },
]

export function SafetyPage() {
  return <><InternalPageHero content={{ eyebrow: 'OUR TEAM', title: 'The People Behind Your Cargo.', introduction: 'Meet the people behind your cargo: drivers, mechanics and the office team connecting each part of the journey.', breadcrumb: 'Our Team' }} />
    <section className="feedback-section" aria-labelledby="team-heading"><Container><div className="feedback-heading"><p className="home-section-label">PEOPLE AT DANEVA</p><h2 id="team-heading">The People Behind Your Cargo.</h2><p>On the road, in the workshop and in the office, every role contributes to moving your shipment.</p></div><div className="feedback-grid">{team.map(({ icon: Icon, title, description }) => <article className="feedback-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></Container></section><EnterpriseCTA /></>
}
