import type { CorporatePageContent } from '../types/corporate'

export const fleetPage: CorporatePageContent = {
  hero: {
    eyebrow: 'FLEET & OPERATIONS', title: 'The People and Operations Behind Every Delivery.',
    introduction: 'Long-distance freight depends on prepared vehicles, experienced people and disciplined transport coordination.',
    breadcrumb: 'Fleet & Operations',
  },
  sections: [
    {
      id: 'fleet-operations', eyebrow: '01 / FLEET OPERATIONS', heading: 'Preparation Before Movement.',
      paragraphs: ['A freight journey begins with understanding the load and preparing for the route. Vehicle readiness, cargo handling needs and receiving arrangements all inform the movement of containerised and bulk freight.', 'Transport planning brings these requirements together so that collection, the journey and destination handling can be coordinated.'],
      highlights: ['Freight vehicle readiness', 'Route planning', 'Cargo handling requirements', 'Trip coordination'],
    },
    {
      id: 'driver-operations', eyebrow: '02 / DRIVER OPERATIONS', heading: 'People at the Centre of the Journey.',
      paragraphs: ['Professional driving calls for preparation, attentiveness and respect for other road users. Understanding the route and cargo requirements is an important part of preparing for a long-distance trip.', 'Fatigue awareness, appropriate rest and responsible decisions on the road are central considerations in driver readiness. Preparing people for the journey is as important as preparing the load.'],
      highlights: ['Professional driving standards', 'Driver preparation', 'Fatigue awareness', 'Road responsibility'],
    },
    {
      id: 'vehicle-maintenance', eyebrow: '03 / VEHICLE MAINTENANCE', heading: 'Readiness Is an Ongoing Responsibility.',
      paragraphs: ['Preventive maintenance and pre-trip inspections play an important role in preparing freight vehicles for demanding journeys. Identifying mechanical concerns before departure supports responsible transport planning.', 'Maintenance requirements should be considered alongside trip arrangements. Mechanical readiness and operational reliability depend on giving vehicle condition appropriate attention before a journey begins.'],
      highlights: ['Preventive maintenance', 'Pre-trip vehicle inspections', 'Mechanical readiness', 'Operational reliability'],
    },
    {
      id: 'operational-coordination', eyebrow: '04 / OPERATIONAL COORDINATION', heading: 'One Shipment. Connected Responsibilities.',
      paragraphs: ['Freight movement depends on communication between transport, clearing and destination teams. Cargo information, documentation requirements and receiving arrangements need to be understood across each part of the journey.', 'Coordinating these responsibilities helps prepare for collection, cargo release and onward delivery. Shipment-specific arrangements should be discussed with the team before a movement is confirmed.'],
      highlights: ['Transport planning', 'Clearing coordination', 'Destination communication', 'Shipment requirements'],
    },
  ],
}
