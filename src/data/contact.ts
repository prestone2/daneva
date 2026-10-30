import type { InternalHeroContent } from '../types/corporate'
import type { ContactEnquiry, FieldDefinition, SelectOption } from '../types/forms'

export const contactHero: InternalHeroContent = {
  eyebrow: 'GET IN TOUCH', title: "Let's Keep Your Business Moving.",
  introduction: 'Have a transport enquiry, clearing requirement or business partnership in mind? Get in touch with Daneva Co. Limited to discuss your needs.',
  breadcrumb: 'Contact',
}

interface CompanyContact {
  company: string
  headquarters: string[]
  kenyaPresence: string
  suppliedLocation: string[]
  postal: string
  phone: { display: string; href: string }
  approvalNotice: string
  context: string
}

export const companyContact: CompanyContact = {
  company: 'Daneva Co. Limited',
  headquarters: ['Plot 3B, Sembuule Road,', 'Kampala, Uganda'],
  kenyaPresence: 'Mombasa and Nairobi',
  suppliedLocation: ['Shell Bonje Hill Station,', 'Mombasa–Nairobi Road'],
  postal: 'P.O. Box 41997',
  phone: { display: '+256 703 761117', href: 'tel:+256703761117' },
  approvalNotice: 'These supplied contact details, including the additional location and postal address, require final client approval before production publication.',
  context: 'For transport, clearing or partnership enquiries, share your cargo requirements and the locations involved so the team can understand your needs.',
}

export const contactSubjects: SelectOption[] = ['Transport Enquiry', 'Containerised Cargo', 'Bulk Cargo', 'Mombasa Clearing', 'Business Partnership', 'General Enquiry'].map(value => ({ value, label: value }))

export const contactFields: Record<keyof ContactEnquiry, FieldDefinition> = {
  fullName: { label: 'Full Name', required: true, maxLength: 100 },
  company: { label: 'Company Name', maxLength: 150 },
  email: { label: 'Email Address', required: true, maxLength: 254 },
  phone: { label: 'Phone Number', maxLength: 40 },
  subject: { label: 'Subject', required: true },
  message: { label: 'Message', required: true, maxLength: 3000 },
}

export const emptyContact: ContactEnquiry = { fullName: '', company: '', email: '', phone: '', subject: '', message: '' }

export const enquiryNotices = {
  availability: 'You can prepare your enquiry here. To send it now, please call our team while email enquiries are being connected.',
  privacy: 'Contact information would be used to respond to enquiries, subject to an approved Privacy Policy. Nothing is sent or stored by this website; entries remain in page memory and clear when you leave or refresh.',
  unavailable: 'Your enquiry is ready, but online submission is not yet available. Please contact Daneva directly while we complete this service.',
  error: 'Your enquiry could not be processed. Your entries are still here. Please contact Daneva directly.',
}

export const activeEnquiryNotices = {
  availability: 'Submit your enquiry for review by the Daneva team.',
  privacy: 'We use your details to respond to your enquiry. When email enquiries are enabled, your message is processed by FormSubmit and forwarded to the Daneva team.',
}
