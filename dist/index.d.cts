import * as react_jsx_runtime from 'react/jsx-runtime';
import { DayPickerProps, DateRange } from 'react-day-picker';
export { DateRange } from 'react-day-picker';

type CalendarProps = DayPickerProps & {
    className?: string;
};
declare function Calendar({ className, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;

interface DatePickerProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (date: Date | undefined) => void;
    label?: string;
    placeholder?: string;
    fromDate?: Date;
    toDate?: Date;
    disabled?: boolean;
    failed?: boolean;
    className?: string;
}
declare function DatePicker({ value, defaultValue, onChange, label, placeholder, fromDate, toDate, disabled, failed, className, }: DatePickerProps): react_jsx_runtime.JSX.Element;

interface DateRangePickerProps {
    value?: DateRange;
    defaultValue?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    label?: string;
    fromDate?: Date;
    toDate?: Date;
    disabled?: boolean;
    failed?: boolean;
    className?: string;
}
declare function DateRangePicker({ value, defaultValue, onChange, label, fromDate: fromConstraint, toDate: toConstraint, disabled, failed, className, }: DateRangePickerProps): react_jsx_runtime.JSX.Element;

declare const VERSION = "0.0.1";

export { Calendar, type CalendarProps, DatePicker, type DatePickerProps, DateRangePicker, type DateRangePickerProps, VERSION };
