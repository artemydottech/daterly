import { defineConfig } from 'tsup'
import { createRequire } from 'node:module'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const require = createRequire(import.meta.url)

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    rhf: 'src/rhf.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react-hook-form', 'date-fns'],
  async onSuccess() {
    await mkdir('dist/styles', { recursive: true })
    const rdpCss = await readFile(
      require.resolve('react-day-picker/style.css'),
      'utf8',
    )
    const ownCss = await readFile('src/styles/variables.css', 'utf8')
    const inlined = ownCss.replace(
      /^@import\s+['"]react-day-picker\/style\.css['"];?[^\n]*\n?/m,
      '',
    )
    await writeFile('dist/styles/variables.css', `${rdpCss}\n${inlined}`)
  },
})
