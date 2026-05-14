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
      className: ["daterly-calendar", className].filter(Boolean).join(" "),
      ...props
    }
  );
}

// src/components/DatePicker/DatePicker.tsx
var import_react4 = require("react");
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

// src/components/TimeInput/TimeInput.tsx
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function pad22(n) {
  return String(n).padStart(2, "0");
}
function formatTime(h, m, s, showSeconds) {
  return showSeconds ? `${pad22(h)}:${pad22(m)}:${pad22(s)}` : `${pad22(h)}:${pad22(m)}`;
}
function clamp(value, max) {
  if (Number.isNaN(value)) return 0;
  if (value < 0) return 0;
  if (value > max) return max;
  return value;
}
function applyTimeMask(digits, showSeconds) {
  const max = showSeconds ? 6 : 4;
  const d = digits.slice(0, max);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}:${d.slice(2)}`;
  return `${d.slice(0, 2)}:${d.slice(2, 4)}:${d.slice(4)}`;
}
function commitTime(masked, showSeconds) {
  var _a, _b, _c;
  const parts = masked.split(":");
  const h = clamp(parseInt((_a = parts[0]) != null ? _a : "", 10), 23);
  const m = clamp(parseInt((_b = parts[1]) != null ? _b : "", 10), 59);
  const s = showSeconds ? clamp(parseInt((_c = parts[2]) != null ? _c : "", 10), 59) : 0;
  return { h, m, s };
}
var SEGMENT_RANGES = {
  h: [0, 2],
  m: [3, 5],
  s: [6, 8]
};
function getSegmentList(showSeconds) {
  return showSeconds ? ["h", "m", "s"] : ["h", "m"];
}
function getSegmentAt(pos, showSeconds) {
  if (pos <= 2) return "h";
  if (pos <= 5 || !showSeconds) return "m";
  return "s";
}
function selectSegment(input, seg) {
  const [start, end] = SEGMENT_RANGES[seg];
  input.setSelectionRange(start, end);
}
function TimeInput({ value, showSeconds, onChange, ariaLabel, disabled }) {
  var _a, _b, _c;
  const h = (_a = value == null ? void 0 : value.getHours()) != null ? _a : 0;
  const m = (_b = value == null ? void 0 : value.getMinutes()) != null ? _b : 0;
  const s = (_c = value == null ? void 0 : value.getSeconds()) != null ? _c : 0;
  const display = formatTime(h, m, s, showSeconds);
  const [draft, setDraft] = (0, import_react3.useState)(display);
  const focusedRef = (0, import_react3.useRef)(false);
  (0, import_react3.useEffect)(() => {
    if (!focusedRef.current) setDraft(display);
  }, [display]);
  const maxDigits = showSeconds ? 6 : 4;
  function handleChange(e) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, maxDigits);
    const masked = applyTimeMask(digits, showSeconds);
    setDraft(masked);
    if (digits.length === maxDigits) {
      const { h: h2, m: m2, s: s2 } = commitTime(masked, showSeconds);
      onChange(h2, m2, s2);
    }
  }
  function handleBlur() {
    focusedRef.current = false;
    const { h: h2, m: m2, s: s2 } = commitTime(draft, showSeconds);
    setDraft(formatTime(h2, m2, s2, showSeconds));
    onChange(h2, m2, s2);
  }
  function bumpSegment(seg, delta) {
    const next = { h, m, s };
    if (seg === "h") next.h = (h + delta + 24) % 24;
    if (seg === "m") next.m = (m + delta + 60) % 60;
    if (seg === "s") next.s = (s + delta + 60) % 60;
    setDraft(formatTime(next.h, next.m, next.s, showSeconds));
    onChange(next.h, next.m, next.s);
  }
  function handleKeyDown(e) {
    var _a2;
    const input = e.currentTarget;
    const pos = (_a2 = input.selectionStart) != null ? _a2 : 0;
    const segs = getSegmentList(showSeconds);
    const seg = getSegmentAt(pos, showSeconds);
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      bumpSegment(seg, e.key === "ArrowUp" ? 1 : -1);
      requestAnimationFrame(() => selectSegment(input, seg));
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const idx = segs.indexOf(seg);
      const targetIdx = e.key === "ArrowLeft" ? Math.max(0, idx - 1) : Math.min(segs.length - 1, idx + 1);
      selectSegment(input, segs[targetIdx]);
      return;
    }
    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "input",
    {
      type: "text",
      inputMode: "numeric",
      className: "daterly__time-input",
      value: draft,
      placeholder: showSeconds ? "--:--:--" : "--:--",
      disabled,
      "aria-label": ariaLabel != null ? ariaLabel : "\u0412\u0440\u0435\u043C\u044F",
      onFocus: (e) => {
        focusedRef.current = true;
        e.target.select();
      },
      onChange: handleChange,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown
    }
  );
}

// src/components/icons/CalendarIcon.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function CalendarIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "1", y: "2.5", width: "14", height: "12", rx: "1.5", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M1 6.5H15", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M5 1V4M11 1V4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}

// src/components/icons/Spinner.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function Spinner() {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "daterly-spinner", "aria-hidden": "true" });
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
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  timePickerType = "input",
  icon,
  iconPosition = "end",
  className,
  renderInput,
  customTrigger,
  locale = import_locale.ru,
  dateFormat: dateFormatProp = DEFAULT_DATE_FORMAT
}) {
  const timeFormat = resolveTimeFormat(showTime);
  const schema = (0, import_react4.useMemo)(
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
  const resolvedIcon = loading ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spinner, {}) : icon === false ? null : icon != null ? icon : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CalendarIcon, {});
  const isControlled = value !== void 0;
  const [internalDate, setInternalDate] = (0, import_react4.useState)(
    defaultValue
  );
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [focused, setFocused] = (0, import_react4.useState)(false);
  const [inputValue, setInputValue] = (0, import_react4.useState)(() => {
    const initial = value != null ? value : defaultValue;
    return initial && (0, import_date_fns2.isValid)(initial) ? (0, import_date_fns2.format)(initial, dateFormat) : "";
  });
  const [inputInvalid, setInputInvalid] = (0, import_react4.useState)(false);
  const inputRef = (0, import_react4.useRef)(null);
  const containerRef = (0, import_react4.useRef)(null);
  const lastValidRef = (0, import_react4.useRef)(inputValue);
  const lastEmittedRef = (0, import_react4.useRef)(
    value !== void 0 ? value : defaultValue
  );
  const wasControlledRef = (0, import_react4.useRef)(value !== void 0);
  const selected = isControlled ? value : internalDate;
  const [month, setMonth] = (0, import_react4.useState)(
    () => selected && (0, import_date_fns2.isValid)(selected) ? selected : /* @__PURE__ */ new Date()
  );
  const [draftTime, setDraftTime] = (0, import_react4.useState)(() => /* @__PURE__ */ new Date());
  const filled = inputValue.length > 0;
  (0, import_react4.useEffect)(() => {
    if (open && (!selected || !(0, import_date_fns2.isValid)(selected))) {
      setDraftTime(/* @__PURE__ */ new Date());
    }
  }, [open]);
  (0, import_react4.useEffect)(() => {
    if (selected && (0, import_date_fns2.isValid)(selected)) setMonth(selected);
  }, [selected == null ? void 0 : selected.getFullYear(), selected == null ? void 0 : selected.getMonth()]);
  const close = (0, import_react4.useCallback)(() => setOpen(false), []);
  useClickOutside(containerRef, close);
  (0, import_react4.useEffect)(() => {
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
    requestAnimationFrame(
      () => {
        var _a2;
        return (_a2 = inputRef.current) == null ? void 0 : _a2.setSelectionRange(newCursorPos, newCursorPos);
      }
    );
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
      const masked = applyMask(
        (val.slice(0, pos - 2) + val.slice(pos)).replace(/\D/g, ""),
        schema
      );
      setInputValue(masked);
      commit(masked);
      requestAnimationFrame(() => input.setSelectionRange(pos - 2, pos - 2));
    }
  }
  function handlePaste(e) {
    e.preventDefault();
    const masked = applyMask(
      e.clipboardData.getData("text").replace(/\D/g, ""),
      schema
    );
    setInputValue(masked);
    commit(masked);
    requestAnimationFrame(
      () => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.setSelectionRange(masked.length, masked.length);
      }
    );
  }
  function handleCalendarSelect(date) {
    if (!date || !(0, import_date_fns2.isValid)(date)) {
      applyValid("", void 0);
      if (!timeFormat) setOpen(false);
      return;
    }
    let dateToCommit;
    if (timeFormat) {
      const base = selected && (0, import_date_fns2.isValid)(selected) ? selected : draftTime;
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
    const base = selected && (0, import_date_fns2.isValid)(selected) ? selected : draftTime;
    const newDate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      h,
      m,
      s
    );
    applyValid((0, import_date_fns2.format)(newDate, dateFormat), newDate);
  }
  const interactive = !disabled && !loading;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      ref: containerRef,
      className: ["daterly", `daterly--${size}`, className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": !interactive || void 0,
      children: [
        customTrigger ? customTrigger(inputValue, () => interactive && setOpen((prev) => !prev)) : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "div",
          {
            className: [
              "daterly__field",
              renderInput ? "daterly__field--custom" : ""
            ].filter(Boolean).join(" "),
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => {
              var _a;
              return interactive && ((_a = inputRef.current) == null ? void 0 : _a.focus());
            },
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "daterly__icon daterly__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "daterly__label", children: label }),
              (() => {
                const inputProps = {
                  ref: inputRef,
                  type: "text",
                  inputMode: "numeric",
                  className: "daterly__input",
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
                return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { ref, ...rest });
              })(),
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "daterly__icon daterly__icon--end", children: resolvedIcon })
            ]
          }
        ),
        !noCalendar && open && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "div",
          {
            className: [
              "daterly__popover",
              `daterly__popover--${size}`,
              timeFormat && "daterly__popover--with-time",
              timeFormat && `daterly__popover--time-${timePickerType}`
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
            children: timeFormat ? timePickerType === "drum" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "daterly__popover-body", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "daterly__popover-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "daterly__time-separator" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "daterly__popover-time", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  TimePanel,
                  {
                    value: selected && (0, import_date_fns2.isValid)(selected) ? selected : draftTime,
                    showSeconds,
                    onChange: handleTimeChange
                  }
                ) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "daterly__popover-footer", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "button",
                {
                  className: "daterly__ok-btn",
                  type: "button",
                  onClick: () => setOpen(false),
                  children: "OK"
                }
              ) })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "daterly__popover-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "daterly__popover-footer daterly__popover-footer--time", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { className: "daterly__time-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "daterly__time-field-label", children: "\u0412\u0440\u0435\u043C\u044F" }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    TimeInput,
                    {
                      value: selected && (0, import_date_fns2.isValid)(selected) ? selected : draftTime,
                      showSeconds,
                      onChange: handleTimeChange
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "button",
                  {
                    className: "daterly__ok-btn",
                    type: "button",
                    onClick: () => setOpen(false),
                    children: "OK"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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

// src/components/DateRangePicker/DateRangePicker.tsx
var import_react5 = require("react");
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
  return /[Hms]/.test(schema.format) ? date : toDateOnly2(date);
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
  timePickerType = "input",
  icon,
  iconPosition = "end",
  className,
  locale = import_locale2.ru,
  dateFormat: dateFormatProp = DEFAULT_DATE_FORMAT
}) {
  const timeFormat = resolveTimeFormat(showTime);
  const schema = (0, import_react5.useMemo)(
    () => buildFormatSchema(dateFormatProp, timeFormat, locale),
    [dateFormatProp, timeFormat, locale]
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
  const [internalFrom, setInternalFrom] = (0, import_react5.useState)(
    defaultValue == null ? void 0 : defaultValue.from
  );
  const [internalTo, setInternalTo] = (0, import_react5.useState)(
    defaultValue == null ? void 0 : defaultValue.to
  );
  const [inputValue, setInputValue] = (0, import_react5.useState)(() => {
    const initial = value != null ? value : defaultValue;
    return formatRange(initial == null ? void 0 : initial.from, initial == null ? void 0 : initial.to, schema);
  });
  const [inputInvalid, setInputInvalid] = (0, import_react5.useState)(false);
  const [open, setOpen] = (0, import_react5.useState)(false);
  const [focused, setFocused] = (0, import_react5.useState)(false);
  const [anchorDate, setAnchorDate] = (0, import_react5.useState)(void 0);
  const [hoveredDate, setHoveredDate] = (0, import_react5.useState)(void 0);
  const inputRef = (0, import_react5.useRef)(null);
  const containerRef = (0, import_react5.useRef)(null);
  const lastEmittedFromRef = (0, import_react5.useRef)(
    value !== void 0 ? value == null ? void 0 : value.from : defaultValue == null ? void 0 : defaultValue.from
  );
  const lastEmittedToRef = (0, import_react5.useRef)(
    value !== void 0 ? value == null ? void 0 : value.to : defaultValue == null ? void 0 : defaultValue.to
  );
  const wasControlledRef = (0, import_react5.useRef)(value !== void 0);
  const confirmedFrom = isControlled ? value == null ? void 0 : value.from : internalFrom;
  const confirmedTo = isControlled ? value == null ? void 0 : value.to : internalTo;
  const filled = inputValue.length > 0;
  const [draftFromTime, setDraftFromTime] = (0, import_react5.useState)(() => /* @__PURE__ */ new Date());
  const [draftToTime, setDraftToTime] = (0, import_react5.useState)(() => /* @__PURE__ */ new Date());
  (0, import_react5.useEffect)(() => {
    if (!open) return;
    const now = /* @__PURE__ */ new Date();
    if (!confirmedFrom || !(0, import_date_fns4.isValid)(confirmedFrom)) setDraftFromTime(now);
    if (!confirmedTo || !(0, import_date_fns4.isValid)(confirmedTo)) setDraftToTime(now);
  }, [open]);
  const [month, setMonth] = (0, import_react5.useState)(() => {
    const init = confirmedFrom != null ? confirmedFrom : confirmedTo;
    return init && (0, import_date_fns4.isValid)(init) ? init : /* @__PURE__ */ new Date();
  });
  const monthAnchor = confirmedFrom != null ? confirmedFrom : confirmedTo;
  (0, import_react5.useEffect)(() => {
    if (monthAnchor && (0, import_date_fns4.isValid)(monthAnchor)) setMonth(monthAnchor);
  }, [monthAnchor == null ? void 0 : monthAnchor.getFullYear(), monthAnchor == null ? void 0 : monthAnchor.getMonth()]);
  const close = (0, import_react5.useCallback)(() => {
    setOpen(false);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
  }, []);
  useClickOutside(containerRef, close);
  (0, import_react5.useEffect)(() => {
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
    if (!anchorDate) {
      const fromBase = confirmedFrom != null ? confirmedFrom : draftFromTime;
      const from = showTime ? new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        fromBase.getHours(),
        fromBase.getMinutes(),
        fromBase.getSeconds()
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
      const toBase = confirmedTo != null ? confirmedTo : draftToTime;
      let from = anchorDate, to = showTime ? new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        toBase.getHours(),
        toBase.getMinutes(),
        toBase.getSeconds()
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
    const base = confirmedFrom != null ? confirmedFrom : draftFromTime;
    const newDate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      h,
      m,
      s
    );
    if (confirmedFrom) {
      if (!isControlled) setInternalFrom(newDate);
      setInputValue(formatRange(newDate, confirmedTo, schema));
      lastEmittedFromRef.current = newDate;
      onChange == null ? void 0 : onChange({ from: newDate, to: confirmedTo });
    } else {
      setDraftFromTime(newDate);
    }
  }
  function handleToTimeChange(h, m, s) {
    const base = confirmedTo != null ? confirmedTo : draftToTime;
    const newDate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      h,
      m,
      s
    );
    if (confirmedTo) {
      if (!isControlled) setInternalTo(newDate);
      setInputValue(formatRange(confirmedFrom, newDate, schema));
      lastEmittedToRef.current = newDate;
      onChange == null ? void 0 : onChange({ from: confirmedFrom, to: newDate });
    } else {
      setDraftToTime(newDate);
    }
  }
  function commitDigits(rawDigits) {
    const digits = rawDigits.slice(0, totalDigits);
    const masked = applyRangeMask(digits, schema);
    setInputValue(masked);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
    const fromDigits = digits.slice(0, maxDigits);
    const toDigits = digits.slice(maxDigits);
    const fromComplete = fromDigits.length === maxDigits;
    const toComplete = toDigits.length === maxDigits;
    const parsedFrom = fromComplete ? parseDate(applyDateMask(fromDigits, schema), schema) : void 0;
    const parsedTo = toComplete ? parseDate(applyDateMask(toDigits, schema), schema) : void 0;
    setInputInvalid(fromComplete && !parsedFrom || toComplete && !parsedTo);
    if (!isControlled) {
      setInternalFrom(parsedFrom);
      setInternalTo(parsedTo);
    }
    lastEmittedFromRef.current = parsedFrom;
    lastEmittedToRef.current = parsedTo;
    onChange == null ? void 0 : onChange({ from: parsedFrom, to: parsedTo });
    return masked;
  }
  function handleChange(e) {
    var _a;
    const input = e.target;
    const cursorPos = (_a = input.selectionStart) != null ? _a : 0;
    const raw = input.value;
    const digits = raw.replace(/\D/g, "").slice(0, totalDigits);
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, "").length;
    const masked = commitDigits(digits);
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
    var _a, _b, _c, _d;
    const input = e.currentTarget;
    const pos = (_a = input.selectionStart) != null ? _a : 0;
    const selectionEnd = (_b = input.selectionEnd) != null ? _b : pos;
    const hasSelection = selectionEnd > pos;
    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      return;
    }
    if (hasSelection) return;
    if (e.key !== "Backspace" || pos === 0) return;
    const separatorChars = /* @__PURE__ */ new Set([" ", "\u2014"]);
    schema.separators.forEach((s) => {
      for (const ch of s.chars) separatorChars.add(ch);
    });
    if (!separatorChars.has(input.value[pos - 1])) return;
    e.preventDefault();
    const val = input.value;
    const sepRun = (_d = (_c = val.slice(0, pos).match(/[^\d]+$/)) == null ? void 0 : _c[0]) != null ? _d : "";
    const runStart = pos - sepRun.length;
    if (runStart === 0) return;
    const nextDigits = (val.slice(0, runStart - 1) + val.slice(pos)).replace(/\D/g, "");
    const masked = commitDigits(nextDigits);
    const digitsBeforeCursor = val.slice(0, runStart - 1).replace(/\D/g, "").length;
    const newCursor = getRangeCursorPos(masked, digitsBeforeCursor);
    requestAnimationFrame(() => input.setSelectionRange(newCursor, newCursor));
  }
  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const digits = text.replace(/\D/g, "").slice(0, totalDigits);
    const masked = commitDigits(digits);
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
        "daterly",
        "daterly-range",
        `daterly--${size}`,
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
            className: "daterly__field",
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => {
              var _a;
              return interactive && ((_a = inputRef.current) == null ? void 0 : _a.focus());
            },
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "daterly__icon daterly__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "daterly__label", children: label }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  inputMode: "numeric",
                  className: "daterly__input",
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
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "daterly__icon daterly__icon--end", children: resolvedIcon })
            ]
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "div",
          {
            className: [
              "daterly__popover",
              `daterly__popover--${size}`,
              calendarLayout === "horizontal" && "daterly__popover--horizontal",
              showTime && "daterly__popover--with-time",
              showTime && `daterly__popover--time-${timePickerType}`
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434",
            children: showTime ? timePickerType === "drum" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "daterly__popover-body", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "daterly__popover-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "daterly__time-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "daterly__time-col", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "daterly__time-label", children: "\u041D\u0430\u0447\u0430\u043B\u043E" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                    TimePanel,
                    {
                      value: confirmedFrom && (0, import_date_fns4.isValid)(confirmedFrom) ? confirmedFrom : draftFromTime,
                      showSeconds,
                      onChange: handleFromTimeChange
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "daterly__time-separator" }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "daterly__time-col", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "daterly__time-label", children: "\u041A\u043E\u043D\u0435\u0446" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                    TimePanel,
                    {
                      value: confirmedTo && (0, import_date_fns4.isValid)(confirmedTo) ? confirmedTo : draftToTime,
                      showSeconds,
                      onChange: handleToTimeChange
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "daterly__popover-footer", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                "button",
                {
                  className: "daterly__ok-btn",
                  type: "button",
                  onClick: close,
                  children: "OK"
                }
              ) })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "daterly__popover-calendar", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "daterly__popover-footer daterly__popover-footer--time", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "daterly__time-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "daterly__time-field-label", children: "\u041D\u0430\u0447\u0430\u043B\u043E" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                    TimeInput,
                    {
                      value: confirmedFrom && (0, import_date_fns4.isValid)(confirmedFrom) ? confirmedFrom : draftFromTime,
                      showSeconds,
                      onChange: handleFromTimeChange,
                      ariaLabel: "\u0412\u0440\u0435\u043C\u044F \u043D\u0430\u0447\u0430\u043B\u0430"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "daterly__time-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "daterly__time-field-label", children: "\u041A\u043E\u043D\u0435\u0446" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                    TimeInput,
                    {
                      value: confirmedTo && (0, import_date_fns4.isValid)(confirmedTo) ? confirmedTo : draftToTime,
                      showSeconds,
                      onChange: handleToTimeChange,
                      ariaLabel: "\u0412\u0440\u0435\u043C\u044F \u043A\u043E\u043D\u0446\u0430"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "button",
                  {
                    className: "daterly__ok-btn",
                    type: "button",
                    onClick: close,
                    children: "OK"
                  }
                )
              ] })
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

// src/components/Button/Button.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("button", { ...rest, className: classes, disabled: disabled || loading, children: [
    children,
    loading && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Spinner, {})
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