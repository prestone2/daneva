import { photography } from './assets'
import containerTerminal from '../assets/images/services/container-terminal.jpg'

export const serviceVisuals = [
  { id: 'long-distance-haulage', ...photography.container, label: 'ROAD FREIGHT', short: 'Across borders. On the road.', tags: ['Regional haulage', 'Kenya–Uganda'] },
  { id: 'containerised-bulk-cargo', src: containerTerminal, alt: 'Illustration of a reach stacker lifting a shipping container at a freight terminal', label: 'CARGO TRANSPORT', short: 'The right attention for every load.', tags: ['Containerised cargo', 'Bulk freight'] },
  { id: 'mombasa-clearing', ...photography.yard, label: 'CLEARING & FORWARDING', short: 'From port arrival to onward movement.', tags: ['Documentation', 'Port coordination'] },
]
