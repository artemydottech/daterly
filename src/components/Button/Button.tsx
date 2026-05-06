import type { ButtonProps } from './Button.types'
import { Spinner } from '../icons/Spinner'

export function Button({
  variant = 'primary',
  size = 'm',
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'dp-btn',
    `dp-btn--${variant}`,
    `dp-btn--${size}`,
    loading && 'dp-btn--loading',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button {...rest} className={classes} disabled={disabled || loading}>
      {children}
      {loading && <Spinner />}
    </button>
  )
}
