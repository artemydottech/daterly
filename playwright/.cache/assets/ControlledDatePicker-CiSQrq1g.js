import { j as jsxRuntimeExports, D as DatePicker } from './index-D7ptCrl4.js';
import { r as reactExports } from './index-DkGDdsAR.js';

function ControlledDatePicker() {
  const [date, setDate] = reactExports.useState(new Date(2024, 0, 1, 12, 0, 0));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { value: date, onChange: setDate }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDate(new Date(2024, 5, 15, 12, 0, 0)), children: "Change" })
  ] });
}

export { ControlledDatePicker };
//# sourceMappingURL=ControlledDatePicker-CiSQrq1g.js.map
