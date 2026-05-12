import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import type { ReactNode } from 'react'
import { RHFDatePicker } from '.'

interface FormValues {
  date: Date | undefined
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
  const methods = useForm<FormValues>({ defaultValues: { date: undefined, ...defaultValues } })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit ?? (() => {}))}>
        {children}
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  )
}

describe('RHFDatePicker', () => {
  it('renders inside a form context', () => {
    render(
      <Wrapper>
        <RHFDatePicker<FormValues> name="date" label="Дата" />
      </Wrapper>,
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Дата')).toBeInTheDocument()
  })

  it('reflects defaultValue from the form', () => {
    render(
      <Wrapper defaultValues={{ date: new Date(2024, 2, 15, 12, 0, 0) }}>
        <RHFDatePicker<FormValues> name="date" />
      </Wrapper>,
    )
    expect(screen.getByRole('textbox')).toHaveValue('15.03.2024')
  })

  it('propagates user input to form submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <Wrapper onSubmit={onSubmit}>
        <RHFDatePicker<FormValues> name="date" />
      </Wrapper>,
    )
    await user.type(screen.getByRole('textbox'), '15032024')
    await user.click(screen.getByRole('button', { name: 'submit' }))
    expect(onSubmit).toHaveBeenCalledOnce()
    const submitted = onSubmit.mock.calls[0][0] as FormValues
    expect(submitted.date).toBeInstanceOf(Date)
    expect(submitted.date?.getDate()).toBe(15)
  })

  it('renders validation error message', async () => {
    const user = userEvent.setup()
    render(
      <Wrapper>
        <RHFDatePicker<FormValues>
          name="date"
          rules={{ validate: (v) => v !== undefined || 'Выберите дату' }}
        />
      </Wrapper>,
    )
    await user.click(screen.getByRole('button', { name: 'submit' }))
    expect(await screen.findByText('Выберите дату')).toBeInTheDocument()
  })
})
