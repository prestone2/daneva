import { Link } from 'react-router-dom'
import { assets } from '../../config/assets'

export function Brand() {
  return <Link to="/" className="brand" aria-label="Daneva Co. Limited — home"><span className="brand-art"><img src={assets.logo} srcSet={assets.logoSrcSet} sizes="(max-width: 767px) 155px, 190px" alt="Daneva Company Limited" width="400" height="400" decoding="async" /></span></Link>
}
