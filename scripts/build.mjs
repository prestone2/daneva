import { build, loadEnv } from 'vite'
import { mkdir, readFile, writeFile, mkdtemp, rm } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'
import { normalizeSiteUrl } from '../src/config/site-url.mjs'
process.env.DANEVA_BUILD_YEAR = String(new Date().getUTCFullYear())
const env = loadEnv('production', process.cwd(), 'VITE_')
const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL, process.argv.includes('--require-site-url'))
const formSubmit = Boolean(env.VITE_FORMSUBMIT_RECIPIENT?.trim())
const output = resolve('dist')
await mkdir('.cache', { recursive: true })
const temp = await mkdtemp(resolve('.cache/prerender-'))
try {
  await build({ build: { outDir: output, manifest: true } })
  await build({ build: { ssr: 'src/entry-server.tsx', outDir: temp, emptyOutDir: true, copyPublicDir: false } })
  globalThis.fetch = () => { throw new Error('Network calls are forbidden during static rendering.') }
  const { render, pages, seo } = await import(pathToFileURL(join(temp, 'entry-server.js')).href)
  const manifest = JSON.parse(await readFile(join(output, '.vite/manifest.json'), 'utf8'))
  const entry = manifest['index.html']
  const styles = (entry.css ?? []).map(file => `/${file}`)
  const hashes = new Set()
  for (const path of [...pages.map(page => page.path), '/404']) {
    const html = await render(path, styles, `/${entry.file}`)
    for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) hashes.add(`'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`)
    const target = path === '/' ? output : path === '/404' ? output : join(output, path.slice(1))
    await mkdir(target, { recursive: true })
    await writeFile(join(target, path === '/404' ? '404.html' : 'index.html'), html)
  }
  const escapeXml = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c])
  const sitemap = seo.siteUrl ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${escapeXml(seo.siteUrl + page.path)}</loc></url>`).join('')}</urlset>\n` : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>\n'
  await writeFile(join(output, 'sitemap.xml'), sitemap)
  await writeFile(join(output, 'robots.txt'), seo.siteUrl ? `User-agent: *\nAllow: /\nSitemap: ${seo.siteUrl}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n')
  const headers = {
    'Content-Security-Policy': `default-src 'none'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' ${[...hashes].join(' ')}; style-src 'self'; img-src 'self' data: https://tile.openstreetmap.org; font-src 'self'; connect-src 'self' ${formSubmit ? 'https://formsubmit.co' : ''}; form-action 'self'; manifest-src 'self'`,
    'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()', 'X-Frame-Options': 'DENY',
  }
  await writeFile(join(output, 'build-info.json'), JSON.stringify({ indexable: Boolean(seo.siteUrl), formsConfigured: formSubmit, enquiryProvider: formSubmit ? 'formsubmit' : null, siteUrl: seo.siteUrl, buildYear: process.env.DANEVA_BUILD_YEAR }, null, 2) + '\n')
  await writeFile(join(output, 'security-headers.json'), JSON.stringify(headers, null, 2) + '\n')
  await writeFile(join(output, 'security-headers.conf'), '# Generated per build. HSTS intentionally omitted until HTTPS is verified.\n' + Object.entries(headers).map(([key, value]) => `add_header ${key} "${value}" always;`).join('\n') + '\n')
  console.info(`Prerendered ${pages.length} public routes + 404. ${seo.siteUrl ? 'Configured canonical origin.' : 'PREVIEW ONLY: no domain; noindex, empty sitemap, robots disallow all.'}`)
} finally { await rm(temp, { recursive: true, force: true }) }
