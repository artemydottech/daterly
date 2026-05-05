import * as react_jsx_runtime from 'react/jsx-runtime';
import { DayPickerProps, DateRange } from 'react-day-picker';
export { DateRange } from 'react-day-picker';
import { ReactNode } from 'react';

type CalendarProps = DayPickerProps & {
    className?: string;
};
declare function Calendar({ className, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;

type DatePickerSize = 's' | 'm' | 'l';
type DatePickerShowTime = boolean | {
    format: 'HH:mm' | 'HH:mm:ss';
};
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
    size?: DatePickerSize;
    noCalendar?: boolean;
    showTime?: DatePickerShowTime;
    icon?: ReactNode | false;
    iconPosition?: 'start' | 'end';
    className?: string;
}
declare function DatePicker({ value, defaultValue, onChange, label, placeholder, fromDate, toDate, disabled, failed, size, noCalendar, showTime, icon, iconPosition, className, }: DatePickerProps): react_jsx_runtime.JSX.Element;

type DateRangePickerSize = 's' | 'm' | 'l';
type DateRangePickerCalendarLayout = 'vertical' | 'horizontal';
interface DateRangePickerProps {
    value?: DateRange;
    defaultValue?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    label?: string;
    fromDate?: Date;
    toDate?: Date;
    disabled?: boolean;
    failed?: boolean;
    size?: DateRangePickerSize;
    calendarLayout?: DateRangePickerCalendarLayout;
    showTime?: DatePickerShowTime;
    icon?: ReactNode | false;
    iconPosition?: 'start' | 'end';
    className?: string;
}
declare function DateRangePicker({ value, defaultValue, onChange, label, fromDate: fromConstraint, toDate: toConstraint, disabled, failed, size, calendarLayout, showTime, icon, iconPosition, className, }: DateRangePickerProps): react_jsx_runtime.JSX.Element;

declare const VERSION = "0.0.1";

export { Calendar, type CalendarProps, DatePicker, type DatePickerProps, type DatePickerShowTime, DateRangePicker, type DateRangePickerProps, VERSION };
