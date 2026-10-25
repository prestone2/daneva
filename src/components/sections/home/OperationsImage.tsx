import { useState } from 'react'
import { assets } from '../../../config/assets'
import { operationsPhotography } from '../../../data/home'

export function OperationsImage({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  const hasImage = Boolean(assets.truck) && !failed

  return (
    <figure className={`operations-image ${className}`}>
      <div className="operations-image-frame">
        {hasImage ? (
          <img src={assets.truck} alt={operationsPhotography.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        ) : (
          <div className="operations-image-placeholder" role="note">
            <span className="image-placeholder-mark" aria-hidden="true" />
            <p>{operationsPhotography.placeholderTitle}</p>
            <span>{operationsPhotography.placeholderDescription}</span>
          </div>
        )}
      </div>
      <figcaption>{operationsPhotography.caption}</figcaption>
    </figure>
  )
}
