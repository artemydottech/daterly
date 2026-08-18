---
"daterly": major
---

Remove accidentally exported `Button` component from the public API.

`Button` was never part of the intended surface of the library — it was unused
internally and only reachable because `src/index.ts` re-exported it. The component,
its `ButtonProps` type and the related `.dp-btn*` styles have been removed.

**Migration:** if you imported `Button` from `daterly`, replace it with your own
button component or a native `<button>`.
