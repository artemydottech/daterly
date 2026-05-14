import { useState } from 'react'
import { DatePicker } from 'daterly'
import { Copy, Check } from 'lucide-react'
import styles from './ThemePresets.module.css'

type Size = 's' | 'm' | 'l'

type Preset = {
  id: Size
  name: string
  description: string
  height: string
}

const PRESETS: Preset[] = [
  {
    id: 's',
    name: 'Small',
    description: 'Высота 32px, шрифт 14px',
    height: '32px',
  },
  {
    id: 'm',
    name: 'Medium',
    description: 'Высота 40px, шрифт 16px',
    height: '40px',
  },
  {
    id: 'l',
    name: 'Large',
    description: 'Высота 56px, шрифт 16px',
    height: '56px',
  },
]

function formatCode(size: Size) {
  return `<DatePicker size="${size}" label="Дата" />`
}

export default function SizePresets() {
  const [activeId, setActiveId] = useState<Size>('m')
  const [date, setDate] = useState<Date | undefined>()
  const [copied, setCopied] = useState(false)

  const active = PRESETS.find((p) => p.id === activeId) ?? PRESETS[1]
  const code = formatCode(active.id)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
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
              style={{
                background: 'transparent',
                border: '1px solid currentColor',
                height: preset.height === '32px' ? 14 : preset.height === '40px' ? 18 : 22,
                width: 24,
                borderRadius: 4,
                boxShadow: 'none',
                opacity: 0.55,
              }}
              aria-hidden
            />
            <span className={styles.tabLabel}>
              <span className={styles.tabName}>
                {preset.name}{' '}
                <code
                  style={{
                    fontFamily:
                      "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                    fontSize: '11px',
                    opacity: 0.7,
                  }}
                >
                  size=&quot;{preset.id}&quot;
                </code>
              </span>
              <span className={styles.tabDesc}>{preset.description}</span>
            </span>
            {preset.id === 'm' && (
              <span className={styles.defaultBadge}>по умолчанию</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.stage}>
          <DatePicker
            size={active.id}
            label="Дата"
            value={date}
            onChange={setDate}
          />
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeBadge}>tsx</span>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
              aria-label="Скопировать код"
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
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
