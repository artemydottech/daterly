---
"daterly": patch
---

Inline react-day-picker base styles into the published `dist/styles/variables.css` at build time. The shipped stylesheet no longer contains `@import 'react-day-picker/style.css'`, so consumers' bundlers no longer need to resolve that import from `node_modules` (fixes broken styling in setups like CRA without `react-app-rewired`).
