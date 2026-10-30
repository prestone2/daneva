import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { serviceVisuals } from '../../../config/service-assets'
import { assets } from '../../../config/assets'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'

const slides = [
  { image: serviceVisuals[0].src, alt: serviceVisuals[0].alt, label: 'FREIGHT THAT CONNECTS', title: 'Reliable Freight', line: 'Solutions Across', accent: 'East Africa', description: 'Connecting businesses to opportunities with safe, efficient and compliant transport and logistics services.', link: '/services', linkLabel: 'Explore Our Services', tag: 'Containerised & bulk cargo', position: '65% center' },
  { image: serviceVisuals[1].src, alt: serviceVisuals[1].alt, label: 'BORDER TO BORDER', title: 'From the Coast.', line: 'To Your Next', accent: 'Destination.', description: 'Connecting Mombasa, Nairobi and Kampala through coordinated long-distance haulage and regional freight planning.', link: '/transport-corridors', linkLabel: 'Discover Our Routes', tag: 'Kenya–Uganda connections', position: '68% center' },
  { image: serviceVisuals[2].src, alt: serviceVisuals[2].alt, label: 'ONE CONNECTED JOURNEY', title: 'Your Cargo.', line: 'Our Attention.', accent: 'Every Journey.', description: 'Cargo details, handling requirements and route planning brought together for your containerised and bulk freight.', link: '/fleet-operations', linkLabel: 'Meet Our Operations', tag: 'Prepared for the road ahead', position: '65% center' },
  { image: assets.trucks.delivery, alt: 'Illustrative Daneva delivery truck at a logistics depot', label: 'LET’S KEEP TRADE MOVING', title: 'Your Business.', line: 'Connected to', accent: 'Opportunity.', description: 'Tell us what you need to move. Our team can discuss your transport, collection, delivery and clearing requirements.', link: '/contact', linkLabel: 'Talk to Our Team', tag: 'A conversation starts the journey', position: '65% center' },
]

export function HeroSection() {
  const [active, setActive] = useState(0)
  const [rotating, setRotating] = useState(false)
  const [focused, setFocused] = useState(false)
  const touchStart = useRef<number | null>(null)
  const slide = slides[active]

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    setRotating(!preference.matches)
    const stopForReducedMotion = () => setRotating(!preference.matches)
    preference.addEventListener('change', stopForReducedMotion)
    return () => preference.removeEventListener('change', stopForReducedMotion)
  }, [])

  useEffect(() => {
    if (!rotating || focused) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [rotating, focused, active])

  function goTo(index: number) {
    setActive((index + slides.length) % slides.length)
  }

  return (
    <section className="hero hero--immersive hero-carousel" aria-labelledby="hero-heading" aria-roledescription="carousel" onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false) }} onTouchStart={event => { touchStart.current = event.touches[0].clientX }} onTouchEnd={event => {
      if (touchStart.current === null) return
      const distance = touchStart.current - event.changedTouches[0].clientX
      if (Math.abs(distance) > 55) goTo(active + (distance > 0 ? 1 : -1))
      touchStart.current = null
    }}>
      <div className="carousel-images" aria-hidden="true">{slides.map((item, index) => <img key={item.image} className={`carousel-photo carousel-photo--${index} ${index === active ? 'is-active' : ''}`} src={item.image} alt=""  fetchPriority={index === 0 ? 'high' : 'auto'} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />)}</div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="carousel-decoration" aria-hidden="true" />
      <Container className="hero-inner">
        <div className="carousel-copy" key={active} aria-live="off" aria-atomic="true">
          <div className="carousel-kicker"><span />{slide.label}</div>
          <h1 id="hero-heading">{slide.title}<br />{slide.line}<br /><span>{slide.accent}</span></h1>
          <p className="hero-lead">{slide.description}</p>
          <div className="hero-actions"><Button to="/request-quote">Request a Quote</Button><a className="hero-services-link" href={slide.link}>{slide.linkLabel}<ArrowUpRight size={17} aria-hidden="true" /></a></div>
        </div>
        <div className="carousel-image-tag"><span aria-hidden="true" />{slide.tag}</div>
        <div className="carousel-bottom">
          <div className="carousel-route"><MapPin size={16} aria-hidden="true" /><span>Mombasa <i aria-hidden="true">/</i> Nairobi <i aria-hidden="true">/</i> Kampala</span></div>

        </div>
        <span className="sr-only">{slide.alt}</span>
      </Container>
    </section>
  )
}
