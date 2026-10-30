# Regional map

The homepage and Transport Corridors page use Leaflet with OpenStreetMap tiles. Leaflet loads only when the map enters the viewport. Tiles use the browser's normal cache and the standard OpenStreetMap attribution remains visible. No API key, backend, visitor location or routing service is required.

Mombasa, Nairobi and Kampala have geographic city markers. Dashed lines connect the cities and do not represent turn-by-turn road directions. City buttons and markers share the selected state. Scroll-wheel zoom is disabled to preserve page scrolling; map zoom buttons remain available. Mobile dragging is disabled so the embedded map does not capture normal touch scrolling.

The build permits image requests to `https://tile.openstreetmap.org` and Leaflet's transparent data image. Scripts, styles and fonts remain local. Visitors need an internet connection for map tiles; a full-map link and loading/error text remain available.

References: https://leafletjs.com/examples/quick-start/ and https://operations.osmfoundation.org/policies/tiles/.
