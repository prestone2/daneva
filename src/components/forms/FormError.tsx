import type { Ref } from 'react'

export function FormError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="field-error" id={id}>{message}</p> : null
}

export function FormErrorSummary({ errors, summaryRef }: { errors: { id: string; label: string; message: string }[]; summaryRef: Ref<HTMLDivElement> }) {
  if (!errors.length) return null
  return (
    <div className="form-error-summary" ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="form-errors-title">
      <h3 id="form-errors-title">Please check the following fields</h3>
      <ul>{errors.map(({ id, label, message }) => <li key={id}><a href={`#${id}`} onClick={(event) => { event.preventDefault(); document.getElementById(id)?.focus() }}>{label}: {message}</a></li>)}</ul>
    </div>
  )
}
