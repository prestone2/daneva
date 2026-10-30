export interface ContactEnquiry {
  fullName: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface FreightQuote {
  company: string
  contactPerson: string
  email: string
  phone: string
  cargoType: string
  containerSize: string
  weight: string
  containerCount: string
  cargoDescription: string
  origin: string
  destination: string
  collectionDate: string
  handling: string
  clearing: string
  notes: string
}

export interface FieldDefinition {
  label: string
  required?: boolean
  maxLength?: number
}

export interface SelectOption {
  value: string
  label: string
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>
export type QuoteStep = 0 | 1 | 2 | 3

export interface SubmissionResult {
  status: 'unavailable' | 'error' | 'received'
  message: string
  reference?: string
  fieldErrors?: Record<string, string>
}
