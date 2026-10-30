import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { gzipSync } from 'node:zlib'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const root = resolve('dist')
const manifest = JSON.parse(await readFile(resolve(root, '.vite/manifest.json'), 'utf8'))
const info = JSON.parse(await readFile(resolve(root, 'build-info.json'), 'utf8'))
const required = new Set()
function collect(key) {
  if (required.has(key)) return
  const chunk = manifest[key]
  if (!chunk) throw new Error(`Missing build manifest entry: ${key}`)
  required.add(key)
  for (const dependency of chunk.imports ?? []) collect(dependency)
}
collect('index.html')
collect('src/pages/HomePage.tsx')
async function measure(file) {
  const bytes = await readFile(resolve(root, file))
  return { bytes: bytes.length, gzipBytes: gzipSync(bytes).length }
}
const homepageChunks = await Promise.all([...required].map(key => measure(manifest[key].file)))
const logoSource = await readFile('src/assets/brand/danevalogo.png')
const social = await sharp(resolve(root, 'social/daneva-preview.png')).metadata()
if (social.width !== 1200 || social.height !== 630) throw new Error('Social preview must be 1200 × 630.')
const summary = {
  artifact: info.indexable ? 'configured-domain build' : 'noindex preview',
  entry: await measure(manifest['index.html'].file),
  homepageRequiredChunks: {
    files: homepageChunks.length,
    bytes: homepageChunks.reduce((total, item) => total + item.bytes, 0),
    gzipBytes: homepageChunks.reduce((total, item) => total + item.gzipBytes, 0),
  },
  stylesheets: await Promise.all((manifest['index.html'].css ?? []).map(measure)),
  homepageHtml: await measure('index.html'),
  logoSource: { bytes: logoSource.length, sha256: createHash('sha256').update(logoSource).digest('hex') },
  logo400: await measure('brand/daneva-logo-400.webp'),
  logo600: await measure('brand/daneva-logo-600.webp'),
  social: { ...await measure('social/daneva-preview.png'), width: social.width, height: social.height },
  font: await measure('fonts/manrope-latin-variable.woff2'),
  notes: 'Actual file sizes and Node zlib gzip sizes; no Lighthouse, real-network or field Core Web Vitals scores.',
}
await mkdir('test-results', { recursive: true })
await writeFile('test-results/performance-summary.json', JSON.stringify(summary, null, 2) + '\n')
console.info(JSON.stringify(summary, null, 2))
