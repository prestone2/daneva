
// User-approved generated brand concept imagery; replace with fleet photography when available.
const files = import.meta.glob<string>(
  [
    '/src/assets/images/daneva-container-generated.jpg',
    '/src/assets/images/daneva-curtainside-generated.jpg',
    '/src/assets/images/daneva-flatbed-generated.jpg',
    '/src/assets/images/daneva-delivery-generated.jpg',
    '/src/assets/images/daneva-tipper-generated.jpg',
    '/src/assets/images/daneva-lowloader-generated.jpg',
    '/src/assets/images/daneva-truck-generated.jpg',
  ],
  { eager: true, query: '?url', import: 'default' },
)

export const assets = {
  truck: files['/src/assets/images/daneva-container-generated.jpg'],
  trucks: {
    container: files['/src/assets/images/daneva-container-generated.jpg'],
    curtainside: files['/src/assets/images/daneva-curtainside-generated.jpg'],
    flatbed: files['/src/assets/images/daneva-flatbed-generated.jpg'],
    delivery: files['/src/assets/images/daneva-delivery-generated.jpg'],
    tipper: files['/src/assets/images/daneva-tipper-generated.jpg'],
    lowloader: files['/src/assets/images/daneva-lowloader-generated.jpg'],
    general: files['/src/assets/images/daneva-truck-generated.jpg'],
  },
  logo: '/brand/daneva-logo-400.webp',
  logoSrcSet: '/brand/daneva-logo-400.webp 400w, /brand/daneva-logo-600.webp 600w',
}
