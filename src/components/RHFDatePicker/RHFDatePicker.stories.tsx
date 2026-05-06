import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '../Button'
import type { DateRange } from '../DateRangePicker'
import { RHFDateRangePicker } from '../RHFDateRangePicker'
import { RHFDatePicker } from './RHFDatePicker'

interface BookingFormValues {
  checkIn: Date | undefined
  period: DateRange | undefined
}

interface FormPayload {
  checkIn: string | null
  periodFrom: string | null
  periodTo: string | null
}

function toPayload(values: BookingFormValues): FormPayload {
  return {
    checkIn: values.checkIn?.toISOString() ?? null,
    periodFrom: values.period?.from?.toISOString() ?? null,
    periodTo: values.period?.to?.toISOString() ?? null,
  }
}

function JsonOutput({ data }: { data: FormPayload }) {
  const json = JSON.stringify(data, null, 2)
  const lines = json.split('\n').map((line, i) => {
    const keyMatch = line.match(/^(\s*)("[\w]+")(: )(.+)$/)
    if (keyMatch) {
      const [, indent, key, colon, val] = keyMatch
      const isNull = val === 'null' || val === 'null,'
      const trailing = val.endsWith(',') ? ',' : ''
      const valueStr = val.replace(/,$/, '')
      return (
        <div key={i}>
          <span>{indent}</span>
          <span style={{ color: '#7dd3fc' }}>{key}</span>
          <span style={{ color: '#94a3b8' }}>{colon}</span>
          {isNull
            ? <span style={{ color: '#f97316' }}>{valueStr}</span>
            : <span style={{ color: '#86efac' }}>{valueStr}</span>}
          <span style={{ color: '#94a3b8' }}>{trailing}</span>
        </div>
      )
    }
    return <div key={i} style={{ color: '#94a3b8' }}>{line}</div>
  })

  return (
    <div>
      <div style={{
        fontSize: 11,
        color: '#9e9e9e',
        marginBottom: 6,
        fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        Form payload
      </div>
      <pre style={{
        margin: 0,
        padding: '14px 16px',
        background: '#0f172a',
        borderRadius: 8,
        fontSize: 12,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        lineHeight: 1.7,
        overflowX: 'auto',
        border: '1px solid #1e293b',
      }}>
        {lines}
      </pre>
    </div>
  )
}

const meta: Meta = {
  title: 'Integrations/React Hook Form',
  parameters: {
    docs: {
      description: {
        component:
          'Обёртки для react-hook-form. Используют `useFormContext` — оборачивай форму в `FormProvider` и передавай `methods` через `spread`. Показывают сообщение об ошибке под полем автоматически.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const BookingForm: Story = {
  render: () => {
    const methods = useForm<BookingFormValues>({
      defaultValues: { checkIn: undefined, period: undefined },
    })
    const [submitted, setSubmitted] = useState<BookingFormValues | null>(null)

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(setSubmitted)}
          style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}
        >
          <RHFDatePicker
            name="checkIn"
            label="Дата заезда"
            rules={{ validate: (v) => v !== undefined || 'Выберите дату заезда' }}
          />
          <RHFDateRangePicker
            name="period"
            label="Период проживания"
            rules={{ validate: (v) => v?.from !== undefined || 'Выберите период' }}
          />
          <Button type="submit" style={{ alignSelf: 'flex-start' }}>
            Забронировать
          </Button>
          {submitted && <JsonOutput data={toPayload(submitted)} />}
        </form>
      </FormProvider>
    )
  },
}

export const WithValidationErrors: Story = {
  render: () => {
    const methods = useForm<BookingFormValues>({
      defaultValues: { checkIn: undefined, period: undefined },
    })
    const [submitted, setSubmitted] = useState<BookingFormValues | null>(null)

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((values) => { setSubmitted(values); methods.reset() })}
          style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}
        >
          <RHFDatePicker
            name="checkIn"
            label="Дата заезда"
            rules={{ validate: (v) => v !== undefined || 'Выберите дату заезда' }}
          />
          <RHFDateRangePicker
            name="period"
            label="Период проживания"
            rules={{ validate: (v) => v?.from !== undefined || 'Выберите период' }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="submit" style={{ alignSelf: 'flex-start' }}>
              Отправить
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => { methods.reset(); setSubmitted(null) }}
              style={{ alignSelf: 'flex-start' }}
            >
              Сбросить
            </Button>
          </div>
          {submitted && <JsonOutput data={toPayload(submitted)} />}
        </form>
      </FormProvider>
    )
  },
}

export const LoadingState: Story = {
  render: () => {
    const methods = useForm<BookingFormValues>({
      defaultValues: { checkIn: undefined, period: undefined },
    })
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState<BookingFormValues | null>(null)

    const onSubmit = async (values: BookingFormValues) => {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 2000))
      setLoading(false)
      setSubmitted(values)
    }

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}
        >
          <RHFDatePicker
            name="checkIn"
            label="Дата заезда"
            loading={loading}
            rules={{ validate: (v) => v !== undefined || 'Выберите дату заезда' }}
          />
          <Button type="submit" loading={loading} style={{ alignSelf: 'flex-start' }}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
          {submitted && <JsonOutput data={toPayload(submitted)} />}
        </form>
      </FormProvider>
    )
  },
}
