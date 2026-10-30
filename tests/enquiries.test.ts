import { describe, expect, it, vi } from 'vitest'
import { submitContactEnquiry, submitFreightQuote } from '../src/services/enquiries'
import { emptyContact, enquiryNotices } from '../src/data/contact'
import { emptyQuote } from '../src/data/quote'

describe('unavailable submission boundary', () => {
  it('never sends, stores or logs enquiry data and never claims delivery', async () => {
    const network = vi.spyOn(globalThis, 'fetch')
    const storage = vi.spyOn(Storage.prototype, 'setItem')
    const log = vi.spyOn(console, 'log')
    const contact = { ...emptyContact, fullName: 'Test Person' }
    const quote = { ...emptyQuote, company: 'Test Company' }
    for (const result of await Promise.all([submitContactEnquiry(contact), submitFreightQuote(quote)])) {
      expect(result).toEqual({ status: 'unavailable', message: enquiryNotices.unavailable })
    }
    expect(network).not.toHaveBeenCalled()
    expect(storage).not.toHaveBeenCalled()
    expect(log).not.toHaveBeenCalled()
    expect(contact.fullName).toBe('Test Person')
    expect(quote.company).toBe('Test Company')
  })
})
