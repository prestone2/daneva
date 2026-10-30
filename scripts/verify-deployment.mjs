import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

// Syntax checks only: no host installation, production certificate or live service startup.
// Docker must already have the local test image; this script does not pull/install it.
function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 30000 })
  if (result.error || result.status !== 0) throw new Error(`${command} check failed: ${result.error?.message ?? result.stderr ?? ''}`)
  return result.stdout.trim()
}

run('docker', ['image', 'inspect', 'nginx:stable-alpine'])
await mkdir('.cache', { recursive: true })
const temp = await mkdtemp(resolve('.cache/deployment-check-'))
const name = `daneva-config-check-${randomUUID()}`
let created = false
try {
  const certificate = join(temp, 'certificate.pem'), key = join(temp, 'key.pem')
  run('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '1', '-subj', '/CN=localhost', '-addext', 'subjectAltName=DNS:localhost', '-keyout', key, '-out', certificate])
  const template = await readFile('deploy/nginx/daneva.conf.example', 'utf8')
  const config = template.replaceAll('__APPROVED_HOST__', 'localhost')
    .replaceAll('__CERTIFICATE_CHAIN_PATH__', '/tmp/daneva-check/certificate.pem')
    .replaceAll('__CERTIFICATE_KEY_PATH__', '/tmp/daneva-check/key.pem')
  if (/__[A-Z_]+__/.test(config)) throw new Error('Unsubstituted template token.')
  await writeFile(join(temp, 'default.conf'), config)
  // A sleeping, network-isolated container is used only to run nginx -t, never nginx's server.
  run('docker', ['run', '--detach', '--rm', '--pull=never', '--network=none', '--name', name, 'nginx:stable-alpine', 'sleep', '120'])
  created = true
  run('docker', ['exec', name, 'mkdir', '-p', '/srv/daneva/current/dist', '/etc/nginx/snippets', '/tmp/daneva-check'])
  for (const [source, target] of [
    ['dist/.', '/srv/daneva/current/dist'],
    [join(temp, 'default.conf'), '/etc/nginx/conf.d/default.conf'],
    [certificate, '/tmp/daneva-check/certificate.pem'], [key, '/tmp/daneva-check/key.pem'],
  ]) run('docker', ['cp', source, `${name}:${target}`])
  run('docker', ['exec', name, 'nginx', '-t'])
  console.info('PASS: isolated static-site nginx -t with generated CSP and a temporary self-signed localhost certificate. No live service started.')
} finally {
  try { if (created) run('docker', ['stop', '--time', '1', name]) }
  finally { await rm(temp, { recursive: true, force: true }) }
}
