"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/rhf.ts
var rhf_exports = {};
__export(rhf_exports, {
  RHFDatePicker: () => RHFDatePicker,
  RHFDateRangePicker: () => RHFDateRangePicker
});
module.exports = __toCommonJS(rhf_exports);

// src/components/RHFDatePicker/RHFDatePicker.tsx
var import_react_hook_form = require("react-hook-form");

// src/components/DatePicker/DatePicker.tsx
var import_react3 = require("react");
var import_date_fns2 = require("date-fns");
var import_locale = require("date-fns/locale");

// src/hooks/useClickOutside.ts
var import_react = require("react");
function useClickOutside(ref, handler) {
  (0, import_react.useEffect)(() => {
    function listener(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// src/components/Calendar/Calendar.tsx
var import_react_day_picker = require("react-day-picker");
var import_jsx_runtime = require("react/jsx-runtime");
function Calendar({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_day_picker.DayPicker,
    {
      className: ["rtdp-calendar", className].filter(Boolean).join(" "),
      ...props
    }
  );
}

// src/components/TimePanel/TimePanel.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var HOURS = Array.from({ length: 24 }, (_, i) => i);
var MINUTES = Array.from({ length: 60 }, (_, i) => i);
var SECONDS = Array.from({ length: 60 }, (_, i) => i);
function pad2(n) {
  return String(n).padStart(2, "0");
}
function Column({ values, selected, onSelect }) {
  const selectedRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    var _a;
    (_a = selectedRef.current) == null ? void 0 : _a.scrollIntoView({ block: "center", behavior: "instant" });
  }, [selected]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "time-panel__column", children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      ref: v === selected ? selectedRef : void 0,
      className: "time-panel__item",
      "data-selected": v === selected || void 0,
      onClick: () => onSelect(v),
      type: "button",
      tabIndex: -1,
      children: pad2(v)
    },
    v
  )) });
}
function TimePanel({ value, showSeconds, onChange }) {
  var _a, _b, _c;
  const h = (_a = value == null ? void 0 : value.getHours()) != null ? _a : 0;
  const m = (_b = value == null ? void 0 : value.getMinutes()) != null ? _b : 0;
  const s = (_c = value == null ? void 0 : value.getSeconds()) != null ? _c : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "time-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Column, { values: HOURS, selected: h, onSelect: (v) => onChange(v, m, s) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Column, { values: MINUTES, selected: m, onSelect: (v) => onChange(h, v, s) }),
    showSeconds && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Column, { values: SECONDS, selected: s, onSelect: (v) => onChange(h, m, v) })
  ] });
}

// src/components/icons/CalendarIcon.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function CalendarIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "1", y: "2.5", width: "14", height: "12", rx: "1.5", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M1 6.5H15", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M5 1V4M11 1V4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}

// src/components/icons/Spinner.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function Spinner() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "rtdp-spinner", "aria-hidden": "true" });
}

// src/utils/date-mask.ts
var import_date_fns = require("date-fns");

