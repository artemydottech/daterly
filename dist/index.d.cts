import * as react_jsx_runtime from 'react/jsx-runtime';
import { DayPickerProps } from 'react-day-picker';
export { DateRange } from 'react-day-picker';
export { D as DatePicker, a as DatePickerProps, b as DatePickerShowTime, c as DateRangePicker, d as DateRangePickerProps } from './DateRangePicker-Bp95dxDX.cjs';
import { ButtonHTMLAttributes } from 'react';

type CalendarProps = DayPickerProps & {
    className?: string;
};
declare function Calendar({ className, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 's' | 'm';
    loading?: boolean;
}

declare function Button({ variant, size, loading, disabled, className, children, ...rest }: ButtonProps): react_jsx_runtime.JSX.Element;

export { Button, type ButtonProps, Calendar, type CalendarProps };
