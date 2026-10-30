import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { JSDOM } from 'jsdom'
const root = resolve('dist')
const manifest = JSON.parse(await readFile(resolve(root, '.vite/manifest.json'), 'utf8'))
const header = JSON.parse(await readFile(resolve(root, 'security-headers.json'), 'utf8'))
const paths = ['/', '/about', '/services', '/transport-corridors', '/fleet-operations', '/safety-compliance', '/contact', '/request-quote']
const titles = new Set(), descriptions = new Set()
let origin
for (const path of [...paths, '/404']) {
  const file = path === '/404' ? '404.html' : path === '/' ? 'index.html' : `${path.slice(1)}/index.html`
  const html = await readFile(resolve(root, file), 'utf8')
  const document = new JSDOM(html).window.document
  assert.match(html, /^<!doctype html>/i, `HTML5 doctype required: ${file}`)
  assert.equal(document.compatMode, 'CSS1Compat', `Standards mode required: ${file}`)
  assert.equal(document.querySelectorAll('main h1').length, 1, file)
  assert.equal(document.querySelector('main').closest('[hidden]'), null, file)
  assert.ok(document.getElementById('root').querySelector('main'), `Primary content inside hydration root: ${file}`)
  assert.equal(document.querySelectorAll('script:not([src]):not([type="application/ld+json"])').length, 0, `No streaming reveal scripts: ${file}`)
  assert.ok(document.querySelector('main').textContent.length > (path === '/404' ? 50 : 200), `Meaningful content: ${file}`)
  assert.equal(document.querySelectorAll('head title').length, 1, file)
  assert.equal(document.querySelectorAll('head meta[name="description"]').length, 1, file)
  assert.ok(document.querySelector('head meta[property="og:title"]'), file)
  assert.ok(document.querySelector('head meta[name="twitter:card"]'), file)
  const canonical = document.querySelector('link[rel="canonical"]')?.href
  if (path !== '/404') {
    titles.add(document.title); descriptions.add(document.querySelector('meta[name="description"]').content)
    if (canonical) {
      origin = new URL(canonical).origin
      assert.equal(canonical, origin + path)
      assert.equal(document.querySelector('meta[property="og:url"]').content, canonical)
      assert.equal(document.querySelector('meta[property="og:image"]').content, origin + '/social/daneva-preview.png')
      assert.match(document.querySelector('meta[name="robots"]').content, /^index/)
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      assert.equal(scripts.length, 1)
      for (const script of scripts) {
        const value = JSON.parse(script.textContent)
        assert.ok(value['@context'] === 'https://schema.org')
        assert.ok(path === '/' ? value['@graph'].length === 2 : value['@type'] === 'BreadcrumbList')
        const hash = createHash('sha256').update(script.textContent).digest('base64')
        assert.ok(header['Content-Security-Policy'].includes(`'sha256-${hash}'`))
      }
    } else assert.match(document.querySelector('meta[name="robots"]').content, /noindex/)
  } else { assert.equal(canonical, undefined); assert.match(document.querySelector('meta[name="robots"]').content, /noindex/) }
  if (['/contact', '/request-quote'].includes(path)) assert.ok(document.querySelector('form'))
  assert.ok(!html.includes('The server did not finish this Suspense boundary'))
  for (const element of document.querySelectorAll('script[src],link[href],img[src]')) {
    const url = element.getAttribute('src') || element.getAttribute('href')
    if (url.startsWith('/')) await access(resolve(root, '.' + url))
  }
}
assert.equal(titles.size, paths.length); assert.equal(descriptions.size, paths.length)
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8')
if (process.argv.includes('--require-indexable')) assert.ok(origin, 'Launch verification requires configured canonicals.')
if (process.argv.includes('--require-forms')) assert.equal(JSON.parse(await readFile(resolve(root, 'build-info.json'), 'utf8')).formsConfigured, true, 'Launch verification requires a configured FormSubmit recipient.')
const robots = await readFile(resolve(root, 'robots.txt'), 'utf8')
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
assert.deepEqual(locs, origin ? paths.map(path => origin + path) : [])
assert.ok(!sitemap.includes('/api/') && !sitemap.includes('/404'))
assert.ok(origin ? robots.includes(`Sitemap: ${origin}/sitemap.xml`) : robots.includes('Disallow: /'))
assert.ok(!header['Content-Security-Policy'].includes('unsafe-'))
assert.ok(!Object.hasOwn(header, 'Strict-Transport-Security'))
const allJs = Object.values(manifest).filter(entry => entry.file.endsWith('.js'))
console.info(JSON.stringify({ publicRoutes: paths.length, checked404: true, canonicalOrigin: origin || 'unconfigured preview', entryJs: manifest['index.html'].file, chunks: allJs.length, canonicalSocialSchemaAssetsSitemapRobots: 'passed' }, null, 2))
