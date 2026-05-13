import nextra from 'nextra'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const libRoot = path.resolve(__dirname, '..')

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
})

export default withNextra({
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  images: { unoptimized: true },
  reactStrictMode: true,
  webpack(config) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@artemy-tech/rtdp/styles': path.join(
        libRoot,
        'src/styles/variables.css',
      ),
      '@artemy-tech/rtdp/rhf': path.join(libRoot, 'dist/rhf.js'),
      '@artemy-tech/rtdp$': path.join(libRoot, 'dist/index.js'),
    }
    return config
  },
})
