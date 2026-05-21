import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
import { Calendar } from './components/Calendar'
import { DatePicker } from './components/DatePicker'
import { DateRangePicker } from './components/DateRangePicker'

expect.extend({ toHaveNoViolations })

describe('accessibility', () => {
  it('Calendar has no axe violations', async () => {
    const { container } = render(<Calendar mode="single" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DatePicker has no axe violations when closed', async () => {
    const { container } = render(<DatePicker label="Дата рождения" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DatePicker has no axe violations when the popover is open', async () => {
    const user = userEvent.setup()
    const { container } = render(<DatePicker label="Дата рождения" />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DateRangePicker has no axe violations when the popover is open', async () => {
    const user = userEvent.setup()
    const { container } = render(<DateRangePicker label="Период" />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('DatePicker with showTime has no axe violations when open', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <DatePicker label="Дата и время" showTime={{ format: 'HH:mm' }} />,
    )
    await user.click(screen.getByRole('combobox'))
    expect(await axe(container)).toHaveNoViolations()
  })

  it('exposes an accessible name on the DatePicker input', () => {
    render(<DatePicker label="Дата рождения" />)
    expect(screen.getByRole('combobox')).toHaveAccessibleName()
  })

  it('exposes an accessible name on the DateRangePicker input', () => {
    render(<DateRangePicker label="Период" />)
    expect(screen.getByRole('combobox')).toHaveAccessibleName()
  })

  it('marks the popover as a dialog', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Дата" />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('reflects the invalid state on the input', () => {
    render(<DatePicker label="Дата" failed />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('opens the calendar from the keyboard and exposes focusable day buttons', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Дата" />)
    await user.tab()
    expect(screen.getByRole('combobox')).toHaveFocus()
    const dialog = screen.getByRole('dialog')
    const dayButtons = dialog.querySelectorAll('button')
    expect(dayButtons.length).toBeGreaterThan(0)
  })

  it('keeps the time input reachable by an accessible name when showTime is set', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Дата" showTime={{ format: 'HH:mm' }} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByLabelText('Время')).toBeInTheDocument()
  })
})
