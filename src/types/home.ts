import type { SitePath } from './site'

export interface ContentLink {
  label: string
  to: SitePath
}

export interface EditorialContent {
  eyebrow: string
  heading: string
  description: string
  cta: ContentLink
  features: { title: string; description: string }[]
}

export interface AboutContent extends Omit<EditorialContent, 'features'> {
  capabilities: string[]
}

export interface ServicesContent extends Pick<EditorialContent, 'eyebrow' | 'heading'> {
  services: (EditorialContent['features'][number] & { to: SitePath })[]
}

export interface CorridorContent extends Pick<EditorialContent, 'eyebrow' | 'heading' | 'cta'> {
  stops: { city: string; role: string }[]
  diagramLabel: string
  caption: string
}

export interface QuoteContent {
  heading: string
  description: string
  primary: ContentLink
  secondary: ContentLink
}

export interface FooterGroup {
  title: string
  links: ContentLink[]
}
