import { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { navigation } from '../../data/pages'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Brand } from './Brand'
import { MobileNavigation } from './MobileNavigation'

export function Header() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  return (
    <header className="site-header">
      <div className="header-utility"><Container><span>HAULAGE. CARGO. CLEARING.</span><span>KENYA <span aria-hidden="true">↔</span> UGANDA</span></Container></div>
      <Container className="header-inner">
        <Brand />
        <nav className="desktop-navigation" aria-label="Primary">
          {navigation.map(({ path, label }) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}
        </nav>
        <Button to="/request-quote" className="header-quote">Request a Quote</Button><Button to="/contact" className="header-contact">Contact</Button>
        <button type="button" className="icon-button menu-toggle" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={() => setOpen(true)}><Menu aria-hidden="true" /></button>
      </Container>
      <MobileNavigation open={open} onClose={close} />
    </header>
  )
}
