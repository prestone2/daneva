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
        'Daneva transports export cargo from Kampala and other locations in Uganda to Mombasa port, and containers and loose cargo from Mombasa port into Uganda. Wheat grain movements connect collection facilities in Nairobi’s Embakasi area and Mombasa with Kampala, in bulk and loose form.',
        'Share your collection point, destination, cargo details and preferred dates so we can discuss your journey.',
      ],
      highlights: ['Uganda exports to Mombasa port', 'Mombasa port containers and loose cargo to Uganda', 'Embakasi and Mombasa wheat grains to Kampala', 'Bulk and loose wheat transport', 'Freight movement coordination'],
    },
    {
      id: 'containerised-bulk-cargo', eyebrow: 'SERVICE 02', heading: 'Containerised & Bulk Cargo',
      paragraphs: [
        'Containerised shipments and bulk loads bring different handling and transport requirements. Daneva transports both types of cargo between Kenya and Uganda, supporting commercial and industrial freight movement.',
        'Tell us the cargo weight, dimensions and loading requirements so we can discuss suitable arrangements.',
      ],
      highlights: ['Containerised shipments', 'Bulk cargo transport', 'Commercial and industrial freight', 'Cargo-specific loading and handling requirements'],
      note: '20ft and 40ft container support is subject to client confirmation. Confirm the container size, weight and handling requirements when discussing a shipment.',
    },
    {
      id: 'mombasa-clearing', eyebrow: 'SERVICE 03', heading: 'Mombasa Clearing & Forwarding',
      paragraphs: [
        'Daneva provides Mombasa customs clearing services for containerised and bulk cargo. Clearing forms an important connection between arrival at the port and the onward inland journey.',
        'Discuss documentation, port release and onward transport with our team as part of your shipment enquiry.',
      ],
      highlights: ['Customs documentation coordination', 'Containerised and bulk cargo clearing', 'Port process coordination', 'Cargo release requirements', 'Onward transport coordination'],
    },
  ],
}
