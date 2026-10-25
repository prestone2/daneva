export type SitePath = '/' | '/about' | '/services' | '/transport-corridors' | '/fleet-operations' | '/safety-compliance' | '/request-quote' | '/contact'

export interface PageDefinition {
  path: SitePath
  label: string
  title: string
  description: string
}
