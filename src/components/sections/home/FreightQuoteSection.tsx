import { quoteContent } from '../../../data/home'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'

export function FreightQuoteSection() {
  return (
    <section className="freight-quote-section" aria-labelledby="freight-quote-heading">
      <Container className="freight-quote-layout">
        <div>
          <span className="quote-accent" aria-hidden="true" />
          <h2 id="freight-quote-heading" className="editorial-heading">{quoteContent.heading}</h2>
          <p>{quoteContent.description}</p>
        </div>
        <div className="freight-quote-actions">
          <Button to={quoteContent.primary.to}>{quoteContent.primary.label}</Button>
          <Button to={quoteContent.secondary.to} variant="secondary">{quoteContent.secondary.label}</Button>
        </div>
      </Container>
    </section>
  )
}
