import { HeroSection } from '../components/sections/home/HeroSection'
import { CapabilityStrip } from '../components/sections/home/CapabilityStrip'
import { Metadata } from '../components/ui/Metadata'
import { pages } from '../data/pages'
import { FleetOperationsSection } from '../components/sections/home/FleetOperationsSection'
import { SafetyComplianceSection } from '../components/sections/home/SafetyComplianceSection'
import { FreightQuoteSection } from '../components/sections/home/FreightQuoteSection'
import { AboutPreviewSection } from '../components/sections/home/AboutPreviewSection'
import { ServicesShowcaseSection } from '../components/sections/home/ServicesShowcaseSection'
import { TransportCorridorSection } from '../components/sections/home/TransportCorridorSection'

export function HomePage() {
  return (
    <>
      <Metadata {...pages[0]} />
      <HeroSection />
      <CapabilityStrip />
      <AboutPreviewSection />
      <ServicesShowcaseSection />
      <TransportCorridorSection />
      <FleetOperationsSection />
      <SafetyComplianceSection />
      <FreightQuoteSection />
    </>
  )
}
