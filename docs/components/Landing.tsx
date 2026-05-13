import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { DatePicker, DateRangePicker, type DateRange } from '@artemy-tech/rtdp';
import {
  Globe,
  Ruler,
  Keyboard,
  CalendarRange,
  Webhook,
  Palette,
  Puzzle,
  Package,
  Tag,
  FileType2,
  Copy,
  Check,
  Heart,
  ArrowRight,
  ChevronDown,
  Sun,
  Moon,
  type LucideIcon,
} from 'lucide-react';
import Aurora from './aurora/Aurora';
import FormExample from './FormExample';
import LogoMark from './LogoMark';
import pkg from '../../package.json';
import styles from './Landing.module.css';

type Demo = 'single' | 'range' | 'time';

const INSTALL_COMMAND = 'npm install @artemy-tech/rtdp';

function formatValue(
  demo: Demo,
  date: Date | undefined,
  range: DateRange | undefined,
  dateTime: Date | undefined,
) {
  const toISO = (d?: Date) => (d ? d.toISOString() : undefined);
  let value: unknown;
  if (demo === 'single') value = toISO(date);
  else if (demo === 'time') value = toISO(dateTime);
  else value = range && { from: toISO(range.from), to: toISO(range.to) };

  return JSON.stringify(value ?? null, null, 2);
}

