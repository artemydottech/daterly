import { useState } from 'react'
import { DatePicker } from 'daterly'
import { Copy, Check } from 'lucide-react'
import styles from './ThemePresets.module.css'

type Preset = {
  id: string
  name: string
  description: string
  swatch: string
  vars: Record<string, string>
}

const PRESETS: Preset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Поставляется из коробки',
    swatch: '#1f84db',
    vars: {
      '--daterly-color-accent': '#1f84db',
      '--daterly-color-border-focus': '#1f84db',
      '--daterly-color-label-focus': '#1f84db',
      '--daterly-color-today-bg': '#e4f1f9',
      '--daterly-radius': '4px',
    },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    description: 'Фиолетовый акцент, скруглённые углы',
    swatch: '#7c5cff',
    vars: {
      '--daterly-color-accent': '#7c5cff',
      '--daterly-color-border-focus': '#7c5cff',
      '--daterly-color-label-focus': '#7c5cff',
      '--daterly-color-today-bg': 'rgba(124, 92, 255, 0.12)',
      '--daterly-radius': '8px',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Зелёный, чуть мягче радиус',
    swatch: '#10b981',
    vars: {
      '--daterly-color-accent': '#10b981',
      '--daterly-color-border-focus': '#10b981',
      '--daterly-color-label-focus': '#10b981',
      '--daterly-color-today-bg': 'rgba(16, 185, 129, 0.12)',
      '--daterly-radius': '6px',
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Розовый акцент',
    swatch: '#e11d48',
    vars: {
      '--daterly-color-accent': '#e11d48',
      '--daterly-color-border-focus': '#e11d48',
      '--daterly-color-label-focus': '#e11d48',
      '--daterly-color-today-bg': 'rgba(225, 29, 72, 0.1)',
      '--daterly-radius': '10px',
    },
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Нейтральный графит',
    swatch: '#475569',
    vars: {
      '--daterly-color-accent': '#475569',
      '--daterly-color-border-focus': '#475569',
      '--daterly-color-label-focus': '#475569',
      '--daterly-color-today-bg': 'rgba(71, 85, 105, 0.12)',
      '--daterly-radius': '4px',
    },
  },
]

function formatCss(preset: Preset) {
  const lines = Object.entries(preset.vars).map(
    ([k, v]) => `  ${k}: ${v};`,
  )
  return `:root {\n${lines.join('\n')}\n}`
}

export default function ThemePresets() {
  const [activeId, setActiveId] = useState(PRESETS[1].id)
  const [date, setDate] = useState<Date | undefined>()
  const [copied, setCopied] = useState(false)

  const active = PRESETS.find((p) => p.id === activeId) ?? PRESETS[0]
  const css = formatCss(active)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* no-op */
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            role="tab"
            aria-selected={preset.id === activeId}
            onClick={() => setActiveId(preset.id)}
            className={`${styles.tab} ${
              preset.id === activeId ? styles.tabActive : ''
            }`}
          >
            <span
              className={styles.swatch}
              style={{ background: preset.swatch }}
              aria-hidden
            />
            <span className={styles.tabLabel}>
              <span className={styles.tabName}>{preset.name}</span>
              <span className={styles.tabDesc}>{preset.description}</span>
            </span>
            {preset.id === 'default' && (
              <span className={styles.defaultBadge}>по умолчанию</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <div
          className={styles.stage}
          style={active.vars as React.CSSProperties}
        >
          <DatePicker
            label="Дата"
            value={date}
            onChange={setDate}
          />
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeBadge}>css</span>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
              aria-label="Скопировать CSS"
            >
              {copied ? (
                <>
                  <Check size={12} strokeWidth={2.5} /> Скопировано
                </>
              ) : (
                <>
                  <Copy size={12} strokeWidth={2} /> Копировать
                </>
              )}
            </button>
          </div>
          <pre className={styles.codeBody}>
            <code>{css}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
