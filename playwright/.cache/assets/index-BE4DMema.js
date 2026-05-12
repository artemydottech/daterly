import { p as parse, i as isValid, f as format, s as startOfDay, j as jsxRuntimeExports, S as Spinner, C as CalendarIcon, u as useClickOutside, a as Calendar, r as ru, T as TimePanel } from './Spinner-ra9hIxQv.js';
import { r as reactExports } from './index-vAHire36.js';

const DATE_FORMAT = "dd.MM.yyyy";
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
  if (!timeFormat) return "дд.мм.гггг";
  return timeFormat === "HH:mm" ? "дд.мм.гггг чч:мм" : "дд.мм.гггг чч:мм:сс";
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
function toDateOnly(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
}
function parseDateTime(masked, dateFormat, maxDigits) {
  if (masked.replace(/\D/g, "").length !== maxDigits) return void 0;
  const date = parse(masked, dateFormat, /* @__PURE__ */ new Date());
  if (!isValid(date) || format(date, dateFormat) !== masked) return void 0;
  return maxDigits === 8 ? toDateOnly(date) : date;
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
  className,
  renderInput,
  customTrigger
}) {
  const timeFormat = resolveTimeFormat(showTime);
  const dateFormat = buildDateFormat(timeFormat);
  const maxDigits = buildMaxDigits(timeFormat);
  const defaultPlaceholder = placeholder ?? buildPlaceholder(timeFormat);
  const showSeconds = timeFormat === "HH:mm:ss";
  const fromDay = fromDate ? startOfDay(fromDate) : void 0;
  const toDay = toDate ? startOfDay(toDate) : void 0;
  const disabledDays = [
    ...fromDay ? [{ before: fromDay }] : [],
    ...toDay ? [{ after: toDay }] : []
  ];
  const resolvedIcon = loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) : icon === false ? null : icon ?? /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, {});
  const isControlled = value !== void 0;
  const [internalDate, setInternalDate] = reactExports.useState(defaultValue);
  const [open, setOpen] = reactExports.useState(false);
  const [focused, setFocused] = reactExports.useState(false);
  const [inputValue, setInputValue] = reactExports.useState(() => {
    const initial = value ?? defaultValue;
    return initial && isValid(initial) ? format(initial, dateFormat) : "";
  });
  const [inputInvalid, setInputInvalid] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const lastValidRef = reactExports.useRef(inputValue);
  const lastEmittedRef = reactExports.useRef(value !== void 0 ? value : defaultValue);
  const wasControlledRef = reactExports.useRef(value !== void 0);
  const selected = isControlled ? value : internalDate;
  const filled = inputValue.length > 0;
  const close = reactExports.useCallback(() => setOpen(false), []);
  useClickOutside(containerRef, close);
  reactExports.useEffect(() => {
    if (value !== void 0) wasControlledRef.current = true;
    const lastTime = lastEmittedRef.current?.getTime() ?? null;
    const valueTime = value?.getTime() ?? null;
    if (valueTime === lastTime) return;
    if (!wasControlledRef.current && value === void 0) return;
    const formatted = value && isValid(value) ? format(value, dateFormat) : "";
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
    onChange?.(date);
  }
  function commit(masked) {
    const digits = masked.replace(/\D/g, "");
    if (digits.length === 0) {
      lastEmittedRef.current = void 0;
      lastValidRef.current = "";
      setInputInvalid(false);
      if (!isControlled) setInternalDate(void 0);
      onChange?.(void 0);
    } else if (digits.length === maxDigits) {
      const date = parseDateTime(masked, dateFormat, maxDigits);
      lastEmittedRef.current = date;
      if (date) lastValidRef.current = masked;
      setInputInvalid(!date);
      if (!isControlled) setInternalDate(date);
      onChange?.(date);
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
    const input = e.target;
    const cursorPos = input.selectionStart ?? 0;
    const raw = input.value;
    const digits = raw.replace(/\D/g, "").slice(0, maxDigits);
    const masked = applyMask(digits, maxDigits);
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, "").length;
    const newCursorPos = getCursorPos(masked, digitsBeforeCursor);
    setInputValue(masked);
    commit(masked);
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(newCursorPos, newCursorPos));
  }
  function handleKeyDown(e) {
    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;
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
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(masked.length, masked.length));
  }
  function handleCalendarSelect(date) {
    if (!date || !isValid(date)) {
      applyValid("", void 0);
      if (!timeFormat) setOpen(false);
      return;
    }
    let dateToCommit;
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
    } else {
      dateToCommit = toDateOnly(date);
    }
    applyValid(format(dateToCommit, dateFormat), dateToCommit);
    if (!timeFormat) setOpen(false);
  }
  function handleTimeChange(h, m, s) {
    const base = selected && isValid(selected) ? selected : /* @__PURE__ */ new Date();
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
    applyValid(format(newDate, dateFormat), newDate);
  }
  const interactive = !disabled && !loading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: ["datepicker", `datepicker--${size}`, className].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": !interactive || void 0,
      children: [
        customTrigger ? customTrigger(inputValue, () => interactive && setOpen((prev) => !prev)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: ["datepicker__field", renderInput ? "datepicker__field--custom" : ""].filter(Boolean).join(" "),
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => interactive && inputRef.current?.focus(),
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "datepicker__icon datepicker__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "datepicker__label", children: label }),
              (() => {
                const inputProps = {
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
                  "aria-label": label ?? "Выберите дату",
                  "aria-expanded": !noCalendar ? open : void 0,
                  "aria-haspopup": !noCalendar ? "dialog" : void 0,
                  "aria-invalid": inputInvalid || void 0
                };
                if (renderInput) return renderInput(inputProps);
                const { ref, ...rest } = inputProps;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref, ...rest });
              })(),
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "datepicker__icon datepicker__icon--end", children: resolvedIcon })
            ]
          }
        ),
        !noCalendar && open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: [
              "datepicker__popover",
              `datepicker__popover--${size}`,
              timeFormat && "datepicker__popover--with-time"
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "Календарь",
            children: timeFormat ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "datepicker__popover-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker__popover-calendar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Calendar,
                  {
                    mode: "single",
                    selected,
                    onSelect: handleCalendarSelect,
                    startMonth: fromDay,
                    endMonth: toDay,
                    disabled: disabledDays.length ? disabledDays : void 0,
                    navLayout: "around",
                    locale: ru
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker__time-separator" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker__popover-time", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TimePanel,
                  {
                    value: selected,
                    showSeconds,
                    onChange: handleTimeChange
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker__popover-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "datepicker__ok-btn",
                  type: "button",
                  onClick: () => setOpen(false),
                  children: "OK"
                }
              ) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Calendar,
              {
                mode: "single",
                selected,
                onSelect: handleCalendarSelect,
                startMonth: fromDay,
                endMonth: toDay,
                disabled: disabledDays.length ? disabledDays : void 0,
                navLayout: "around",
                locale: ru
              }
            )
          }
        )
      ]
    }
  );
}

export { DatePicker };
//# sourceMappingURL=index-BE4DMema.js.map
