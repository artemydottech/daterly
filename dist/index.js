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
import { useCallback, useRef, useState } from "react";
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

// src/components/DatePicker/DatePicker.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var DATE_FORMAT = "dd.MM.yyyy";
function applyMask(digits) {
  const d = digits.slice(0, 8);
  let result = "";
  for (let i = 0; i < d.length; i++) {
    if (i === 2 || i === 4) result += ".";
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
function parseDate(masked) {
  if (masked.replace(/\D/g, "").length !== 8) return void 0;
  const date = parse(masked, DATE_FORMAT, /* @__PURE__ */ new Date());
  return isValid(date) && format(date, DATE_FORMAT) === masked ? date : void 0;
}
function DatePicker({
  value,
  defaultValue,
  onChange,
  label,
  placeholder = "\u0434\u0434.\u043C\u043C.\u0433\u0433\u0433\u0433",
  fromDate,
  toDate,
  disabled = false,
  failed = false,
  className
}) {
  const isControlled = value !== void 0;
  const [internalDate, setInternalDate] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(
    () => defaultValue && isValid(defaultValue) ? format(defaultValue, DATE_FORMAT) : ""
  );
  const [inputInvalid, setInputInvalid] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const selected = isControlled ? value : internalDate;
  const filled = inputValue.length > 0;
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(containerRef, close);
  function commit(masked) {
    const digits = masked.replace(/\D/g, "");
    if (digits.length === 0) {
      setInputInvalid(false);
      if (!isControlled) setInternalDate(void 0);
      onChange == null ? void 0 : onChange(void 0);
    } else if (digits.length === 8) {
      const date = parseDate(masked);
      setInputInvalid(!date);
      if (!isControlled) setInternalDate(date);
      onChange == null ? void 0 : onChange(date);
    } else {
      setInputInvalid(false);
    }
  }
  function handleChange(e) {
    var _a;
    const input = e.target;
    const cursorPos = (_a = input.selectionStart) != null ? _a : 0;
    const raw = input.value;
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    const masked = applyMask(digits);
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
    if (e.key === "Backspace" && pos > 0 && input.value[pos - 1] === ".") {
      e.preventDefault();
      const val = input.value;
      const masked = applyMask((val.slice(0, pos - 2) + val.slice(pos)).replace(/\D/g, ""));
      setInputValue(masked);
      commit(masked);
      requestAnimationFrame(() => input.setSelectionRange(pos - 2, pos - 2));
    }
  }
  function handlePaste(e) {
    e.preventDefault();
    const masked = applyMask(e.clipboardData.getData("text").replace(/\D/g, ""));
    setInputValue(masked);
    commit(masked);
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.setSelectionRange(masked.length, masked.length);
    });
  }
  function handleSelect(date) {
    if (!isControlled) setInternalDate(date);
    setInputValue(date && isValid(date) ? format(date, DATE_FORMAT) : "");
    setInputInvalid(false);
    onChange == null ? void 0 : onChange(date);
    setOpen(false);
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": disabled || void 0,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "datepicker__field", onClick: () => {
          var _a;
          return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.focus());
        }, children: [
          label && /* @__PURE__ */ jsx2("span", { className: "datepicker__label", children: label }),
          /* @__PURE__ */ jsx2(
            "input",
            {
              ref: inputRef,
              type: "text",
              inputMode: "numeric",
              className: "datepicker__input",
              value: inputValue,
              placeholder: label && !focused ? void 0 : placeholder,
              disabled,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              onPaste: handlePaste,
              onFocus: () => {
                setFocused(true);
                if (!disabled) setOpen(true);
              },
              onBlur: () => setFocused(false),
              "aria-label": label != null ? label : "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443",
              "aria-expanded": open,
              "aria-haspopup": "dialog",
              "aria-invalid": inputInvalid || void 0
            }
          )
        ] }),
        open && /* @__PURE__ */ jsx2("div", { className: "datepicker__popover", role: "dialog", "aria-label": "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C", children: /* @__PURE__ */ jsx2(
          Calendar,
          {
            mode: "single",
            selected,
            onSelect: handleSelect,
            startMonth: fromDate,
            endMonth: toDate,
            locale: ru
          }
        ) })
      ]
    }
  );
}

// src/components/DateRangePicker/DateRangePicker.tsx
import { useCallback as useCallback2, useRef as useRef2, useState as useState2 } from "react";
import { format as format2, isValid as isValid2, parse as parse2 } from "date-fns";
import { ru as ru2 } from "date-fns/locale";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
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
function parseDate2(masked) {
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
function DateRangePicker({
  value,
  defaultValue,
  onChange,
  label,
  fromDate: fromConstraint,
  toDate: toConstraint,
  disabled = false,
  failed = false,
  className
}) {
  const isControlled = value !== void 0;
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
  const inputRef = useRef2(null);
  const containerRef = useRef2(null);
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
    if (!anchorDate) {
      setAnchorDate(day);
      if (!isControlled) {
        setInternalFrom(day);
        setInternalTo(void 0);
      }
      setInputValue(format2(day, DATE_FORMAT2));
      setInputInvalid(false);
      onChange == null ? void 0 : onChange(day ? { from: day, to: void 0 } : void 0);
    } else {
      let from = anchorDate, to = day;
      if (day < anchorDate) {
        from = day;
        to = anchorDate;
      }
      if (!isControlled) {
        setInternalFrom(from);
        setInternalTo(to);
      }
      setInputValue(formatRange(from, to));
      setInputInvalid(false);
      onChange == null ? void 0 : onChange({ from, to });
      close();
    }
  }
  function handleDayMouseEnter(day) {
    if (anchorDate) setHoveredDate(day);
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
    const parsedFrom = fromDigits.length === 8 ? parseDate2(applyDateMask(fromDigits)) : void 0;
    const parsedTo = toDigits.length === 8 ? parseDate2(applyDateMask(toDigits)) : void 0;
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
    const parsedFrom = digits.length >= 8 ? parseDate2(applyDateMask(digits.slice(0, 8))) : void 0;
    const parsedTo = digits.length >= 16 ? parseDate2(applyDateMask(digits.slice(8, 16))) : void 0;
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
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", "daterangepicker", className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": disabled || void 0,
      children: [
        /* @__PURE__ */ jsxs2("div", { className: "datepicker__field", onClick: () => {
          var _a;
          return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.focus());
        }, children: [
          label && /* @__PURE__ */ jsx3("span", { className: "datepicker__label", children: label }),
          /* @__PURE__ */ jsx3(
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
          )
        ] }),
        open && /* @__PURE__ */ jsx3("div", { className: "datepicker__popover", role: "dialog", "aria-label": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434", children: /* @__PURE__ */ jsx3(
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
        ) })
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