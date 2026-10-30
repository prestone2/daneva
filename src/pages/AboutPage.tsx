import { aboutPage } from '../data/about'
import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { EditorialSection } from '../components/sections/corporate/EditorialSection'
import { PrinciplesSection } from '../components/sections/corporate/PrinciplesSection'
import { EnterpriseCTA } from '../components/sections/corporate/EnterpriseCTA'
import { Container } from '../components/ui/Container'

export function AboutPage() {
  return (
    <>
      <InternalPageHero content={aboutPage.hero} />
      <EditorialSection content={aboutPage.story} image />
      <section className="corporate-section corporate-section--tinted" aria-labelledby="purpose-heading">
        <Container>
          <p className="eyebrow editorial-eyebrow">{aboutPage.purpose.eyebrow}</p>
          <h2 id="purpose-heading">{aboutPage.purpose.heading}</h2>
          <div className="corporate-purpose">{aboutPage.purpose.statements.map(({ title, description }) => <div key={title}><h3>{title}</h3><p>{description}</p></div>)}</div>
          <p className="corporate-note">{aboutPage.purpose.note}</p>
        </Container>
      </section>
      <PrinciplesSection id="core-values" {...aboutPage.values} />
      <section className="corporate-section corporate-section--tinted" aria-labelledby="presence-heading">
        <Container>
          <p className="eyebrow editorial-eyebrow">{aboutPage.presence.eyebrow}</p>
          <h2 id="presence-heading">{aboutPage.presence.heading}</h2>
          <div className="corporate-presence">{aboutPage.presence.locations.map(({ title, description }) => <div key={title}><h3>{title}</h3><p>{description}</p></div>)}</div>
        </Container>
      </section>
      <EnterpriseCTA />
    </>
  )
}
