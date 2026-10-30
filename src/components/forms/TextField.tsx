import type { ComponentPropsWithoutRef } from 'react'
import { FormError } from './FormError'

export type TextFieldProps = ComponentPropsWithoutRef<'input'> & { id: string; label: string; error?: string; hint?: string }

export function TextField({ id, label, error, hint, required, ...props }: TextFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <input {...props} id={id} required={required} aria-invalid={Boolean(error)} aria-describedby={[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined} />
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      <FormError id={`${id}-error`} message={error} />
    </div>
  )
}
