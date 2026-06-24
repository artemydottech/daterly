import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Copy, Check, ArrowRight, Sun, Moon, Heart } from 'lucide-react';
import FormExample from './FormExample';
import pkg from '../../package.json';
import styles from './Landing.module.css';

type Lang = 'ru' | 'en';

interface PropRow {
  name: string;
  type: string;
  desc: string;
}

interface Dict {
  navDocs: string;
  badge: string;
  h1a: string;
  h1b: string;
  h1c: string;
  heroP: string;
  ctaStart: string;
  badgeTs: string;
  demoLabel: string;
  demoCaption: string;
  trust1: string;
  trust2: string;
  trust3: string;
  trust4: string;
  featH2: string;
  cardLocaleEyebrow: string;
  cardLocaleTitle: string;
  cardRangeEyebrow: string;
  cardRangeTitle: string;
  cardCtrlEyebrow: string;
  cardCtrlTitle: string;
  apiH2: string;
  apiP: string;
  finalH2: string;
  finalP: string;
  finalDocs: string;
  props: PropRow[];
}

const DICT: Record<Lang, Dict> = {
  ru: {
    navDocs: 'Документация',
    badge: `v${pkg.version} — адаптивная ширина`,
    h1a: 'Date picker,',
    h1b: 'в который удобно',
    h1c: 'печатать руками',
    heroP:
      'React DatePicker с маской ввода. Контролируемый и неконтролируемый, диапазоны, время, любые локали date-fns. Нулевые издержки, если react-hook-form не нужен.',
    ctaStart: 'Начать',
    badgeTs: 'TypeScript из коробки',
    demoLabel: 'Маска ввода',
    demoCaption: 'Печатай подряд — точки расставятся сами. Backspace пропускает разделители, валидность проверяется round-trip\'ом.',
    trust1: 'brotli, весь пакет',
    trust2: 'runtime-deps кроме date-fns',
    trust3: 'формата: ESM · CJS · .d.ts',
    trust4: 'пропса на любой формат',
    featH2: 'Всё, что нужно от date picker’а',
    cardLocaleEyebrow: 'Локали',
    cardLocaleTitle: 'Любой язык через проп',
    cardRangeEyebrow: 'Range + время',
    cardRangeTitle: 'Двухфазный клик, опциональный TimePanel',
    cardCtrlEyebrow: 'Контроль',
    cardCtrlTitle: 'Controlled и uncontrolled',
    apiH2: 'Минимальный API',
    apiP: 'Два пропса покрывают 90% случаев. Остальное — по необходимости.',
    finalH2: 'Готов поставить?',
    finalP:
      'Рецепты, API и примеры под RHF, Zod, Joi и shadcn/ui — в документации.',
    finalDocs: 'Открыть документацию',
    props: [
      { name: 'value', type: 'Date | null', desc: 'Контролируемое значение' },
      {
        name: 'onChange',
        type: '(d: Date|null) => void',
        desc: 'Колбэк при изменении',
      },
      {
        name: 'format',
        type: 'string',
        desc: 'Маска date-fns, напр. dd.MM.yyyy',
      },
      { name: 'locale', type: 'Locale', desc: 'Локаль date-fns' },
      {
        name: 'range',
        type: 'boolean',
        desc: 'Двухфазный выбор диапазона',
      },
      { name: 'showTime', type: 'boolean', desc: 'Включить TimePanel' },
    ],
  },
  en: {
    navDocs: 'Docs',
    badge: `v${pkg.version} — adaptive width`,
    h1a: 'A date picker',
    h1b: 'you actually enjoy',
    h1c: 'typing into',
    heroP:
      "A React DatePicker with input masking. Controlled and uncontrolled, ranges, time, any date-fns locale. Zero overhead when react-hook-form isn’t needed.",
    ctaStart: 'Get started',
    badgeTs: 'TypeScript built-in',
    demoLabel: 'Input mask',
    demoCaption: 'Type straight through — separators are inserted for you. Backspace skips them, validity is checked round-trip.',
    trust1: 'brotli, whole package',
    trust2: 'runtime deps besides date-fns',
    trust3: 'formats: ESM · CJS · .d.ts',
    trust4: 'props for any format',
    featH2: 'Everything you want from a date picker',
    cardLocaleEyebrow: 'Locales',
    cardLocaleTitle: 'Any language via a prop',
    cardRangeEyebrow: 'Range + time',
    cardRangeTitle: 'Two-step click, optional TimePanel',
    cardCtrlEyebrow: 'Control',
    cardCtrlTitle: 'Controlled and uncontrolled',
    apiH2: 'Minimal API',
    apiP: 'Two props cover 90% of cases. The rest is opt-in.',
    finalH2: 'Ready to install?',
    finalP:
      'Recipes, API and examples for RHF, Zod, Joi and shadcn/ui — in the docs.',
    finalDocs: 'Open the docs',
    props: [
      { name: 'value', type: 'Date | null', desc: 'Controlled value' },
      {
        name: 'onChange',
        type: '(d: Date|null) => void',
        desc: 'Change callback',
      },
      {
        name: 'format',
        type: 'string',
        desc: 'date-fns mask, e.g. dd.MM.yyyy',
      },
      { name: 'locale', type: 'Locale', desc: 'date-fns locale' },
      { name: 'range', type: 'boolean', desc: 'Two-step range selection' },
      { name: 'showTime', type: 'boolean', desc: 'Enable the TimePanel' },
    ],
  },
};

