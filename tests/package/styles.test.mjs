import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const packageRoot = new URL('../../', import.meta.url)
const packageJson = JSON.parse(await readFile(new URL('package.json', packageRoot), 'utf8'))

const cases = [
  { name: 'ESM', entry: '.', format: 'import', component: 'DatePicker' },
  { name: 'CommonJS', entry: '.', format: 'require', component: 'DatePicker' },
  { name: 'RHF ESM', entry: './rhf', format: 'import', component: 'RHFDatePicker' },
  { name: 'RHF CommonJS', entry: './rhf', format: 'require', component: 'RHFDatePicker' },
  { name: 'both entries with the legacy stylesheet', legacy: true },
]

for (const scenario of cases) {
  test(`${scenario.name} includes calendar and field styles automatically`, async () => {
    const root = await mkdtemp(join(tmpdir(), 'daterly-styles-'))
    const resolveExport = (entry, format) => fileURLToPath(
      new URL(format ? packageJson.exports[entry][format] : packageJson.exports[entry], packageRoot),
    )
    const importComponent = (entry, format, component) =>
      `export { ${component} } from ${JSON.stringify(resolveExport(entry, format))}`
    const source = scenario.legacy
      ? [
          importComponent('.', 'import', 'DatePicker'),
          importComponent('./rhf', 'import', 'RHFDatePicker'),
          `import ${JSON.stringify(resolveExport('./styles'))}`,
        ].join('\n')
      : importComponent(scenario.entry, scenario.format, scenario.component)

    try {
      const entry = join(root, 'entry.js')
      await writeFile(entry, source)
      const result = await build({
        configFile: false,
        root,
        logLevel: 'silent',
        build: {
          write: false,
          minify: false,
          cssMinify: false,
          lib: { entry, formats: ['es'] },
          rollupOptions: {
            external: /^(react|react-dom|react-hook-form|date-fns)(\/|$)/,
          },
        },
      })
      const output = (Array.isArray(result) ? result : [result]).flatMap(bundle => bundle.output)
      const stylesheets = output.filter(file => file.type === 'asset' && file.fileName.endsWith('.css'))

      assert.equal(stylesheets.length, 1)
      const css = String(stylesheets[0].source)
      assert.match(css, /\.rdp-root\s*\{/)
      assert.match(css, /\.daterly__field\s*\{/)
      assert.equal(css.match(/--daterly-color-accent:\s*#1f84db/g)?.length, 1)
      assert.doesNotMatch(css, /@import/)
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  })
}
