import { ClipboardCheck, ShieldCheck, Truck, UserRound, Wrench } from 'lucide-react'
import type { CorporateSection } from '../../../types/corporate'
import { Container } from '../../ui/Container'
import { OperationsImage } from '../home/OperationsImage'

const icons = [Truck, UserRound, Wrench, ClipboardCheck]
export function OperationsOverview({ sections, safety = false }: { sections: CorporateSection[]; safety?: boolean }) {
  return <section className="corporate-section"><Container className="operations-overview"><div className="operations-overview-list">{sections.map((section, index) => {
    const Icon = safety && index === 0 ? ShieldCheck : icons[index % icons.length]
    return <article id={section.id} key={section.id}><Icon aria-hidden="true" /><div><h2>{section.eyebrow.replace(/^\d+\s*\/\s*/, '').toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase())}</h2><p>{section.highlights?.join(' · ')}</p></div></article>
  })}</div><OperationsImage variant={safety ? 'delivery' : 'curtainside'} /></Container></section>
}
