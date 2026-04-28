import type { Preview } from '@storybook/react'
import '../src/styles/variables.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /^(from|to|value|defaultValue)$/i,
      },
    },
    docs: {
      story: {
        height: '420px',
      },
    },
  },
}

export default preview
