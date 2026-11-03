import { useState } from 'react'
import { assets, photography } from '../../../config/assets'
import { operationsPhotography } from '../../../data/home'

export function OperationsImage({ className = '', variant = 'container' }: { className?: string; variant?: keyof typeof assets.trucks }) {
  const [failed, setFailed] = useState(false)
  const truck = assets.trucks[variant]
  const hasImage = Boolean(truck) && !failed

  return (
    <figure className={`operations-image ${className}`}>
      <div className="operations-image-frame">
        {hasImage ? (
          <img src={truck} alt={photography[variant].alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        ) : (
          <div className="operations-image-placeholder" role="note">
            <span className="image-placeholder-mark" aria-hidden="true" />
            <p>{operationsPhotography.placeholderTitle}</p>
            <span>{operationsPhotography.placeholderDescription}</span>
          </div>
        )}
      </div>
      <figcaption>{hasImage ? operationsPhotography.caption : 'Daneva fleet photography'}</figcaption>
    </figure>
  )
}
