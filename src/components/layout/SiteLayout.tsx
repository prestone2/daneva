import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { useSiteMotion } from '../../hooks/useSiteMotion'

export function SiteLayout() {
  const { pathname } = useLocation()
  useSiteMotion(pathname)
  const previousPath = useRef(pathname)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      mainRef.current?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="reading-progress" aria-hidden="true"><span /></div>
      <Header />
      <main id="main-content" tabIndex={-1} ref={mainRef}><Outlet /></main>
      <Footer />
    </>
  )
}
