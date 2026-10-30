import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const port = process.env.BROWSER_TEST_PORT || '4187'
const base = `http://127.0.0.1:${port}`
const server = spawn(process.execPath, ['scripts/preview.mjs', '--port', port], { stdio: 'pipe' })
let serverOutput = ''
server.stdout.on('data', data => { serverOutput += data })
server.stderr.on('data', data => { serverOutput += data })
let browser
const errors = [], consoleErrors = [], external = [], violations = []
const routes = ['/', '/about', '/services', '/transport-corridors', '/fleet-operations', '/safety-compliance', '/contact', '/request-quote', '/missing-route']
let scans = 0, renders = 0
const axe = async page => {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  scans++
  violations.push(...result.violations.map(item => ({ url: page.url(), id: item.id, nodes: item.nodes.map(node => node.target) })))
}
try {
  for (let attempt = 0; attempt < 100 && !serverOutput.includes('Static review server:'); attempt++) {
    if (server.exitCode !== null) throw new Error(serverOutput)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  assert.ok(serverOutput.includes('Static review server:'), serverOutput)
  browser = await chromium.launch({ ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}), headless: true, args: ['--no-sandbox'] })
  const context = await browser.newContext()
  const page = await context.newPage()
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('the server responded with a status of')) consoleErrors.push(message.text()) })
  page.on('request', request => { if (!request.url().startsWith(base) && !request.url().startsWith('https://tile.openstreetmap.org/')) external.push(request.url()) })
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const path of routes) {
      const response = await page.goto(base + path, { waitUntil: 'networkidle' })
      assert.equal(response.status(), path === '/missing-route' ? 404 : 200)
      assert.equal(await page.evaluate(() => document.compatMode), 'CSS1Compat', `${path} must render in standards mode`)
      await page.evaluate(() => document.fonts.ready)
      if (await page.locator('main h1').count() !== 1) { console.info(JSON.stringify({ errors, consoleErrors, headings: await page.locator('main h1').allTextContents() })); await writeFile('/tmp/daneva-hydration-debug.html', await page.content()) }
      assert.equal(await page.locator('main h1').count(), 1, path)
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${path} overflow at ${width}`)
      assert.equal(await page.locator('head title').count(), 1)
      assert.equal(await page.locator('meta[name="description"]').count(), 1)
      assert.equal(await page.locator('meta[property="og:title"]').count(), 1)
      // Force lazy images to load for this audit; they may legitimately be incomplete below the fold.
      const badImages = await page.locator('img').evaluateAll(async images => {
        await Promise.all(images.map(image => { image.loading = 'eager'; return image.decode().catch(() => {}) }))
        return images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src)
      })
      assert.deepEqual(badImages, [])
      if (path === '/missing-route') assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/)
      if (width === 375 || width === 1440) await axe(page)
      renders++
      if (renders % 9 === 0) console.info(`Verified ${renders} route/viewport combinations`)
    }
  }
  await page.setViewportSize({ width: 375, height: 1000 })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.keyboard.press('Tab')
  assert.equal(await page.locator('.skip-link').evaluate(node => node === document.activeElement), true)
  await page.keyboard.press('Enter')
  assert.equal(await page.locator('main').evaluate(node => node === document.activeElement), true)
  await page.getByRole('button', { name: 'Open navigation' }).click()
  assert.equal(await page.getByRole('button', { name: 'Close navigation' }).evaluate(node => node === document.activeElement), true)
  await page.keyboard.press('Shift+Tab')
  assert.equal(await page.locator('dialog > a').evaluate(node => node === document.activeElement), true)
  await page.keyboard.press('Tab')
  assert.equal(await page.getByRole('button', { name: 'Close navigation' }).evaluate(node => node === document.activeElement), true)
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('button', { name: 'Open navigation' }).evaluate(node => node === document.activeElement), true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  assert.equal(await page.locator('.carousel-copy').evaluate(node => getComputedStyle(node).animationName), 'none')
  // SPA navigation must replace metadata and move focus, including JSON-LD where configured.
  await page.getByRole('link', { name: 'Discover Daneva', exact: true }).click()
  await page.waitForURL('**/about')
  await page.getByRole('heading', { level: 1 }).waitFor()
  assert.equal(await page.locator('main').evaluate(node => node === document.activeElement), true)
  assert.equal(await page.locator('meta[name="description"]').count(), 1)
  assert.equal(await page.locator('meta[property="og:title"]').count(), 1)
  const formContext = await browser.newContext({ viewport: { width: 375, height: 1000 } })
  const form = await formContext.newPage()
  form.on('pageerror', error => errors.push(error.message))
  form.on('console', message => { if (message.type() === 'error' && !message.text().includes('Failed to fetch') && !message.text().includes('Failed to load resource')) consoleErrors.push(message.text()) })
  const submissions = []
  let mode = 'network'
  await formContext.route('https://formsubmit.co/ajax/**', async route => {
    submissions.push({ url: route.request().url(), payload: route.request().postDataJSON() })
    if (mode === 'network') { mode = 'success'; await route.abort('failed'); return }
    if (mode === 'rejected') { await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: 'false' }) }); return }
    await new Promise(resolve => setTimeout(resolve, 150))
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: 'true' }) })
  })
  await form.goto(base + '/contact', { waitUntil: 'networkidle' })
  const configured = await form.getByRole('button', { name: 'Submit enquiry', exact: true }).count()
  if (configured) {
    await form.getByRole('button', { name: 'Submit enquiry', exact: true }).click()
    await form.getByRole('alert').waitFor(); await axe(form)
    assert.equal(await form.getByRole('alert').evaluate(node => node === document.activeElement), true)
    await form.getByLabel(/^Full Name/).fill('Synthetic Test Person')
    await form.getByLabel(/^Email Address/).fill('synthetic@example.com')
    await form.getByLabel(/^Subject/).selectOption('General Enquiry')
    await form.getByLabel(/^Message/).fill('Synthetic browser verification only.')
    await form.getByRole('button', { name: 'Submit enquiry', exact: true }).click()
    await form.getByRole('status').filter({ hasText: 'could not be reached' }).waitFor()
    assert.equal(await form.getByLabel(/^Message/).inputValue(), 'Synthetic browser verification only.')
    await form.getByRole('button', { name: 'Submit enquiry', exact: true }).click()
    await form.locator('form').dispatchEvent('submit')
    await form.getByRole('status').filter({ hasText: 'Your enquiry has been submitted' }).waitFor()
    assert.equal(submissions.length, 2)
    await axe(form)
    await form.goto(base + '/request-quote', { waitUntil: 'networkidle' })
    await form.getByLabel(/^Company \/ Organization/).fill('Synthetic Company')
    await form.getByLabel(/^Contact Person/).fill('Synthetic Test Person')
    await form.getByLabel(/^Business Email/).fill('synthetic@example.com')
    await form.getByLabel(/^Phone Number/).fill('+256700000000')
    await form.getByRole('button', { name: 'Next', exact: true }).click()
    await form.getByLabel(/^Cargo Type/).selectOption('Containerised Cargo')
    await form.getByLabel(/^Container Size/).selectOption('40ft')
    await form.getByLabel(/^Number of Containers/).fill('2')
    await form.getByLabel(/^Cargo Description/).fill('Synthetic cargo')
    await form.getByRole('button', { name: 'Next', exact: true }).click()
    await form.getByLabel(/^Origin/).fill('Synthetic origin yard')
    await form.getByLabel(/^Destination/).fill('Synthetic destination yard')
    await form.getByRole('button', { name: 'Next', exact: true }).click()
    await axe(form)
    mode = 'rejected'
    await form.getByRole('button', { name: 'Submit freight enquiry' }).click()
    await form.getByRole('status').filter({ hasText: 'could not be processed' }).waitFor()
    assert.equal(await form.getByText('Synthetic cargo', { exact: true }).count(), 1)
    await axe(form)
    mode = 'success'
    await form.getByRole('button', { name: 'Submit freight enquiry' }).click()
    await form.getByRole('status').filter({ hasText: 'Your enquiry has been submitted' }).waitFor()
    assert.equal(submissions[3].payload.containerCount, '2')
    await axe(form)
  } else {
    await form.getByRole('button', { name: 'Prepare enquiry' }).click()
    await form.getByRole('alert').waitFor(); await axe(form)
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false })
  const crawler = await noJs.newPage()
  for (const path of routes.slice(0, -1)) {
    await crawler.goto(base + path)
    assert.equal(await crawler.evaluate(() => document.compatMode), 'CSS1Compat', `${path} standards mode without JavaScript`)
    assert.equal(await crawler.locator('main h1').count(), 1)
    assert.ok((await crawler.locator('main').textContent()).length > 200)
    if (path === '/contact' || path === '/request-quote') { assert.equal(await crawler.locator('form button[type="submit"]').isDisabled(), true); assert.equal(await crawler.locator('form input').first().isDisabled(), true) }
  }
  await mkdir('test-results', { recursive: true })
  await page.goto(base); await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true })
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true })
  assert.deepEqual(errors, [], 'Runtime/hydration errors')
  assert.deepEqual(consoleErrors, [], 'Console/CSP/hydration errors')
  assert.deepEqual(external, [], 'Unexpected third-party requests')
  assert.deepEqual(violations, [], 'Axe violations')
   const summary = { browser: await browser.version(), routeViewportChecks: renders, standardsModeVerified: true, axeScans: scans, javascriptDisabledRoutes: 8, configuredFormsTested: Boolean(configured), runtimeErrors: errors, cspConsoleErrors: consoleErrors, unexpectedExternalRequests: external, violations }
  await writeFile('test-results/browser-summary.json', JSON.stringify(summary, null, 2))
  console.info(JSON.stringify(summary, null, 2))
} finally {
  await browser?.close()
  server.kill('SIGTERM')
  if (server.exitCode === null) await new Promise(resolve => server.once('exit', resolve))
}
