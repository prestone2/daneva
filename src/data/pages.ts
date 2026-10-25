import type { PageDefinition } from '../types/site'

export const pages: PageDefinition[] = [
  { path: '/', label: 'Home', title: 'Daneva Co. Limited | Kenya–Uganda Haulage & Clearing', description: 'Containerised and bulk cargo transport from Mombasa and Nairobi to Kampala’s inland container depots, with Mombasa clearing services from Daneva Co. Limited.' },
  { path: '/about', label: 'About Us', title: 'About Us | Daneva Co. Limited', description: 'Daneva Co. Limited is a long-distance haulage and clearing company with offices in Uganda and Kenya.' },
  { path: '/services', label: 'Services', title: 'Services | Daneva Co. Limited', description: 'Explore Daneva’s containerised cargo, bulk cargo transport and Mombasa customs clearing services.' },
  { path: '/transport-corridors', label: 'Transport Corridors', title: 'Transport Corridors | Daneva Co. Limited', description: 'Daneva’s primary freight routes connect Mombasa and Nairobi with Kampala’s inland container depots.' },
  { path: '/fleet-operations', label: 'Fleet & Operations', title: 'Fleet & Operations | Daneva Co. Limited', description: 'Fleet and operations information for Daneva Co. Limited. Full page coming soon.' },
  { path: '/safety-compliance', label: 'Safety', title: 'Safety & Compliance | Daneva Co. Limited', description: 'Safety and compliance information for Daneva Co. Limited. Full page coming soon.' },
  { path: '/contact', label: 'Contact', title: 'Contact | Daneva Co. Limited', description: 'Daneva Co. Limited is headquartered at Plot 3B, Sembuule Road, Kampala, Uganda.' },
  { path: '/request-quote', label: 'Request a Quote', title: 'Request a Freight Quote | Daneva Co. Limited', description: 'Freight quote information for Daneva’s Kenya–Uganda cargo transport and Mombasa clearing services. Enquiry form coming soon.' },
]

export const navigation = pages.filter((page) => page.path !== '/request-quote')
