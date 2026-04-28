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
  Calendar: () => Calendar,
  DatePicker: () => DatePicker,
  DateRangePicker: () => DateRangePicker,
  VERSION: () => VERSION
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
var import_react2 = require("react");
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

// src/components/DatePicker/DatePicker.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  const date = (0, import_date_fns.parse)(masked, DATE_FORMAT, /* @__PURE__ */ new Date());
  return (0, import_date_fns.isValid)(date) && (0, import_date_fns.format)(date, DATE_FORMAT) === masked ? date : void 0;
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
  const [internalDate, setInternalDate] = (0, import_react2.useState)(defaultValue);
  const [open, setOpen] = (0, import_react2.useState)(false);
  const [focused, setFocused] = (0, import_react2.useState)(false);
  const [inputValue, setInputValue] = (0, import_react2.useState)(
    () => defaultValue && (0, import_date_fns.isValid)(defaultValue) ? (0, import_date_fns.format)(defaultValue, DATE_FORMAT) : ""
  );
  const [inputInvalid, setInputInvalid] = (0, import_react2.useState)(false);
  const inputRef = (0, import_react2.useRef)(null);
  const containerRef = (0, import_react2.useRef)(null);
  const selected = isControlled ? value : internalDate;
  const filled = inputValue.length > 0;
  const close = (0, import_react2.useCallback)(() => setOpen(false), []);
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
    setInputValue(date && (0, import_date_fns.isValid)(date) ? (0, import_date_fns.format)(date, DATE_FORMAT) : "");
    setInputInvalid(false);
    onChange == null ? void 0 : onChange(date);
    setOpen(false);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": disabled || void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "datepicker__field", onClick: () => {
          var _a;
          return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.focus());
        }, children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "datepicker__label", children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        open && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "datepicker__popover", role: "dialog", "aria-label": "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Calendar,
          {
            mode: "single",
            selected,
            onSelect: handleSelect,
            startMonth: fromDate,
            endMonth: toDate,
            locale: import_locale.ru
          }
        ) })
      ]
    }
  );
}

// src/components/DateRangePicker/DateRangePicker.tsx
var import_react3 = require("react");
var import_date_fns2 = require("date-fns");
var import_locale2 = require("date-fns/locale");
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  const date = (0, import_date_fns2.parse)(masked, DATE_FORMAT2, /* @__PURE__ */ new Date());
  return (0, import_date_fns2.isValid)(date) && (0, import_date_fns2.format)(date, DATE_FORMAT2) === masked ? date : void 0;
}
function formatRange(from, to) {
  if (!from) return "";
  const fromStr = (0, import_date_fns2.format)(from, DATE_FORMAT2);
  if (!to) return fromStr;
  return `${fromStr} \u2014 ${(0, import_date_fns2.format)(to, DATE_FORMAT2)}`;
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
  const [internalFrom, setInternalFrom] = (0, import_react3.useState)(defaultValue == null ? void 0 : defaultValue.from);
  const [internalTo, setInternalTo] = (0, import_react3.useState)(defaultValue == null ? void 0 : defaultValue.to);
  const [inputValue, setInputValue] = (0, import_react3.useState)(
    () => formatRange(defaultValue == null ? void 0 : defaultValue.from, defaultValue == null ? void 0 : defaultValue.to)
  );
  const [inputInvalid, setInputInvalid] = (0, import_react3.useState)(false);
  const [open, setOpen] = (0, import_react3.useState)(false);
  const [focused, setFocused] = (0, import_react3.useState)(false);
  const [anchorDate, setAnchorDate] = (0, import_react3.useState)(void 0);
  const [hoveredDate, setHoveredDate] = (0, import_react3.useState)(void 0);
  const inputRef = (0, import_react3.useRef)(null);
  const containerRef = (0, import_react3.useRef)(null);
  const confirmedFrom = isControlled ? value == null ? void 0 : value.from : internalFrom;
  const confirmedTo = isControlled ? value == null ? void 0 : value.to : internalTo;
  const filled = inputValue.length > 0;
  const close = (0, import_react3.useCallback)(() => {
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
      setInputValue((0, import_date_fns2.format)(day, DATE_FORMAT2));
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", "daterangepicker", className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": disabled || void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "datepicker__field", onClick: () => {
          var _a;
          return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.focus());
        }, children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "datepicker__label", children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        open && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "datepicker__popover", role: "dialog", "aria-label": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        ) })
      ]
    }
  );
}

// src/index.ts
var VERSION = "0.0.1";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Calendar,
  DatePicker,
  DateRangePicker,
  VERSION
});
//# sourceMappingURL=index.cjs.map