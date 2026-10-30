import type { PageDefinition } from '../types/site'

export const pages: PageDefinition[] = [
  { path: '/', label: 'Home', title: 'Daneva Co. Limited | Kenya–Uganda Haulage & Clearing', description: 'Containerised and bulk cargo transport from Mombasa and Nairobi to Kampala’s inland container depots, with Mombasa clearing services from Daneva Co. Limited.' },
  { path: '/about', label: 'About Us', title: 'About Daneva Co. Limited | Kenya & Uganda Logistics', description: 'Learn about Daneva Co. Limited, connecting Kenya and Uganda through long-distance haulage, containerised and bulk cargo transport, and Mombasa clearing.' },
  { path: '/services', label: 'Services', title: 'Freight Transport & Clearing Services | Daneva', description: 'Explore Daneva’s long-distance haulage, containerised and bulk cargo transport, and Mombasa clearing services for Kenya–Uganda freight.' },
  { path: '/transport-corridors', label: 'Transport Corridors', title: 'Kenya–Uganda Transport Corridors | Daneva', description: 'Explore the Mombasa, Nairobi and Kampala freight connection, including transport planning and inland container depot destinations.' },
  { path: '/fleet-operations', label: 'Fleet & Operations', title: 'Fleet & Operations | Daneva Co. Limited', description: 'Learn about the vehicle readiness, driver preparation, maintenance and coordination principles behind long-distance freight operations.' },
  { path: '/safety-compliance', label: 'Safety', title: 'Safety & Compliance | Daneva Co. Limited', description: 'Explore responsible freight principles covering driver readiness, vehicle inspections, cargo handling and cross-border regulatory requirements.' },
  { path: '/contact', label: 'Contact', title: 'Contact Daneva Co. Limited | Kenya & Uganda', description: 'Contact information and enquiries for Daneva’s transport and clearing services in Kenya and Uganda.' },
  { path: '/request-quote', label: 'Request a Quote', title: 'Request a Freight Quote | Daneva Co. Limited', description: 'Share cargo, origin, destination and clearing details for a freight enquiry with Daneva Co. Limited.' },
]

export const navigation = pages.filter((page) => page.path !== '/request-quote')
