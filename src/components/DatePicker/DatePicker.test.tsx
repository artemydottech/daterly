import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<DatePicker />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders label', () => {
    render(<DatePicker label="Дата рождения" />)
    expect(screen.getByText('Дата рождения')).toBeInTheDocument()
  })

  it('applies mask while typing', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    const input = screen.getByRole('textbox')
    await user.type(input, '01012024')
    expect(input).toHaveValue('01.01.2024')
  })

  it('ignores non-digit characters', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'абвabc!@#')
    expect(input).toHaveValue('')
  })

  it('calls onChange with a Date on valid complete input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), '15032024')
    const date = onChange.mock.calls.at(-1)?.[0] as Date
    expect(date).toBeInstanceOf(Date)
    expect(date.getDate()).toBe(15)
    expect(date.getMonth()).toBe(2)
    expect(date.getFullYear()).toBe(2024)
  })

  it('calls onChange with undefined when input is cleared', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker defaultValue={new Date(2024, 0, 1)} onChange={onChange} />)
    const input = screen.getByRole('textbox')
    await user.clear(input)
    expect(onChange).toHaveBeenLastCalledWith(undefined)
  })

  it('does not call onChange for invalid complete dates', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker onChange={onChange} />)
    // 32.01.2024 — invalid day
    await user.type(screen.getByRole('textbox'), '32012024')
    const calls = onChange.mock.calls
    const lastDate = calls.at(-1)?.[0]
    expect(lastDate).toBeUndefined()
  })

  it('opens calendar popover on focus', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    await user.click(screen.getByRole('textbox'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('does not open calendar when noCalendar is true', async () => {
    const user = userEvent.setup()
    render(<DatePicker noCalendar />)
    await user.click(screen.getByRole('textbox'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes calendar on outside click', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <DatePicker />
        <button>outside</button>
      </div>,
    )
    await user.click(screen.getByRole('textbox'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'outside' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<DatePicker disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('sets data-failed attribute when failed prop is true', () => {
    const { container } = render(<DatePicker failed />)
    expect(container.querySelector('[data-failed]')).toBeInTheDocument()
  })

  it('sets data-disabled attribute when disabled', () => {
    const { container } = render(<DatePicker disabled />)
    expect(container.querySelector('[data-disabled]')).toBeInTheDocument()
  })

  it('reflects controlled value in the input', () => {
    render(<DatePicker value={new Date(2024, 2, 15, 12, 0, 0)} />)
    expect(screen.getByRole('textbox')).toHaveValue('15.03.2024')
  })

  it('updates input when controlled value changes', () => {
    const { rerender } = render(<DatePicker value={new Date(2024, 2, 15, 12, 0, 0)} />)
    expect(screen.getByRole('textbox')).toHaveValue('15.03.2024')
    rerender(<DatePicker value={new Date(2024, 5, 1, 12, 0, 0)} />)
    expect(screen.getByRole('textbox')).toHaveValue('01.06.2024')
  })

  it('clears input when controlled value becomes undefined', () => {
    const { rerender } = render(<DatePicker value={new Date(2024, 2, 15, 12, 0, 0)} />)
    rerender(<DatePicker value={undefined} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('renders customTrigger instead of input', () => {
    render(
      <DatePicker
        customTrigger={(value, onClick) => (
          <button type="button" onClick={onClick}>
            {value || 'Выбрать дату'}
          </button>
        )}
      />,
    )
    expect(screen.getByRole('button', { name: 'Выбрать дату' })).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('renders renderInput replacement', () => {
    render(
      <DatePicker
        renderInput={({ ref, ...props }) => (
          <input {...props} ref={ref} data-testid="custom-input" />
        )}
      />,
    )
    expect(screen.getByTestId('custom-input')).toBeInTheDocument()
  })

  it('shows spinner icon when loading', () => {
    const { container } = render(<DatePicker loading />)
    expect(container.querySelector('.datepicker__icon')).toBeInTheDocument()
  })

  it('hides icon when icon is false', () => {
    const { container } = render(<DatePicker icon={false} />)
    expect(container.querySelector('.datepicker__icon')).not.toBeInTheDocument()
  })

  describe('showTime', () => {
    it('shows time placeholder when showTime is true', async () => {
      const user = userEvent.setup()
      render(<DatePicker showTime />)
      const input = screen.getByRole('textbox')
      await user.click(input)
      expect(input).toHaveAttribute('placeholder', 'дд.мм.гггг чч:мм:сс')
    })

    it('applies datetime mask when showTime is set', async () => {
      const user = userEvent.setup()
      render(<DatePicker showTime={{ format: 'HH:mm' }} />)
      await user.type(screen.getByRole('textbox'), '150320241430')
      expect(screen.getByRole('textbox')).toHaveValue('15.03.2024 14:30')
    })

    it('updates value when a time slot is clicked in the TimePanel', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container } = render(
        <DatePicker
          defaultValue={new Date(2024, 2, 15, 10, 0, 0)}
          showTime={{ format: 'HH:mm' }}
          onChange={onChange}
        />,
      )
      await user.click(screen.getByRole('textbox'))
      const hoursCol = container.querySelectorAll('.time-panel__column')[0]
      const hour15 = Array.from(hoursCol.querySelectorAll('.time-panel__item')).find(
        (el) => el.textContent === '15',
      ) as HTMLButtonElement
      await user.click(hour15)
      const date = onChange.mock.calls.at(-1)?.[0] as Date
      expect(date.getHours()).toBe(15)
      expect(date.getMinutes()).toBe(0)
    })

    it('keeps popover open after time selection and closes on OK', async () => {
      const user = userEvent.setup()
      render(<DatePicker defaultValue={new Date(2024, 2, 15, 10, 0, 0)} showTime={{ format: 'HH:mm' }} />)
      await user.click(screen.getByRole('textbox'))
      const okBtn = screen.getByRole('button', { name: 'OK' })
      expect(okBtn).toBeInTheDocument()
      await user.click(okBtn)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('opens calendar via customTrigger click', async () => {
    const user = userEvent.setup()
    render(
      <DatePicker
        customTrigger={(value, onClick) => (
          <button type="button" onClick={onClick}>
            {value || 'Выбрать дату'}
          </button>
        )}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Выбрать дату' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders icon at the start when iconPosition="start"', () => {
    const { container } = render(<DatePicker iconPosition="start" />)
    expect(container.querySelector('.datepicker__icon--start')).toBeInTheDocument()
  })

  it('pastes a date string and applies mask', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker onChange={onChange} />)
    const input = screen.getByRole('textbox')
    input.focus()
    await user.paste('15/03/2024')
    expect(input).toHaveValue('15.03.2024')
    const date = onChange.mock.calls.at(-1)?.[0] as Date
    expect(date.getDate()).toBe(15)
  })

  it('Backspace right after a separator removes the separator and the preceding digit', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultValue={new Date(2024, 0, 15, 12, 0, 0)} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('15.01.2024')
    input.focus()
    input.setSelectionRange(3, 3) // right after the first dot
    await user.keyboard('{Backspace}')
    // "15.01.2024" -> drop "5." -> "101.2024" digits -> remasked "10.12.024"
    expect(input.value).toBe('10.12.024')
  })

  it('restores last valid value on blur when input is partial', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultValue={new Date(2024, 0, 15, 12, 0, 0)} />)
    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '1503')
    expect(input).toHaveValue('15.03')
    await user.tab()
    // after blur, partial is rolled back to last valid (which is '' after clear)
    expect(input).toHaveValue('')
  })

  it('selects a day from the calendar', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker defaultValue={new Date(2024, 2, 15, 12, 0, 0)} onChange={onChange} />)
    await user.click(screen.getByRole('textbox'))
    const dialog = screen.getByRole('dialog')
    const day20 = await Promise.resolve(
      Array.from(dialog.querySelectorAll('button')).find((b) => b.textContent?.trim() === '20'),
    )
    if (!day20) throw new Error('day 20 not found')
    await user.click(day20)
    const last = onChange.mock.calls.at(-1)?.[0] as Date
    expect(last.getDate()).toBe(20)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
