import { quoteFields, quoteStages } from '../../data/quote'
import type { FreightQuote, QuoteStep } from '../../types/forms'

export function QuoteReview({ values, disabled, onEdit }: { values: FreightQuote; disabled: boolean; onEdit: (step: QuoteStep) => void }) {
  const groups = [
    { step: 0 as const, title: 'Shipper details', fields: quoteStages[0].fields },
    { step: 1 as const, title: 'Cargo details', fields: quoteStages[1].fields.filter(field => values.cargoType === 'Containerised Cargo' || !['containerSize', 'containerCount'].includes(field)) },
    { step: 2 as const, title: 'Transport details', fields: quoteStages[2].fields },
    { step: 3 as const, title: 'Clearing & additional notes', fields: quoteStages[3].fields },
  ]
  return (
    <section className="quote-review" aria-labelledby="quote-review-heading">
      <h3 id="quote-review-heading">Review Your Enquiry</h3>
      <p className="field-hint">Check these details. This is an enquiry summary, not a booking or confirmed quotation.</p>
      {groups.map(({ step, title, fields }) => <div className="review-group" key={step}>
        <div className="review-group-heading"><h4>{title}</h4>{step < 3 && <button className="form-text-button" type="button" disabled={disabled} onClick={() => onEdit(step)}>Edit<span className="sr-only"> {title.toLowerCase()}</span></button>}</div>
        <dl>{fields.map(name => <div key={name}><dt>{quoteFields[name].label}</dt><dd>{values[name].trim() || 'Not provided'}</dd></div>)}</dl>
      </div>)}
    </section>
  )
}
