import type { CorporatePageContent } from '../types/corporate'
import type { CorridorContent } from '../types/home'

export const freightRoutes = [
  { id: 'uganda-exports', title: 'Uganda Exports', journey: 'Kampala / Uganda → Mombasa Port', description: 'Export cargo collected in Kampala and other locations in Uganda for transport to Mombasa port.', color: '#155e75' },
  { id: 'wheat-grains', title: 'Wheat Grain Transport', journey: 'Nairobi (Embakasi) / Mombasa → Kampala', description: 'Wheat grain collections from facilities in Nairobi’s Embakasi area and Mombasa, transported to Kampala in bulk and loose form.', color: '#854d0e' },
  { id: 'port-imports', title: 'Containers & Loose Cargo', journey: 'Mombasa Port → Uganda', description: 'Containers and loose cargo collected from Mombasa port for delivery to destinations in Uganda.', color: '#b91c1c' },
]

export const corridorsPage: CorporatePageContent = {
  hero: {
    eyebrow: 'OUR TRANSPORT NETWORK', title: 'Our Routes',
    introduction: 'Export cargo to Mombasa port, wheat grains to Kampala, and containers and loose cargo into Uganda.',
    breadcrumb: 'Routes',
  },
  sections: [],
}

export const corridorNetwork: Pick<CorridorContent, 'stops' | 'diagramLabel' | 'caption'> = {
  stops: [
    { city: 'MOMBASA', role: 'Port imports, exports and wheat collections' },
    { city: 'NAIROBI (EMBAKASI)', role: 'Wheat grain collections for Kampala' },
    { city: 'KAMPALA', role: 'Wheat deliveries and Uganda export collections' },
  ],
  diagramLabel: 'Freight connections linking Uganda, Nairobi’s Embakasi area and Mombasa in both directions',
  caption: 'Schematic city connections. Exact collection points, destinations and road routes are arranged for each shipment.',
}
