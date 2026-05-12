import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateRangePicker } from './DateRangePicker'

describe('DateRangePicker', () => {
  it('renders without crashing', () => {
    render(<DateRangePicker />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders label', () => {
    render(<DateRangePicker label="Период" />)
    expect(screen.getByText('Период')).toBeInTheDocument()
  })

  it('applies range mask while typing', async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)
    const input = screen.getByRole('textbox')
    await user.type(input, '0101202431122024')
    expect(input).toHaveValue('01.01.2024 — 31.12.2024')
  })

  it('shows partial from-date while typing', async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)
    await user.type(screen.getByRole('textbox'), '01012024')
    expect(screen.getByRole('textbox')).toHaveValue('01.01.2024')
  })

  it('ignores non-digit input', async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)
    await user.type(screen.getByRole('textbox'), 'abc')
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('calls onChange with from and to on valid complete range input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DateRangePicker onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), '0101202431122024')
    const lastCall = onChange.mock.calls.at(-1)?.[0]
    expect(lastCall?.from).toBeInstanceOf(Date)
    expect(lastCall?.to).toBeInstanceOf(Date)
    expect(lastCall?.from?.getDate()).toBe(1)
    expect(lastCall?.from?.getMonth()).toBe(0)
    expect(lastCall?.to?.getDate()).toBe(31)
    expect(lastCall?.to?.getMonth()).toBe(11)
  })

  it('opens calendar popover on focus', async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)
    await user.click(screen.getByRole('textbox'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes calendar on outside click', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <DateRangePicker />
        <button>outside</button>
      </div>,
    )
    await user.click(screen.getByRole('textbox'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'outside' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<DateRangePicker disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('sets data-failed attribute when failed prop is true', () => {
    const { container } = render(<DateRangePicker failed />)
    expect(container.querySelector('[data-failed]')).toBeInTheDocument()
  })

  it('reflects controlled value in the input', () => {
    render(
      <DateRangePicker
        value={{
          from: new Date(2024, 0, 1, 12, 0, 0),
          to: new Date(2024, 11, 31, 12, 0, 0),
        }}
      />,
    )
    expect(screen.getByRole('textbox')).toHaveValue('01.01.2024 — 31.12.2024')
  })

  it('updates input when controlled value changes', () => {
    const { rerender } = render(
      <DateRangePicker value={{ from: new Date(2024, 0, 1, 12, 0, 0), to: new Date(2024, 5, 30, 12, 0, 0) }} />,
    )
    expect(screen.getByRole('textbox')).toHaveValue('01.01.2024 — 30.06.2024')
    rerender(
      <DateRangePicker value={{ from: new Date(2024, 2, 1, 12, 0, 0), to: new Date(2024, 8, 30, 12, 0, 0) }} />,
    )
    expect(screen.getByRole('textbox')).toHaveValue('01.03.2024 — 30.09.2024')
  })

  it('clears input when controlled value becomes undefined', () => {
    const { rerender } = render(
      <DateRangePicker value={{ from: new Date(2024, 0, 1, 12, 0, 0), to: new Date(2024, 11, 31, 12, 0, 0) }} />,
    )
    rerender(<DateRangePicker value={undefined} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('renders defaultValue', () => {
    render(
      <DateRangePicker
        defaultValue={{
          from: new Date(2024, 0, 1, 12, 0, 0),
          to: new Date(2024, 11, 31, 12, 0, 0),
        }}
      />,
    )
    expect(screen.getByRole('textbox')).toHaveValue('01.01.2024 — 31.12.2024')
  })

  it('shows spinner icon when loading', () => {
    const { container } = render(<DateRangePicker loading />)
    expect(container.querySelector('.datepicker__icon')).toBeInTheDocument()
  })

  it('sets data-filled attribute when value is present', () => {
    const { container } = render(
      <DateRangePicker value={{ from: new Date(2024, 0, 1, 12, 0, 0), to: undefined }} />,
    )
    expect(container.querySelector('[data-filled]')).toBeInTheDocument()
  })
})
