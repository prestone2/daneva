import { useLocation } from 'react-router-dom'
import { absoluteUrl, seo, serializeJsonLd, structuredData } from '../../config/seo'
export function Metadata({ title, description, path, noIndex = false }: { title: string; description: string; path?: string; noIndex?: boolean }) {
  const { pathname } = useLocation()
  const routePath = path ?? pathname
  const canonical = noIndex ? undefined : absoluteUrl(routePath === '/' ? '/' : routePath.replace(/\/$/, ''))
  const data = noIndex ? null : structuredData(routePath.replace(/\/$/, '') || '/')
  return <>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content={noIndex || !seo.siteUrl ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
    {canonical && <link rel="canonical" href={canonical} />}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={seo.name} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:locale" content="en_GB" />
    {canonical && <meta property="og:url" content={canonical} />}
    {seo.siteUrl && <>
      <meta property="og:image" content={absoluteUrl(seo.image)} />
      <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seo.imageAlt} />
      <meta name="twitter:image" content={absoluteUrl(seo.image)} />
      <meta name="twitter:image:alt" content={seo.imageAlt} />
    </>}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} />
    {data && <script type="application/ld+json" data-seo="structured-data" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />}
  </>
}
