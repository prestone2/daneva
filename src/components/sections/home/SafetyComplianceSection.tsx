import { safetyContent } from '../../../data/home'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { OperationsImage } from './OperationsImage'

export function SafetyComplianceSection() {
  return (
    <section className="home-editorial safety-section" aria-labelledby="safety-heading">
      <Container>
        <div className="safety-introduction">
          <div>
            <p className="eyebrow editorial-eyebrow">{safetyContent.eyebrow}</p>
            <h2 id="safety-heading" className="editorial-heading">{safetyContent.heading}</h2>
          </div>
          <p className="editorial-description">{safetyContent.description}</p>
        </div>
        <div className="safety-layout">
          <div className="safety-visual">
            <OperationsImage variant="flatbed" className="safety-image" />
            <Button to={safetyContent.cta.to}>{safetyContent.cta.label}</Button>
          </div>
          <ol className="safety-principles">
            {safetyContent.features.map(({ title, description }, index) => (
              <li key={title}>
                <span className="operation-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
