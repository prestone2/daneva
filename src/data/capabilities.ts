import { Container, Truck, FileCheck2, Route, type LucideIcon } from 'lucide-react'

interface Capability { title: string; caption: string; icon: LucideIcon }

export const capabilities: Capability[] = [
  { title: 'Containerised Cargo', caption: 'Container transport to Kampala’s inland container depots.', icon: Container },
  { title: 'Bulk Cargo Transport', caption: 'Long-distance haulage for bulk cargo between Kenya and Uganda.', icon: Truck },
  { title: 'Mombasa Clearing', caption: 'Customs clearing services for cargo through Mombasa.', icon: FileCheck2 },
  { title: 'Kenya–Uganda Freight', caption: 'Connecting Mombasa and Nairobi with Kampala.', icon: Route },
]
