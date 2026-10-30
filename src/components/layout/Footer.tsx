import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { footerContent, footerGroups } from '../../data/footer'
import { Container } from '../ui/Container'
import { Brand } from './Brand'

const currentYear = Number(import.meta.env.BUILD_YEAR) || new Date().getUTCFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div className="footer-identity">
            <Brand />
            <p>{footerContent.description}</p>
            <address className="footer-location"><MapPin size={17} aria-hidden="true" />{footerContent.location}</address>
          </div>
          <nav className="footer-navigation" aria-label="Footer">
            {footerGroups.map(({ title, links }) => (
              <div className="footer-group" key={title}>
                <h2>{title}</h2>
                <ul>{links.map(({ to, label }) => <li key={label}><Link to={to}>{label}</Link></li>)}</ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-wordmark" aria-hidden="true">DANEVA<span>↗</span></div>
        <div className="footer-bottom"><p>© {currentYear} {footerContent.copyright}</p><span>{footerContent.region}</span></div>
      </Container>
    </footer>
  )
}
