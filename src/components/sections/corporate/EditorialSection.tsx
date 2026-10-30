import type { CorporateSection } from '../../../types/corporate'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { OperationsImage } from '../home/OperationsImage'
import { enterpriseCTA } from '../../../data/corporate'

export function EditorialSection({ content, image = false, reverse = false, quote = false }: { content: CorporateSection; image?: boolean; reverse?: boolean; quote?: boolean }) {
  return (
    <section id={content.id} className={`corporate-section ${reverse ? 'corporate-section--tinted' : ''}`} aria-labelledby={`${content.id}-heading`}>
      <Container className={`corporate-editorial ${image ? 'corporate-editorial--image' : ''} ${reverse && image ? 'corporate-editorial--reverse' : ''}`}>
        <div className="corporate-copy">
          <p className="eyebrow editorial-eyebrow">{content.eyebrow}</p>
          <h2 id={`${content.id}-heading`}>{content.heading}</h2>
          <div className="corporate-prose">{content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          {content.highlights && <ul className="corporate-highlights" role="list">{content.highlights.map((item) => <li key={item}>{item}</li>)}</ul>}
          {content.note && <p className="corporate-note">{content.note}</p>}
          {quote && <Button to={enterpriseCTA.primary.to}>{enterpriseCTA.primary.label}</Button>}
        </div>
        {image && <OperationsImage className="corporate-image" variant={content.id === 'vehicle-maintenance' ? 'delivery' : content.id === 'fleet-operations' ? 'curtainside' : 'container'} />}
      </Container>
    </section>
  )
}
