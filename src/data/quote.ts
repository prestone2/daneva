import type { InternalHeroContent } from '../types/corporate'
import type { FieldDefinition, FreightQuote, QuoteStep, SelectOption } from '../types/forms'

export const quoteHero: InternalHeroContent = {
  eyebrow: 'REQUEST A FREIGHT QUOTE', title: 'Tell Us What You Need to Move.',
  introduction: 'Share your cargo details, collection point and delivery destination so our team can better understand your transport or clearing requirements.',
  breadcrumb: 'Request a Quote',
}

export const quoteStages: { step: QuoteStep; title: string; introduction: string; fields: (keyof FreightQuote)[] }[] = [
  { step: 0, title: 'Contact Details', introduction: 'Tell us who to contact about this shipment.', fields: ['company', 'contactPerson', 'email', 'phone'] },
  { step: 1, title: 'Cargo Details', introduction: 'Describe the load and any container requirements.', fields: ['cargoType', 'containerSize', 'weight', 'containerCount', 'cargoDescription'] },
  { step: 2, title: 'Transport Details', introduction: 'Enter your collection point and delivery destination. Routes are not limited to the suggestions.', fields: ['origin', 'destination', 'collectionDate', 'handling'] },
  { step: 3, title: 'Clearing & Review', introduction: 'Confirm clearing needs and review your enquiry.', fields: ['clearing', 'notes'] },
]

export const cargoTypes: SelectOption[] = ['Containerised Cargo', 'Bulk Cargo', 'General Freight', 'Other'].map(value => ({ value, label: value }))
export const containerSizes: SelectOption[] = ['20ft', '40ft', 'Other / Not Sure'].map(value => ({ value, label: value }))
export const clearingOptions: SelectOption[] = ['Yes', 'No', 'Not Sure'].map(value => ({ value, label: value }))
export const suggestedOrigins = ['Mombasa', 'Nairobi', 'Other']
export const suggestedDestinations = ['Kampala ICD', 'Kampala', 'Other']

export const quoteFields: Record<keyof FreightQuote, FieldDefinition> = {
  company: { label: 'Company / Organization', required: true, maxLength: 150 },
  contactPerson: { label: 'Contact Person', required: true, maxLength: 100 },
  email: { label: 'Business Email', required: true, maxLength: 254 },
  phone: { label: 'Phone Number', required: true, maxLength: 40 },
  cargoType: { label: 'Cargo Type', required: true },
  containerSize: { label: 'Container Size' },
  weight: { label: 'Shipment Weight (tonnes)', maxLength: 12 },
  containerCount: { label: 'Number of Containers', maxLength: 6 },
  cargoDescription: { label: 'Cargo Description', required: true, maxLength: 3000 },
  origin: { label: 'Origin', required: true, maxLength: 200 },
  destination: { label: 'Destination', required: true, maxLength: 200 },
  collectionDate: { label: 'Preferred Collection Date' },
  handling: { label: 'Special Handling Requirements', maxLength: 2000 },
  clearing: { label: 'Do you require Mombasa customs clearing?' },
  notes: { label: 'Additional Notes', maxLength: 3000 },
}

export const emptyQuote: FreightQuote = {
  company: '', contactPerson: '', email: '', phone: '', cargoType: '', containerSize: '', weight: '', containerCount: '', cargoDescription: '', origin: '', destination: '', collectionDate: '', handling: '', clearing: 'Not Sure', notes: '',
}
