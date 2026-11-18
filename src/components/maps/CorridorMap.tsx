import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap, Marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { freightRoutes } from '../../data/corridors'

export const corridorCities = [
  { name: 'Mombasa', latitude: -4.0435, longitude: 39.6682 },
  { name: 'Nairobi (Embakasi)', latitude: -1.323, longitude: 36.9 },
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
        const routeLayers = L.layerGroup().addTo(map)
        // Separate schematic connections by screen pixels so shared routes stay visible.
        function drawConnections() {
          routeLayers.clearLayers()
          const paths = [
            { route: freightRoutes[0], stops: [2, 1, 0], offset: -9 },
            { route: freightRoutes[1], stops: [0, 1, 2], offset: 0 },
            { route: freightRoutes[2], stops: [0, 1, 2], offset: 9 },
          ]
          paths.forEach(({ route, stops, offset }) => {
            const points = stops.map(index => map.latLngToLayerPoint(coordinates[index]).add(L.point(offset, 0)))
            const line = points.map(point => map.layerPointToLatLng(point))
            L.polyline(line, { color: route.color, weight: 3, opacity: 1, dashArray: route.id === 'wheat-grains' ? '7 5' : undefined, interactive: false }).addTo(routeLayers)
            points.slice(0, -1).forEach((start, index) => {
              const end = points[index + 1]
              const midpoint = map.layerPointToLatLng(L.point((start.x + end.x) / 2, (start.y + end.y) / 2))
              const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI
              L.marker(midpoint, { interactive: false, keyboard: false, icon: L.divIcon({ className: 'route-direction-marker', html: `<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><g transform="rotate(${angle} 14 14)"><path d="M5 5 L24 14 L5 23 L10 14 Z" fill="${route.color}" stroke="white" stroke-width="1" /></g></svg>`, iconSize: [28, 28], iconAnchor: [14, 14] }) }).addTo(routeLayers)
            })
          })
        }
        markers.current = corridorCities.map((city, index) => {
          const marker = L.marker(coordinates[index], {
            icon: L.divIcon({ className: 'corridor-map-pin', html: '<span></span>', iconSize: [20, 20], iconAnchor: [10, 10] }),
            title: `Explore ${city.name}`, alt: city.name, keyboard: true,
          }).addTo(map).bindTooltip(city.name, { permanent: true, direction: index === 2 ? 'left' : 'right', offset: [index === 2 ? -12 : 12, 0], className: 'corridor-map-city' })
          marker.on('click', () => selectRef.current?.(index))
          return marker
        })
        map.fitBounds(L.latLngBounds(coordinates), { padding: [55, 55], maxZoom: 7, animate: false })
        drawConnections()
        map.on('zoomend', drawConnections)
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
    <div className="corridor-map-canvas" ref={host} role="region" aria-label="Interactive schematic map of Uganda exports to Mombasa, wheat grains from Mombasa and Nairobi Embakasi to Kampala, and Mombasa port cargo to Uganda" />
    {(!ready || !tilesLoaded) && !unavailable && <div className="corridor-map-loading" role="status"><span className="loading-spinner" aria-hidden="true" /><strong>Connecting the corridor</strong><span>Mombasa · Nairobi · Kampala</span></div>}
    {unavailable && <p className="corridor-map-notice" role="status">Map tiles could not load. You can open the map below.</p>}
    <ul className="route-map-legend" aria-label="Map routes">{freightRoutes.map(route => <li key={route.id}><span className={`route-map-swatch route-map-swatch--${route.id}`} aria-hidden="true" /><span><strong>{route.title}</strong><span>{route.journey}</span></span></li>)}</ul>
    <div className="corridor-map-footer"><span>Schematic connections · exact road routes arranged per shipment</span><a href="https://www.openstreetmap.org/#map=6/-1.8/36.2" target="_blank" rel="noreferrer">Open full map ↗</a></div>
  </div>
}
