import type { CorporatePageContent } from '../types/corporate'
import type { CorridorContent } from '../types/home'

export const corridorsPage: CorporatePageContent = {
  hero: {
    eyebrow: 'OUR TRANSPORT NETWORK', title: 'Connecting Mombasa, Nairobi and Kampala.',
    introduction: "Daneva's primary transport activities link cargo origins in Kenya with Kampala's inland container depots.",
    breadcrumb: 'Transport Corridors',
  },
  sections: [
    {
      id: 'northern-corridor', eyebrow: 'THE NORTHERN CORRIDOR', heading: 'A Connection for Regional Trade.',
      paragraphs: ['The Mombasa–Nairobi–Kampala connection links a major cargo gateway with commercial activity in Kenya and inland logistics destinations in Uganda. For businesses moving containerised and bulk freight, the corridor brings port operations, transport planning and destination handling into one connected journey.', 'Daneva’s primary routes connect Mombasa and Nairobi with Kampala’s inland container depots. Each shipment has its own origin, documentation and receiving requirements.'],
    },
    {
      id: 'cross-border-movement', eyebrow: 'CROSS-BORDER MOVEMENT', heading: 'Preparation at Every Connection.',
      paragraphs: ['Cross-border freight movement depends on planning the route, preparing the required transport and customs documents, and coordinating cargo collection and delivery.', 'Border procedures and documentation requirements need to be considered alongside clearing and destination arrangements. The appropriate crossing and route should be confirmed for each shipment rather than assumed.'],
      highlights: ['Transport and route planning', 'Shipment documentation', 'Cargo and clearing coordination', 'Border and destination requirements'],
    },
  ],
}

export const corridorNetwork: Pick<CorridorContent, 'stops' | 'diagramLabel' | 'caption'> = {
  stops: [
    { city: 'MOMBASA', role: 'Port and clearing operations' },
    { city: 'NAIROBI', role: 'Commercial and transit connection' },
    { city: 'KAMPALA', role: 'Inland Container Depot destinations' },
  ],
  diagramLabel: 'Geographic freight connections from Mombasa through Nairobi to Kampala',
  caption: 'OpenStreetMap · Mombasa, Nairobi and Kampala. Shipment routes are confirmed during planning.',
}

export const corridorDestinations = {
  eyebrow: 'DESTINATIONS', heading: 'From Cargo Origin to Inland Destination.',
  items: [
    { title: 'Mombasa', description: 'Cargo arriving through the port, with clearing and onward transport requirements.' },
    { title: 'Nairobi', description: 'A commercial cargo origin and transit connection within Kenya.' },
    { title: 'Kampala ICDs', description: 'Inland container depot destinations for freight moving into Uganda.' },
  ],
}
