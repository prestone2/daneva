import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { navigation } from '../../data/pages'
import { Button } from '../ui/Button'

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const desktop = window.matchMedia('(min-width: 1280px)')
    const handleResize = () => { if (desktop.matches) onClose() }
    desktop.addEventListener('change', handleResize)
    return () => {
      desktop.removeEventListener('change', handleResize)
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [open, onClose])

  return (
    <dialog ref={dialogRef} id="mobile-navigation" className="mobile-navigation" aria-labelledby="mobile-nav-title" onCancel={(event) => { event.preventDefault(); onClose() }} onKeyDown={(event) => {
      if (event.key !== 'Tab') return
      const items = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }}>
      <div className="mobile-nav-heading">
        <h2 id="mobile-nav-title">Navigation</h2>
        <button ref={closeRef} type="button" className="icon-button" aria-label="Close navigation" onClick={onClose}><X aria-hidden="true" /></button>
      </div>
      <nav aria-label="Mobile primary">
        {navigation.map(({ path, label }) => <NavLink key={path} to={path} end={path === '/'} onClick={onClose}>{label}</NavLink>)}
      </nav>
      <Button to="/request-quote" onClick={onClose}>Request a Quote</Button>
    </dialog>
  )
}
