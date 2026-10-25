import type { FooterGroup } from '../types/home'

export const footerContent = {
  description: 'Long-distance haulage and Mombasa clearing services connecting Kenya and Uganda.',
  location: 'Kampala, Uganda',
  copyright: 'Daneva Co. Limited. All rights reserved.',
  region: 'Kenya–Uganda freight',
}

export const footerGroups: FooterGroup[] = [
  { title: 'Company', links: [
    { label: 'About Us', to: '/about' },
    { label: 'Fleet & Operations', to: '/fleet-operations' },
    { label: 'Safety & Compliance', to: '/safety-compliance' },
  ] },
  { title: 'Services', links: [
    { label: 'Long-Distance Haulage', to: '/services' },
    { label: 'Containerised & Bulk Cargo', to: '/services' },
    { label: 'Mombasa Clearing', to: '/services' },
  ] },
  { title: 'Quick Links', links: [
    { label: 'Transport Corridors', to: '/transport-corridors' },
    { label: 'Request a Quote', to: '/request-quote' },
    { label: 'Contact', to: '/contact' },
  ] },
]
