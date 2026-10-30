import type { CorporatePageContent } from '../types/corporate'

export const servicesPage: CorporatePageContent = {
  hero: {
    eyebrow: 'OUR SERVICES', title: 'Transport and Clearing Solutions for Regional Trade.',
    introduction: 'Daneva supports cargo movement through coordinated long-distance haulage, containerised and bulk transport, and Mombasa clearing services.',
    breadcrumb: 'Services',
  },
  sections: [
    {
      id: 'long-distance-haulage', eyebrow: 'SERVICE 01', heading: 'Long-Distance Haulage',
      paragraphs: [
        'Daneva’s haulage services connect cargo origins in Kenya with inland logistics destinations in Uganda. Primary movements run from Mombasa and Nairobi to Kampala’s inland container depots.',
        'Planning a freight journey involves understanding the cargo, collection arrangements, transport documentation and receiving requirements. Coordination between origin and destination helps bring these elements together.',
      ],
      highlights: ['Kenya–Uganda cargo movement', 'Mombasa to Kampala', 'Nairobi to Kampala', 'Inland Container Depot deliveries', 'Freight movement coordination'],
    },
    {
      id: 'containerised-bulk-cargo', eyebrow: 'SERVICE 02', heading: 'Containerised & Bulk Cargo',
      paragraphs: [
        'Containerised shipments and bulk loads bring different handling and transport requirements. Daneva transports both types of cargo between Kenya and Uganda, supporting commercial and industrial freight movement.',
        'Shipment planning should account for cargo dimensions, weight, loading arrangements and destination handling. These details help establish the requirements for each movement before transport is arranged.',
      ],
      highlights: ['Containerised shipments', 'Bulk cargo transport', 'Commercial and industrial freight', 'Cargo-specific loading and handling requirements'],
      note: '20ft and 40ft container support is subject to client confirmation. Confirm the container size, weight and handling requirements when discussing a shipment.',
    },
    {
      id: 'mombasa-clearing', eyebrow: 'SERVICE 03', heading: 'Mombasa Clearing & Forwarding',
      paragraphs: [
        'Daneva provides Mombasa customs clearing services for containerised and bulk cargo. Clearing forms an important connection between arrival at the port and the onward inland journey.',
        'The work involves attention to customs documentation, relevant port processes and cargo release requirements. Coordinating clearing and transport arrangements helps prepare cargo for onward movement once the applicable requirements have been met.',
      ],
      highlights: ['Customs documentation coordination', 'Containerised and bulk cargo clearing', 'Port process coordination', 'Cargo release requirements', 'Onward transport coordination'],
    },
  ],
}
