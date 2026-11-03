import container from '../assets/images/client/container.webp'
import fleet from '../assets/images/client/fleet.webp'
import lineup from '../assets/images/client/lineup.webp'
import blueTruck from '../assets/images/client/blueTruck.webp'
import yard from '../assets/images/client/yard.webp'
import prepared from '../assets/images/client/prepared.webp'
import wideFleet from '../assets/images/client/wideFleet.webp'
import containerSide from '../assets/images/client/containerSide.webp'

// Optimised derivatives of client-supplied Daneva fleet photography.
export const photography = {
  container: { src: container, alt: 'Blue Daneva truck with a white Daneva-branded container trailer' },
  fleet: { src: fleet, alt: 'Daneva freight trucks lined up in the fleet yard' },
  lineup: { src: lineup, alt: 'A row of Daneva trucks photographed from the front' },
  blueTruck: { src: blueTruck, alt: 'Blue Daneva Mercedes-Benz truck and container trailer' },
  yard: { src: yard, alt: 'Wide view of the Daneva yard with trucks and container trailers' },
  prepared: { src: prepared, alt: 'White Daneva truck cabs parked alongside one another' },
  wideFleet: { src: wideFleet, alt: 'Daneva fleet parked across the transport yard' },
  containerSide: { src: containerSide, alt: 'White Daneva truck with a branded container trailer in the yard' },
}

export const assets = {
  truck: container,
  trucks: { container, fleet, lineup, blueTruck, yard, prepared, wideFleet, containerSide },
  logo: '/brand/daneva-logo-400.webp',
  logoSrcSet: '/brand/daneva-logo-400.webp 400w, /brand/daneva-logo-600.webp 600w',
}
