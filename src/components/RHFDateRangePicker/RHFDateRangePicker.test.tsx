import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import type { ReactNode } from 'react'
import type { DateRange } from 'react-day-picker'
import { RHFDateRangePicker } from '.'

interface FormValues {
  period: DateRange | undefined
}

function Wrapper({
  children,
  defaultValues,
  onSubmit,
}: {
  children: ReactNode
  defaultValues?: Partial<FormValues>
  onSubmit?: (v: FormValues) => void
}) {
  const methods = useForm<FormValues>({ defaultValues: { period: undefined, ...defaultValues } })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit ?? (() => {}))}>
        {children}
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  )
}

describe('RHFDateRangePicker', () => {
  it('renders inside a form context', () => {
    render(
      <Wrapper>
        <RHFDateRangePicker<FormValues> name="period" label="Период" />
      </Wrapper>,
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Период')).toBeInTheDocument()
  })

  it('reflects defaultValue from the form', () => {
    render(
      <Wrapper
        defaultValues={{
          period: {
            from: new Date(2024, 2, 15, 12, 0, 0),
            to: new Date(2024, 2, 20, 12, 0, 0),
          },
        }}
      >
        <RHFDateRangePicker<FormValues> name="period" />
      </Wrapper>,
    )
    expect(screen.getByRole('textbox')).toHaveValue('15.03.2024 — 20.03.2024')
  })

  it('propagates user input to form submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <Wrapper onSubmit={onSubmit}>
        <RHFDateRangePicker<FormValues> name="period" />
      </Wrapper>,
    )
    await user.type(screen.getByRole('textbox'), '1503202420032024')
    await user.click(screen.getByRole('button', { name: 'submit' }))
    expect(onSubmit).toHaveBeenCalledOnce()
    const submitted = onSubmit.mock.calls[0][0] as FormValues
    expect(submitted.period?.from).toBeInstanceOf(Date)
    expect(submitted.period?.to).toBeInstanceOf(Date)
    expect(submitted.period?.from?.getDate()).toBe(15)
    expect(submitted.period?.to?.getDate()).toBe(20)
  })

  it('renders validation error message', async () => {
    const user = userEvent.setup()
    render(
      <Wrapper>
        <RHFDateRangePicker<FormValues>
          name="period"
          rules={{ validate: (v) => v?.from !== undefined || 'Выберите период' }}
        />
      </Wrapper>,
    )
    await user.click(screen.getByRole('button', { name: 'submit' }))
    expect(await screen.findByText('Выберите период')).toBeInTheDocument()
  })
})
