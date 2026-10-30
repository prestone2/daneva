import { InternalPageHero } from '../components/sections/corporate/InternalPageHero'
import { Container } from '../components/ui/Container'
import { ContactForm } from '../components/forms/ContactForm'
import { companyContact, contactHero } from '../data/contact'

export function ContactPage() {
  return <>
    <InternalPageHero content={contactHero} variant="light" />
    <section className="enquiry-section" aria-label="Company contact details and enquiry form">
      <Container className="contact-layout">
        <div className="contact-information">
          <p className="eyebrow editorial-eyebrow">KENYA & UGANDA</p>
          <h2>{companyContact.company}</h2>
          <p>{companyContact.context}</p>
          <dl className="contact-details">
            <div><dt>Uganda headquarters</dt><dd><address>{companyContact.headquarters.map(line => <span key={line}>{line}</span>)}</address></dd></div>
            <div><dt>Kenya operational presence</dt><dd>{companyContact.kenyaPresence}</dd></div>
            <div><dt>Additional supplied location</dt><dd>{companyContact.suppliedLocation.map(line => <span key={line}>{line}</span>)}</dd></div>
            <div><dt>Postal address</dt><dd>{companyContact.postal}</dd></div>
            <div><dt>Telephone</dt><dd><a href={companyContact.phone.href}>{companyContact.phone.display}</a></dd></div>
          </dl>
          <p className="contact-approval">{companyContact.approvalNotice}</p>
        </div>
        <ContactForm />
      </Container>
    </section>
  </>
}
