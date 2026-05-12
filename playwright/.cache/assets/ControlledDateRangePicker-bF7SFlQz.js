import { j as jsxRuntimeExports } from './Spinner-ra9hIxQv.js';
import { r as reactExports } from './index-vAHire36.js';
import { DateRangePicker } from './index-DJ_GuejU.js';

function ControlledDateRangePicker() {
  const [range, setRange] = reactExports.useState({
    from: new Date(2024, 0, 1, 12, 0, 0),
    to: new Date(2024, 5, 30, 12, 0, 0)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { value: range, onChange: setRange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setRange({
          from: new Date(2024, 2, 1, 12, 0, 0),
          to: new Date(2024, 8, 30, 12, 0, 0)
        }),
        children: "Change"
      }
    )
  ] });
}

export { ControlledDateRangePicker };
//# sourceMappingURL=ControlledDateRangePicker-bF7SFlQz.js.map
