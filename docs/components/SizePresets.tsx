'use client';

import { useState } from 'react';
import { DatePicker } from 'daterly';
import { Copy, Check } from 'lucide-react';
import styles from './ThemePresets.module.css';
import { useDocsLang } from './use-docs-lang';

type Size = 's' | 'm' | 'l';

type Preset = {
  id: Size;
  name: string;
  height: string;
};

const PRESETS: Preset[] = [
  { id: 's', name: 'Small', height: '32px' },
  { id: 'm', name: 'Medium', height: '40px' },
  { id: 'l', name: 'Large', height: '56px' },
];

const UI = {
  ru: {
    desc: {
      s: 'Высота 32px, шрифт 14px',
      m: 'Высота 40px, шрифт 16px',
      l: 'Высота 56px, шрифт 16px',
    },
    codeLabel: 'Дата',
    liveLabel: 'Дата',
    defaultBadge: 'по умолчанию',
    copyAria: 'Скопировать код',
    copied: 'Скопировано',
    copy: 'Копировать',
  },
  en: {
    desc: {
      s: 'Height 32px, font 14px',
      m: 'Height 40px, font 16px',
      l: 'Height 56px, font 16px',
    },
    codeLabel: 'Date',
    liveLabel: 'Date',
    defaultBadge: 'default',
    copyAria: 'Copy code',
    copied: 'Copied',
    copy: 'Copy',
  },
} as const;

export default function SizePresets() {
  const lang = useDocsLang();
  const t = UI[lang];

  const [activeId, setActiveId] = useState<Size>('m');
  const [date, setDate] = useState<Date | undefined>();
  const [copied, setCopied] = useState(false);

  const active = PRESETS.find((p) => p.id === activeId) ?? PRESETS[1];
  const code = `<DatePicker size="${active.id}" label="${t.codeLabel}" />`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  };

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
                height:
                  preset.height === '32px'
                    ? 14
                    : preset.height === '40px'
                    ? 18
                    : 22,
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
                    fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                    fontSize: '11px',
                    opacity: 0.7,
                  }}
                >
                  size=&quot;{preset.id}&quot;
                </code>
              </span>
              <span className={styles.tabDesc}>{t.desc[preset.id]}</span>
            </span>
            {preset.id === 'm' && (
              <span className={styles.defaultBadge}>{t.defaultBadge}</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.stage}>
          <DatePicker
            size={active.id}
            label={t.liveLabel}
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
              aria-label={t.copyAria}
            >
              {copied ? (
                <>
                  <Check size={12} strokeWidth={2.5} /> {t.copied}
                </>
              ) : (
                <>
                  <Copy size={12} strokeWidth={2} /> {t.copy}
                  22{' '}
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
  );
}
