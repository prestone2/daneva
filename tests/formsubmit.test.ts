import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isEnquiryConfigured, submitContactEnquiry, submitFreightQuote } from '../src/services/enquiries'
import { emptyContact } from '../src/data/contact'
import { emptyQuote } from '../src/data/quote'
const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status })
beforeEach(() => {
  vi.stubEnv('VITE_FORMSUBMIT_RECIPIENT', 'test-recipient@example.com')
})
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals() })
describe('FormSubmit enquiries without a backend', () => {
  it('sends contact details and a reply-to address to the configured recipient', async () => {
    const fetch = vi.fn(async () => response({ success: 'true' })); vi.stubGlobal('fetch', fetch)
    const contact = { ...emptyContact, fullName: 'Test Person', email: 'sender@example.com', subject: 'Transport Enquiry', message: 'Test cargo' }
    expect(isEnquiryConfigured()).toBe(true)
    expect(await submitContactEnquiry(contact)).toMatchObject({ status: 'received' })
    const [url, options] = fetch.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://formsubmit.co/ajax/test-recipient%40example.com')
    expect(JSON.parse(String(options.body))).toMatchObject({ ...contact, _replyto: contact.email, _template: 'table', _subject: 'Daneva — Transport Enquiry' })
    expect(options.headers).not.toHaveProperty('Idempotency-Key')
  })
  it('includes the complete quote, including fields from earlier steps', async () => {
    const fetch = vi.fn(async () => response({ success: true })); vi.stubGlobal('fetch', fetch)
    const quote = { ...emptyQuote, company: 'Test Co', email: 'sender@example.com', cargoType: 'Containerised Cargo', containerSize: '40ft', containerCount: '2', origin: 'Mombasa', destination: 'Kampala', clearing: 'Yes', notes: 'Test only' }
    expect(await submitFreightQuote(quote)).toMatchObject({ status: 'received' })
    const [url, options] = fetch.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toContain('https://formsubmit.co/ajax/')
    expect(JSON.parse(String(options.body))).toMatchObject({ ...quote, _subject: 'Daneva — New freight quote request' })
  })
  it.each([false, 'false', undefined])('does not treat an unsuccessful HTTP 200 reply as receipt (%s)', async success => {
    vi.stubGlobal('fetch', vi.fn(async () => response({ success })))
    expect(await submitContactEnquiry({ ...emptyContact })).toMatchObject({ status: 'error' })
  })
  it('reports mailbox activation separately and keeps the form data', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => response({ success: 'false', message: 'This form needs activation.' })))
    const values = { ...emptyContact, message: 'Retain my cargo enquiry' }
    expect(await submitContactEnquiry(values)).toMatchObject({ status: 'error', message: expect.stringContaining('activation') })
    expect(values.message).toBe('Retain my cargo enquiry')
  })
  it('handles network failure without reporting receipt', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('Offline') }))
    expect(await submitFreightQuote({ ...emptyQuote })).toMatchObject({ status: 'error', message: expect.stringContaining('could not be reached') })
  })
})
