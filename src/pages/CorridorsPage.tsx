import { corridorsPage, freightRoutes } from '../data/corridors'
import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { CorridorNetwork } from '../components/sections/corporate/CorridorNetwork'
import { EnterpriseCTA } from '../components/sections/corporate/EnterpriseCTA'
import { Container } from '../components/ui/Container'

export function CorridorsPage() {
  return <><InternalPageHero content={corridorsPage.hero} />
    <section className="feedback-section" aria-labelledby="routes-heading"><Container><div className="feedback-heading"><p className="home-section-label">COLLECTION TO DESTINATION</p><h2 id="routes-heading">Our Freight Connections</h2><p>Discuss your collection point, delivery depot and clearing requirements with our team.</p></div><div className="feedback-grid">
      {freightRoutes.map(route => <article className="feedback-card" key={route.id}><p className="route-card-category">{route.title}</p><h3>{route.journey}</h3><p>{route.description}</p></article>)}
    </div></Container></section><CorridorNetwork /><EnterpriseCTA /></>
}