export default function Landing() {
  const [demo, setDemo] = useState<Demo>('single');
  const [date, setDate] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();
  const [dateTime, setDateTime] = useState<Date | undefined>();
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className={styles.page}>
      {isDark && (
        <div className={styles.auroraWrap}>
          <Aurora
            colorStops={['#5227FF', '#B06BFF', '#5227FF']}
            amplitude={1.2}
            blend={0.6}
            speed={0.6}
          />
        </div>
      )}

      <header className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark} aria-hidden>
            <LogoMark size={16} variant="dashes" />
          </span>
          rtdp
        </Link>
        <nav className={styles.navRight}>
          <Link className={styles.navLink} href="/docs">
            Документация
          </Link>
          <a
            className={styles.navLink}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/artemydottech/rtdp"
            aria-label="GitHub"
          >
            <IconGithub size={16} />
            <span className={styles.navLinkLabel}>GitHub</span>
          </a>
          <a
            className={styles.navLink}
            href="https://www.npmjs.com/package/@artemy-tech/rtdp"
            target="_blank"
            rel="noreferrer"
            aria-label="npm"
          >
            <IconNpm size={16} />
            <span className={styles.navLinkLabel}>npm</span>
          </a>
          <button
            type="button"
            className={styles.navLink}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
            suppressHydrationWarning
          >
            {mounted &&
              (isDark ? (
                <Sun size={16} strokeWidth={2} />
              ) : (
                <Moon size={16} strokeWidth={2} />
              ))}
          </button>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />v
            {pkg.version.split('.').slice(0, 3).join('.')} — любые локали и
            форматы даты
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleIcon} aria-hidden>
              <IconReact size={40} />
            </span>
            React DatePicker
            <br />
            <span className={styles.titleAccent}>с маской ввода</span>
          </h1>
          <p className={styles.subtitle}>
            Контролируемый, неконтролируемый, диапазоны, время, любые локали
            date-fns. Опциональная интеграция с react-hook-form. Нулевые
            издержки, если RHF не нужен.
          </p>
          <div className={styles.cta}>
            <Link className={styles.btnPrimary} href="/docs">
              Начать
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              className={styles.btnSecondary}
              href="https://github.com/artemydottech/rtdp"
              target="_blank"
              rel="noreferrer"
            >
              <IconGithub size={16} />
              GitHub
            </a>
          </div>
          <button
            type="button"
            className={styles.installBlock}
            onClick={handleCopy}
            aria-label="Скопировать команду установки"
          >
            <code className={styles.installCode}>{INSTALL_COMMAND}</code>
            <span className={styles.installCopyIcon} aria-hidden>
              {copied ? (
                <Check size={14} strokeWidth={2.5} />
              ) : (
                <Copy size={14} strokeWidth={2} />
              )}
            </span>
            {copied && (
              <span className={styles.installCopied}>Скопировано</span>
            )}
          </button>
          <ul className={styles.badges}>
            <li className={styles.badge}>
              <Package size={13} strokeWidth={2} />
              <span className={styles.badgeText}>
                <span className={styles.badgeValue}>~8 KB</span>
                <span className={styles.badgeLabel}>gzip</span>
              </span>
            </li>
            <li className={styles.badge}>
              <Tag size={13} strokeWidth={2} />
              <span className={styles.badgeText}>
                <span className={styles.badgeValue}>v{pkg.version}</span>
                <span className={styles.badgeLabel}>npm</span>
              </span>
            </li>
            <li className={styles.badge}>
              <FileType2 size={13} strokeWidth={2} />
              <span className={styles.badgeText}>
                <span className={styles.badgeValue}>TypeScript</span>
                <span className={styles.badgeLabel}>типы из коробки</span>
              </span>
            </li>
            <li className={styles.badge}>
              <Webhook size={13} strokeWidth={2} />
              <span className={styles.badgeText}>
                <span className={styles.badgeValue}>react-hook-form</span>
                <span className={styles.badgeLabel}>опционально</span>
              </span>
            </li>
          </ul>
        </div>
        <a
          className={styles.scrollHint}
          href="#demo"
          aria-label="Прокрутить к демо"
        >
          <span>Попробовать</span>
          <ChevronDown size={16} strokeWidth={2} />
        </a>
      </section>

      <section className={styles.demoSection} id="demo">
        <div className={styles.demoCard}>
          <div className={styles.demoLeft}>
            <h2>Попробуй прямо здесь</h2>
            <p>
              Введи дату руками — маска сама расставит точки. Открой календарь —
              выбери визуально. Любая локаль, любой формат — настраивается двумя
              пропсами.
            </p>
            <div className={styles.demoTabs} role="tablist">
              <button
                className={`${styles.demoTab} ${
                  demo === 'single' ? styles.demoTabActive : ''
                }`}
                onClick={() => setDemo('single')}
                role="tab"
                aria-selected={demo === 'single'}
              >
                Одиночная
              </button>
              <button
                className={`${styles.demoTab} ${
                  demo === 'range' ? styles.demoTabActive : ''
                }`}
                onClick={() => setDemo('range')}
                role="tab"
                aria-selected={demo === 'range'}
              >
                Диапазон
              </button>
              <button
                className={`${styles.demoTab} ${
                  demo === 'time' ? styles.demoTabActive : ''
                }`}
                onClick={() => setDemo('time')}
                role="tab"
                aria-selected={demo === 'time'}
              >
                Со временем
              </button>
            </div>
          </div>
          <div className={styles.demoStage}>
            <div className={styles.demoPickerWrap}>
              {demo === 'single' && (
                <DatePicker label="Дата" value={date} onChange={setDate} />
              )}
              {demo === 'range' && (
                <DateRangePicker
                  label="Период"
                  value={range}
                  onChange={setRange}
                />
              )}
              {demo === 'time' && (
                <DatePicker
                  label="Дата и время"
                  value={dateTime}
                  onChange={setDateTime}
                  showTime={{ format: 'HH:mm' }}
                />
              )}
            </div>
            <div className={styles.demoOutput}>
              <div className={styles.demoOutputHeader}>
                <span className={styles.demoOutputDots} aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.demoOutputLabel}>onChange value</span>
              </div>
              <pre className={styles.demoOutputBody}>
                <code>{formatValue(demo, date, range, dateTime)}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <FormExample />

      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <h2>Что внутри</h2>
          <p>Только то, что нужно реальным формам — без лишнего.</p>
        </div>
        <div className={styles.featureGrid}>
          <Feature
            icon={Globe}
            title="Локали date-fns"
            text="Любая локаль через проп. Календарь, дни недели, месяцы — на нужном языке."
          />
          <Feature
            icon={Ruler}
            title="Произвольный формат"
            text="dd.MM.yyyy, MM/dd/yyyy, yyyy-MM-dd и любые комбинации. Маска генерится автоматически."
          />
          <Feature
            icon={Keyboard}
            title="Маска ввода"
            text="Цифры — на нужные позиции, разделители — сами. Бэкспейс пропускает их корректно."
          />
          <Feature
            icon={CalendarRange}
            title="Диапазоны и время"
            text="Range-пикер с двухфазным кликом. Опциональный TimePanel с HH:mm или HH:mm:ss."
          />
          <Feature
            icon={Webhook}
            title="react-hook-form"
            text="Отдельный entry-point rtdp/rhf. Типобезопасный name через дженерик."
          />
          <Feature
            icon={Palette}
            title="CSS-переменные"
            text="Всё через --rtdp-*. Состояния — через data-атрибуты. Без CSS-in-JS."
          />
          <Feature
            icon={Puzzle}
            title="Любой UI"
            text="customTrigger и renderInput — встраивай в Ant Design, MUI, shadcn/ui."
          />
          <Feature
            icon={Package}
            title="Маленький бандл"
            text="Без зависимостей кроме date-fns и react-day-picker. ESM + CJS, типы из коробки."
          />
        </div>
      </section>

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
              <Link target="_blank" href="https://artemy.tech">
                a.tech
              </Link>
            </span>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/docs">Документация</Link>
            <a
              href="https://github.com/artemydottech/rtdp"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@artemy-tech/rtdp"
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

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function IconReact({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      aria-hidden
    >
      <path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z" />
    </svg>
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

function IconNpm({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M2 2h20v20H6.667v-3.333H2V2zm1.667 16.667h5V8.333h3.333v10.334h3.333V5.333H3.667v13.334zm15-1.667h-3.334V8.333h3.334V17z" />
    </svg>
  );
}
