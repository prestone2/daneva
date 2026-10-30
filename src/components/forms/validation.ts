import { contactFields, contactSubjects } from '../../data/contact'
import { cargoTypes, clearingOptions, containerSizes, quoteFields, quoteStages } from '../../data/quote'
import type { ContactEnquiry, FieldDefinition, FieldErrors, FreightQuote, QuoteStep } from '../../types/forms'

function validateFields<T extends object>(values: T, definitions: Record<keyof T, FieldDefinition>): FieldErrors<T> {
  const errors: FieldErrors<T> = {}
  for (const key of Object.keys(definitions) as (keyof T)[]) {
    const value = String(values[key]).trim()
    const definition = definitions[key]
    if (definition.required && !value) errors[key] = `Enter ${definition.label.toLowerCase()}.`
    else if (definition.maxLength && String(values[key]).length > definition.maxLength) errors[key] = `Use ${definition.maxLength} characters or fewer for ${definition.label.toLowerCase()}.`
  }
  return errors
}

function emailError(value: string): string | undefined {
  if (value.trim() && !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value.trim())) return 'Enter a valid email address, such as name@company.com.'
}

function phoneError(value: string): string | undefined {
  if (!value.trim()) return
  const digits = value.replace(/\D/g, '')
  if (!/^\+?[\d\s().-]+$/.test(value.trim()) || digits.length < 7 || digits.length > 15) return 'Enter a phone number with 7–15 digits. You may include +, spaces, brackets or hyphens.'
}

export function validateContact(values: ContactEnquiry): FieldErrors<ContactEnquiry> {
  const errors = validateFields(values, contactFields)
  errors.email ||= emailError(values.email)
  errors.phone ||= phoneError(values.phone)
  if (!contactSubjects.some(option => option.value === values.subject)) errors.subject = 'Choose a subject for your enquiry.'
  return cleanErrors(errors)
}

export function localToday(): string {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

export function validateQuote(values: FreightQuote, step?: QuoteStep): FieldErrors<FreightQuote> {
  const errors = validateFields(values, quoteFields)
  errors.email ||= emailError(values.email)
  errors.phone ||= phoneError(values.phone)
  if (!cargoTypes.some(option => option.value === values.cargoType)) errors.cargoType = 'Choose the type of cargo you need to move.'
  if (values.cargoType === 'Containerised Cargo') {
    if (values.containerSize && !containerSizes.some(option => option.value === values.containerSize)) errors.containerSize = 'Choose a container size or Other / Not Sure.'
    if (values.containerCount && (!/^\d+$/.test(values.containerCount) || Number(values.containerCount) < 1)) errors.containerCount = 'Enter a whole number of containers greater than zero.'
  } else {
    delete errors.containerCount
    delete errors.containerSize
  }
  if (values.weight && (!/^\d+(?:\.\d{1,3})?$/.test(values.weight) || Number(values.weight) <= 0)) errors.weight = 'Enter a weight greater than zero, using up to 3 decimal places.'
  if (values.collectionDate) {
    const date = new Date(`${values.collectionDate}T12:00:00Z`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.collectionDate) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== values.collectionDate || values.collectionDate < localToday()) errors.collectionDate = 'Choose today or a future collection date.'
  }
  if (!clearingOptions.some(option => option.value === values.clearing)) errors.clearing = 'Choose Yes, No or Not Sure.'
  const cleaned = cleanErrors(errors)
  if (step === undefined) return cleaned
  return Object.fromEntries(Object.entries(cleaned).filter(([key]) => quoteStages[step].fields.includes(key as keyof FreightQuote)))
}

function cleanErrors<T>(errors: FieldErrors<T>): FieldErrors<T> {
  return Object.fromEntries(Object.entries(errors).filter(([, value]) => Boolean(value))) as FieldErrors<T>
}

export function prepareQuote(values: FreightQuote): FreightQuote {
  return { ...values, ...(values.cargoType !== 'Containerised Cargo' ? { containerSize: '', containerCount: '' } : {}) }
}
