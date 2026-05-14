import { test, expect } from '@playwright/experimental-ct-react'
import { DatePicker } from '../../src/components/DatePicker'
import { ControlledDatePicker } from './fixtures/ControlledDatePicker'
import { CustomTriggerDatePicker } from './fixtures/CustomTriggerDatePicker'

test.describe('DatePicker', () => {
  test('renders input', async ({ mount }) => {
    const component = await mount(<DatePicker label="Дата" />)
    await expect(component.getByRole('textbox')).toBeVisible()
    await expect(component.getByText('Дата')).toBeVisible()
  })

  test('masks input as user types', async ({ mount }) => {
    const component = await mount(<DatePicker />)
    const input = component.getByRole('textbox')
    await input.click()
    await input.pressSequentially('01012024')
    await expect(input).toHaveValue('01.01.2024')
  })

  test('ignores non-digit characters', async ({ mount }) => {
    const component = await mount(<DatePicker />)
    const input = component.getByRole('textbox')
    await input.click()
    await input.pressSequentially('abc!@#')
    await expect(input).toHaveValue('')
  })

  test('opens calendar popover on focus', async ({ mount }) => {
    const component = await mount(<DatePicker />)
    await component.getByRole('textbox').click()
    await expect(component.getByRole('dialog')).toBeVisible()
  })

  test('does not open calendar when noCalendar is true', async ({ mount }) => {
    const component = await mount(<DatePicker noCalendar />)
    await component.getByRole('textbox').click()
    await expect(component.getByRole('dialog')).not.toBeVisible()
  })

  test('closes calendar when clicking outside', async ({ mount, page }) => {
    const component = await mount(
      <div>
        <DatePicker />
        <div id="outside" style={{ marginTop: 400, height: 50 }}>outside</div>
      </div>,
    )
    await component.getByRole('textbox').click()
    await expect(component.getByRole('dialog')).toBeVisible()
    await page.mouse.click(10, 500)
    await expect(component.getByRole('dialog')).not.toBeVisible()
  })

  test('selects date from calendar and closes popover', async ({ mount }) => {
    const component = await mount(<DatePicker />)
    await component.getByRole('textbox').click()
    const dialog = component.getByRole('dialog')
    await expect(dialog).toBeVisible()

    const dayButton = dialog.getByRole('button').filter({ hasText: /^1$/ }).first()
    await dayButton.click()

    await expect(component.getByRole('dialog')).not.toBeVisible()
    await expect(component.getByRole('textbox')).not.toHaveValue('')
  })

  test('is disabled — input is not interactive', async ({ mount }) => {
    const component = await mount(<DatePicker disabled />)
    await expect(component.getByRole('textbox')).toBeDisabled()
  })

  test('reflects controlled value on first render', async ({ mount }) => {
    const date = new Date(2024, 2, 15, 12, 0, 0)
    const component = await mount(<DatePicker value={date} />)
    await expect(component.getByRole('textbox')).toHaveValue('15.03.2024')
  })

  test('updates input when controlled value prop changes', async ({ mount }) => {
    const component = await mount(<ControlledDatePicker />)
    await expect(component.getByRole('textbox')).toHaveValue('01.01.2024')
    await component.getByRole('button', { name: 'Change' }).click()
    await expect(component.getByRole('textbox')).toHaveValue('15.06.2024')
  })

  test('shows datetime mask when showTime is set', async ({ mount }) => {
    const component = await mount(<DatePicker showTime={{ format: 'HH:mm' }} />)
    const input = component.getByRole('textbox', { name: 'Выберите дату' })
    await input.click()
    await input.pressSequentially('150320241430')
    await expect(input).toHaveValue('15.03.2024 14:30')
  })

  test('renders customTrigger instead of default input', async ({ mount, page }) => {
    await mount(<CustomTriggerDatePicker />)
    await expect(page.getByTestId('custom-trigger')).toBeVisible()
    await expect(page.getByRole('textbox')).not.toBeAttached()
  })

  test('backspace removes digits correctly', async ({ mount }) => {
    const component = await mount(<DatePicker />)
    const input = component.getByRole('textbox')
    await input.click()
    await input.pressSequentially('01012024')
    await expect(input).toHaveValue('01.01.2024')
    await input.press('Backspace')
    await expect(input).toHaveValue('01.01.202')
    await input.press('Backspace')
    await expect(input).toHaveValue('01.01.20')
    await input.press('Backspace')
    await expect(input).toHaveValue('01.01.2')
  })

  test('paste strips non-digits and masks result', async ({ mount }) => {
    const component = await mount(<DatePicker />)
    const input = component.getByRole('textbox')
    await input.click()
    await input.focus()
    await input.evaluate((el: HTMLInputElement) => {
      const dt = new DataTransfer()
      dt.setData('text', '15-03-2024')
      el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true }))
    })
    await expect(input).toHaveValue('15.03.2024')
  })

  test('shows data-failed attribute when failed prop is set', async ({ mount, page }) => {
    await mount(<DatePicker failed />)
    await expect(page.locator('[data-failed]')).toBeVisible()
  })
})
