/** @param {string | undefined} value @param {boolean} [required] */
// Shared by the browser SEO layer and the Node build script. No secrets or defaults.
export function normalizeSiteUrl(value, required = false) {
  if (!value?.trim()) {
    if (required) throw new Error('VITE_SITE_URL is required for a launch build.')
    return ''
  }
  try {
    const url = new URL(value.trim())
    const host = url.hostname.toLowerCase()
    const reserved = /(^|\.)(example\.(com|org|net)|example|localhost|test|invalid|local)$/.test(host)
    // Reject the DNS root-dot spelling rather than letting it bypass reserved-host checks.
    const validLabels = host.length <= 253 && host.split('.').every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || reserved || !validLabels || !host.includes('.') || /^[\d.]+$/.test(host) || host.includes(':')) throw new Error()
    return url.origin
  } catch { throw new Error('VITE_SITE_URL must be an approved HTTPS origin without paths, credentials, queries, IP addresses or placeholder domains.') }
}
