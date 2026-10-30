import type { CorporateSection, InternalHeroContent, Principle } from '../types/corporate'

export const aboutPage = {
  hero: {
    eyebrow: 'ABOUT DANEVA',
    title: 'A Trusted Link in East African Trade.',
    introduction: "Daneva Co. Limited provides long-distance freight transport and clearing services connecting Kenya and Uganda, supporting containerised and bulk cargo movements from Mombasa and Nairobi to Kampala's inland container depots.",
    breadcrumb: 'About Us',
  } satisfies InternalHeroContent,
  story: {
    id: 'our-story', eyebrow: 'OUR STORY', heading: 'Built Around the Movement of Trade.',
    paragraphs: [
      'Cargo arriving through Mombasa is part of a wider journey. Clearing, onward transport and delivery to inland logistics destinations connect the port with the businesses that depend on that freight.',
      'Daneva brings long-distance haulage and Mombasa clearing services together to support this movement. With operations in Kenya and Uganda, the company connects Mombasa and Nairobi with Kampala’s inland container depots, transporting containerised and bulk cargo.',
    ],
  } satisfies CorporateSection,
  purpose: {
    eyebrow: 'OUR DIRECTION', heading: 'Purpose That Guides Our Work.',
    note: 'Mission and vision are website-friendly summaries derived from the supplied company content, subject to final client approval.',
    statements: [
      { title: 'Mission', description: 'Support reliable, safe and coordinated cargo transport and clearing between Kenya and Uganda.' },
      { title: 'Vision', description: 'Become a trusted regional logistics partner recognized for operational reliability, responsible freight movement, and professional service.' },
    ] satisfies Principle[],
  },
  values: {
    eyebrow: 'CORE VALUES', heading: 'The Principles Behind the Journey.',
    items: [
      { title: 'Safety', description: 'Give road responsibility, vehicle readiness and careful cargo handling the attention they deserve.' },
      { title: 'Integrity', description: 'Communicate honestly about requirements, responsibilities and the movement of cargo.' },
      { title: 'Reliability', description: 'Focus on preparation and coordination throughout the transport process.' },
      { title: 'Professionalism', description: 'Approach each shipment and working relationship with care and respect.' },
      { title: 'Customer Accountability', description: 'Listen to shipment requirements and maintain clear communication about the work involved.' },
    ] satisfies Principle[],
  },
  presence: {
    eyebrow: 'OUR PRESENCE', heading: 'Connected Across Kenya and Uganda.',
    locations: [
      { title: 'Uganda', description: 'Kampala headquarters.' },
      { title: 'Kenya', description: 'Operations in Nairobi and Mombasa.' },
    ] satisfies Principle[],
  },
}
