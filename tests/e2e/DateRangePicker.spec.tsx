import { test, expect } from '@playwright/experimental-ct-react'
import { DateRangePicker } from '../../src/components/DateRangePicker'
import { ControlledDateRangePicker } from './stories/ControlledDateRangePicker'
import { RangeSelectionWrapper } from './stories/RangeSelectionWrapper'

test.describe('DateRangePicker', () => {
  test('renders input', async ({ mount }) => {
    const component = await mount(<DateRangePicker label="Период" />)
    await expect(component.getByRole('textbox')).toBeVisible()
    await expect(component.getByText('Период')).toBeVisible()
  })

  test('masks input as user types a full range', async ({ mount }) => {
    const component = await mount(<DateRangePicker />)
    const input = component.getByRole('textbox')
    await input.click()
    await input.pressSequentially('0101202431122024')
    await expect(input).toHaveValue('01.01.2024 — 31.12.2024')
  })

  test('shows separator after 8 digits', async ({ mount }) => {
    const component = await mount(<DateRangePicker />)
    const input = component.getByRole('textbox')
    await input.click()
    await input.pressSequentially('01012024')
    await expect(input).toHaveValue('01.01.2024')
    await input.pressSequentially('31')
    await expect(input).toHaveValue('01.01.2024 — 31')
  })

  test('ignores non-digit input', async ({ mount }) => {
    const component = await mount(<DateRangePicker />)
    const input = component.getByRole('textbox')
    await input.click()
    await input.pressSequentially('abc!@#')
    await expect(input).toHaveValue('')
  })

  test('opens calendar on focus', async ({ mount }) => {
    const component = await mount(<DateRangePicker />)
    await component.getByRole('textbox').click()
    await expect(component.getByRole('dialog')).toBeVisible()
  })

  test('closes calendar on outside click', async ({ mount, page }) => {
    const component = await mount(
      <div>
        <DateRangePicker />
        <div id="outside" style={{ marginTop: 400, height: 50 }}>outside</div>
      </div>,
    )
    await component.getByRole('textbox').click()
    await expect(component.getByRole('dialog')).toBeVisible()
    await page.mouse.click(10, 500)
    await expect(component.getByRole('dialog')).not.toBeVisible()
  })

  test('selects range via two calendar clicks', async ({ mount }) => {
    const component = await mount(<RangeSelectionWrapper />)
    await component.getByRole('textbox').click()
    const dialog = component.getByRole('dialog')
    await expect(dialog).toBeVisible()

    const dayButtons = dialog.getByRole('button').filter({ hasText: /^\d+$/ })
    await dayButtons.nth(0).click()
    await dayButtons.nth(4).click()

    await expect(component.getByTestId('result')).not.toHaveText('none')
  })

  test('is disabled — input is not interactive', async ({ mount }) => {
    const component = await mount(<DateRangePicker disabled />)
    await expect(component.getByRole('textbox')).toBeDisabled()
  })

  test('reflects controlled value on first render', async ({ mount }) => {
    const component = await mount(
      <DateRangePicker
        value={{
          from: new Date(2024, 0, 1, 12, 0, 0),
          to: new Date(2024, 11, 31, 12, 0, 0),
        }}
      />,
    )
    await expect(component.getByRole('textbox')).toHaveValue('01.01.2024 — 31.12.2024')
  })

  test('updates input when controlled value changes', async ({ mount }) => {
    const component = await mount(<ControlledDateRangePicker />)
    await expect(component.getByRole('textbox')).toHaveValue('01.01.2024 — 30.06.2024')
    await component.getByRole('button', { name: 'Change' }).click()
    await expect(component.getByRole('textbox')).toHaveValue('01.03.2024 — 30.09.2024')
  })

  test('paste fills the range input', async ({ mount }) => {
    const component = await mount(<DateRangePicker />)
    const input = component.getByRole('textbox')
    await input.click()
    await input.focus()
    await input.evaluate((el: HTMLInputElement) => {
      const dt = new DataTransfer()
      dt.setData('text', '01.01.2024 — 31.12.2024')
      el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true }))
    })
    await expect(input).toHaveValue('01.01.2024 — 31.12.2024')
  })

  test('shows data-failed attribute when failed prop is set', async ({ mount, page }) => {
    await mount(<DateRangePicker failed />)
    await expect(page.locator('[data-failed]')).toBeVisible()
  })
})
