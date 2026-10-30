import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { Container } from '../components/ui/Container'
import { FreightQuoteForm } from '../components/forms/FreightQuoteForm'
import { quoteHero } from '../data/quote'

export function QuotePage() {
  return <><InternalPageHero content={quoteHero} /><section className="enquiry-section quote-section" aria-label="Prepare a freight quotation enquiry"><Container><FreightQuoteForm /></Container></section></>
}
