import { normalizeSiteUrl } from './site-url.mjs'
import { pages } from '../data/pages'
export const seo = {
  name: 'Daneva Co. Limited',
  siteUrl: normalizeSiteUrl(import.meta.env.VITE_SITE_URL),
  image: '/social/daneva-preview.png',
  imageAlt: 'Daneva Co. Limited — Kenya–Uganda freight and Mombasa clearing',
  logo: '/brand/daneva-logo-600.png',
}
export const absoluteUrl = (path: string) => seo.siteUrl ? new URL(path, seo.siteUrl).href : undefined
export function structuredData(path: string) {
  if (!seo.siteUrl) return null
  const page = pages.find(page => page.path === path)
  if (!page) return null
  if (path === '/') return {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', '@id': `${seo.siteUrl}/#organization`, name: seo.name, url: `${seo.siteUrl}/`, logo: absoluteUrl(seo.logo) },
      { '@type': 'WebSite', '@id': `${seo.siteUrl}/#website`, name: seo.name, url: `${seo.siteUrl}/`, publisher: { '@id': `${seo.siteUrl}/#organization` } },
    ],
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${seo.siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: page.label, item: absoluteUrl(path) },
  ] }
}
export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')
