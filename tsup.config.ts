import { defineConfig } from 'tsup'
import { cp, mkdir } from 'node:fs/promises'

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
    await cp('src/styles/variables.css', 'dist/styles/variables.css')
  },
})
