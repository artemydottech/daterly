import {
  Calendar,
  DatePicker,
  DateRangePicker,
  Spinner
} from "./chunk-K5D5LTMS.js";

// src/components/Button/Button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Button({
  variant = "primary",
  size = "m",
  loading = false,
  disabled,
  className,
  children,
  ...rest
}) {
  const classes = [
    "dp-btn",
    `dp-btn--${variant}`,
    `dp-btn--${size}`,
    loading && "dp-btn--loading",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("button", { ...rest, className: classes, disabled: disabled || loading, children: [
    children,
    loading && /* @__PURE__ */ jsx(Spinner, {})
  ] });
}
export {
  Button,
  Calendar,
  DatePicker,
  DateRangePicker
};
//# sourceMappingURL=index.js.map