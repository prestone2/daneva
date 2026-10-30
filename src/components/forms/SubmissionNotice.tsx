import type { Ref } from 'react'
import { companyContact } from '../../data/contact'
import type { SubmissionResult } from '../../types/forms'

export function SubmissionNotice({ result, noticeRef }: { result: SubmissionResult | null; noticeRef: Ref<HTMLDivElement> }) {
  if (!result) return null
  return <div className="submission-notice" ref={noticeRef} tabIndex={-1} role="status"><p>{result.message}</p><a href={companyContact.phone.href}>Call Daneva: {companyContact.phone.display}</a><p className="field-hint">Contact details are subject to final client approval.</p></div>
}
