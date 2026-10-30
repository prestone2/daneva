import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { activeEnquiryNotices, contactFields, contactSubjects, emptyContact, enquiryNotices } from '../../data/contact'
import { isEnquiryConfigured, submitContactEnquiry } from '../../services/enquiries'
import type { ContactEnquiry, FieldErrors, SubmissionResult } from '../../types/forms'
import { validateContact } from './validation'
import { TextField } from './TextField'
import { SelectField } from './SelectField'
import { TextareaField } from './TextareaField'
import { FormErrorSummary } from './FormError'
import { SubmissionNotice } from './SubmissionNotice'

export function ContactForm() {
  const [values, setValues] = useState<ContactEnquiry>(emptyContact)
  const [errors, setErrors] = useState<FieldErrors<ContactEnquiry>>({})
  const [interactive, setInteractive] = useState(false)
  // eslint-disable-next-line react/set-state-in-effect -- Enable SSR controls only after their event handlers attach.
  useEffect(() => { setInteractive(true) }, [])
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const [attempt, setAttempt] = useState(0)
  const pendingRef = useRef(false)
  const configured = isEnquiryConfigured()
  const notices = configured ? activeEnquiryNotices : enquiryNotices
  const summaryRef = useRef<HTMLDivElement>(null)
  const noticeRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (attempt) summaryRef.current?.focus() }, [attempt])
  useEffect(() => { if (result && !result.fieldErrors) noticeRef.current?.focus() }, [result])

  function field(name: keyof ContactEnquiry) {
    return {
      ...contactFields[name], id: `contact-${name}`, name, value: values[name], error: errors[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const next = { ...values, [name]: event.target.value }
        setValues(next)
        setResult(null)
        if (errors[name]) setErrors(previous => ({ ...previous, [name]: validateContact(next)[name] }))
      },
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!interactive || pendingRef.current) return
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    setResult(null)
    if (Object.keys(nextErrors).length) { setAttempt(value => value + 1); return }
    pendingRef.current = true
    setSubmitting(true)
    try {
      const response = await submitContactEnquiry(values)
      setResult(response)
      if (response.fieldErrors) { setErrors(response.fieldErrors); setAttempt(value => value + 1) }
    }
    catch { setResult({ status: 'error', message: enquiryNotices.error }) }
    finally { pendingRef.current = false; setSubmitting(false) }
  }

  return (
    <form method="post" className="enquiry-form" noValidate onSubmit={handleSubmit} aria-labelledby="contact-form-heading" aria-busy={submitting}>
      <noscript>JavaScript is required to submit this enquiry. No information is submitted while these controls are disabled.</noscript>
      <h2 id="contact-form-heading">Discuss Your Requirements.</h2>
      <p className="form-introduction">Fields marked * are required.</p>
      <p className="form-availability">{notices.availability}</p>
      <FormErrorSummary summaryRef={summaryRef} errors={Object.entries(errors).filter(([, message]) => Boolean(message)).map(([name, message]) => ({ id: `contact-${name}`, label: contactFields[name as keyof ContactEnquiry].label, message: message! }))} />
      <fieldset disabled={submitting || !interactive} className="form-fields">
        <legend className="sr-only">Your contact enquiry</legend>
        <div className="form-grid">
          <TextField {...field('fullName')} autoComplete="name" />
          <TextField {...field('company')} autoComplete="organization" />
          <TextField {...field('email')} type="email" autoComplete="email" inputMode="email" />
          <TextField {...field('phone')} type="tel" autoComplete="tel" hint="Optional. Include a country code for international numbers." />
        </div>
        <SelectField {...field('subject')} options={contactSubjects} placeholder="Choose an enquiry subject" />
        <TextareaField {...field('message')} hint="Describe what you need. Maximum 3,000 characters." />
      </fieldset>
      <p className="form-privacy">{notices.privacy}</p>
      <button type="submit" className="button button--primary" disabled={submitting || !interactive}>{submitting ? (configured ? 'Submitting enquiry…' : 'Checking enquiry…') : (configured ? 'Submit enquiry' : 'Prepare enquiry')}</button>
      <SubmissionNotice result={result} noticeRef={noticeRef} />
    </form>
  )
}
