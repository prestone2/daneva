import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../config/assets'

export function Brand() {
  const [failed, setFailed] = useState(false)
  return (
    <Link to="/" className="brand" aria-label="Daneva Co. Limited — home">
      {!failed ? (
        <span className="brand-art">
          <img src={assets.logo} alt="Daneva Co. Limited" width="2000" height="2000" onError={() => setFailed(true)} />
        </span>
      ) : (
        <>
          <span className="brand-name">DANEVA<span>CO. LIMITED</span></span>
          <span className="brand-note">Logo placeholder · asset pending</span>
        </>
      )}
    </Link>
  )
}
