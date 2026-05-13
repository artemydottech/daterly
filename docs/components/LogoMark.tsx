interface LogoMarkProps {
  size?: number
  variant?: 'dashes' | 'brackets'
  className?: string
}

export default function LogoMark({
  size = 24,
  variant = 'dashes',
  className,
}: LogoMarkProps) {
  if (variant === 'brackets') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        <path d="M8 4 H5 V20 H8" />
        <path d="M16 4 H19 V20 H16" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  // dashes — календарь с маской dd.mm.yyyy + caret
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3 11h18" />
      <path d="M7 15.5h2" />
      <path d="M11 15.5h2" />
      <path d="M15 15.5h2" />
      <path d="M17 13.5v4" strokeWidth={2.4} />
    </svg>
  )
}
