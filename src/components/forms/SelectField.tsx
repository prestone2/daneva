import type { ComponentPropsWithoutRef } from 'react'
import type { SelectOption } from '../../types/forms'
import { FormError } from './FormError'

export function SelectField({ id, label, error, hint, required, options, placeholder = 'Select an option', ...props }: ComponentPropsWithoutRef<'select'> & { id: string; label: string; error?: string; hint?: string; options: SelectOption[]; placeholder?: string }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <select {...props} id={id} required={required} aria-invalid={Boolean(error)} aria-describedby={[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined}>
        <option value="">{placeholder}</option>
        {options.map(({ value, label: optionLabel }) => <option key={value} value={value}>{optionLabel}</option>)}
      </select>
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      <FormError id={`${id}-error`} message={error} />
    </div>
  )
}
