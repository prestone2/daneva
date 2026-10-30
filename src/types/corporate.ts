import type { QuoteContent } from './home'

export interface InternalHeroContent {
  eyebrow: string
  title: string
  introduction: string
  breadcrumb: string
}

export interface CorporateSection {
  id: string
  eyebrow: string
  heading: string
  paragraphs: string[]
  highlights?: string[]
  note?: string
}

export interface CorporatePageContent {
  hero: InternalHeroContent
  sections: CorporateSection[]
}

export interface Principle {
  title: string
  description: string
}

export interface EnterpriseCTAContent extends QuoteContent {
  eyebrow: string
}
