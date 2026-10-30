import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { emptyQuote, quoteFields, quoteStages } from '../../data/quote'
import { activeEnquiryNotices, enquiryNotices } from '../../data/contact'
import { isEnquiryConfigured, submitFreightQuote } from '../../services/enquiries'
import type { FieldErrors, FreightQuote, QuoteStep, SubmissionResult } from '../../types/forms'
import { prepareQuote, validateQuote } from './validation'
import { FormErrorSummary } from './FormError'
import { QuoteProgress } from './QuoteProgress'
import { QuoteStepFields } from './QuoteStepFields'
import { QuoteReview } from './QuoteReview'
import { SubmissionNotice } from './SubmissionNotice'

export function FreightQuoteForm() {
  const [values, setValues] = useState<FreightQuote>(emptyQuote)
  const [step, setStep] = useState<QuoteStep>(0)
  const [visited, setVisited] = useState(0)
  const [errors, setErrors] = useState<FieldErrors<FreightQuote>>({})
  const [interactive, setInteractive] = useState(false)
  // eslint-disable-next-line react/set-state-in-effect -- Enable SSR controls only after their event handlers attach.
  useEffect(() => { setInteractive(true) }, [])
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const [focusRequest, setFocusRequest] = useState<{ target: 'step' | 'summary' | 'notice' } | null>(null)
  const pendingRef = useRef(false)
  const payload = useMemo(() => prepareQuote(values), [values])
  const configured = isEnquiryConfigured()
  const notices = configured ? activeEnquiryNotices : enquiryNotices
  const headingRef = useRef<HTMLHeadingElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const noticeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (focusRequest?.target === 'step') headingRef.current?.focus()
    if (focusRequest?.target === 'summary') summaryRef.current?.focus()
    if (focusRequest?.target === 'notice') noticeRef.current?.focus()
  }, [focusRequest])

  function update(name: keyof FreightQuote, value: string) {
    const next = { ...values, [name]: value }
    setValues(next)
    setResult(null)
    const nextErrors = validateQuote(next, step)
    setErrors(previous => Object.fromEntries(Object.keys(previous).filter(key => nextErrors[key as keyof FreightQuote]).map(key => [key, nextErrors[key as keyof FreightQuote]])))
  }

  function showErrors(nextErrors: FieldErrors<FreightQuote>) {
    const invalidStage = quoteStages.find(stage => stage.fields.some(field => nextErrors[field]))
    if (!invalidStage) { setFocusRequest({ target: 'notice' }); return }
    setStep(invalidStage.step)
    setErrors(Object.fromEntries(Object.entries(nextErrors).filter(([key]) => invalidStage.fields.includes(key as keyof FreightQuote))))
    setFocusRequest({ target: 'summary' })
  }

  function navigate(target: QuoteStep) {
    if (submitting || target === step) return
    setResult(null)
    if (target > step) {
      for (let index = 0; index < target; index++) {
        const nextErrors = validateQuote(values, index as QuoteStep)
        if (Object.keys(nextErrors).length) { showErrors(nextErrors); return }
      }
    }
    setErrors({})
    setStep(target)
    setVisited(previous => Math.max(previous, target))
    setFocusRequest({ target: 'step' })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!interactive || pendingRef.current) return
    if (step < 3) { navigate((step + 1) as QuoteStep); return }
    const nextErrors = validateQuote(values)
    setResult(null)
    if (Object.keys(nextErrors).length) { showErrors(nextErrors); return }
    setErrors({})
    pendingRef.current = true
    setSubmitting(true)
    try {
      const response = await submitFreightQuote(payload)
      setResult(response)
      if (response.fieldErrors && Object.keys(response.fieldErrors).length) showErrors(response.fieldErrors)
      else setFocusRequest({ target: 'notice' })
    }
    catch { setResult({ status: 'error', message: enquiryNotices.error }); setFocusRequest({ target: 'notice' }) }
    finally { pendingRef.current = false; setSubmitting(false) }
  }

  return (
    <div className="quote-experience">
      <QuoteProgress current={step} visited={visited} disabled={submitting || !interactive} onNavigate={navigate} />
      <form method="post" className="enquiry-form quote-form" noValidate onSubmit={handleSubmit} aria-labelledby="quote-step-heading" aria-busy={submitting}>
        <noscript>JavaScript is required to complete and submit this quotation request. No information is submitted while these controls are disabled.</noscript>
        <p className="eyebrow quote-stage-count" aria-live="polite">STEP {step + 1} OF 4</p>
        <h2 id="quote-step-heading" ref={headingRef} tabIndex={-1}>{quoteStages[step].title}</h2>
        <p className="form-introduction">{quoteStages[step].introduction} Fields marked * are required.</p>
        <p className="form-availability">{notices.availability}</p>
        <FormErrorSummary summaryRef={summaryRef} errors={Object.entries(errors).filter(([, message]) => Boolean(message)).map(([name, message]) => ({ id: `quote-${name}`, label: quoteFields[name as keyof FreightQuote].label, message: message! }))} />
        <fieldset className="form-fields" disabled={submitting || !interactive}>
          <legend className="sr-only">{quoteStages[step].title}</legend>
          <QuoteStepFields step={step} values={values} errors={errors} onChange={update} />
        </fieldset>
        {step === 3 && <QuoteReview values={values} disabled={submitting || !interactive} onEdit={navigate} />}
        <p className="form-privacy">{notices.privacy}</p>
        <div className="form-actions">
          {step > 0 && <button type="button" className="button form-back-button" disabled={submitting || !interactive} onClick={() => navigate((step - 1) as QuoteStep)}>Previous</button>}
          <button type="submit" className="button button--primary" disabled={submitting || !interactive}>{submitting ? (configured ? 'Submitting enquiry…' : 'Checking enquiry…') : step === 3 ? (configured ? 'Submit freight enquiry' : 'Prepare freight enquiry') : 'Next'}</button>
        </div>
        <SubmissionNotice result={result} noticeRef={noticeRef} />
      </form>
    </div>
  )
}
