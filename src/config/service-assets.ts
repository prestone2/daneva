import { photography } from './assets'

export const serviceVisuals = [
  { id: 'long-distance-haulage', ...photography.container, label: 'ROAD FREIGHT', short: 'Across borders. On the road.', tags: ['Regional haulage', 'Kenya–Uganda'] },
  { id: 'containerised-bulk-cargo', ...photography.containerSide, label: 'CARGO TRANSPORT', short: 'The right attention for every load.', tags: ['Containerised cargo', 'Bulk freight'] },
  { id: 'mombasa-clearing', ...photography.yard, label: 'CLEARING & FORWARDING', short: 'From port arrival to onward movement.', tags: ['Documentation', 'Port coordination'] },
]
