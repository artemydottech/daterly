import * as react_jsx_runtime from 'react/jsx-runtime';
import { FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { b as DatePickerProps, e as DateRangePickerProps } from './DateRangePicker-Ao5P62Ur.cjs';
import 'react';
import 'date-fns/locale';
import 'react-day-picker';

interface RHFDatePickerProps<T extends FieldValues> extends Omit<DatePickerProps, 'value' | 'onChange' | 'failed'> {
    name: Path<T>;
    rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

declare function RHFDatePicker<T extends FieldValues>({ name, rules, ...props }: RHFDatePickerProps<T>): react_jsx_runtime.JSX.Element;

interface RHFDateRangePickerProps<T extends FieldValues> extends Omit<DateRangePickerProps, 'value' | 'onChange' | 'failed'> {
    name: Path<T>;
    rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

declare function RHFDateRangePicker<T extends FieldValues>({ name, rules, ...props }: RHFDateRangePickerProps<T>): react_jsx_runtime.JSX.Element;

export { RHFDatePicker, type RHFDatePickerProps, RHFDateRangePicker, type RHFDateRangePickerProps };
