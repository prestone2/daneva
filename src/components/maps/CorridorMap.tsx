import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap, Marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export const corridorCities = [
  { name: 'Mombasa', latitude: -4.0435, longitude: 39.6682 },
  { name: 'Nairobi', latitude: -1.2864, longitude: 36.8172 },
  { name: 'Kampala', latitude: .3476, longitude: 32.5825 },
]

export function CorridorMap({ active, onSelect, expanded = false }: { active?: number; onSelect?: (index: number) => void; expanded?: boolean }) {
  const host = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markers = useRef<Marker[]>([])
  const selectRef = useRef(onSelect)
  const [ready, setReady] = useState(false)
  const [tilesLoaded, setTilesLoaded] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  useEffect(() => { selectRef.current = onSelect }, [onSelect])

  useEffect(() => {
    const element = host.current
    if (!element) return
    let disposed = false
    let started = false
    let resize: ResizeObserver | undefined
    async function initialize() {
      if (started || disposed || !element) return
      started = true
      try {
        const L = await import('leaflet')
        if (disposed) return
        const map = L.map(element, { scrollWheelZoom: false, zoomControl: true, attributionControl: true, dragging: !L.Browser.mobile, tapHold: false })
        mapRef.current = map
        map.attributionControl.setPrefix(false)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18, minZoom: 3, keepBuffer: 0,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).on('load', () => { if (!disposed) setTilesLoaded(true) }).on('tileerror', () => { if (!disposed) setUnavailable(true) }).on('tileload', () => { if (!disposed) setUnavailable(false) }).addTo(map)
        const coordinates = corridorCities.map(city => L.latLng(city.latitude, city.longitude))
        L.polyline(coordinates, { color: '#c40016', weight: 3, opacity: .85, dashArray: '7 8', interactive: false }).addTo(map)
        markers.current = corridorCities.map((city, index) => {
          const marker = L.marker(coordinates[index], {
            icon: L.divIcon({ className: 'corridor-map-pin', html: '<span></span>', iconSize: [20, 20], iconAnchor: [10, 10] }),
            title: `Explore ${city.name}`, alt: city.name, keyboard: true,
          }).addTo(map).bindTooltip(city.name, { permanent: true, direction: index === 2 ? 'left' : 'right', offset: [index === 2 ? -12 : 12, 0], className: 'corridor-map-city' })
          marker.on('click', () => selectRef.current?.(index))
          return marker
        })
        map.fitBounds(L.latLngBounds(coordinates), { padding: [55, 55], maxZoom: 7, animate: false })
        if (typeof ResizeObserver !== 'undefined') {
          resize = new ResizeObserver(() => map.invalidateSize({ pan: false }))
          resize.observe(element)
        }
        setReady(true)
      } catch { if (!disposed) setUnavailable(true) }
    }
    let observer: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { observer?.disconnect(); void initialize() }
      })
      observer.observe(element)
    } else void initialize()
    return () => { disposed = true; observer?.disconnect(); resize?.disconnect(); mapRef.current?.remove(); mapRef.current = null; markers.current = [] }
  }, [])

  useEffect(() => {
    if (!ready) return
    markers.current.forEach((marker, index) => {
      const element = marker.getElement()
      element?.classList.toggle('is-selected', active === index)
      if (active === index) element?.setAttribute('aria-pressed', 'true')
      else element?.setAttribute('aria-pressed', 'false')
    })
  }, [active, ready])

  return <div className={`corridor-live-map ${expanded ? 'corridor-live-map--expanded' : ''}`}>
    <div className="corridor-map-canvas" ref={host} role="region" aria-label="Interactive map of the Mombasa, Nairobi and Kampala freight connections" />
    {(!ready || !tilesLoaded) && !unavailable && <div className="corridor-map-loading" role="status"><span className="loading-spinner" aria-hidden="true" /><strong>Connecting the corridor</strong><span>Mombasa · Nairobi · Kampala</span></div>}
    {unavailable && <p className="corridor-map-notice" role="status">Map tiles could not load. You can open the map below.</p>}
    <div className="corridor-map-footer"><span>City connections · route arrangements may vary</span><a href="https://www.openstreetmap.org/#map=6/-1.8/36.2" target="_blank" rel="noreferrer">Open full map ↗</a></div>
  </div>
}
