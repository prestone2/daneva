import { Metadata } from '../components/ui/Metadata'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return <><Metadata title="Page Not Found | Daneva Co. Limited" description="The requested page could not be found." noIndex /><section className="page-shell"><Container><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>Let’s get you back on route.</h1><p>The page you’re looking for doesn’t exist or may have moved.</p><Button to="/">Back to Home</Button></Container></section></>
}
