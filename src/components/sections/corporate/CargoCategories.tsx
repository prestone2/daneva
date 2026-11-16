import { Boxes, Container as ContainerIcon, Package, Truck } from 'lucide-react'
import { Container } from '../../ui/Container'

const categories = [
  { icon: ContainerIcon, title: 'Containerised Cargo', description: 'Cargo carried in shipping containers, with collection, container details and destination handling coordinated for the journey.' },
  { icon: Package, title: 'Bagged Cargo', description: 'Goods packed in bags, with loading, securing and unloading requirements discussed for each shipment.' },
  { icon: Truck, title: 'Bulk Cargo', description: 'Unpackaged cargo with transport arrangements based on the material, weight and handling requirements.' },
  { icon: Boxes, title: 'Loose Cargo', description: 'Individual items and unpackaged goods, planned around their dimensions, securing and handling needs.' },
]

export function CargoCategories() {
  return <section className="feedback-section feedback-section--tinted" aria-labelledby="cargo-categories-heading"><Container><div className="feedback-heading"><p className="home-section-label">CARGO TYPES</p><h2 id="cargo-categories-heading">What We Carry</h2><p>Share your cargo details so our team can confirm suitable transport and handling arrangements.</p></div><div className="feedback-grid feedback-grid--four">{categories.map(({ icon: Icon, title, description }) => <article className="feedback-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></Container></section>
}
