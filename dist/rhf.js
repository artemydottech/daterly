import {
  DatePicker,
  DateRangePicker
} from "./chunk-DQSX6QKR.js";

// src/components/RHFDatePicker/RHFDatePicker.tsx
import { Controller, useFormContext } from "react-hook-form";
import { jsx, jsxs } from "react/jsx-runtime";
function RHFDatePicker({ name, rules, ...props }) {
  const { control } = useFormContext();
  return /* @__PURE__ */ jsx(
    Controller,
    {
      control,
      name,
      rules,
      render: ({ field: { value, onChange }, fieldState: { error } }) => /* @__PURE__ */ jsxs("div", { className: "datepicker-rhf", children: [
        /* @__PURE__ */ jsx(DatePicker, { value, onChange, failed: Boolean(error), ...props }),
        (error == null ? void 0 : error.message) && /* @__PURE__ */ jsx("span", { className: "datepicker-rhf__error", children: error.message })
      ] })
    }
  );
}

// src/components/RHFDateRangePicker/RHFDateRangePicker.tsx
import { Controller as Controller2, useFormContext as useFormContext2 } from "react-hook-form";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function RHFDateRangePicker({ name, rules, ...props }) {
  const { control } = useFormContext2();
  return /* @__PURE__ */ jsx2(
    Controller2,
    {
      control,
      name,
      rules,
      render: ({ field: { value, onChange }, fieldState: { error } }) => /* @__PURE__ */ jsxs2("div", { className: "datepicker-rhf", children: [
        /* @__PURE__ */ jsx2(DateRangePicker, { value, onChange, failed: Boolean(error), ...props }),
        (error == null ? void 0 : error.message) && /* @__PURE__ */ jsx2("span", { className: "datepicker-rhf__error", children: error.message })
      ] })
    }
  );
}
export {
  RHFDatePicker,
  RHFDateRangePicker
};
//# sourceMappingURL=rhf.js.map