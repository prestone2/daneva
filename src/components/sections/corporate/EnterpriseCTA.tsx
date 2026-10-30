import { enterpriseCTA } from '../../../data/corporate'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'

export function EnterpriseCTA() {
  return (
    <section className="enterprise-cta" aria-labelledby="enterprise-cta-heading">
      <Container className="enterprise-cta-layout">
        <div><p className="eyebrow">{enterpriseCTA.eyebrow}</p><h2 id="enterprise-cta-heading">{enterpriseCTA.heading}</h2><p>{enterpriseCTA.description}</p></div>
        <div className="enterprise-cta-actions">
          <Button to={enterpriseCTA.primary.to}>{enterpriseCTA.primary.label}</Button>
          <Button to={enterpriseCTA.secondary.to} variant="secondary">{enterpriseCTA.secondary.label}</Button>
        </div>
      </Container>
    </section>
  )
}
