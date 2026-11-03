import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { photography } from '../../../config/assets'
import { Container } from '../../ui/Container'

const photos = [
  { ...photography.container, caption: 'Daneva on the road ahead' },
  { ...photography.fleet, caption: 'A closer look at our fleet' },
  { ...photography.containerSide, caption: 'Container transport' },
  { ...photography.lineup, caption: 'The fleet, together' },
  { ...photography.prepared, caption: 'Ready for the next journey' },
  { ...photography.wideFleet, caption: 'Inside the Daneva yard' },
]

export function FleetGallery() {
  const [active, setActive] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (active !== null && !dialog.current?.open) dialog.current?.showModal()
    if (active === null && dialog.current?.open) dialog.current.close()
  }, [active])
  const photo = active === null ? null : photos[active]
  function move(direction: number) { setActive(index => index === null ? null : (index + direction + photos.length) % photos.length) }
  return <section className="corporate-section fleet-gallery-section" aria-labelledby="fleet-gallery-heading">
    <Container>
      <p className="eyebrow editorial-eyebrow">A CLOSER LOOK AT DANEVA</p>
      <div className="fleet-gallery-heading"><h2 id="fleet-gallery-heading">Real trucks.<br />Real commitment.</h2><p>Inside the Daneva yard. Explore the fleet behind every freight conversation.</p></div>
      <div className="fleet-photo-gallery">{photos.map((item,index) => <figure key={item.src}>
        <button type="button" onClick={() => setActive(index)} aria-label={`Open photo: ${item.caption}`}><img src={item.src} alt={item.alt} loading="lazy" decoding="async" width="1440" height="1080" /><span className="gallery-expand"><ArrowUpRight size={20} aria-hidden="true" /></span></button>
        <figcaption><span>0{index+1}</span>{item.caption}</figcaption>
      </figure>)}</div>
    </Container>
    <dialog ref={dialog} className="fleet-lightbox" onClose={() => setActive(null)} onClick={event => { if(event.target === event.currentTarget) setActive(null) }} onKeyDown={event => { if(event.key === 'ArrowRight') move(1); if(event.key === 'ArrowLeft') move(-1) }} aria-label="Daneva fleet photo viewer">
      <button type="button" className="lightbox-close" onClick={() => setActive(null)} aria-label="Close photo viewer"><X aria-hidden="true" /></button>
      {photo && <figure><img src={photo.src} alt={photo.alt} /><figcaption aria-live="polite">{photo.caption} · {(active ?? 0)+1} / {photos.length}</figcaption></figure>}
      <div className="lightbox-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous photo"><ArrowLeft aria-hidden="true" /></button><button type="button" onClick={() => move(1)} aria-label="Next photo"><ArrowRight aria-hidden="true" /></button></div>
    </dialog>
  </section>
}
