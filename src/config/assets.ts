import logo from '../assets/brand/danevalogo.png'

// Optional at build time: use only the supplied files, never substitute stock imagery.
const files = import.meta.glob<string>(
  ['/src/assets/images/daneva-truck.jpg'],
  { eager: true, query: '?url', import: 'default' },
)

export const assets = {
  truck: files['/src/assets/images/daneva-truck.jpg'],
  logo,
}
