import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TimeInput } from './TimeInput'

const noop = () => {}

describe('TimeInput', () => {
  it('renders the formatted value', () => {
    render(<TimeInput value={new Date(2024, 0, 1, 9, 5, 0)} showSeconds={false} onChange={noop} />)
    expect(screen.getByRole('textbox')).toHaveValue('09:05')
  })

  it('renders seconds when showSeconds is true', () => {
    render(<TimeInput value={new Date(2024, 0, 1, 9, 5, 7)} showSeconds onChange={noop} />)
    expect(screen.getByRole('textbox')).toHaveValue('09:05:07')
  })

  it('defaults to 00:00 when value is undefined', () => {
    render(<TimeInput value={undefined} showSeconds={false} onChange={noop} />)
    expect(screen.getByRole('textbox')).toHaveValue('00:00')
  })

  it('uses a placeholder that matches showSeconds', () => {
    const { rerender } = render(<TimeInput value={undefined} showSeconds={false} onChange={noop} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '--:--')
    rerender(<TimeInput value={undefined} showSeconds onChange={noop} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '--:--:--')
  })

  it('falls back to "Время" aria-label and accepts a custom one', () => {
    const { rerender } = render(<TimeInput value={undefined} showSeconds={false} onChange={noop} />)
    expect(screen.getByLabelText('Время')).toBeInTheDocument()
    rerender(
      <TimeInput value={undefined} showSeconds={false} onChange={noop} ariaLabel="Время начала" />,
    )
    expect(screen.getByLabelText('Время начала')).toBeInTheDocument()
  })

  it('is disabled when the disabled prop is set', () => {
    render(<TimeInput value={undefined} showSeconds={false} onChange={noop} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('syncs the draft when the value changes while not focused', () => {
    const { rerender } = render(
      <TimeInput value={new Date(2024, 0, 1, 8, 0, 0)} showSeconds={false} onChange={noop} />,
    )
    expect(screen.getByRole('textbox')).toHaveValue('08:00')
    rerender(<TimeInput value={new Date(2024, 0, 1, 9, 30, 0)} showSeconds={false} onChange={noop} />)
    expect(screen.getByRole('textbox')).toHaveValue('09:30')
  })

  it('masks digits and commits onChange once full', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeInput value={undefined} showSeconds={false} onChange={onChange} />)
    const input = screen.getByRole('textbox')
    await user.tripleClick(input)
    await user.keyboard('1430')
    expect(input).toHaveValue('14:30')
    expect(onChange).toHaveBeenLastCalledWith(14, 30, 0)
  })

  it('commits seconds when six digits are typed', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeInput value={undefined} showSeconds onChange={onChange} />)
    const input = screen.getByRole('textbox')
    await user.tripleClick(input)
    await user.keyboard('142537')
    expect(input).toHaveValue('14:25:37')
    expect(onChange).toHaveBeenLastCalledWith(14, 25, 37)
  })

  it('clamps out-of-range values', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeInput value={undefined} showSeconds={false} onChange={onChange} />)
    const input = screen.getByRole('textbox')
    await user.tripleClick(input)
    await user.keyboard('9999')
    expect(onChange).toHaveBeenLastCalledWith(23, 59, 0)
  })

  it('reformats a partial draft on blur', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeInput value={undefined} showSeconds={false} onChange={onChange} />)
    const input = screen.getByRole('textbox')
    await user.tripleClick(input)
    await user.keyboard('7')
    expect(input).toHaveValue('7')
    await user.tab()
    expect(input).toHaveValue('07:00')
    expect(onChange).toHaveBeenLastCalledWith(7, 0, 0)
  })

  it('increments hours on ArrowUp', () => {
    const onChange = vi.fn()
    render(<TimeInput value={new Date(2024, 0, 1, 10, 30, 0)} showSeconds={false} onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    input.setSelectionRange(0, 0)
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(onChange).toHaveBeenLastCalledWith(11, 30, 0)
  })

  it('wraps hours from 23 to 0 on ArrowUp', () => {
    const onChange = vi.fn()
    render(<TimeInput value={new Date(2024, 0, 1, 23, 0, 0)} showSeconds={false} onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    input.setSelectionRange(0, 0)
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(onChange).toHaveBeenLastCalledWith(0, 0, 0)
  })

  it('wraps hours from 0 to 23 on ArrowDown', () => {
    const onChange = vi.fn()
    render(<TimeInput value={new Date(2024, 0, 1, 0, 0, 0)} showSeconds={false} onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    input.setSelectionRange(0, 0)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(onChange).toHaveBeenLastCalledWith(23, 0, 0)
  })

  it('bumps minutes when the caret is in the minutes segment', () => {
    const onChange = vi.fn()
    render(<TimeInput value={new Date(2024, 0, 1, 10, 30, 0)} showSeconds={false} onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    input.setSelectionRange(3, 3)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(onChange).toHaveBeenLastCalledWith(10, 29, 0)
  })

  it('bumps seconds when the caret is in the seconds segment', () => {
    const onChange = vi.fn()
    render(<TimeInput value={new Date(2024, 0, 1, 10, 30, 45)} showSeconds onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    input.setSelectionRange(6, 6)
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(onChange).toHaveBeenLastCalledWith(10, 30, 46)
  })

  it('moves the caret to the next segment on ArrowRight', () => {
    render(<TimeInput value={new Date(2024, 0, 1, 10, 30, 0)} showSeconds={false} onChange={noop} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    input.setSelectionRange(0, 0)
    fireEvent.keyDown(input, { key: 'ArrowRight' })
    expect(input.selectionStart).toBe(3)
    expect(input.selectionEnd).toBe(5)
  })

  it('moves the caret to the previous segment on ArrowLeft', () => {
    render(<TimeInput value={new Date(2024, 0, 1, 10, 30, 0)} showSeconds={false} onChange={noop} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    input.setSelectionRange(3, 3)
    fireEvent.keyDown(input, { key: 'ArrowLeft' })
    expect(input.selectionStart).toBe(0)
    expect(input.selectionEnd).toBe(2)
  })

  it('clamps segment navigation at the last segment', () => {
    render(<TimeInput value={new Date(2024, 0, 1, 10, 30, 0)} showSeconds={false} onChange={noop} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    input.setSelectionRange(3, 3)
    fireEvent.keyDown(input, { key: 'ArrowRight' })
    expect(input.selectionStart).toBe(3)
    expect(input.selectionEnd).toBe(5)
  })

  it('blocks non-digit character keys', () => {
    render(<TimeInput value={undefined} showSeconds={false} onChange={noop} />)
    const input = screen.getByRole('textbox')
    expect(fireEvent.keyDown(input, { key: 'a' })).toBe(false)
  })

  it('allows digit keys through', () => {
    render(<TimeInput value={undefined} showSeconds={false} onChange={noop} />)
    const input = screen.getByRole('textbox')
    expect(fireEvent.keyDown(input, { key: '5' })).toBe(true)
  })

  it('allows ctrl/meta combos through', () => {
    render(<TimeInput value={undefined} showSeconds={false} onChange={noop} />)
    const input = screen.getByRole('textbox')
    expect(fireEvent.keyDown(input, { key: 'a', ctrlKey: true })).toBe(true)
    expect(fireEvent.keyDown(input, { key: 'v', metaKey: true })).toBe(true)
  })
})
