import { describe, expect, it } from 'vitest'
import { emptyContact } from '../src/data/contact'
import { emptyQuote } from '../src/data/quote'
import { localToday, prepareQuote, validateContact, validateQuote } from '../src/components/forms/validation'

describe('enquiry validation', () => {
  it('requires contact name, email, subject and message but permits omitted company and phone', () => {
    expect(Object.keys(validateContact(emptyContact)).sort()).toEqual(['email', 'fullName', 'message', 'subject'])
    expect(validateContact({ ...emptyContact, fullName: '   ' }).fullName).toBeTruthy()
    expect(validateContact({ ...emptyContact, fullName: 'Test Person', email: 'person@example.com', subject: 'Transport Enquiry', message: 'Cargo enquiry' })).toEqual({})
  })

  it.each(['person', 'person@', '@company.com', 'person@company', 'person @company.com', 'person@company..com'])('rejects invalid email %s', email => {
    expect(validateContact({ ...emptyContact, email }).email).toMatch(/valid email/)
    expect(validateQuote({ ...emptyQuote, email }, 0).email).toMatch(/valid email/)
  })

  it('enforces limits and allows practical international phone formatting', () => {
    expect(validateContact({ ...emptyContact, message: 'x'.repeat(3001) }).message).toMatch(/3?000|3000/)
    expect(validateContact({ ...emptyContact, phone: '+256 (703) 761-117' }).phone).toBeUndefined()
    expect(validateContact({ ...emptyContact, phone: 'call me' }).phone).toBeTruthy()
    expect(validateContact({ ...emptyContact, subject: 'Unknown subject' }).subject).toBeTruthy()
  })

  it('validates only the requested quote stage and requires contact phone', () => {
    expect(Object.keys(validateQuote(emptyQuote, 0)).sort()).toEqual(['company', 'contactPerson', 'email', 'phone'])
    expect(Object.keys(validateQuote(emptyQuote, 1)).sort()).toEqual(['cargoDescription', 'cargoType'])
    expect(Object.keys(validateQuote(emptyQuote, 2)).sort()).toEqual(['destination', 'origin'])
    expect(validateQuote(emptyQuote, 3)).toEqual({})
  })

  it('checks numeric shipment details and collection dates', () => {
    expect(validateQuote({ ...emptyQuote, weight: '-2' }, 1).weight).toBeTruthy()
    expect(validateQuote({ ...emptyQuote, weight: '12.125' }, 1).weight).toBeUndefined()
    expect(validateQuote({ ...emptyQuote, cargoType: 'Containerised Cargo', containerCount: '1.5' }, 1).containerCount).toBeTruthy()
    expect(validateQuote({ ...emptyQuote, cargoType: 'Containerised Cargo', containerCount: '0' }, 1).containerCount).toBeTruthy()
    expect(validateQuote({ ...emptyQuote, collectionDate: '2000-01-01' }, 2).collectionDate).toBeTruthy()
    expect(validateQuote({ ...emptyQuote, collectionDate: '2099-02-31' }, 2).collectionDate).toBeTruthy()
    expect(validateQuote({ ...emptyQuote, collectionDate: localToday() }, 2).collectionDate).toBeUndefined()
  })

  it('accepts unrestricted origin/destination and omits inactive container details from the payload', () => {
    expect(validateQuote({ ...emptyQuote, origin: 'Jinja warehouse', destination: 'Custom consignee yard' }, 2)).toEqual({})
    const values = { ...emptyQuote, cargoType: 'Bulk Cargo', containerSize: '40ft', containerCount: '2' }
    expect(prepareQuote(values)).toMatchObject({ containerSize: '', containerCount: '' })
    expect(values.containerSize).toBe('40ft')
  })
})
