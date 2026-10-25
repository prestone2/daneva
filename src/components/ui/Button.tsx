import { ArrowUpRight } from 'lucide-react'
import { Link, type LinkProps } from 'react-router-dom'

export function Button({ children, className = '', variant = 'primary', ...props }: LinkProps & { variant?: 'primary' | 'secondary' }) {
  return (
    <Link className={`button button--${variant} ${className}`} {...props}>
      {children}<ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  )
}
