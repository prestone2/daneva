import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

// Preserve the supplied originals; generate web-sized, correctly oriented copies.
const photos = {
  container: 'WhatsApp Image 2026-11-02 at 16.15.45.jpeg',
  fleet: '20261102_160423.jpg.jpeg',
  lineup: '20261102_160258.jpg.jpeg',
  blueTruck: '20261102_160020.jpg.jpeg',
  yard: 'WhatsApp Image 2026-11-02 at 16.15.46 (1).jpeg',
  prepared: '20261102_160818.jpg.jpeg',
  wideFleet: '20261102_160833.jpg.jpeg',
  containerSide: '20261102_160436.jpg.jpeg',
}
await mkdir('src/assets/images/client', { recursive: true })
for (const [name, source] of Object.entries(photos)) {
  await sharp(`src/assets/images/${source}`).rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 83 }).toFile(`src/assets/images/client/${name}.webp`)
}
console.info('Prepared eight client photographs without changing the originals.')
