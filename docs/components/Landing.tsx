import { useState } from 'react'
import { DatePicker, DateRangePicker, type DateRange } from '@artemy-tech/datepicker'
import styles from './Landing.module.css'

type Demo = 'single' | 'range' | 'time'

export default function Landing() {
  const [demo, setDemo] = useState<Demo>('single')
  const [date, setDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()
  const [dateTime, setDateTime] = useState<Date | undefined>()

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.logo}>@artemy-tech/datepicker</div>
        <div className={styles.navRight}>
          <a className={styles.navLink} href="/docs">
            Документация
          </a>
          <a
            className={styles.navLink}
            href="https://github.com/artemydottech/datepicker"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.navLink}
            href="https://www.npmjs.com/package/@artemy-tech/datepicker"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <strong>v0.7.0</strong> — поддержка любых локалей и форматов даты
          </div>
          <h1 className={styles.title}>
            React DatePicker
            <br />
            <span className={styles.titleAccent}>с маской ввода</span>
          </h1>
          <p className={styles.subtitle}>
            Контролируемый, неконтролируемый, диапазоны, время, любые локали
            date-fns. Опциональная интеграция с react-hook-form. Нулевые
            издержки если RHF не нужен.
          </p>
          <div className={styles.cta}>
            <a className={styles.btnPrimary} href="/docs">
              Начать →
            </a>
            <a
              className={styles.btnSecondary}
              href="https://github.com/artemydottech/datepicker"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className={styles.demoSection}>
        <div className={styles.demoCard}>
          <div className={styles.demoLeft}>
            <h2>Попробуй прямо здесь</h2>
            <p>
              Введи дату руками — маска сама расставит точки. Открой календарь
              — выбери визуально. Любая локаль, любой формат — настраивается
              двумя пропсами.
            </p>
            <div className={styles.demoTabs}>
              <button
                className={`${styles.demoTab} ${demo === 'single' ? styles.demoTabActive : ''}`}
                onClick={() => setDemo('single')}
              >
                Одиночная
              </button>
              <button
                className={`${styles.demoTab} ${demo === 'range' ? styles.demoTabActive : ''}`}
                onClick={() => setDemo('range')}
              >
                Диапазон
              </button>
              <button
                className={`${styles.demoTab} ${demo === 'time' ? styles.demoTabActive : ''}`}
                onClick={() => setDemo('time')}
              >
                Со временем
              </button>
            </div>
          </div>
          <div className={styles.demoStage}>
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
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <h2>Что внутри</h2>
          <p>Только то, что нужно реальным формам — без лишнего.</p>
        </div>
        <div className={styles.featureGrid}>
          <Feature
            icon="🌍"
            title="Локали date-fns"
            text="Любая локаль через проп. Календарь, дни недели, месяцы — на нужном языке."
          />
          <Feature
            icon="📐"
            title="Произвольный формат"
            text="dd.MM.yyyy, MM/dd/yyyy, yyyy-MM-dd и любые комбинации. Маска генерится автоматически."
          />
          <Feature
            icon="⌨️"
            title="Маска ввода"
            text="Цифры — на нужные позиции, разделители — сами. Бэкспейс пропускает их корректно."
          />
          <Feature
            icon="📅"
            title="Диапазоны и время"
            text="Range-пикер с двухфазным кликом. Опциональный TimePanel с HH:mm или HH:mm:ss."
          />
          <Feature
            icon="🪝"
            title="react-hook-form"
            text="Отдельный entry-point @artemy-tech/datepicker/rhf. Типобезопасный name через дженерик."
          />
          <Feature
            icon="🎨"
            title="CSS-переменные"
            text="Всё через --datepicker-*. Состояния — через data-атрибуты. Без CSS-in-JS."
          />
          <Feature
            icon="🧩"
            title="Любой UI"
            text="customTrigger и renderInput — встраивай в Ant Design, MUI, shadcn/ui."
          />
          <Feature
            icon="📦"
            title="Маленький бандл"
            text="Без зависимостей кроме date-fns и react-day-picker. ESM + CJS, типы из коробки."
          />
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          MIT © {new Date().getFullYear()}{' '}
          <a
            href="https://github.com/artemydottech"
            target="_blank"
            rel="noreferrer"
          >
            artemydottech
          </a>
          {' · '}
          <a href="/docs">Документация</a>
          {' · '}
          <a
            href="https://www.npmjs.com/package/@artemy-tech/datepicker"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>
        </p>
      </footer>
    </div>
  )
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}
