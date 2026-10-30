import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { parseArgs } from 'node:util'
const { values } = parseArgs({ options: { host: { type: 'string', default: '127.0.0.1' }, port: { type: 'string', default: '4173' } } })
const root = resolve('dist')
const headers = JSON.parse(await readFile(resolve(root, 'security-headers.json'), 'utf8'))
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
const server = createServer(async (request, response) => {
  for (const [key, value] of Object.entries(headers)) response.setHeader(key, value)
  response.setHeader('Cache-Control', 'no-cache')
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return }
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (path.split('/').some(part => part.startsWith('.') || part.includes('\\')) || path.startsWith('/api/') || path.startsWith('/security-headers.') || path === '/build-info.json') throw new Error('not_public')
    const file = resolve(root, `.${path}`)
    if (!file.startsWith(root + '/') && file !== root) throw new Error('not_public')
    let target = file
    try { if ((await stat(file)).isDirectory()) target = resolve(file, 'index.html') } catch { /* Serve the prerendered 404 below. */ }
    const content = await readFile(target)
    response.setHeader('Content-Type', types[extname(target)] ?? 'application/octet-stream')
    response.writeHead(200); response.end(request.method === 'HEAD' ? undefined : content)
  } catch {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.writeHead(404); response.end(request.method === 'HEAD' ? undefined : await readFile(resolve(root, '404.html')))
  }
})
server.listen(Number(values.port), values.host, () => console.info(`Static review server: http://${values.host}:${values.port}`))
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => server.close())
