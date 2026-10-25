import { aboutContent } from '../../../data/home'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { OperationsImage } from './OperationsImage'

export function AboutPreviewSection() {
  return (
    <section className="home-editorial about-section" aria-labelledby="about-heading">
      <Container className="about-layout">
        <div className="editorial-copy">
          <p className="eyebrow editorial-eyebrow">{aboutContent.eyebrow}</p>
          <h2 id="about-heading" className="editorial-heading">{aboutContent.heading}</h2>
          <p className="editorial-description">{aboutContent.description}</p>
          <ul className="about-capabilities" role="list">
            {aboutContent.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
          <Button to={aboutContent.cta.to}>{aboutContent.cta.label}</Button>
        </div>
        <OperationsImage className="about-image" />
      </Container>
    </section>
  )
}
