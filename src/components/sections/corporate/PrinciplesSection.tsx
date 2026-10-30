import type { Principle } from '../../../types/corporate'
import { Container } from '../../ui/Container'

export function PrinciplesSection({ id, eyebrow, heading, items }: { id: string; eyebrow: string; heading: string; items: Principle[] }) {
  return (
    <section className="corporate-section" aria-labelledby={`${id}-heading`}>
      <Container className="corporate-principles-layout">
        <div><p className="eyebrow editorial-eyebrow">{eyebrow}</p><h2 id={`${id}-heading`}>{heading}</h2></div>
        <ol className="corporate-principles" role="list">
          {items.map(({ title, description }, index) => <li key={title}><span className="operation-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ol>
      </Container>
    </section>
  )
}
