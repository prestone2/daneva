import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { preloadRoutes } from './routes/route-page'
export { pages } from './data/pages'
export { seo } from './config/seo'
export async function render(path: string, styles: string[], entry: string) {
  await preloadRoutes() // Resolve chunks before rendering: no hidden streamed content or inline reveal scripts.
  const document = (
    <html lang="en"><head>
      <meta charSet="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#102B4E" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="preload" href="/fonts/manrope-latin-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      {styles.map(href => <link key={href} rel="stylesheet" href={href} />)}
    </head><body><div id="root"><StaticRouter location={path}><AppRoutes /></StaticRouter></div>
      <script type="module" src={entry} />
    </body></html>
  )
  // Route modules are resolved first, so the tree is synchronous and emits no reveal scripts.
  const html = renderToString(document)
  if (/<!--\$(?:!|\?)-->/.test(html)) throw new Error('Static generation encountered an unresolved route boundary.')
  // renderToString does not emit a doctype, even when rendering an <html> tree.
  // Prerendered documents must use the same standards mode as Vite's dev HTML.
  return `<!DOCTYPE html>${html}`
}
