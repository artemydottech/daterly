import type { AxeMatchers } from 'vitest-axe/matchers'

declare module 'vitest' {
  interface Matchers<T = any> extends AxeMatchers {}
}
