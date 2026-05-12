import { p as parse, i as isValid, f as format, j as jsxRuntimeExports, S as Spinner, C as CalendarIcon, s as startOfDay, u as useClickOutside, a as Calendar, r as ru, T as TimePanel } from './Spinner-ra9hIxQv.js';
import { r as reactExports } from './index-vAHire36.js';

const DATE_FORMAT = "dd.MM.yyyy";
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
  return `${fromMasked} — ${applyDateMask(toDigits)}`;
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
function toDateOnly(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
}
function parseDate(masked) {
  if (masked.replace(/\D/g, "").length !== 8) return void 0;
  const date = parse(masked, DATE_FORMAT, /* @__PURE__ */ new Date());
  if (!isValid(date) || format(date, DATE_FORMAT) !== masked) return void 0;
  return toDateOnly(date);
}
function formatRange(from, to) {
  if (!from) return "";
  const fromStr = format(from, DATE_FORMAT);
  if (!to) return fromStr;
  return `${fromStr} — ${format(to, DATE_FORMAT)}`;
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
  calendarLayout = "horizontal",
  showTime,
  icon,
  iconPosition = "end",
  className
}) {
  const resolvedIcon = loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) : icon === false ? null : icon ?? /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, {});
  const isControlled = value !== void 0;
  const showSeconds = resolveShowSeconds(showTime);
  const fromDay = fromConstraint ? startOfDay(fromConstraint) : void 0;
  const toDay = toConstraint ? startOfDay(toConstraint) : void 0;
  const disabledDays = [
    ...fromDay ? [{ before: fromDay }] : [],
    ...toDay ? [{ after: toDay }] : []
  ];
  const [internalFrom, setInternalFrom] = reactExports.useState(
    defaultValue?.from
  );
  const [internalTo, setInternalTo] = reactExports.useState(
    defaultValue?.to
  );
  const [inputValue, setInputValue] = reactExports.useState(() => {
    const initial = value ?? defaultValue;
    return formatRange(initial?.from, initial?.to);
  });
  const [inputInvalid, setInputInvalid] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const [focused, setFocused] = reactExports.useState(false);
  const [anchorDate, setAnchorDate] = reactExports.useState(void 0);
  const [hoveredDate, setHoveredDate] = reactExports.useState(void 0);
  const inputRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const lastEmittedFromRef = reactExports.useRef(
    value !== void 0 ? value?.from : defaultValue?.from
  );
  const lastEmittedToRef = reactExports.useRef(
    value !== void 0 ? value?.to : defaultValue?.to
  );
  const wasControlledRef = reactExports.useRef(value !== void 0);
  const confirmedFrom = isControlled ? value?.from : internalFrom;
  const confirmedTo = isControlled ? value?.to : internalTo;
  const filled = inputValue.length > 0;
  const close = reactExports.useCallback(() => {
    setOpen(false);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
  }, []);
  useClickOutside(containerRef, close);
  reactExports.useEffect(() => {
    if (value !== void 0) wasControlledRef.current = true;
    const newFrom = value?.from;
    const newTo = value?.to;
    const fromTime = newFrom?.getTime() ?? null;
    const toTime = newTo?.getTime() ?? null;
    const lastFromTime = lastEmittedFromRef.current?.getTime() ?? null;
    const lastToTime = lastEmittedToRef.current?.getTime() ?? null;
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
    if (!anchorDate) {
      const from = showTime ? new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        confirmedFrom?.getHours() ?? 0,
        confirmedFrom?.getMinutes() ?? 0,
        confirmedFrom?.getSeconds() ?? 0
      ) : toDateOnly(day);
      setAnchorDate(from);
      if (!isControlled) {
        setInternalFrom(from);
        setInternalTo(void 0);
      }
      setInputValue(formatRange(from, void 0));
      setInputInvalid(false);
      lastEmittedFromRef.current = from;
      lastEmittedToRef.current = void 0;
      onChange?.({ from, to: void 0 });
    } else {
      let from = anchorDate, to = showTime ? new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        confirmedTo?.getHours() ?? 0,
        confirmedTo?.getMinutes() ?? 0,
        confirmedTo?.getSeconds() ?? 0
      ) : toDateOnly(day);
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
      onChange?.({ from, to });
      if (!showTime) close();
      else setAnchorDate(void 0);
    }
  }
  function handleDayMouseEnter(day) {
    if (anchorDate) setHoveredDate(day);
  }
  function handleFromTimeChange(h, m, s) {
    const base = confirmedFrom ?? /* @__PURE__ */ new Date();
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
    onChange?.({ from: newDate, to: confirmedTo });
  }
  function handleToTimeChange(h, m, s) {
    const base = confirmedTo ?? /* @__PURE__ */ new Date();
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
    onChange?.({ from: confirmedFrom, to: newDate });
  }
  function handleChange(e) {
    const input = e.target;
    const cursorPos = input.selectionStart ?? 0;
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
    onChange?.(
      parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : void 0
    );
    requestAnimationFrame(
      () => inputRef.current?.setSelectionRange(
        getRangeCursorPos(masked, digitsBeforeCursor),
        getRangeCursorPos(masked, digitsBeforeCursor)
      )
    );
  }
  function handleKeyDown(e) {
    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;
    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      return;
    }
    if (e.key === "Backspace" && pos > 0 && /[\s—]/.test(input.value[pos - 1])) {
      e.preventDefault();
      const val = input.value;
      const charsToSkip = val.slice(0, pos).match(/[\s—]+$/)?.[0].length ?? 1;
      const newPos = pos - charsToSkip;
      const masked = applyRangeMask(
        (val.slice(0, newPos - 1) + val.slice(newPos)).replace(/\D/g, "")
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
    const digits = text.replace(/\D/g, "").slice(0, 16);
    const masked = applyRangeMask(digits);
    setInputValue(masked);
    setAnchorDate(void 0);
    setHoveredDate(void 0);
    const parsedFrom = digits.length >= 8 ? parseDate(applyDateMask(digits.slice(0, 8))) : void 0;
    const parsedTo = digits.length >= 16 ? parseDate(applyDateMask(digits.slice(8, 16))) : void 0;
    setInputInvalid(
      digits.length >= 8 && !parsedFrom || digits.length >= 16 && !parsedTo
    );
    if (!isControlled) {
      setInternalFrom(parsedFrom);
      setInternalTo(parsedTo);
    }
    lastEmittedFromRef.current = parsedFrom;
    lastEmittedToRef.current = parsedTo;
    onChange?.(
      parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : void 0
    );
    requestAnimationFrame(
      () => inputRef.current?.setSelectionRange(masked.length, masked.length)
    );
  }
  const placeholder = label && !focused && !filled ? void 0 : "дд.мм.гггг — дд.мм.гггг";
  const interactive = !disabled && !loading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: [
        "datepicker",
        "daterangepicker",
        `datepicker--${size}`,
        className
      ].filter(Boolean).join(" "),
      "data-focused": focused || open || void 0,
      "data-filled": filled || void 0,
      "data-failed": failed || inputInvalid || void 0,
      "data-disabled": !interactive || void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "datepicker__field",
            "data-icon-start": resolvedIcon && iconPosition === "start" ? true : void 0,
            "data-icon-end": resolvedIcon && iconPosition === "end" ? true : void 0,
            onClick: () => interactive && inputRef.current?.focus(),
            children: [
              resolvedIcon && iconPosition === "start" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "datepicker__icon datepicker__icon--start", children: resolvedIcon }),
              label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "datepicker__label", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                  "aria-label": label ?? "Выберите период",
                  "aria-expanded": open,
                  "aria-haspopup": "dialog",
                  "aria-invalid": inputInvalid || void 0
                }
              ),
              resolvedIcon && iconPosition === "end" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "datepicker__icon datepicker__icon--end", children: resolvedIcon })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: [
              "datepicker__popover",
              `datepicker__popover--${size}`,
              calendarLayout === "horizontal" && "datepicker__popover--horizontal",
              showTime && "datepicker__popover--with-time"
            ].filter(Boolean).join(" "),
            role: "dialog",
            "aria-label": "Выберите период",
            children: showTime ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker__popover-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker__popover-calendar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Calendar,
                {
                  mode: "range",
                  selected: calendarSelected,
                  onSelect: () => {
                  },
                  onDayClick: handleDayClick,
                  onDayMouseEnter: handleDayMouseEnter,
                  onDayMouseLeave: () => setHoveredDate(void 0),
                  startMonth: fromDay,
                  endMonth: toDay,
                  disabled: disabledDays.length ? disabledDays : void 0,
                  numberOfMonths: 2,
                  locale: ru
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "datepicker__time-row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "datepicker__time-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "datepicker__time-label", children: "Начало" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TimePanel,
                    {
                      value: confirmedFrom,
                      showSeconds,
                      onChange: handleFromTimeChange
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker__time-separator" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "datepicker__time-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "datepicker__time-label", children: "Конец" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TimePanel,
                    {
                      value: confirmedTo,
                      showSeconds,
                      onChange: handleToTimeChange
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker__popover-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "datepicker__ok-btn",
                  type: "button",
                  onClick: close,
                  children: "OK"
                }
              ) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                locale: ru
              }
            )
          }
        )
      ]
    }
  );
}

export { DateRangePicker };
//# sourceMappingURL=index-DJ_GuejU.js.map
