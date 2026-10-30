import { quoteStages } from '../../data/quote'
import type { QuoteStep } from '../../types/forms'

export function QuoteProgress({ current, visited, disabled, onNavigate }: { current: QuoteStep; visited: number; disabled: boolean; onNavigate: (step: QuoteStep) => void }) {
  return (
    <nav className="quote-progress" aria-label="Quotation stages">
      <ol>{quoteStages.map(({ step, title }) => <li key={step} className={current === step ? 'is-current' : ''}>
        <button type="button" onClick={() => onNavigate(step)} disabled={disabled || step > visited} aria-current={current === step ? 'step' : undefined}>
          <span aria-hidden="true">{String(step + 1).padStart(2, '0')}</span><span>{title}</span>
          <span className="sr-only">{step > visited ? ' — complete the preceding stages first' : ''}</span>
        </button>
      </li>)}</ol>
    </nav>
  )
}