// src/utils/format-schema.ts
var DATE_TOKENS = ["yyyy", "dd", "MM"];
var TIME_TOKENS = ["HH", "mm", "ss"];
var ALL_TOKENS = [...DATE_TOKENS, ...TIME_TOKENS];
var TOKEN_LENGTH = {
  yyyy: 4,
  dd: 2,
  MM: 2,
  HH: 2,
  mm: 2,
  ss: 2
};
var RU_TOKEN_PLACEHOLDER = {
  yyyy: "\u0433\u0433\u0433\u0433",
  dd: "\u0434\u0434",
  MM: "\u043C\u043C",
  HH: "\u0447\u0447",
  mm: "\u043C\u043C",
  ss: "\u0441\u0441"
};
var EN_TOKEN_PLACEHOLDER = {
  yyyy: "yyyy",
  dd: "dd",
  MM: "mm",
  HH: "hh",
  mm: "mm",
  ss: "ss"
};
function tokenize(format4, allowTime) {
  const parts = [];
  let i = 0;
  while (i < format4.length) {
    let matched = null;
    for (const token of ALL_TOKENS) {
      if (format4.startsWith(token, i)) {
        matched = token;
        break;
      }
    }
    if (matched) {
      if (!allowTime && TIME_TOKENS.includes(matched)) {
        throw new Error(
          `dateFormat must not contain time tokens (got "${matched}"). Use the "showTime" prop instead.`
        );
      }
      parts.push({ kind: "token", token: matched });
      i += matched.length;
      continue;
    }
    parts.push({ kind: "sep", char: format4[i] });
    i++;
  }
  return parts;
}
function validateDateParts(parts) {
  var _a, _b;
  const counts = {};
  for (const p of parts) {
    if (p.kind === "token") counts[p.token] = ((_a = counts[p.token]) != null ? _a : 0) + 1;
  }
  for (const token of DATE_TOKENS) {
    if (counts[token] !== 1) {
      throw new Error(
        `dateFormat must contain "${token}" exactly once. Supported tokens: dd, MM, yyyy. Got: ${(_b = counts[token]) != null ? _b : 0}`
      );
    }
  }
}
function buildSchemaFromParts(parts, isRu) {
  const placeholderMap = isRu ? RU_TOKEN_PLACEHOLDER : EN_TOKEN_PLACEHOLDER;
  const separators = [];
  let digitCount = 0;
  let format4 = "";
  let placeholder = "";
  let pendingSep = "";
  for (const part of parts) {
    if (part.kind === "sep") {
      pendingSep += part.char;
      format4 += part.char;
      placeholder += part.char;
      continue;
    }
    if (pendingSep) {
      separators.push({ afterDigit: digitCount, chars: pendingSep });
      pendingSep = "";
    }
    digitCount += TOKEN_LENGTH[part.token];
    format4 += part.token;
    placeholder += placeholderMap[part.token];
  }
  return { format: format4, digitCount, separators, placeholder };
}
function isRuLocale(locale) {
  if (!locale) return true;
  return locale.code === "ru";
}
function buildFormatSchema(dateFormat, timeFormat, locale) {
  const dateParts = tokenize(dateFormat, false);
  validateDateParts(dateParts);
  const parts = [...dateParts];
  if (timeFormat) {
    parts.push({ kind: "sep", char: " " });
    parts.push(...tokenize(timeFormat, true));
  }
  return buildSchemaFromParts(parts, isRuLocale(locale));
}
function applySchemaMask(digits, schema) {
  const d = digits.slice(0, schema.digitCount);
  let result = "";
  let sepIdx = 0;
  for (let i = 0; i < d.length; i++) {
    while (sepIdx < schema.separators.length && schema.separators[sepIdx].afterDigit === i) {
      result += schema.separators[sepIdx].chars;
      sepIdx++;
    }
    result += d[i];
  }
  return result;
}

// src/utils/date-mask.ts
var DEFAULT_DATE_FORMAT = "dd.MM.yyyy";
function resolveTimeFormat(showTime) {
  if (!showTime) return null;
  if (showTime === true) return "HH:mm:ss";
  return showTime.format;
}
function applyMask(digits, schema) {
  return applySchemaMask(digits, schema);
}
function getCursorPos(masked, digitCount) {
  if (digitCount === 0) return 0;
  let count = 0;
  for (let i = 0; i < masked.length; i++) {
    if (/\d/.test(masked[i])) {
      count++;
      if (count === digitCount) return i + 1;
    }
  }
  return masked.length;
}
function toDateOnly(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
}
function parseDateTime(masked, schema) {
  if (masked.replace(/\D/g, "").length !== schema.digitCount) return void 0;
  const date = (0, import_date_fns.parse)(masked, schema.format, /* @__PURE__ */ new Date());
  if (!(0, import_date_fns.isValid)(date) || (0, import_date_fns.format)(date, schema.format) !== masked) return void 0;
  return schema.digitCount === 8 ? toDateOnly(date) : date;
}

