import { useEffect, useRef, useState } from 'react'

type Segment = 'h' | 'm' | 's'

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function formatTime(h: number, m: number, s: number, showSeconds: boolean) {
  return showSeconds ? `${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(h)}:${pad2(m)}`
}

function clamp(value: number, max: number) {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > max) return max
  return value
}

function applyTimeMask(digits: string, showSeconds: boolean): string {
  const max = showSeconds ? 6 : 4
  const d = digits.slice(0, max)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}:${d.slice(2)}`
  return `${d.slice(0, 2)}:${d.slice(2, 4)}:${d.slice(4)}`
}

function commitTime(masked: string, showSeconds: boolean) {
  const parts = masked.split(':')
  const h = clamp(parseInt(parts[0] ?? '', 10), 23)
  const m = clamp(parseInt(parts[1] ?? '', 10), 59)
  const s = showSeconds ? clamp(parseInt(parts[2] ?? '', 10), 59) : 0
  return { h, m, s }
}

const SEGMENT_RANGES: Record<Segment, [number, number]> = {
  h: [0, 2],
  m: [3, 5],
  s: [6, 8],
}

function getSegmentList(showSeconds: boolean): Segment[] {
  return showSeconds ? ['h', 'm', 's'] : ['h', 'm']
}

function getSegmentAt(pos: number, showSeconds: boolean): Segment {
  if (pos <= 2) return 'h'
  if (pos <= 5 || !showSeconds) return 'm'
  return 's'
}

function selectSegment(input: HTMLInputElement, seg: Segment) {
  const [start, end] = SEGMENT_RANGES[seg]
  input.setSelectionRange(start, end)
}

export interface TimeInputProps {
  value: Date | undefined
  showSeconds: boolean
  onChange: (h: number, m: number, s: number) => void
  ariaLabel?: string
  disabled?: boolean
}

export function TimeInput({ value, showSeconds, onChange, ariaLabel, disabled }: TimeInputProps) {
  const h = value?.getHours() ?? 0
  const m = value?.getMinutes() ?? 0
  const s = value?.getSeconds() ?? 0
  const display = formatTime(h, m, s, showSeconds)

  const [draft, setDraft] = useState(display)
  const focusedRef = useRef(false)

  useEffect(() => {
    if (!focusedRef.current) setDraft(display)
  }, [display])

  const maxDigits = showSeconds ? 6 : 4

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, maxDigits)
    const masked = applyTimeMask(digits, showSeconds)
    setDraft(masked)
    if (digits.length === maxDigits) {
      const { h, m, s } = commitTime(masked, showSeconds)
      onChange(h, m, s)
    }
  }

  function handleBlur() {
    focusedRef.current = false
    const { h, m, s } = commitTime(draft, showSeconds)
    setDraft(formatTime(h, m, s, showSeconds))
    onChange(h, m, s)
  }

  function bumpSegment(seg: Segment, delta: number) {
    const next = { h, m, s }
    if (seg === 'h') next.h = (h + delta + 24) % 24
    if (seg === 'm') next.m = (m + delta + 60) % 60
    if (seg === 's') next.s = (s + delta + 60) % 60
    setDraft(formatTime(next.h, next.m, next.s, showSeconds))
    onChange(next.h, next.m, next.s)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const input = e.currentTarget
    const pos = input.selectionStart ?? 0
    const segs = getSegmentList(showSeconds)
    const seg = getSegmentAt(pos, showSeconds)

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      bumpSegment(seg, e.key === 'ArrowUp' ? 1 : -1)
      requestAnimationFrame(() => selectSegment(input, seg))
      return
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const idx = segs.indexOf(seg)
      const targetIdx =
        e.key === 'ArrowLeft'
          ? Math.max(0, idx - 1)
          : Math.min(segs.length - 1, idx + 1)
      selectSegment(input, segs[targetIdx])
      return
    }

    if (
      e.key.length === 1 &&
      !/\d/.test(e.key) &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault()
    }
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      className="daterly__time-input"
      value={draft}
      placeholder={showSeconds ? '--:--:--' : '--:--'}
      disabled={disabled}
      aria-label={ariaLabel ?? 'Время'}
      onFocus={(e) => {
        focusedRef.current = true
        e.target.select()
      }}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )
}
