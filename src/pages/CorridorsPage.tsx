import { corridorsPage, corridorDestinations } from '../data/corridors'
import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { EditorialSection } from '../components/sections/corporate/EditorialSection'
import { PrinciplesSection } from '../components/sections/corporate/PrinciplesSection'
import { CorridorNetwork } from '../components/sections/corporate/CorridorNetwork'
import { EnterpriseCTA } from '../components/sections/corporate/EnterpriseCTA'

export function CorridorsPage() {
  return <><InternalPageHero content={corridorsPage.hero} /><CorridorNetwork />{corridorsPage.sections.map((section, index) => <EditorialSection key={section.id} content={section} reverse={index % 2 === 0} />)}<PrinciplesSection id="destinations" {...corridorDestinations} /><EnterpriseCTA /></>
}
