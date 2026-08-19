import '@testing-library/jest-dom'
import { expect } from 'vitest'
import { toHaveNoViolations } from 'vitest-axe/dist/matchers.js'

expect.extend({ toHaveNoViolations })

// jsdom does not implement scrollIntoView
Element.prototype.scrollIntoView = () => {}
