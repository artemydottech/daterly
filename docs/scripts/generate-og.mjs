import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import path from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const fontsDir = path.join(
  path.dirname(require.resolve('@fontsource/inter/package.json')),
  'files',
)
const pkg = JSON.parse(
  readFileSync(path.resolve(dir, '../../package.json'), 'utf8'),
)

const font = (subset, weight) =>
  readFileSync(path.join(fontsDir, `inter-${subset}-${weight}-normal.woff`))

// satori dedupes fonts sharing name+weight, so the Cyrillic subset gets a
// distinct family name — satori still uses it as a per-glyph fallback.
const fonts = [
  { name: 'Inter', data: font('latin', 400), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('latin', 700), weight: 700, style: 'normal' },
  { name: 'InterCyr', data: font('cyrillic', 400), weight: 400, style: 'normal' },
  { name: 'InterCyr', data: font('cyrillic', 700), weight: 700, style: 'normal' },
]

const ACCENT = '#b06bff'
const TEXT = '#eef0f6'
const MUTED = 'rgba(233,235,243,0.6)'

const calendarIcon =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eef0f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 11h18"/><path d="M7 15.5h2"/><path d="M11 15.5h2"/><path d="M15 15.5h2"/></svg>`,
  ).toString('base64')

const h = (type, style, ...children) => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
})

const img = (src, size) => ({
  type: 'img',
  props: { width: size, height: size, src },
})

const pill = (strong, rest) =>
  h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '11px 18px',
      borderRadius: 999,
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      fontSize: 21,
    },
    h('span', { fontWeight: 700, color: TEXT }, strong),
    h('span', { color: MUTED }, rest),
  )

const tree = (copy) => h(
  'div',
  {
    width: 1200,
    height: 630,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '74px 78px',
    backgroundColor: '#06060c',
    backgroundImage:
      'radial-gradient(ellipse 75% 90% at 16% -10%, rgba(124,92,255,0.45), transparent 60%), radial-gradient(ellipse 60% 70% at 102% 115%, rgba(255,159,209,0.18), transparent 55%)',
    fontFamily: 'Inter',
    color: TEXT,
  },
  h(
    'div',
    { display: 'flex', alignItems: 'center', gap: 18 },
    h(
      'div',
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 66,
        height: 66,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
      },
      img(calendarIcon, 32),
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', gap: 4 },
      h('span', { fontSize: 24, fontWeight: 700, color: TEXT }, 'artemy.tech'),
      h('span', { fontSize: 17, color: MUTED }, `npm · v${pkg.version}`),
    ),
  ),
  h(
    'div',
    { display: 'flex', flexDirection: 'column' },
    h(
      'div',
      { fontSize: 94, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 },
      'React DatePicker',
    ),
    h(
      'div',
      {
        fontSize: 94,
        fontWeight: 700,
        lineHeight: 1.04,
        letterSpacing: -2,
        color: 'transparent',
        backgroundImage: `linear-gradient(90deg, ${ACCENT}, #ff9fd1)`,
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
      },
      copy.title,
    ),
  ),
  h(
    'div',
    { display: 'flex', flexDirection: 'column', gap: 26 },
    h(
      'div',
      { fontSize: 27, color: MUTED },
      copy.description,
    ),
    h(
      'div',
      { display: 'flex', gap: 12 },
      pill('2', copy.dependencies),
      pill('ESM', '+ CJS'),
      pill('TS', copy.types),
      pill('RHF', copy.optional),
    ),
  ),
)

const versions = {
  'og.png': {
    title: 'with input masking',
    description: 'Ranges · Time · date-fns locales · react-hook-form',
    dependencies: 'dependencies',
    types: 'types',
    optional: 'optional',
  },
  'og.ru.png': {
    title: 'с маской ввода',
    description: 'Диапазоны · Время · Локали date-fns · react-hook-form',
    dependencies: 'зависимости',
    types: 'типы',
    optional: 'опционально',
  },
}

for (const [filename, copy] of Object.entries(versions)) {
  const svg = await satori(tree(copy), { width: 1200, height: 630, fonts })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng()
  const out = path.resolve(dir, '../public', filename)
  writeFileSync(out, png)
  console.log(`${filename} written → ${out} (${(png.length / 1024).toFixed(1)} KB)`)
}
