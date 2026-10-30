import { useEffect } from 'react'

const revealSelectors = [
  '.capability-grid > li', '.about-layout > *', '.services-showcase-heading > *',
  '.service-photo-grid > li', '.home-details-heading', '.home-detail-card',
  '.freight-journey > li', '.corridor-copy', '.destination-card', '.fleet-layout > *',
  '.home-clearing-layout > *', '.safety-introduction > *', '.safety-visual', '.safety-principles > li',
  '.home-faq-layout > div', '.shipment-checklist > *', '.corporate-editorial > *',
  '.corporate-purpose > div', '.corporate-presence > div', '.corporate-principles > li',
  '.service-detail-layout > *', '.operations-overview-list > article',
  '.operations-overview > figure', '.contact-information', '.enquiry-form',
  '.network-city-buttons > button', '.enterprise-cta-layout > *', '.footer-group',
].join(',')

/** Progressive enhancement: content is visible before JS and if observers are unavailable. */
export function useSiteMotion(pathname: string) {
  useEffect(() => {
    if (typeof window.matchMedia !== 'function' || typeof IntersectionObserver === 'undefined') return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = new Set<HTMLElement>()
    let observer: IntersectionObserver | undefined
    let mutations: MutationObserver | undefined

    function clear(element: HTMLElement) {
      element.classList.remove('motion-item', 'is-in-view', 'motion-focus-visible')
      for (const attribute of ['data-motion-order', 'data-motion-kind', 'data-motion-state']) element.removeAttribute(attribute)
    }
    function reveal(element: HTMLElement) {
      element.dataset.motionState = 'visible'
      element.classList.add('is-in-view')
      observer?.unobserve(element)
    }
    function register(element: HTMLElement) {
      if (elements.has(element) || preference.matches) return
      elements.add(element)
      const siblings = Array.from(element.parentElement?.children ?? []).filter(child => child.matches(revealSelectors))
      const image = element.matches('figure,.about-image,.fleet-image,.safety-visual,.service-detail-visual')
      const copy = !image && (element.matches('.editorial-copy,.corporate-copy,.service-detail-copy,.corridor-copy,.home-details-heading,.contact-information') || Array.from(element.children).some(child => child.matches('h2')))
      element.dataset.motionKind = image ? 'image' : copy ? 'copy' : 'card'
      element.dataset.motionOrder = String(Math.max(0, siblings.indexOf(element)) % 4)
      // Arm only content outside the viewport, so already-readable text never disappears.
      element.dataset.motionState = element.getBoundingClientRect().top >= window.innerHeight - 16 ? 'pending' : 'visible'
      element.classList.add('motion-item')
      if (element.dataset.motionState === 'pending') observer?.observe(element)
    }
    function scan(root: ParentNode) {
      if (root instanceof HTMLElement && root.matches(revealSelectors)) register(root)
      root.querySelectorAll<HTMLElement>(revealSelectors).forEach(register)
    }
    function configure() {
      observer?.disconnect()
      mutations?.disconnect()
      elements.forEach(clear)
      elements.clear()
      if (preference.matches) return
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement) })
      }, { threshold: .08, rootMargin: '0px 0px -5% 0px' })
      scan(document)
      // Lazy routes receive the same treatment after their content arrives.
      mutations = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => { if (node instanceof HTMLElement) scan(node) }))
      })
      mutations.observe(document.body, { childList: true, subtree: true })
    }
    function handleFocus(event: FocusEvent) {
      const target = event.target instanceof HTMLElement ? event.target : null
      const element = target?.closest<HTMLElement>('.motion-item')
      if (element) { element.classList.add('motion-focus-visible'); reveal(element) }
    }
    configure()
    preference.addEventListener('change', configure)
    document.addEventListener('focusin', handleFocus)
    return () => {
      observer?.disconnect()
      mutations?.disconnect()
      preference.removeEventListener('change', configure)
      document.removeEventListener('focusin', handleFocus)
      elements.forEach(clear)
    }
  }, [pathname])

  useEffect(() => {
    if (typeof window.requestAnimationFrame !== 'function') return
    let frame = 0
    const root = document.documentElement
    function update() {
      const distance = root.scrollHeight - window.innerHeight
      root.style.setProperty('--page-progress', String(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0))
      root.dataset.pageScrolled = window.scrollY > 20 ? 'true' : 'false'
      frame = 0
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      root.style.removeProperty('--page-progress')
      delete root.dataset.pageScrolled
    }
  }, [pathname])
}
