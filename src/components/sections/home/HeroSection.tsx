import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ImageIcon, ArrowRight } from 'lucide-react'
import { assets } from '../../../config/assets'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const hasPhoto = Boolean(assets.truck) && !failed
  return (
    <section className={`hero ${hasPhoto ? 'hero--photograph' : 'hero--placeholder'}`} aria-labelledby="hero-heading">
      {hasPhoto && <img className="hero-photo" src={assets.truck} alt="Daneva haulage truck" fetchPriority="high" loading="eager" decoding="async" onError={() => setFailed(true)} />}
      <div className="hero-overlay" aria-hidden="true" />
      <Container className="hero-inner">
        <motion.div className="hero-copy" initial={false} animate={{ opacity: 1, y: 0 }} whileInView={reduceMotion ? undefined : { y: [12, 0] }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="eyebrow hero-eyebrow"><span aria-hidden="true" />LONG-DISTANCE HAULAGE & LOGISTICS</p>
          <h1 id="hero-heading">Moving Trade<br /><span>Across Borders.</span></h1>
          <p className="hero-lead">Reliable long-distance haulage, containerised and bulk cargo transport, and Mombasa clearing services connecting Kenya with Kampala's inland container depots.</p>
          <div className="hero-actions">
            <Button to="/request-quote">Request a Freight Quote</Button>
            <Button to="/services" variant="secondary">Explore Our Services</Button>
          </div>
        </motion.div>
        {!hasPhoto && <div className="photo-placeholder" role="note"><ImageIcon size={32} strokeWidth={1.25} aria-hidden="true" /><span>Company truck photography</span><p>Awaiting the supplied Daneva truck photograph.</p><code>daneva-truck.jpg</code></div>}
        <div className="hero-corridor"><span>Mombasa / Nairobi</span><ArrowRight size={20} aria-hidden="true" /><span>Kampala</span><span className="corridor-label">KENYA TO UGANDA</span></div>
      </Container>
    </section>
  )
}
