import type { CorporatePageContent } from '../types/corporate'

export const safetyPage: CorporatePageContent = {
  hero: {
    eyebrow: 'SAFETY & COMPLIANCE', title: 'Responsible Freight Movement at Every Stage.',
    introduction: 'Daneva recognizes the importance of road safety, cargo handling, regulatory requirements and responsible cross-border transport.',
    breadcrumb: 'Safety & Compliance',
  },
  sections: [
    {
      id: 'driver-responsibility', eyebrow: '01 / DRIVER RESPONSIBILITY', heading: 'Care on the Road Starts with Preparation.',
      paragraphs: ['Safe driving is a continuing responsibility throughout a freight journey. Driver preparation, awareness of road conditions and disciplined decisions all contribute to responsible transport.', 'Fatigue management requires attention to readiness, rest and the demands of long-distance driving. Recognizing these demands is an important part of preparing for the road and making responsible decisions during a journey.'],
      highlights: ['Safe driving', 'Driver preparation', 'Fatigue management', 'Road discipline'],
    },
    {
      id: 'vehicle-readiness', eyebrow: '02 / VEHICLE READINESS', heading: 'A Journey Begins Before Departure.',
      paragraphs: ['Vehicle inspections and maintenance help identify issues that need attention before cargo moves. Mechanical safety and journey preparation should be considered together with the planned load and route.'],
      highlights: ['Vehicle inspections', 'Maintenance requirements', 'Mechanical safety', 'Journey preparation'],
    },
    {
      id: 'cargo-protection', eyebrow: '03 / CARGO PROTECTION', heading: 'Attention to the Load at Every Stage.',
      paragraphs: ['Cargo integrity depends on understanding the shipment and its handling requirements. Secure loading, careful handling and communication between the parties involved help address risks during freight movement.', 'Requirements vary between containerised and bulk loads. Cargo-specific arrangements should be confirmed before transport is planned.'],
      highlights: ['Secure handling', 'Transport coordination', 'Cargo integrity', 'Risk awareness'],
    },
    {
      id: 'regulatory-compliance', eyebrow: '04 / REGULATORY COMPLIANCE', heading: 'Prepared for Cross-Border Requirements.',
      paragraphs: ['Regional freight movement requires attention to applicable transport documents, customs procedures and cross-border requirements. Clearing and transport arrangements need to reflect the cargo and the requirements of the relevant authorities.', 'Regulatory coordination is part of shipment preparation. Required documents and procedures should be checked for the specific movement rather than assumed to be the same for every load.'],
      highlights: ['Required transport documents', 'Customs procedures', 'Cross-border requirements', 'Regulatory coordination'],
    },
  ],
}
