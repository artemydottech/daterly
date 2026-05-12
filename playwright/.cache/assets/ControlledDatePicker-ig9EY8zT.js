import { j as jsxRuntimeExports } from './Spinner-ra9hIxQv.js';
import { r as reactExports } from './index-vAHire36.js';
import { DatePicker } from './index-BE4DMema.js';

function ControlledDatePicker() {
  const [date, setDate] = reactExports.useState(new Date(2024, 0, 1, 12, 0, 0));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { value: date, onChange: setDate }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDate(new Date(2024, 5, 15, 12, 0, 0)), children: "Change" })
  ] });
}

export { ControlledDatePicker };
//# sourceMappingURL=ControlledDatePicker-ig9EY8zT.js.map
