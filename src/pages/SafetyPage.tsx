import { safetyPage } from '../data/safety'
import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { OperationsOverview } from '../components/sections/corporate/OperationsOverview'
import { EnterpriseCTA } from '../components/sections/corporate/EnterpriseCTA'
import { OperationsImage } from '../components/sections/home/OperationsImage'

export function SafetyPage() {
  return <><InternalPageHero content={safetyPage.hero} image={<OperationsImage />} /><OperationsOverview sections={safetyPage.sections} safety /><EnterpriseCTA /></>
}
