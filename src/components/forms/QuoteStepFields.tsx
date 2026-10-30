import type { ChangeEvent } from 'react'
import { cargoTypes, clearingOptions, containerSizes, quoteFields, suggestedDestinations, suggestedOrigins } from '../../data/quote'
import type { FieldErrors, FreightQuote, QuoteStep } from '../../types/forms'
import { TextField } from './TextField'
import { TextareaField } from './TextareaField'
import { SelectField } from './SelectField'
import { localToday } from './validation'

export function QuoteStepFields({ step, values, errors, onChange }: { step: QuoteStep; values: FreightQuote; errors: FieldErrors<FreightQuote>; onChange: (name: keyof FreightQuote, value: string) => void }) {
  function field(name: keyof FreightQuote) {
    return {
      ...quoteFields[name], id: `quote-${name}`, name, value: values[name], error: errors[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(name, event.target.value),
    }
  }

  if (step === 0) return <div className="form-grid">
    <TextField {...field('company')} autoComplete="organization" />
    <TextField {...field('contactPerson')} autoComplete="name" />
    <TextField {...field('email')} type="email" autoComplete="email" inputMode="email" />
    <TextField {...field('phone')} type="tel" autoComplete="tel" hint="Include a country code for international numbers." />
  </div>

  if (step === 1) return <>
    <SelectField {...field('cargoType')} options={cargoTypes} placeholder="Choose a cargo type" />
    {values.cargoType === 'Containerised Cargo' && <div className="form-grid">
      <SelectField {...field('containerSize')} options={containerSizes} placeholder="Select size (optional)" hint="20ft / 40ft support and handling arrangements require client confirmation." />
      <TextField {...field('containerCount')} inputMode="numeric" hint="Optional. Enter a whole number greater than zero." />
    </div>}
    <TextField {...field('weight')} inputMode="decimal" hint="Optional. Tonnes, using a decimal point if needed (for example, 12.5)." />
    <TextareaField {...field('cargoDescription')} hint="Describe the goods and their handling needs. Maximum 3,000 characters." />
  </>

  if (step === 2) return <>
    <div className="form-grid">
      <TextField {...field('origin')} list="origin-suggestions" hint="Type any collection point or choose a suggestion." />
      <TextField {...field('destination')} list="destination-suggestions" hint="Type any destination or choose a suggestion." />
    </div>
    <datalist id="origin-suggestions">{suggestedOrigins.map(value => <option key={value} value={value} />)}</datalist>
    <datalist id="destination-suggestions">{suggestedDestinations.map(value => <option key={value} value={value} />)}</datalist>
    <TextField {...field('collectionDate')} type="date" min={localToday()} hint="Optional preference, not a confirmed collection date." />
    <TextareaField {...field('handling')} hint="Optional. Mention loading, unloading or other handling requirements. Maximum 2,000 characters." />
  </>

  return <>
    <SelectField {...field('clearing')} options={clearingOptions} />
    <TextareaField {...field('notes')} hint="Optional. Add anything else the team should know. Maximum 3,000 characters." />
  </>
}