// src/components/DatePicker/DatePicker.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function DatePicker({
  value,
  defaultValue,
  onChange,
  label,
  placeholder,
  fromDate,
  toDate,
  disabled = false,
  failed = false,
  loading = false,
  size = "m",
  noCalendar = false,
  showTime,
  icon,
  iconPosition = "end",
  className,
  renderInput,
  customTrigger,
  locale = import_locale.ru,
  dateFormat: dateFormatProp = DEFAULT_DATE_FORMAT
}) {
  const timeFormat = resolveTimeFormat(showTime);
  const schema = (0, import_react3.useMemo)(
    () => buildFormatSchema(dateFormatProp, timeFormat, locale),
    [dateFormatProp, timeFormat, locale]
  );
  const dateFormat = schema.format;
  const maxDigits = schema.digitCount;
  const defaultPlaceholder = placeholder != null ? placeholder : schema.placeholder;
  const showSeconds = timeFormat === "HH:mm:ss";
  const fromDay = fromDate ? (0, import_date_fns2.startOfDay)(fromDate) : void 0;
  const toDay = toDate ? (0, import_date_fns2.startOfDay)(toDate) : void 0;
  const disabledDays = [
    ...fromDay ? [{ before: fromDay }] : [],
    ...toDay ? [{ after: toDay }] : []
  ];
  const resolvedIcon = loading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Spinner, {}) : icon === false ? null : icon != null ? icon : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CalendarIcon, {});
  const isControlled = value !== void 0;
  const [internalDate, setInternalDate] = (0, import_react3.useState)(defaultValue);
  const [open, setOpen] = (0, import_react3.useState)(false);
  const [focused, setFocused] = (0, import_react3.useState)(false);
  const [inputValue, setInputValue] = (0, import_react3.useState)(() => {
    const initial = value != null ? value : defaultValue;
    return initial && (0, import_date_fns2.isValid)(initial) ? (0, import_date_fns2.format)(initial, dateFormat) : "";
  });
  const [inputInvalid, setInputInvalid] = (0, import_react3.useState)(false);
  const inputRef = (0, import_react3.useRef)(null);
  const containerRef = (0, import_react3.useRef)(null);
  const lastValidRef = (0, import_react3.useRef)(inputValue);
  const lastEmittedRef = (0, import_react3.useRef)(value !== void 0 ? value : defaultValue);
  const wasControlledRef = (0, import_react3.useRef)(value !== void 0);
  const selected = isControlled ? value : internalDate;
  const [month, setMonth] = (0, import_react3.useState)(
    () => selected && (0, import_date_fns2.isValid)(selected) ? selected : /* @__PURE__ */ new Date()
  );
  const filled = inputValue.length > 0;
  (0, import_react3.useEffect)(() => {
    if (selected && (0, import_date_fns2.isValid)(selected)) setMonth(selected);
  }, [selected == null ? void 0 : selected.getFullYear(), selected == null ? void 0 : selected.getMonth()]);
  const close = (0, import_react3.useCallback)(() => setOpen(false), []);
  useClickOutside(containerRef, close);
  (0, import_react3.useEffect)(() => {
    var _a, _b, _c;
    if (value !== void 0) wasControlledRef.current = true;
    const lastTime = (_b = (_a = lastEmittedRef.current) == null ? void 0 : _a.getTime()) != null ? _b : null;
    const valueTime = (_c = value == null ? void 0 : value.getTime()) != null ? _c : null;
    if (valueTime === lastTime) return;
    if (!wasControlledRef.current && value === void 0) return;
    const formatted = value && (0, import_date_fns2.isValid)(value) ? (0, import_date_fns2.format)(value, dateFormat) : "";
    setInputValue(formatted);
    lastValidRef.current = formatted;
    setInputInvalid(false);
    if (!isControlled) setInternalDate(value);
    lastEmittedRef.current = value;
  }, [value]);
  function applyValid(masked, date) {
    lastEmittedRef.current = date;
    lastValidRef.current = masked;
    setInputValue(masked);
    setInputInvalid(false);
    if (!isControlled) setInternalDate(date);
    onChange == null ? void 0 : onChange(date);
  }
  function commit(masked) {
    const digits = masked.replace(/\D/g, "");
    if (digits.length === 0) {
      lastEmittedRef.current = void 0;
      lastValidRef.current = "";
      setInputInvalid(false);
      if (!isControlled) setInternalDate(void 0);
      onChange == null ? void 0 : onChange(void 0);
    } else if (digits.length === maxDigits) {
      const date = parseDateTime(masked, schema);
      lastEmittedRef.current = date;
      if (date) lastValidRef.current = masked;
      setInputInvalid(!date);
      if (!isControlled) setInternalDate(date);
      onChange == null ? void 0 : onChange(date);
    } else {
      setInputInvalid(false);
    }
  }
  function handleBlur() {
    setFocused(false);
    const digits = inputValue.replace(/\D/g, "");
    if (digits.length > 0 && digits.length < maxDigits || inputInvalid) {
      setInputValue(lastValidRef.current);
      setInputInvalid(false);
    }
  }
  function handleChange(e) {
    var _a;
    const input = e.target;
    const cursorPos = (_a = input.selectionStart) != null ? _a : 0;
    const raw = input.value;
    const digits = raw.replace(/\D/g, "").slice(0, maxDigits);
    const masked = applyMask(digits, schema);
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, "").length;
    const newCursorPos = getCursorPos(masked, digitsBeforeCursor);
    setInputValue(masked);
    commit(masked);
    requestAnimationFrame(() => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.setSelectionRange(newCursorPos, newCursorPos);
    });
  }
  function handleKeyDown(e) {
    var _a;
    const input = e.currentTarget;
    const pos = (_a = input.selectionStart) != null ? _a : 0;
    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      return;
    }
    const separatorChars = /* @__PURE__ */ new Set();
    schema.separators.forEach((s) => {
      for (const ch of s.chars) separatorChars.add(ch);
    });
    if (e.key === "Backspace" && pos > 0 && separatorChars.has(input.value[pos - 1])) {
      e.preventDefault();
      const val = input.value;
      const masked = applyMask((val.slice(0, pos - 2) + val.slice(pos)).replace(/\D/g, ""), schema);
      setInputValue(masked);
      commit(masked);
      requestAnimationFrame(() => input.setSelectionRange(pos - 2, pos - 2));
    }
  }
  function handlePaste(e) {
    e.preventDefault();
    const masked = applyMask(e.clipboardData.getData("text").replace(/\D/g, ""), schema);
    setInputValue(masked);
    commit(masked);
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.setSelectionRange(masked.length, masked.length);
    });
  }
  function handleCalendarSelect(date) {
    if (!date || !(0, import_date_fns2.isValid)(date)) {
      applyValid("", void 0);
      if (!timeFormat) setOpen(false);
      return;
    }
    let dateToCommit;
    if (timeFormat) {
      const base = selected && (0, import_date_fns2.isValid)(selected) ? selected : /* @__PURE__ */ new Date(0);
      dateToCommit = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        base.getHours(),
        base.getMinutes(),
        base.getSeconds()
      );
    } else {
      dateToCommit = toDateOnly(date);
    }
    applyValid((0, import_date_fns2.format)(dateToCommit, dateFormat), dateToCommit);
    if (!timeFormat) setOpen(false);
  }
  function handleTimeChange(h, m, s) {
    const base = selected && (0, import_date_fns2.isValid)(selected) ? selected : /* @__PURE__ */ new Date();
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
    applyValid((0, import_date_fns2.format)(newDate, dateFormat), newDate);
  }
  const interactive = !disabled && !loading;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      ref: containerRef,
      className: ["rtdp", `rtdp--${size}`, className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": !interactive || void 0,
      children: [
        customTrigger ? customTrigger(inputValue, () => interactive && setOpen((prev) => !prev)) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "div",
          {
            className: ["rtdp__field", renderInput ? "rtdp__field--custom" : ""].filter(Boolean).join(" "),
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => {
              var _a;
              return interactive && ((_a = inputRef.current) == null ? void 0 : _a.focus());
            },
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "rtdp__icon rtdp__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "rtdp__label", children: label }),
              (() => {
                const inputProps = {
                  ref: inputRef,
                  type: "text",
                  inputMode: "numeric",
                  className: "rtdp__input",
                  value: inputValue,
                  placeholder: label && !focused ? void 0 : defaultPlaceholder,
                  disabled: !interactive,
                  onChange: handleChange,
                  onKeyDown: handleKeyDown,
                  onPaste: handlePaste,
                  onFocus: () => {
                    setFocused(true);
                    if (interactive && !noCalendar) setOpen(true);
                  },
                  onBlur: handleBlur,
                  "aria-label": label != null ? label : "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443",
                  "aria-expanded": !noCalendar ? open : void 0,
                  "aria-haspopup": !noCalendar ? "dialog" : void 0,
                  "aria-invalid": inputInvalid || void 0
                };
                if (renderInput) return renderInput(inputProps);
                const { ref, ...rest } = inputProps;
                return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { ref, ...rest });
              })(),
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "rtdp__icon rtdp__icon--end", children: resolvedIcon })
            ]
          }
        ),
        !noCalendar && open && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: [
              "rtdp__popover",
              `rtdp__popover--${size}`,
              timeFormat && "rtdp__popover--with-time"
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
            children: timeFormat ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "rtdp__popover-body", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "rtdp__popover-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  Calendar,
                  {
                    mode: "single",
                    selected,
                    month,
                    onMonthChange: setMonth,
                    onSelect: handleCalendarSelect,
                    startMonth: fromDay,
                    endMonth: toDay,
                    disabled: disabledDays.length ? disabledDays : void 0,
                    navLayout: "around",
                    locale
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "rtdp__time-separator" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "rtdp__popover-time", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  TimePanel,
                  {
                    value: selected,
                    showSeconds,
                    onChange: handleTimeChange
                  }
                ) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "rtdp__popover-footer", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "button",
                {
                  className: "rtdp__ok-btn",
                  type: "button",
                  onClick: () => setOpen(false),
                  children: "OK"
                }
              ) })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              Calendar,
              {
                mode: "single",
                selected,
                month,
                onMonthChange: setMonth,
                onSelect: handleCalendarSelect,
                startMonth: fromDay,
                endMonth: toDay,
                disabled: disabledDays.length ? disabledDays : void 0,
                navLayout: "around",
                locale
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/RHFDatePicker/RHFDatePicker.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function RHFDatePicker({ name, rules, ...props }) {
  const { control } = (0, import_react_hook_form.useFormContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_react_hook_form.Controller,
    {
      control,
      name,
      rules,
      render: ({ field: { value, onChange }, fieldState: { error } }) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "rtdp-rhf", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(DatePicker, { value, onChange, failed: Boolean(error), ...props }),
        (error == null ? void 0 : error.message) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "rtdp-rhf__error", children: error.message })
      ] })
    }
  );
}

