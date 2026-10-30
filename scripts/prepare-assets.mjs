import sharp from 'sharp'
import { mkdir, writeFile, copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
// Derivatives only. The approved source artwork is never overwritten or recoloured.
const source = 'src/assets/brand/danevalogo.png'
await mkdir('public/brand', { recursive: true })
await mkdir('public/social', { recursive: true })
await mkdir('public/fonts', { recursive: true })
for (const width of [400, 600]) {
  await sharp(source).resize(width).webp({ lossless: true }).toFile(`public/brand/daneva-logo-${width}.webp`)
}
await sharp(source).resize(600).png({ compressionLevel: 9 }).toFile('public/brand/daneva-logo-600.png')
const trimmed = await sharp(source).trim({ threshold: 20 }).png().toBuffer()
for (const size of [32, 64, 180]) {
  await sharp(trimmed).resize(size, size, { fit: 'contain', background: '#ffffff' }).png().toFile(size === 180 ? 'public/apple-touch-icon.png' : `public/favicon-${size}.png`)
}
const icon = await sharp('public/favicon-64.png').png().toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4)
header[6] = 64; header[7] = 64; header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12)
header.writeUInt32LE(icon.length, 14); header.writeUInt32LE(22, 18)
await writeFile('public/favicon.ico', Buffer.concat([header, icon]))
const background = Buffer.from('<svg width="1200" height="630"><rect width="1200" height="630" fill="#102B4E"/><rect width="1200" height="16" fill="#D32F2F"/><rect x="64" y="64" width="540" height="128" fill="white"/><path d="M64 524H1136" stroke="#8ba2bf" stroke-width="1"/></svg>')
const logo = await sharp(trimmed).resize(480, 98, { fit: 'inside' }).png().toBuffer()
const layers = [{ input: logo, left: 94, top: 79 }]
for (const [text, fontSize, x, y] of [['Kenya–Uganda freight', 64, 64, 254], ['Haulage &amp; Mombasa clearing', 42, 64, 350], ['MOMBASA  /  NAIROBI  /  KAMPALA', 26, 64, 555]]) {
  const input = await sharp({ text: { text: `<span foreground="white">${text}</span>`, font: `Manrope ${fontSize}`, fontfile: resolve('src/assets/fonts/Manrope-variable.ttf'), rgba: true, dpi: 72 } }).png().toBuffer()
  layers.push({ input, left: x, top: y })
}
await sharp(background).composite(layers).png({ compressionLevel: 9 }).toFile('public/social/daneva-preview.png')
await copyFile('src/assets/fonts/OFL-Manrope.txt', 'public/fonts/OFL-Manrope.txt')
console.info('Prepared approved-logo derivatives, favicons and 1200×630 branded social card. No truck image generated.')