const INSTALL_CMD = 'npm install daterly';

const randomDate = (): { full: string; iso: string } => {
  const y = 2000 + Math.floor(Math.random() * 31);
  const m = 1 + Math.floor(Math.random() * 12);
  const daysInMonth = new Date(y, m, 0).getDate();
  const d = 1 + Math.floor(Math.random() * daysInMonth);
  const dd = String(d).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  const yyyy = String(y);
  return { full: dd + mm + yyyy, iso: `${yyyy}-${mm}-${dd}T00:00:00.000Z` };
};

export default function Landing() {
  const [lang, setLang] = useState<Lang>('ru');
  const [n, setN] = useState(0);
  const [date, setDate] = useState({
    full: '12052026',
    iso: '2026-05-12T00:00:00.000Z',
  });
  const holdRef = useRef(0);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(8);
      return;
    }
    const id = setInterval(() => {
      setN(prev => {
        if (prev < 8) { holdRef.current = 0; return prev + 1; }
        if (holdRef.current < 7) { holdRef.current += 1; return prev; }
        holdRef.current = 0; setDate(randomDate()); return 0;
      });
    }, 300);
    return () => clearInterval(id);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const t = DICT[lang];

  const FULL = date.full;
  const PATTERN = 'dd.MM.yyyy';
  let _di = 0;
  const maskChars: { ch: string; dim: boolean }[] = [];
  for (const pc of PATTERN) {
    if (pc === '.') {
      maskChars.push({ ch: '.', dim: n < _di });
    } else {
      maskChars.push(_di < n ? { ch: FULL[_di], dim: false } : { ch: pc, dim: true });
      _di++;
    }
  }
  const done = n === 8;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark} aria-hidden>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <rect x="3" y="4" width="18" height="17" rx="3" />
                <path d="M3 9h18M8 2v4M16 2v4" />
              </svg>
            </span>
            daterly
          </Link>
          <nav className={styles.navRight}>
            <Link href="/docs" className={styles.navLink}>
              {t.navDocs}
            </Link>
            <a
              href="https://github.com/artemydottech/daterly"
              target="_blank"
              rel="noreferrer"
              className={styles.navLink}
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/daterly"
              target="_blank"
              rel="noreferrer"
              className={styles.navLink}
            >
              npm
            </a>
            <div className={styles.langSwitch}>
              <button
                className={
                  lang === 'en' ? styles.langBtnActive : styles.langBtn
                }
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <span className={styles.langDot} aria-hidden>
                ·
              </span>
              <button
                className={
                  lang === 'ru' ? styles.langBtnActive : styles.langBtn
                }
                onClick={() => setLang('ru')}
              >
                RU
              </button>
            </div>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={isDark ? 'Light theme' : 'Dark theme'}
              suppressHydrationWarning
            >
              {mounted &&
                (isDark ? (
                  <Sun size={15} strokeWidth={2} />
                ) : (
                  <Moon size={15} strokeWidth={2} />
                ))}
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t.badge}
          </div>
          <h1 className={styles.h1}>
            {t.h1a}
            <br />
            {t.h1b}
            <br />
            <span className={styles.h1Accent}>{t.h1c}</span>
          </h1>
          <p className={styles.subtitle}>{t.heroP}</p>
          <div className={styles.ctaRow}>
            <Link href="/docs" className={styles.btnPrimary}>
              {t.ctaStart}
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <a
              href="https://github.com/artemydottech/daterly"
              target="_blank"
              rel="noreferrer"
              className={styles.btnSecondary}
            >
              <IconGithub size={15} /> GitHub
            </a>
          </div>
          <button
            type="button"
            className={styles.installBlock}
            onClick={handleCopy}
            aria-label="Copy install command"
          >
            <span className={styles.installPrompt}>$</span>
            <span className={styles.installCmd}>{INSTALL_CMD}</span>
            <span className={styles.installIcon} aria-hidden>
              {copied ? (
                <Check size={13} strokeWidth={2.5} />
              ) : (
                <Copy size={13} strokeWidth={2} />
              )}
            </span>
          </button>
          <ul className={styles.miniBadges}>
            <li className={styles.miniBadge}>
              <span className={styles.miniBadgeCheck}>•</span> ~29 KB brotli
            </li>
            <li className={styles.miniBadge}>
              <span className={styles.miniBadgeCheck}>•</span> {t.badgeTs}
            </li>
            <li className={styles.miniBadge}>
              <span className={styles.miniBadgeCheck}>•</span> MIT
            </li>
          </ul>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.demoCard}>
            <div className={styles.demoCardHeader}>
              <span className={styles.demoCardLabel}>{t.demoLabel}</span>
              <span className={styles.demoCardFormat}>
                format=&quot;dd.MM.yyyy&quot;
              </span>
            </div>
            <div className={styles.maskField}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
                style={{ color: 'var(--lp-muted)', flexShrink: 0 }}
              >
                <rect x="3" y="4" width="18" height="17" rx="3" />
                <path d="M3 9h18M8 2v4M16 2v4" />
              </svg>
              <span className={styles.maskStr}>
                {maskChars.map((c, i) => (
                  <span key={i} className={c.dim ? styles.maskDim : styles.maskLit}>
                    {c.ch}
                  </span>
                ))}
                <span className={styles.cursor} aria-hidden />
              </span>
            </div>
            <p className={styles.demoCaption}>{t.demoCaption}</p>
            <div className={styles.demoOutput}>
              <div className={styles.demoOutputHeader}>
                <span className={styles.demoOutputDots} aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.demoOutputLabel}>onChange value</span>
              </div>
              <pre
                className={styles.demoOutputBody}
                style={{ color: done ? '#3FB950' : undefined }}
              >
                {done ? date.iso : 'null'}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className={styles.trustSection}>
        <div className={styles.trustStrip}>
          <div className={styles.trustCell}>
            <div className={styles.trustNum}>~29 KB</div>
            <div className={styles.trustLabel}>{t.trust1}</div>
          </div>
          <div className={styles.trustCell}>
            <div className={styles.trustNum}>0</div>
            <div className={styles.trustLabel}>{t.trust2}</div>
          </div>
          <div className={styles.trustCell}>
            <div className={styles.trustNum}>3</div>
            <div className={styles.trustLabel}>{t.trust3}</div>
          </div>
          <div className={styles.trustCell}>
            <div className={styles.trustNum}>2</div>
            <div className={styles.trustLabel}>{t.trust4}</div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <FormExample lang={lang} />

      {/* FEATURE GRID */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresSectionInner}>
          <h2 className={styles.sectionTitle}>{t.featH2}</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureEyebrow}>
                {t.cardLocaleEyebrow}
              </span>
              <h3 className={styles.featureTitle}>{t.cardLocaleTitle}</h3>
              <ul className={styles.localeRows}>
                <li>
                  <code>ru</code>
                  <span>12 мая 2026</span>
                </li>
                <li>
                  <code>en</code>
                  <span>May 12, 2026</span>
                </li>
                <li>
                  <code>de</code>
                  <span>12. Mai 2026</span>
                </li>
              </ul>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureEyebrow}>
                {t.cardRangeEyebrow}
              </span>
              <h3 className={styles.featureTitle}>{t.cardRangeTitle}</h3>
              <div className={styles.rangePreview}>
                <span className={styles.rangeChip}>
                  12.05.2026 <em>09:30</em>
                </span>
                <span className={styles.rangeDash} aria-hidden />
                <span className={styles.rangeChip}>
                  19.05.2026 <em>18:00</em>
                </span>
              </div>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureEyebrow}>
                {t.cardCtrlEyebrow}
              </span>
              <h3 className={styles.featureTitle}>{t.cardCtrlTitle}</h3>
              <pre
                className={styles.ctrlCode}
              >{`<DatePicker\n  value={d}\n  onChange={setD}\n/>`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* PROPS TABLE */}
      <section className={styles.propsSection}>
        <div className={styles.propsSectionInner}>
          <h2 className={styles.sectionTitle}>{t.apiH2}</h2>
          <p className={styles.sectionSubtitle}>{t.apiP}</p>
          <div className={styles.propsTable}>
            {t.props.map((p) => (
              <div key={p.name} className={styles.propRow}>
                <code className={styles.propName}>{p.name}</code>
                <code className={styles.propType}>{p.type}</code>
                <span className={styles.propDesc}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCtaSection}>
        <div className={styles.finalCtaBanner}>
          <h2 className={styles.finalCtaTitle}>{t.finalH2}</h2>
          <p className={styles.finalCtaSubtitle}>{t.finalP}</p>
          <div className={styles.finalCtaButtons}>
            <button
              type="button"
              className={styles.finalInstallBtn}
              onClick={handleCopy}
            >
              <span className={styles.installPrompt}>$</span> {INSTALL_CMD}
              <span className={styles.installIcon} aria-hidden>
                {copied ? (
                  <Check size={13} strokeWidth={2.5} />
                ) : (
                  <Copy size={13} strokeWidth={2} />
                )}
              </span>
            </button>
            <Link href="/docs" className={styles.finalDocsBtn}>
              {t.finalDocs} →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <span>MIT © {new Date().getFullYear()}</span>
            <span className={styles.footerDot}>·</span>
            <span className={styles.footerMade}>
              made with{' '}
              <Heart
                size={12}
                fill="currentColor"
                className={styles.footerHeart}
              />{' '}
              by{' '}
              <a href="https://artemy.tech" target="_blank" rel="noreferrer">
                a.tech
              </a>
            </span>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/docs">{t.navDocs}</Link>
            <a
              href="https://github.com/artemydottech/daterly"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/daterly"
              target="_blank"
              rel="noreferrer"
            >
              npm
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function IconGithub({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39s1.97.13 2.89.39c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