// src/components/RHFDateRangePicker/RHFDateRangePicker.tsx
var import_react_hook_form2 = require("react-hook-form");

// src/components/DateRangePicker/DateRangePicker.tsx
var import_react4 = require("react");
var import_date_fns4 = require("date-fns");
var import_locale2 = require("date-fns/locale");

// src/utils/range-mask.ts
var import_date_fns3 = require("date-fns");
function applyDateMask(digits, schema) {
  return applySchemaMask(digits, schema);
}
function applyRangeMask(digits, schema) {
  const total = schema.digitCount * 2;
  const all = digits.slice(0, total);
  const fromMasked = applyDateMask(all.slice(0, schema.digitCount), schema);
  const toDigits = all.slice(schema.digitCount);
  if (toDigits.length === 0) return fromMasked;
  return `${fromMasked} \u2014 ${applyDateMask(toDigits, schema)}`;
}
function getRangeCursorPos(masked, digitCount) {
  if (digitCount === 0) return 0;
  let count = 0;
  for (let i = 0; i < masked.length; i++) {
    if (/\d/.test(masked[i])) {
      count++;
      if (count === digitCount) return i + 1;
    }
  }
  return masked.length;
}
function toDateOnly2(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
}
function parseDate(masked, schema) {
  if (masked.replace(/\D/g, "").length !== schema.digitCount) return void 0;
  const date = (0, import_date_fns3.parse)(masked, schema.format, /* @__PURE__ */ new Date());
  if (!(0, import_date_fns3.isValid)(date) || (0, import_date_fns3.format)(date, schema.format) !== masked) return void 0;
  return toDateOnly2(date);
}
function formatRange(from, to, schema) {
  if (!from) return "";
  const fromStr = (0, import_date_fns3.format)(from, schema.format);
  if (!to) return fromStr;
  return `${fromStr} \u2014 ${(0, import_date_fns3.format)(to, schema.format)}`;
}
function resolveShowSeconds(showTime) {
  if (!showTime) return false;
  if (showTime === true) return true;
  return showTime.format === "HH:mm:ss";
}

