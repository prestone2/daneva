import type { PageDefinition } from '../types/site'
import { Metadata } from '../components/ui/Metadata'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function PlaceholderPage({ page }: { page: PageDefinition }) {
  return (
    <>
      <Metadata {...page} noIndex />
      <section className="page-shell" aria-labelledby="page-heading">
        <Container>
          <p className="eyebrow">DANEVA CO. LIMITED</p>
          <h1 id="page-heading">{page.path === '/safety-compliance' ? 'Safety & Compliance' : page.label}</h1>
          <p className="shell-status">Page in preparation</p>
          <p>{page.path === '/request-quote' ? 'The freight enquiry form is not available yet. This page is reserved for the upcoming quote experience.' : 'This page is reserved for the next phase of the Daneva website. Further information will be added here.'}</p>
          {page.path === '/contact' && <address>Headquarters: Plot 3B, Sembuule Road, Kampala, Uganda.</address>}
          <Button to="/">Back to Home</Button>
        </Container>
      </section>
    </>
  )
}
