import { useEffect, useRef } from 'react'

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)
const SECONDS = Array.from({ length: 60 }, (_, i) => i)

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

interface ColumnProps {
  values: number[]
  selected: number
  onSelect: (v: number) => void
}

function Column({ values, selected, onSelect }: ColumnProps) {
  const selectedRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' })
  }, [selected])

  return (
    <div className="time-panel__column">
      {values.map((v) => (
        <button
          key={v}
          ref={v === selected ? selectedRef : undefined}
          className="time-panel__item"
          data-selected={v === selected || undefined}
          onClick={() => onSelect(v)}
          type="button"
          tabIndex={-1}
        >
          {pad2(v)}
        </button>
      ))}
    </div>
  )
}

export interface TimePanelProps {
  value: Date | undefined
  showSeconds: boolean
  onChange: (h: number, m: number, s: number) => void
}

export function TimePanel({ value, showSeconds, onChange }: TimePanelProps) {
  const h = value?.getHours() ?? 0
  const m = value?.getMinutes() ?? 0
  const s = value?.getSeconds() ?? 0

  return (
    <div className="time-panel">
      <Column values={HOURS} selected={h} onSelect={(v) => onChange(v, m, s)} />
      <Column values={MINUTES} selected={m} onSelect={(v) => onChange(h, v, s)} />
      {showSeconds && (
        <Column values={SECONDS} selected={s} onSelect={(v) => onChange(h, m, v)} />
      )}
    </div>
  )
}