// src/components/DateRangePicker/DateRangePicker.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function DateRangePicker({
  value,
  defaultValue,
  onChange,
  label,
  fromDate: fromConstraint,
  toDate: toConstraint,
  disabled = false,
  failed = false,
  loading = false,
  size = "m",
  calendarLayout = "horizontal",
  showTime,
  icon,
  iconPosition = "end",
  className,
  locale = import_locale2.ru,
  dateFormat: dateFormatProp = DEFAULT_DATE_FORMAT
}) {
  const schema = (0, import_react4.useMemo)(
    () => buildFormatSchema(dateFormatProp, null, locale),
    [dateFormatProp, locale]
  );
  const maxDigits = schema.digitCount;
  const totalDigits = maxDigits * 2;
  const resolvedIcon = loading ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Spinner, {}) : icon === false ? null : icon != null ? icon : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(CalendarIcon, {});
  const isControlled = value !== void 0;
  const showSeconds = resolveShowSeconds(showTime);
  const fromDay = fromConstraint ? (0, import_date_fns4.startOfDay)(fromConstraint) : void 0;
  const toDay = toConstraint ? (0, import_date_fns4.startOfDay)(toConstraint) : void 0;
  const disabledDays = [
    ...fromDay ? [{ before: fromDay }] : [],
    ...toDay ? [{ after: toDay }] : []
  ];
  const [internalFrom, setInternalFrom] = (0, import_react4.useState)(
    defaultValue == null ? void 0 : defaultValue.from
  );
  const [internalTo, setInternalTo] = (0, import_react4.useState)(
    defaultValue == null ? void 0 : defaultValue.to
  );
  const [inputValue, setInputValue] = (0, import_react4.useState)(() => {
    const initial = value != null ? value : defaultValue;
    return formatRange(initial == null ? void 0 : initial.from, initial == null ? void 0 : initial.to, schema);
  });
  const [inputInvalid, setInputInvalid] = (0, import_react4.useState)(false);
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [focused, setFocused] = (0, import_react4.useState)(false);
  const [anchorDate, setAnchorDate] = (0, import_react4.useState)(void 0);
  const [hoveredDate, setHoveredDate] = (0, import_react4.useState)(void 0);
  const inputRef = (0, import_react4.useRef)(null);
  const containerRef = (0, import_react4.useRef)(null);
  const lastEmittedFromRef = (0, import_react4.useRef)(
    value !== void 0 ? value == null ? void 0 : value.from : defaultValue == null ? void 0 : defaultValue.from
  );
  const lastEmittedToRef = (0, import_react4.useRef)(
    value !== void 0 ? value == null ? void 0 : value.to : defaultValue == null ? void 0 : defaultValue.to
  );
  const wasControlledRef = (0, import_react4.useRef)(value !== void 0);
  const confirmedFrom = isControlled ? value == null ? void 0 : value.from : internalFrom;
  const confirmedTo = isControlled ? value == null ? void 0 : value.to : internalTo;
  const filled = inputValue.length > 0;
  const [month, setMonth] = (0, import_react4.useState)(() => {
    const init = confirmedFrom != null ? confirmedFrom : confirmedTo;
    return init && (0, import_date_fns4.isValid)(init) ? init : /* @__PURE__ */ new Date();
  });
  const monthAnchor = confirmedFrom != null ? confirmedFrom : confirmedTo;
  (0, import_react4.useEffect)(() => {
    if (monthAnchor && (0, import_date_fns4.isValid)(monthAnchor)) setMonth(monthAnchor);
  }, [monthAnchor == null ? void 0 : monthAnchor.getFullYear(), monthAnchor == null ? void 0 : monthAnchor.getMonth()]);
  const close = (0, import_react4.useCallback)(() => {
    setOpen(false);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
  }, []);
  useClickOutside(containerRef, close);
  (0, import_react4.useEffect)(() => {
    var _a, _b, _c, _d, _e, _f;
    if (value !== void 0) wasControlledRef.current = true;
    const newFrom = value == null ? void 0 : value.from;
    const newTo = value == null ? void 0 : value.to;
    const fromTime = (_a = newFrom == null ? void 0 : newFrom.getTime()) != null ? _a : null;
    const toTime = (_b = newTo == null ? void 0 : newTo.getTime()) != null ? _b : null;
    const lastFromTime = (_d = (_c = lastEmittedFromRef.current) == null ? void 0 : _c.getTime()) != null ? _d : null;
    const lastToTime = (_f = (_e = lastEmittedToRef.current) == null ? void 0 : _e.getTime()) != null ? _f : null;
    if (fromTime === lastFromTime && toTime === lastToTime) return;
    if (!wasControlledRef.current && value === void 0) return;
    setInputValue(formatRange(newFrom, newTo, schema));
    setInputInvalid(false);
    if (!isControlled) {
      setInternalFrom(newFrom);
      setInternalTo(newTo);
    }
    setAnchorDate(void 0);
    setHoveredDate(void 0);
    lastEmittedFromRef.current = newFrom;
    lastEmittedToRef.current = newTo;
  }, [value]);
  const calendarSelected = anchorDate ? hoveredDate ? anchorDate <= hoveredDate ? { from: anchorDate, to: hoveredDate } : { from: hoveredDate, to: anchorDate } : { from: anchorDate, to: void 0 } : { from: confirmedFrom, to: confirmedTo };
  function handleDayClick(day) {
    var _a, _b, _c, _d, _e, _f;
    if (!anchorDate) {
      const from = showTime ? new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        (_a = confirmedFrom == null ? void 0 : confirmedFrom.getHours()) != null ? _a : 0,
        (_b = confirmedFrom == null ? void 0 : confirmedFrom.getMinutes()) != null ? _b : 0,
        (_c = confirmedFrom == null ? void 0 : confirmedFrom.getSeconds()) != null ? _c : 0
      ) : toDateOnly2(day);
      setAnchorDate(from);
      if (!isControlled) {
        setInternalFrom(from);
        setInternalTo(void 0);
      }
      setInputValue(formatRange(from, void 0, schema));
      setInputInvalid(false);
      lastEmittedFromRef.current = from;
      lastEmittedToRef.current = void 0;
      onChange == null ? void 0 : onChange({ from, to: void 0 });
    } else {
      let from = anchorDate, to = showTime ? new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        (_d = confirmedTo == null ? void 0 : confirmedTo.getHours()) != null ? _d : 0,
        (_e = confirmedTo == null ? void 0 : confirmedTo.getMinutes()) != null ? _e : 0,
        (_f = confirmedTo == null ? void 0 : confirmedTo.getSeconds()) != null ? _f : 0
      ) : toDateOnly2(day);
      if (day < anchorDate) {
        const tmp = from;
        from = to;
        to = tmp;
      }
      if (!isControlled) {
        setInternalFrom(from);
        setInternalTo(to);
      }
      setInputValue(formatRange(from, to, schema));
      setInputInvalid(false);
      lastEmittedFromRef.current = from;
      lastEmittedToRef.current = to;
      onChange == null ? void 0 : onChange({ from, to });
      if (!showTime) close();
      else setAnchorDate(void 0);
    }
  }
  function handleDayMouseEnter(day) {
    if (anchorDate) setHoveredDate(day);
  }
  function handleFromTimeChange(h, m, s) {
    const base = confirmedFrom != null ? confirmedFrom : /* @__PURE__ */ new Date();
    const newDate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      h,
      m,
      s
    );
    if (!isControlled) setInternalFrom(newDate);
    lastEmittedFromRef.current = newDate;
    onChange == null ? void 0 : onChange({ from: newDate, to: confirmedTo });
  }
  function handleToTimeChange(h, m, s) {
    const base = confirmedTo != null ? confirmedTo : /* @__PURE__ */ new Date();
    const newDate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      h,
      m,
      s
    );
    if (!isControlled) setInternalTo(newDate);
    lastEmittedToRef.current = newDate;
    onChange == null ? void 0 : onChange({ from: confirmedFrom, to: newDate });
  }
  function handleChange(e) {
    var _a;
    const input = e.target;
    const cursorPos = (_a = input.selectionStart) != null ? _a : 0;
    const raw = input.value;
    const digits = raw.replace(/\D/g, "").slice(0, totalDigits);
    const masked = applyRangeMask(digits, schema);
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, "").length;
    setInputValue(masked);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
    const fromDigits = digits.slice(0, maxDigits);
    const toDigits = digits.slice(maxDigits);
    const parsedFrom = fromDigits.length === maxDigits ? parseDate(applyDateMask(fromDigits, schema), schema) : void 0;
    const parsedTo = toDigits.length === maxDigits ? parseDate(applyDateMask(toDigits, schema), schema) : void 0;
    const fromComplete = fromDigits.length === maxDigits;
    const toComplete = toDigits.length === maxDigits;
    setInputInvalid(fromComplete && !parsedFrom || toComplete && !parsedTo);
    if (!isControlled) {
      setInternalFrom(parsedFrom);
      setInternalTo(parsedTo);
    }
    lastEmittedFromRef.current = parsedFrom;
    lastEmittedToRef.current = parsedTo;
    onChange == null ? void 0 : onChange(
      parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : void 0
    );
    requestAnimationFrame(
      () => {
        var _a2;
        return (_a2 = inputRef.current) == null ? void 0 : _a2.setSelectionRange(
          getRangeCursorPos(masked, digitsBeforeCursor),
          getRangeCursorPos(masked, digitsBeforeCursor)
        );
      }
    );
  }
  function handleKeyDown(e) {
    var _a, _b, _c;
    const input = e.currentTarget;
    const pos = (_a = input.selectionStart) != null ? _a : 0;
    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      return;
    }
    const separatorChars = /* @__PURE__ */ new Set([" ", "\u2014"]);
    schema.separators.forEach((s) => {
      for (const ch of s.chars) separatorChars.add(ch);
    });
    if (e.key === "Backspace" && pos > 0 && separatorChars.has(input.value[pos - 1])) {
      e.preventDefault();
      const val = input.value;
      const charsToSkip = (_c = (_b = val.slice(0, pos).match(/[\s—]+$/)) == null ? void 0 : _b[0].length) != null ? _c : 1;
      const newPos = pos - charsToSkip;
      const masked = applyRangeMask(
        (val.slice(0, newPos - 1) + val.slice(newPos)).replace(/\D/g, ""),
        schema
      );
      setInputValue(masked);
      requestAnimationFrame(
        () => input.setSelectionRange(newPos - 1, newPos - 1)
      );
    }
  }
  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const digits = text.replace(/\D/g, "").slice(0, totalDigits);
    const masked = applyRangeMask(digits, schema);
    setInputValue(masked);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
    const parsedFrom = digits.length >= maxDigits ? parseDate(applyDateMask(digits.slice(0, maxDigits), schema), schema) : void 0;
    const parsedTo = digits.length >= totalDigits ? parseDate(
      applyDateMask(digits.slice(maxDigits, totalDigits), schema),
      schema
    ) : void 0;
    setInputInvalid(
      digits.length >= maxDigits && !parsedFrom || digits.length >= totalDigits && !parsedTo
    );
    if (!isControlled) {
      setInternalFrom(parsedFrom);
      setInternalTo(parsedTo);
    }
    lastEmittedFromRef.current = parsedFrom;
    lastEmittedToRef.current = parsedTo;
    onChange == null ? void 0 : onChange(
      parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : void 0
    );
    requestAnimationFrame(
      () => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.setSelectionRange(masked.length, masked.length);
      }
    );
  }
  const placeholder = label && !focused && !filled ? void 0 : `${schema.placeholder} \u2014 ${schema.placeholder}`;
  const interactive = !disabled && !loading;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      ref: containerRef,
      className: [
        "rtdp",
        "rtdp-range",
        `rtdp--${size}`,
        className
      ].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": !interactive || void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
          "div",
          {
            className: "rtdp__field",
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => {
              var _a;
              return interactive && ((_a = inputRef.current) == null ? void 0 : _a.focus());
            },
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "rtdp__icon rtdp__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "rtdp__label", children: label }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  inputMode: "numeric",
                  className: "rtdp__input",
                  value: inputValue,
                  placeholder,
                  disabled: !interactive,
                  onChange: handleChange,
                  onKeyDown: handleKeyDown,
                  onPaste: handlePaste,
                  onFocus: () => {
                    setFocused(true);
                    if (interactive) setOpen(true);
                  },
                  onBlur: () => setFocused(false),
                  "aria-label": label != null ? label : "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434",
                  "aria-expanded": open,
                  "aria-haspopup": "dialog",
                  "aria-invalid": inputInvalid || void 0
                }
              ),
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "rtdp__icon rtdp__icon--end", children: resolvedIcon })
            ]
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "div",
          {
            className: [
              "rtdp__popover",
              `rtdp__popover--${size}`,
              calendarLayout === "horizontal" && "rtdp__popover--horizontal",
              showTime && "rtdp__popover--with-time"
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434",
            children: showTime ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "rtdp__popover-body", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "rtdp__popover-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                Calendar,
                {
                  mode: "range",
                  selected: calendarSelected,
                  month,
                  onMonthChange: setMonth,
                  onSelect: () => {
                  },
                  onDayClick: handleDayClick,
                  onDayMouseEnter: handleDayMouseEnter,
                  onDayMouseLeave: () => setHoveredDate(void 0),
                  startMonth: fromDay,
                  endMonth: toDay,
                  disabled: disabledDays.length ? disabledDays : void 0,
                  numberOfMonths: 2,
                  locale
                }
              ) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "rtdp__time-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "rtdp__time-col", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "rtdp__time-label", children: "\u041D\u0430\u0447\u0430\u043B\u043E" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                    TimePanel,
                    {
                      value: confirmedFrom,
                      showSeconds,
                      onChange: handleFromTimeChange
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "rtdp__time-separator" }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "rtdp__time-col", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "rtdp__time-label", children: "\u041A\u043E\u043D\u0435\u0446" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                    TimePanel,
                    {
                      value: confirmedTo,
                      showSeconds,
                      onChange: handleToTimeChange
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "rtdp__popover-footer", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                "button",
                {
                  className: "rtdp__ok-btn",
                  type: "button",
                  onClick: close,
                  children: "OK"
                }
              ) })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              Calendar,
              {
                mode: "range",
                selected: calendarSelected,
                month,
                onMonthChange: setMonth,
                onSelect: () => {
                },
                onDayClick: handleDayClick,
                onDayMouseEnter: handleDayMouseEnter,
                onDayMouseLeave: () => setHoveredDate(void 0),
                startMonth: fromConstraint,
                endMonth: toConstraint,
                numberOfMonths: 2,
                locale
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/RHFDateRangePicker/RHFDateRangePicker.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function RHFDateRangePicker({ name, rules, ...props }) {
  const { control } = (0, import_react_hook_form2.useFormContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_react_hook_form2.Controller,
    {
      control,
      name,
      rules,
      render: ({ field: { value, onChange }, fieldState: { error } }) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "rtdp-rhf", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(DateRangePicker, { value, onChange, failed: Boolean(error), ...props }),
        (error == null ? void 0 : error.message) && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "rtdp-rhf__error", children: error.message })
      ] })
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RHFDatePicker,
  RHFDateRangePicker
});
//# sourceMappingURL=rhf.cjs.map