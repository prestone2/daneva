import { Truck } from 'lucide-react'
import { assets } from '../../config/assets'

export function PageLoading() {
  return <main className="page-loading" aria-label="Page loading">
    <div className="page-loading-card" role="status" aria-live="polite">
      <span className="page-loading-logo"><img src={assets.logo} srcSet={assets.logoSrcSet} sizes="220px" width="400" height="400" alt="Daneva Company Limited" /></span>
      <span className="page-loading-eyebrow">EAST AFRICAN LOGISTICS</span>
      <h2>Getting things moving.</h2>
      <p>Loading your next destination…</p>
      <div className="loading-route" aria-hidden="true"><span className="loading-route-line" /><span className="loading-route-truck"><Truck size={30} strokeWidth={1.6} /></span><i /><i /><i /></div>
      <div className="loading-route-labels" aria-hidden="true"><span>Mombasa</span><span>Nairobi</span><span>Kampala</span></div>
      <span className="page-loading-status"><span className="loading-spinner" aria-hidden="true" />Loading page</span>
    </div>
    <div className="page-loading-skeleton" aria-hidden="true"><div /><div /><div /></div>
  </main>
}
