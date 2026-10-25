import { capabilities } from '../../../data/capabilities'
import { Container } from '../../ui/Container'

export function CapabilityStrip() {
  return (
    <section className="capability-strip" aria-labelledby="capabilities-heading">
      <Container>
        <h2 id="capabilities-heading" className="sr-only">Our operational capabilities</h2>
        <ul className="capability-grid">
          {capabilities.map(({ title, caption, icon: Icon }) => (
            <li key={title}><Icon size={29} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{caption}</p></li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
