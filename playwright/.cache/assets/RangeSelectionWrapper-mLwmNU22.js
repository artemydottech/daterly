import { j as jsxRuntimeExports } from './Spinner-ra9hIxQv.js';
import { r as reactExports } from './index-vAHire36.js';
import { DateRangePicker } from './index-DJ_GuejU.js';

function RangeSelectionWrapper() {
  const [range, setRange] = reactExports.useState();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { onChange: setRange }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-testid": "result", children: [
      range?.from ? `from:${range.from.getDate()}` : "none",
      range?.to ? ` to:${range.to.getDate()}` : ""
    ] })
  ] });
}

export { RangeSelectionWrapper };
//# sourceMappingURL=RangeSelectionWrapper-mLwmNU22.js.map
