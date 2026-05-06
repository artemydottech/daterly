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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  Calendar: () => Calendar,
  DatePicker: () => DatePicker,
  DateRangePicker: () => DateRangePicker
});
module.exports = __toCommonJS(src_exports);

// src/components/Calendar/Calendar.tsx
var import_react_day_picker = require("react-day-picker");
var import_jsx_runtime = require("react/jsx-runtime");
function Calendar({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_day_picker.DayPicker,
    {
      className: ["datepicker-calendar", className].filter(Boolean).join(" "),
      ...props
    }
  );
}

// src/components/DatePicker/DatePicker.tsx
var import_react3 = require("react");
var import_date_fns = require("date-fns");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "datepicker-spinner", "aria-hidden": "true" });
}

// src/components/DatePicker/DatePicker.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var DATE_FORMAT = "dd.MM.yyyy";
function resolveTimeFormat(showTime) {
  if (!showTime) return null;
  if (showTime === true) return "HH:mm:ss";
  return showTime.format;
}
function buildDateFormat(timeFormat) {
  return timeFormat ? `${DATE_FORMAT} ${timeFormat}` : DATE_FORMAT;
}
function buildMaxDigits(timeFormat) {
  if (!timeFormat) return 8;
  return timeFormat === "HH:mm" ? 12 : 14;
}
function buildPlaceholder(timeFormat) {
  if (!timeFormat) return "\u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433";
  return timeFormat === "HH:mm" ? "\u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433 \u0447\u0447:\u043C\u043C" : "\u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433 \u0447\u0447:\u043C\u043C:\u0441\u0441";
}
function applyMask(digits, maxDigits) {
  const d = digits.slice(0, maxDigits);
  let result = "";
  for (let i = 0; i < d.length; i++) {
    if (i === 2 || i === 4) result += ".";
    else if (i === 8) result += " ";
    else if (i === 10 || i === 12) result += ":";
    result += d[i];
  }
  return result;
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
function parseDateTime(masked, dateFormat, maxDigits) {
  if (masked.replace(/\D/g, "").length !== maxDigits) return void 0;
  const date = (0, import_date_fns.parse)(masked, dateFormat, /* @__PURE__ */ new Date());
  return (0, import_date_fns.isValid)(date) && (0, import_date_fns.format)(date, dateFormat) === masked ? date : void 0;
}
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
  className
}) {
  const timeFormat = resolveTimeFormat(showTime);
  const dateFormat = buildDateFormat(timeFormat);
  const maxDigits = buildMaxDigits(timeFormat);
  const defaultPlaceholder = placeholder != null ? placeholder : buildPlaceholder(timeFormat);
  const showSeconds = timeFormat === "HH:mm:ss";
  const resolvedIcon = loading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Spinner, {}) : icon === false ? null : icon != null ? icon : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CalendarIcon, {});
  const isControlled = value !== void 0;
  const [internalDate, setInternalDate] = (0, import_react3.useState)(defaultValue);
  const [open, setOpen] = (0, import_react3.useState)(false);
  const [focused, setFocused] = (0, import_react3.useState)(false);
  const [inputValue, setInputValue] = (0, import_react3.useState)(
    () => defaultValue && (0, import_date_fns.isValid)(defaultValue) ? (0, import_date_fns.format)(defaultValue, dateFormat) : ""
  );
  const [inputInvalid, setInputInvalid] = (0, import_react3.useState)(false);
  const inputRef = (0, import_react3.useRef)(null);
  const containerRef = (0, import_react3.useRef)(null);
  const lastValidRef = (0, import_react3.useRef)(inputValue);
  const lastEmittedRef = (0, import_react3.useRef)(value !== void 0 ? value : defaultValue);
  const wasControlledRef = (0, import_react3.useRef)(value !== void 0);
  const selected = isControlled ? value : internalDate;
  const filled = inputValue.length > 0;
  const close = (0, import_react3.useCallback)(() => setOpen(false), []);
  useClickOutside(containerRef, close);
  (0, import_react3.useEffect)(() => {
    var _a, _b, _c;
    if (value !== void 0) wasControlledRef.current = true;
    const lastTime = (_b = (_a = lastEmittedRef.current) == null ? void 0 : _a.getTime()) != null ? _b : null;
    const valueTime = (_c = value == null ? void 0 : value.getTime()) != null ? _c : null;
    if (valueTime === lastTime) return;
    if (!wasControlledRef.current && value === void 0) return;
    const formatted = value && (0, import_date_fns.isValid)(value) ? (0, import_date_fns.format)(value, dateFormat) : "";
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
      const date = parseDateTime(masked, dateFormat, maxDigits);
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
    const masked = applyMask(digits, maxDigits);
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
    if (e.key === "Backspace" && pos > 0 && /[.: ]/.test(input.value[pos - 1])) {
      e.preventDefault();
      const val = input.value;
      const masked = applyMask((val.slice(0, pos - 2) + val.slice(pos)).replace(/\D/g, ""), maxDigits);
      setInputValue(masked);
      commit(masked);
      requestAnimationFrame(() => input.setSelectionRange(pos - 2, pos - 2));
    }
  }
  function handlePaste(e) {
    e.preventDefault();
    const masked = applyMask(e.clipboardData.getData("text").replace(/\D/g, ""), maxDigits);
    setInputValue(masked);
    commit(masked);
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.setSelectionRange(masked.length, masked.length);
    });
  }
  function handleCalendarSelect(date) {
    if (!date || !(0, import_date_fns.isValid)(date)) {
      applyValid("", void 0);
      if (!timeFormat) setOpen(false);
      return;
    }
    let dateToCommit = date;
    if (timeFormat) {
      const base = selected && (0, import_date_fns.isValid)(selected) ? selected : /* @__PURE__ */ new Date(0);
      dateToCommit = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        base.getHours(),
        base.getMinutes(),
        base.getSeconds()
      );
    }
    applyValid((0, import_date_fns.format)(dateToCommit, dateFormat), dateToCommit);
    if (!timeFormat) setOpen(false);
  }
  function handleTimeChange(h, m, s) {
    const base = selected && (0, import_date_fns.isValid)(selected) ? selected : /* @__PURE__ */ new Date();
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
    applyValid((0, import_date_fns.format)(newDate, dateFormat), newDate);
  }
  const interactive = !disabled && !loading;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", `datepicker--${size}`, className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": !interactive || void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "div",
          {
            className: "datepicker__field",
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => {
              var _a;
              return interactive && ((_a = inputRef.current) == null ? void 0 : _a.focus());
            },
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "datepicker__icon datepicker__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "datepicker__label", children: label }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  inputMode: "numeric",
                  className: "datepicker__input",
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
                }
              ),
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "datepicker__icon datepicker__icon--end", children: resolvedIcon })
            ]
          }
        ),
        !noCalendar && open && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: [
              "datepicker__popover",
              `datepicker__popover--${size}`,
              timeFormat && "datepicker__popover--with-time"
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
            children: timeFormat ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "datepicker__popover-body", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "datepicker__popover-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  Calendar,
                  {
                    mode: "single",
                    selected,
                    onSelect: handleCalendarSelect,
                    startMonth: fromDate,
                    endMonth: toDate,
                    locale: import_locale.ru
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "datepicker__time-separator" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "datepicker__popover-time", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  TimePanel,
                  {
                    value: selected,
                    showSeconds,
                    onChange: handleTimeChange
                  }
                ) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "datepicker__popover-footer", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "button",
                {
                  className: "datepicker__ok-btn",
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
                onSelect: handleCalendarSelect,
                startMonth: fromDate,
                endMonth: toDate,
                locale: import_locale.ru
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/DateRangePicker/DateRangePicker.tsx
var import_react4 = require("react");
var import_date_fns2 = require("date-fns");
var import_locale2 = require("date-fns/locale");
var import_jsx_runtime6 = require("react/jsx-runtime");
var DATE_FORMAT2 = "dd.MM.yyyy";
function applyDateMask(digits) {
  const d = digits.slice(0, 8);
  let result = "";
  for (let i = 0; i < d.length; i++) {
    if (i === 2 || i === 4) result += ".";
    result += d[i];
  }
  return result;
}
function applyRangeMask(digits) {
  const all = digits.slice(0, 16);
  const fromMasked = applyDateMask(all.slice(0, 8));
  const toDigits = all.slice(8);
  if (toDigits.length === 0) return fromMasked;
  return `${fromMasked} \u2014 ${applyDateMask(toDigits)}`;
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
function parseDate(masked) {
  if (masked.replace(/\D/g, "").length !== 8) return void 0;
  const date = (0, import_date_fns2.parse)(masked, DATE_FORMAT2, /* @__PURE__ */ new Date());
  return (0, import_date_fns2.isValid)(date) && (0, import_date_fns2.format)(date, DATE_FORMAT2) === masked ? date : void 0;
}
function formatRange(from, to) {
  if (!from) return "";
  const fromStr = (0, import_date_fns2.format)(from, DATE_FORMAT2);
  if (!to) return fromStr;
  return `${fromStr} \u2014 ${(0, import_date_fns2.format)(to, DATE_FORMAT2)}`;
}
function resolveShowSeconds(showTime) {
  if (!showTime) return false;
  if (showTime === true) return true;
  return showTime.format === "HH:mm:ss";
}
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
  calendarLayout = "vertical",
  showTime,
  icon,
  iconPosition = "end",
  className
}) {
  const resolvedIcon = loading ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spinner, {}) : icon === false ? null : icon != null ? icon : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CalendarIcon, {});
  const isControlled = value !== void 0;
  const showSeconds = resolveShowSeconds(showTime);
  const [internalFrom, setInternalFrom] = (0, import_react4.useState)(defaultValue == null ? void 0 : defaultValue.from);
  const [internalTo, setInternalTo] = (0, import_react4.useState)(defaultValue == null ? void 0 : defaultValue.to);
  const [inputValue, setInputValue] = (0, import_react4.useState)(
    () => formatRange(defaultValue == null ? void 0 : defaultValue.from, defaultValue == null ? void 0 : defaultValue.to)
  );
  const [inputInvalid, setInputInvalid] = (0, import_react4.useState)(false);
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [focused, setFocused] = (0, import_react4.useState)(false);
  const [anchorDate, setAnchorDate] = (0, import_react4.useState)(void 0);
  const [hoveredDate, setHoveredDate] = (0, import_react4.useState)(void 0);
  const inputRef = (0, import_react4.useRef)(null);
  const containerRef = (0, import_react4.useRef)(null);
  const lastEmittedFromRef = (0, import_react4.useRef)(value !== void 0 ? value == null ? void 0 : value.from : defaultValue == null ? void 0 : defaultValue.from);
  const lastEmittedToRef = (0, import_react4.useRef)(value !== void 0 ? value == null ? void 0 : value.to : defaultValue == null ? void 0 : defaultValue.to);
  const wasControlledRef = (0, import_react4.useRef)(value !== void 0);
  const confirmedFrom = isControlled ? value == null ? void 0 : value.from : internalFrom;
  const confirmedTo = isControlled ? value == null ? void 0 : value.to : internalTo;
  const filled = inputValue.length > 0;
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
    setInputValue(formatRange(newFrom, newTo));
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
      ) : day;
      setAnchorDate(from);
      if (!isControlled) {
        setInternalFrom(from);
        setInternalTo(void 0);
      }
      setInputValue((0, import_date_fns2.format)(day, DATE_FORMAT2));
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
      ) : day;
      if (day < anchorDate) {
        const tmp = from;
        from = to;
        to = tmp;
      }
      if (!isControlled) {
        setInternalFrom(from);
        setInternalTo(to);
      }
      setInputValue(formatRange(from, to));
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
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
    if (!isControlled) setInternalFrom(newDate);
    lastEmittedFromRef.current = newDate;
    onChange == null ? void 0 : onChange({ from: newDate, to: confirmedTo });
  }
  function handleToTimeChange(h, m, s) {
    const base = confirmedTo != null ? confirmedTo : /* @__PURE__ */ new Date();
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
    if (!isControlled) setInternalTo(newDate);
    lastEmittedToRef.current = newDate;
    onChange == null ? void 0 : onChange({ from: confirmedFrom, to: newDate });
  }
  function handleChange(e) {
    var _a;
    const input = e.target;
    const cursorPos = (_a = input.selectionStart) != null ? _a : 0;
    const raw = input.value;
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    const masked = applyRangeMask(digits);
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, "").length;
    setInputValue(masked);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
    const fromDigits = digits.slice(0, 8);
    const toDigits = digits.slice(8);
    const parsedFrom = fromDigits.length === 8 ? parseDate(applyDateMask(fromDigits)) : void 0;
    const parsedTo = toDigits.length === 8 ? parseDate(applyDateMask(toDigits)) : void 0;
    const fromComplete = fromDigits.length === 8;
    const toComplete = toDigits.length === 8;
    setInputInvalid(fromComplete && !parsedFrom || toComplete && !parsedTo);
    if (!isControlled) {
      setInternalFrom(parsedFrom);
      setInternalTo(parsedTo);
    }
    lastEmittedFromRef.current = parsedFrom;
    lastEmittedToRef.current = parsedTo;
    onChange == null ? void 0 : onChange(parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : void 0);
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
    if (e.key === "Backspace" && pos > 0 && /[\s—]/.test(input.value[pos - 1])) {
      e.preventDefault();
      const val = input.value;
      const charsToSkip = (_c = (_b = val.slice(0, pos).match(/[\s—]+$/)) == null ? void 0 : _b[0].length) != null ? _c : 1;
      const newPos = pos - charsToSkip;
      const masked = applyRangeMask((val.slice(0, newPos - 1) + val.slice(newPos)).replace(/\D/g, ""));
      setInputValue(masked);
      requestAnimationFrame(() => input.setSelectionRange(newPos - 1, newPos - 1));
    }
  }
  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const digits = text.replace(/\D/g, "").slice(0, 16);
    const masked = applyRangeMask(digits);
    setInputValue(masked);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
    const parsedFrom = digits.length >= 8 ? parseDate(applyDateMask(digits.slice(0, 8))) : void 0;
    const parsedTo = digits.length >= 16 ? parseDate(applyDateMask(digits.slice(8, 16))) : void 0;
    setInputInvalid(digits.length >= 8 && !parsedFrom || digits.length >= 16 && !parsedTo);
    if (!isControlled) {
      setInternalFrom(parsedFrom);
      setInternalTo(parsedTo);
    }
    lastEmittedFromRef.current = parsedFrom;
    lastEmittedToRef.current = parsedTo;
    onChange == null ? void 0 : onChange(parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : void 0);
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.setSelectionRange(masked.length, masked.length);
    });
  }
  const placeholder = label && !focused && !filled ? void 0 : "\u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433 \u2014 \u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433";
  const interactive = !disabled && !loading;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", "daterangepicker", `datepicker--${size}`, className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": !interactive || void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "div",
          {
            className: "datepicker__field",
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => {
              var _a;
              return interactive && ((_a = inputRef.current) == null ? void 0 : _a.focus());
            },
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "datepicker__icon datepicker__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "datepicker__label", children: label }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  inputMode: "numeric",
                  className: "datepicker__input",
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
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "datepicker__icon datepicker__icon--end", children: resolvedIcon })
            ]
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "div",
          {
            className: [
              "datepicker__popover",
              `datepicker__popover--${size}`,
              calendarLayout === "horizontal" && "datepicker__popover--horizontal",
              showTime && "datepicker__popover--with-time"
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434",
            children: showTime ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "datepicker__popover-body", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "datepicker__popover-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                Calendar,
                {
                  mode: "range",
                  selected: calendarSelected,
                  onSelect: () => {
                  },
                  onDayClick: handleDayClick,
                  onDayMouseEnter: handleDayMouseEnter,
                  onDayMouseLeave: () => setHoveredDate(void 0),
                  startMonth: fromConstraint,
                  endMonth: toConstraint,
                  numberOfMonths: 2,
                  locale: import_locale2.ru
                }
              ) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "datepicker__time-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "datepicker__time-col", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "datepicker__time-label", children: "\u041D\u0430\u0447\u0430\u043B\u043E" }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TimePanel, { value: confirmedFrom, showSeconds, onChange: handleFromTimeChange })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "datepicker__time-separator" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "datepicker__time-col", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "datepicker__time-label", children: "\u041A\u043E\u043D\u0435\u0446" }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TimePanel, { value: confirmedTo, showSeconds, onChange: handleToTimeChange })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "datepicker__popover-footer", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "datepicker__ok-btn", type: "button", onClick: close, children: "OK" }) })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              Calendar,
              {
                mode: "range",
                selected: calendarSelected,
                onSelect: () => {
                },
                onDayClick: handleDayClick,
                onDayMouseEnter: handleDayMouseEnter,
                onDayMouseLeave: () => setHoveredDate(void 0),
                startMonth: fromConstraint,
                endMonth: toConstraint,
                numberOfMonths: 2,
                locale: import_locale2.ru
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/Button/Button.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { ...rest, className: classes, disabled: disabled || loading, children: [
    children,
    loading && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Spinner, {})
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Calendar,
  DatePicker,
  DateRangePicker
});
//# sourceMappingURL=index.cjs.map