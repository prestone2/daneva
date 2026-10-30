import { enquiryNotices } from '../data/contact'
import type { ContactEnquiry, FreightQuote, SubmissionResult } from '../types/forms'

export const formSubmitRecipient = () => import.meta.env.VITE_FORMSUBMIT_RECIPIENT?.trim() || ''
export const isEnquiryConfigured = () => Boolean(formSubmitRecipient())
// Reuse an in-flight request for the same immutable form snapshot.
const pending = new WeakMap<object, Promise<SubmissionResult>>()
export const ENQUIRY_TIMEOUT_MS = 15000

function submit(type: 'contact' | 'quote', payload: Readonly<ContactEnquiry | FreightQuote>): Promise<SubmissionResult> {
  const recipient = formSubmitRecipient()
  if (!recipient) return Promise.resolve({ status: 'unavailable', message: enquiryNotices.unavailable })
  const existing = pending.get(payload)
  if (existing) return existing
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), ENQUIRY_TIMEOUT_MS)
  const request = (async (): Promise<SubmissionResult> => {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: type === 'quote' ? 'Daneva — New freight quote request' : `Daneva — ${'subject' in payload ? payload.subject : 'Contact enquiry'}`, _template: 'table', _replyto: payload.email }),
        signal: controller.signal, credentials: 'omit',
      })
      const data: unknown = await response.json()
      if (!data || typeof data !== 'object') return { status: 'error', message: enquiryNotices.error }
      const result = data as { success?: unknown; message?: unknown }
      if (response.ok && (result.success === true || result.success === 'true')) return { status: 'received', message: 'Thank you. Your enquiry has been submitted. Our team will be in touch using the contact details you provided.' }
      const activation = typeof result.message === 'string' && /activat/i.test(result.message)
      return { status: 'error', message: activation ? 'Email delivery is awaiting mailbox activation. Please contact Daneva by phone in the meantime. Your entries are still here.' : enquiryNotices.error }
    } catch {
      return { status: 'error', message: controller.signal.aborted ? 'The request timed out. Your entries are still here. Please retry.' : 'The service could not be reached. Your entries are still here. Please retry.' }
    } finally { clearTimeout(timeout); pending.delete(payload) }
  })()
  pending.set(payload, request)
  return request
}

export function submitContactEnquiry(enquiry: Readonly<ContactEnquiry>): Promise<SubmissionResult> { return submit('contact', enquiry) }
export function submitFreightQuote(quote: Readonly<FreightQuote>): Promise<SubmissionResult> { return submit('quote', quote) }
