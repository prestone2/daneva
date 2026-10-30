import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { normalizeSiteUrl } from '../src/config/site-url.mjs'
import { Metadata } from '../src/components/ui/Metadata'
import { seo, serializeJsonLd, structuredData } from '../src/config/seo'
import { pages } from '../src/data/pages'
const original = seo.siteUrl
const origin = 'https://seo-fixture.daneva.ug' // Synthetic unit-test fixture, never the deployed configuration.
afterEach(() => { seo.siteUrl = original; vi.unstubAllEnvs() })
describe('centralized SEO', () => {
  it('requires a real approved origin for launch and rejects unsafe or placeholder URLs', () => {
    expect(normalizeSiteUrl('')).toBe('')
    expect(() => normalizeSiteUrl('', true)).toThrow('required')
    for (const value of ['http://freight.ug', 'https://example.com', 'https://sub.example.org', 'https://localhost', 'https://preview.test', 'https://company.example', 'https://127.0.0.1', 'https://user:secret@freight.ug', 'https://freight.ug/path', 'https://freight.ug/?tracking=1', 'https://freight.ug/#hash']) expect(() => normalizeSiteUrl(value)).toThrow('VITE_SITE_URL')
    expect(normalizeSiteUrl(origin + '/')).toBe(origin)
  })
  it('uses unique titles and descriptions for all public routes', () => {
    expect(new Set(pages.map(page => page.title)).size).toBe(pages.length)
    expect(new Set(pages.map(page => page.description)).size).toBe(pages.length)
  })
  it('rejects root-dot and invalid DNS spellings without weakening reserved-domain checks', () => {
    for (const value of ['https://example.com.', 'https://sub.example.org.', 'https://freight.ug.', 'https://bad_host.ug', 'https://freight..ug', 'https://-freight.ug', `https://${'x'.repeat(64)}.ug`]) {
      expect(() => normalizeSiteUrl(value, true)).toThrow('VITE_SITE_URL')
    }
    expect(normalizeSiteUrl('https://FREIGHT.UG/')).toBe('https://freight.ug')
  })
  it.each(pages)('provides canonical and social metadata for $path', page => {
    seo.siteUrl = origin
    render(<MemoryRouter initialEntries={[page.path]}><Metadata {...page} /></MemoryRouter>)
    expect(document.title).toBe(page.title)
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', origin + page.path)
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute('content', origin + page.path)
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute('content', page.title)
    expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute('content', origin + '/social/daneva-preview.png')
  })
  it('uses the declared route canonical even for a differently cased navigation URL', () => {
    seo.siteUrl = origin
    render(<MemoryRouter initialEntries={['/ABOUT/']}><Metadata {...pages[1]} /></MemoryRouter>)
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', origin + '/about')
  })
  it('makes an unconfigured preview noindex without fabricated canonical URLs', () => {
    seo.siteUrl = ''
    render(<MemoryRouter><Metadata {...pages[0]} /></MemoryRouter>)
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    expect(structuredData('/')).toBeNull()
  })
  it('keeps unknown routes noindex without a canonical or structured data', () => {
    seo.siteUrl = origin
    render(<MemoryRouter initialEntries={['/unknown']}><Metadata title="Not found" description="Missing page" noIndex /></MemoryRouter>)
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull()
  })
  it('limits structured data to verified identity and route breadcrumbs, and escapes script delimiters', () => {
    seo.siteUrl = origin
    const organization = structuredData('/')!
    expect(JSON.stringify(organization)).toContain('/brand/daneva-logo-600.png')
    expect(JSON.stringify(organization)).not.toMatch(/sameAs|rating|review|address|telephone|certification/)
    expect(structuredData('/about')).toMatchObject({ '@type': 'BreadcrumbList', itemListElement: [{ position: 1, item: origin + '/' }, { position: 2, item: origin + '/about' }] })
    expect(serializeJsonLd({ value: '</script>' })).not.toContain('<')
    expect(JSON.parse(serializeJsonLd({ value: '</script>' }))).toEqual({ value: '</script>' })
  })
})
