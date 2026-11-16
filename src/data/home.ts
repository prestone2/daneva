import { corridorNetwork } from './corridors'
import type { AboutContent, CorridorContent, EditorialContent, QuoteContent, ServicesContent } from '../types/home'

export const aboutContent: AboutContent = {
  eyebrow: 'ABOUT DANEVA',
  heading: 'About Daneva',
  description: "Daneva connects Kenya and Uganda through long-distance haulage and Mombasa clearing services for containerised and bulk cargo.",
  capabilities: ['Kenya–Uganda Freight', 'Containerised Cargo', 'Bulk Cargo Transport', 'Mombasa Customs Clearing'],
  cta: { label: 'Discover Daneva', to: '/about' },
}

export const servicesContent: ServicesContent = {
  eyebrow: 'OUR SERVICES',
  heading: 'Freight and Clearing, Working Together.',
  services: [
    { title: 'Long-Distance Haulage', description: 'Exports from Uganda to Mombasa port, and imports and wheat grains from Kenya to Uganda.', to: '/services' },
    { title: 'Containerised & Bulk Cargo', description: 'Freight handling for containerised and bulk shipments.', to: '/services' },
    { title: 'Mombasa Clearing & Forwarding', description: 'Customs clearing and coordination for containerised and bulk cargo arriving through Mombasa.', to: '/services' },
  ],
}

export const corridorContent: CorridorContent = {
  eyebrow: 'THE NORTHERN CORRIDOR',
  heading: 'Connecting Mombasa, Nairobi and Kampala.',
  ...corridorNetwork,
  cta: { label: 'Explore Routes', to: '/transport-corridors' },
}

export const fleetContent: EditorialContent = {
  eyebrow: 'FLEET & OPERATIONS',
  heading: 'Fleet & Operations',
  description: 'Successful long-distance haulage depends on vehicle readiness, experienced drivers, and coordinated transport operations. Daneva brings these elements together to support cargo movement between Kenya and Uganda.',
  cta: { label: 'Explore Fleet & Operations', to: '/fleet-operations' },
  features: [
    { title: 'Fleet Readiness', description: 'Preparing vehicles for the demands of long-distance haulage.' },
    { title: 'Driver Operations', description: 'Keeping driver readiness at the heart of each journey.' },
    { title: 'Transport Coordination', description: 'Bringing shipment requirements and route planning together.' },
    { title: 'Cargo Handling', description: 'Giving containerised and bulk cargo the attention each load requires.' },
  ],
}

export const safetyContent: EditorialContent = {
  eyebrow: 'OUR TEAM',
  heading: 'The People Behind Your Cargo.',
  description: 'Responsible transport starts before departure. Vehicle inspections, driver readiness, careful cargo handling, and attention to cross-border requirements all have a part to play in moving freight between Kenya and Uganda.',
  cta: { label: 'Meet Our Team', to: '/safety-compliance' },
  features: [
    { title: 'Vehicle Readiness', description: 'Pre-journey inspections help identify issues that need attention before a vehicle takes to the road.' },
    { title: 'Driver Responsibility', description: 'Preparation, attentiveness, and responsible driving are important throughout a long-distance journey.' },
    { title: 'Cargo Security', description: 'Careful loading, securing, and handling help protect cargo during transport.' },
    { title: 'Regulatory Compliance', description: 'Cross-border freight requires attention to applicable transport rules, customs documentation, and clearing requirements.' },
  ],
}

export const quoteContent: QuoteContent = {
  heading: 'Have Cargo to Move?',
  description: "Tell us about your shipment, origin, and destination. Let's discuss the right transport or clearing solution for your business.",
  primary: { label: 'Request a Freight Quote', to: '/request-quote' },
  secondary: { label: 'Contact Our Team', to: '/contact' },
}

export const operationsPhotography = {
  alt: 'Daneva truck photographed in the fleet yard',
  placeholderTitle: 'Daneva fleet photography',
  placeholderDescription: 'A supplied Daneva truck photograph will appear here.',
  caption: 'Daneva fleet · Client-supplied photography',
}
