import { CargoSection, FreightProcessSection, DestinationsSection, ClearingSupportSection, HomeFAQSection, ShipmentChecklistSection } from '../components/sections/home/HomeDetailsSections'
import { SafetyComplianceSection } from '../components/sections/home/SafetyComplianceSection'
import { HeroSection } from '../components/sections/home/HeroSection'
import { CapabilityStrip } from '../components/sections/home/CapabilityStrip'
import { Metadata } from '../components/ui/Metadata'
import { pages } from '../data/pages'
import { FleetOperationsSection } from '../components/sections/home/FleetOperationsSection'
import { EnterpriseCTA } from '../components/sections/corporate/EnterpriseCTA'
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
      <CargoSection />
      <FreightProcessSection />
      <TransportCorridorSection />
      <DestinationsSection />
      <FleetOperationsSection />
      <ClearingSupportSection />
      <SafetyComplianceSection />
      <HomeFAQSection />
      <ShipmentChecklistSection />
      <EnterpriseCTA />
    </>
  )
}
