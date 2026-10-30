import { fleetPage } from '../data/fleet'
import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { OperationsOverview } from '../components/sections/corporate/OperationsOverview'
import { EnterpriseCTA } from '../components/sections/corporate/EnterpriseCTA'

export function FleetPage() {
  return <><InternalPageHero content={fleetPage.hero} variant="light" /><OperationsOverview sections={fleetPage.sections} /><EnterpriseCTA /></>
}
