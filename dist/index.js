// src/components/Calendar/Calendar.tsx
import { DayPicker } from "react-day-picker";
import { jsx } from "react/jsx-runtime";
function Calendar({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      className: ["datepicker-calendar", className].filter(Boolean).join(" "),
      ...props
    }
  );
}

// src/components/DatePicker/DatePicker.tsx
import { useCallback, useRef as useRef2, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { ru } from "date-fns/locale";

// src/hooks/useClickOutside.ts
import { useEffect } from "react";
function useClickOutside(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// src/components/TimePanel/TimePanel.tsx
import { useEffect as useEffect2, useRef } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var HOURS = Array.from({ length: 24 }, (_, i) => i);
var MINUTES = Array.from({ length: 60 }, (_, i) => i);
var SECONDS = Array.from({ length: 60 }, (_, i) => i);
function pad2(n) {
  return String(n).padStart(2, "0");
}
function Column({ values, selected, onSelect }) {
  const selectedRef = useRef(null);
  useEffect2(() => {
    var _a;
    (_a = selectedRef.current) == null ? void 0 : _a.scrollIntoView({ block: "center", behavior: "instant" });
  }, [selected]);
  return /* @__PURE__ */ jsx2("div", { className: "time-panel__column", children: values.map((v) => /* @__PURE__ */ jsx2(
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
  return /* @__PURE__ */ jsxs("div", { className: "time-panel", children: [
    /* @__PURE__ */ jsx2(Column, { values: HOURS, selected: h, onSelect: (v) => onChange(v, m, s) }),
    /* @__PURE__ */ jsx2(Column, { values: MINUTES, selected: m, onSelect: (v) => onChange(h, v, s) }),
    showSeconds && /* @__PURE__ */ jsx2(Column, { values: SECONDS, selected: s, onSelect: (v) => onChange(h, m, v) })
  ] });
}

// src/components/icons/CalendarIcon.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function CalendarIcon() {
  return /* @__PURE__ */ jsxs2("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx3("rect", { x: "1", y: "2.5", width: "14", height: "12", rx: "1.5", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx3("path", { d: "M1 6.5H15", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx3("path", { d: "M5 1V4M11 1V4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}

// src/components/DatePicker/DatePicker.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const date = parse(masked, dateFormat, /* @__PURE__ */ new Date());
  return isValid(date) && format(date, dateFormat) === masked ? date : void 0;
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
  const resolvedIcon = icon === false ? null : icon != null ? icon : /* @__PURE__ */ jsx4(CalendarIcon, {});
  const isControlled = value !== void 0;
  const [internalDate, setInternalDate] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(
    () => defaultValue && isValid(defaultValue) ? format(defaultValue, dateFormat) : ""
  );
  const [inputInvalid, setInputInvalid] = useState(false);
  const inputRef = useRef2(null);
  const containerRef = useRef2(null);
  const lastValidRef = useRef2(inputValue);
  const selected = isControlled ? value : internalDate;
  const filled = inputValue.length > 0;
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(containerRef, close);
  function applyValid(masked, date) {
    lastValidRef.current = masked;
    setInputValue(masked);
    setInputInvalid(false);
    if (!isControlled) setInternalDate(date);
    onChange == null ? void 0 : onChange(date);
  }
  function commit(masked) {
    const digits = masked.replace(/\D/g, "");
    if (digits.length === 0) {
      lastValidRef.current = "";
      setInputInvalid(false);
      if (!isControlled) setInternalDate(void 0);
      onChange == null ? void 0 : onChange(void 0);
    } else if (digits.length === maxDigits) {
      const date = parseDateTime(masked, dateFormat, maxDigits);
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
    if (!date || !isValid(date)) {
      applyValid("", void 0);
      if (!timeFormat) setOpen(false);
      return;
    }
    let dateToCommit = date;
    if (timeFormat) {
      const base = selected && isValid(selected) ? selected : /* @__PURE__ */ new Date(0);
      dateToCommit = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        base.getHours(),
        base.getMinutes(),
        base.getSeconds()
      );
    }
    applyValid(format(dateToCommit, dateFormat), dateToCommit);
    if (!timeFormat) setOpen(false);
  }
  function handleTimeChange(h, m, s) {
    const base = selected && isValid(selected) ? selected : /* @__PURE__ */ new Date();
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
    applyValid(format(newDate, dateFormat), newDate);
  }
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", `datepicker--${size}`, className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": disabled || void 0,
      children: [
        /* @__PURE__ */ jsxs3(
          "div",
          {
            className: "datepicker__field",
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => {
              var _a;
              return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.focus());
            },
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ jsx4("span", { className: "datepicker__icon datepicker__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ jsx4("span", { className: "datepicker__label", children: label }),
              /* @__PURE__ */ jsx4(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  inputMode: "numeric",
                  className: "datepicker__input",
                  value: inputValue,
                  placeholder: label && !focused ? void 0 : defaultPlaceholder,
                  disabled,
                  onChange: handleChange,
                  onKeyDown: handleKeyDown,
                  onPaste: handlePaste,
                  onFocus: () => {
                    setFocused(true);
                    if (!disabled && !noCalendar) setOpen(true);
                  },
                  onBlur: handleBlur,
                  "aria-label": label != null ? label : "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443",
                  "aria-expanded": !noCalendar ? open : void 0,
                  "aria-haspopup": !noCalendar ? "dialog" : void 0,
                  "aria-invalid": inputInvalid || void 0
                }
              ),
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ jsx4("span", { className: "datepicker__icon datepicker__icon--end", children: resolvedIcon })
            ]
          }
        ),
        !noCalendar && open && /* @__PURE__ */ jsx4(
          "div",
          {
            className: [
              "datepicker__popover",
              `datepicker__popover--${size}`,
              timeFormat && "datepicker__popover--with-time"
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
            children: timeFormat ? /* @__PURE__ */ jsxs3(Fragment, { children: [
              /* @__PURE__ */ jsxs3("div", { className: "datepicker__popover-body", children: [
                /* @__PURE__ */ jsx4("div", { className: "datepicker__popover-calendar", children: /* @__PURE__ */ jsx4(
                  Calendar,
                  {
                    mode: "single",
                    selected,
                    onSelect: handleCalendarSelect,
                    startMonth: fromDate,
                    endMonth: toDate,
                    locale: ru
                  }
                ) }),
                /* @__PURE__ */ jsx4("div", { className: "datepicker__time-separator" }),
                /* @__PURE__ */ jsx4("div", { className: "datepicker__popover-time", children: /* @__PURE__ */ jsx4(
                  TimePanel,
                  {
                    value: selected,
                    showSeconds,
                    onChange: handleTimeChange
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx4("div", { className: "datepicker__popover-footer", children: /* @__PURE__ */ jsx4(
                "button",
                {
                  className: "datepicker__ok-btn",
                  type: "button",
                  onClick: () => setOpen(false),
                  children: "OK"
                }
              ) })
            ] }) : /* @__PURE__ */ jsx4(
              Calendar,
              {
                mode: "single",
                selected,
                onSelect: handleCalendarSelect,
                startMonth: fromDate,
                endMonth: toDate,
                locale: ru
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/DateRangePicker/DateRangePicker.tsx
import { useCallback as useCallback2, useRef as useRef3, useState as useState2 } from "react";
import { format as format2, isValid as isValid2, parse as parse2 } from "date-fns";
import { ru as ru2 } from "date-fns/locale";
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const date = parse2(masked, DATE_FORMAT2, /* @__PURE__ */ new Date());
  return isValid2(date) && format2(date, DATE_FORMAT2) === masked ? date : void 0;
}
function formatRange(from, to) {
  if (!from) return "";
  const fromStr = format2(from, DATE_FORMAT2);
  if (!to) return fromStr;
  return `${fromStr} \u2014 ${format2(to, DATE_FORMAT2)}`;
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
  size = "m",
  calendarLayout = "vertical",
  showTime,
  icon,
  iconPosition = "end",
  className
}) {
  const resolvedIcon = icon === false ? null : icon != null ? icon : /* @__PURE__ */ jsx5(CalendarIcon, {});
  const isControlled = value !== void 0;
  const showSeconds = resolveShowSeconds(showTime);
  const [internalFrom, setInternalFrom] = useState2(defaultValue == null ? void 0 : defaultValue.from);
  const [internalTo, setInternalTo] = useState2(defaultValue == null ? void 0 : defaultValue.to);
  const [inputValue, setInputValue] = useState2(
    () => formatRange(defaultValue == null ? void 0 : defaultValue.from, defaultValue == null ? void 0 : defaultValue.to)
  );
  const [inputInvalid, setInputInvalid] = useState2(false);
  const [open, setOpen] = useState2(false);
  const [focused, setFocused] = useState2(false);
  const [anchorDate, setAnchorDate] = useState2(void 0);
  const [hoveredDate, setHoveredDate] = useState2(void 0);
  const inputRef = useRef3(null);
  const containerRef = useRef3(null);
  const confirmedFrom = isControlled ? value == null ? void 0 : value.from : internalFrom;
  const confirmedTo = isControlled ? value == null ? void 0 : value.to : internalTo;
  const filled = inputValue.length > 0;
  const close = useCallback2(() => {
    setOpen(false);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
  }, []);
  useClickOutside(containerRef, close);
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
      setInputValue(format2(day, DATE_FORMAT2));
      setInputInvalid(false);
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
    onChange == null ? void 0 : onChange({ from: newDate, to: confirmedTo });
  }
  function handleToTimeChange(h, m, s) {
    const base = confirmedTo != null ? confirmedTo : /* @__PURE__ */ new Date();
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
    if (!isControlled) setInternalTo(newDate);
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
    onChange == null ? void 0 : onChange(parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : void 0);
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.setSelectionRange(masked.length, masked.length);
    });
  }
  const placeholder = label && !focused && !filled ? void 0 : "\u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433 \u2014 \u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433";
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", "daterangepicker", `datepicker--${size}`, className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": disabled || void 0,
      children: [
        /* @__PURE__ */ jsxs4(
          "div",
          {
            className: "datepicker__field",
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => {
              var _a;
              return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.focus());
            },
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ jsx5("span", { className: "datepicker__icon datepicker__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ jsx5("span", { className: "datepicker__label", children: label }),
              /* @__PURE__ */ jsx5(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  inputMode: "numeric",
                  className: "datepicker__input",
                  value: inputValue,
                  placeholder,
                  disabled,
                  onChange: handleChange,
                  onKeyDown: handleKeyDown,
                  onPaste: handlePaste,
                  onFocus: () => {
                    setFocused(true);
                    if (!disabled) setOpen(true);
                  },
                  onBlur: () => setFocused(false),
                  "aria-label": label != null ? label : "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434",
                  "aria-expanded": open,
                  "aria-haspopup": "dialog",
                  "aria-invalid": inputInvalid || void 0
                }
              ),
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ jsx5("span", { className: "datepicker__icon datepicker__icon--end", children: resolvedIcon })
            ]
          }
        ),
        open && /* @__PURE__ */ jsx5(
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
            children: showTime ? /* @__PURE__ */ jsxs4(Fragment2, { children: [
              /* @__PURE__ */ jsx5("div", { className: "datepicker__popover-body", children: /* @__PURE__ */ jsx5("div", { className: "datepicker__popover-calendar", children: /* @__PURE__ */ jsx5(
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
                  locale: ru2
                }
              ) }) }),
              /* @__PURE__ */ jsxs4("div", { className: "datepicker__time-row", children: [
                /* @__PURE__ */ jsxs4("div", { className: "datepicker__time-col", children: [
                  /* @__PURE__ */ jsx5("span", { className: "datepicker__time-label", children: "\u041D\u0430\u0447\u0430\u043B\u043E" }),
                  /* @__PURE__ */ jsx5(TimePanel, { value: confirmedFrom, showSeconds, onChange: handleFromTimeChange })
                ] }),
                /* @__PURE__ */ jsx5("div", { className: "datepicker__time-separator" }),
                /* @__PURE__ */ jsxs4("div", { className: "datepicker__time-col", children: [
                  /* @__PURE__ */ jsx5("span", { className: "datepicker__time-label", children: "\u041A\u043E\u043D\u0435\u0446" }),
                  /* @__PURE__ */ jsx5(TimePanel, { value: confirmedTo, showSeconds, onChange: handleToTimeChange })
                ] })
              ] }),
              /* @__PURE__ */ jsx5("div", { className: "datepicker__popover-footer", children: /* @__PURE__ */ jsx5("button", { className: "datepicker__ok-btn", type: "button", onClick: close, children: "OK" }) })
            ] }) : /* @__PURE__ */ jsx5(
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
                locale: ru2
              }
            )
          }
        )
      ]
    }
  );
}

// src/index.ts
var VERSION = "0.0.1";
export {
  Calendar,
  DatePicker,
  DateRangePicker,
  VERSION
};
//# sourceMappingURL=index.js.map