import { useState } from 'react';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { RHFDatePicker, RHFDateRangePicker } from 'daterly/rhf';
import { ArrowRight } from 'lucide-react';
import CodeHighlight from './CodeHighlight';
import styles from './Landing.module.css';

type Lang = 'ru' | 'en';

type FormValues = {
  name: string;
  birthday: Date | null;
  vacation: { from: Date | undefined; to: Date | undefined } | null;
};

const FORM_DICT = {
  ru: {
    h2: 'В реальной форме',
    pa: 'Через',
    pb: '— типобезопасный',
    pc: ', валидация, defaultValues и control из useForm.',
    name: 'Имя',
    submit: 'Отправить',
    error: 'Заполни обязательные поля — имя и дату рождения.',
    outputLabel: 'onSubmit value',
    outputPlaceholder: '// Заполни форму и нажми «Отправить»',
    codeLabel: 'пример кода',
    birthdayLabel: 'Дата рождения',
    vacationLabel: 'Отпуск',
  },
  en: {
    h2: 'In a real form',
    pa: 'Through',
    pb: '— type-safe',
    pc: ', validation, defaultValues and control from useForm.',
    name: 'Name',
    submit: 'Submit',
    error: 'Fill in the required fields — name and birthday.',
    outputLabel: 'onSubmit value',
    outputPlaceholder: '// Fill in the form and click Submit',
    codeLabel: 'code example',
    birthdayLabel: 'Birthday',
    vacationLabel: 'Vacation',
  },
};

const CODE_SNIPPET = `import { useForm, FormProvider } from 'react-hook-form'
import {
  RHFDatePicker,
  RHFDateRangePicker,
} from 'daterly/rhf'

const methods = useForm()

<FormProvider {...methods}>
  <form onSubmit={methods.handleSubmit(onSubmit)}>
    <input {...methods.register('name')} />

    <RHFDatePicker
      name="birthday"
      label="Дата рождения"
    />

    <RHFDateRangePicker
      name="vacation"
      label="Отпуск"
    />
  </form>
</FormProvider>`;

interface Props {
  lang?: Lang;
}

export default function FormExample({ lang = 'ru' }: Props) {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const t = FORM_DICT[lang];

  const methods = useForm<FormValues>({
    defaultValues: { name: '', birthday: null, vacation: null },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmitted(data);
  };

  return (
    <section className={styles.formSection} id="form-example">
      <div className={styles.formHeader}>
        <div className={styles.formEyebrow}>react-hook-form</div>
        <h2>{t.h2}</h2>
        <p>
          {t.pa} <code>daterly/rhf</code> {t.pb}{' '}
          <code>name</code>{t.pc}
        </p>
      </div>
      <div className={styles.formGrid}>
        <FormProvider {...methods}>
          <form
            className={styles.formCard}
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
          >
            <label
              className={styles.formFieldFloat}
              data-failed={
                methods.formState.isSubmitted && methods.formState.errors.name
                  ? true
                  : undefined
              }
            >
              <input
                type="text"
                className={styles.formInputFloat}
                placeholder=" "
                {...methods.register('name', { required: true })}
              />
              <span className={styles.formFloatLabel}>{t.name}</span>
            </label>

            <div className={styles.formPickerSlot}>
              <RHFDatePicker
                name="birthday"
                label={t.birthdayLabel}
                rules={{ required: true }}
              />
            </div>

            <div className={styles.formPickerSlot}>
              <RHFDateRangePicker name="vacation" label={t.vacationLabel} />
            </div>

            <button type="submit" className={styles.formSubmit}>
              {t.submit}
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            {methods.formState.isSubmitted && !methods.formState.isValid && (
              <p className={styles.formError}>{t.error}</p>
            )}
          </form>
        </FormProvider>

        <div className={styles.formSidePanel}>
          <div className={styles.demoOutput}>
            <div className={styles.demoOutputHeader}>
              <span className={styles.demoOutputDots} aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.demoOutputLabel}>{t.outputLabel}</span>
            </div>
            <pre className={styles.demoOutputBody}>
              <code>
                {submitted
                  ? JSON.stringify(submitted, dateReplacer, 2)
                  : t.outputPlaceholder}
              </code>
            </pre>
          </div>

          <div className={styles.codeBlock}>
            <div className={styles.demoOutputHeader}>
              <span className={styles.codeBadge}>tsx</span>
              <span className={styles.demoOutputLabel}>{t.codeLabel}</span>
            </div>
            <pre className={styles.demoOutputBody}>
              <code>
                <CodeHighlight code={CODE_SNIPPET} />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function dateReplacer(_key: string, value: unknown) {
  if (value instanceof Date) return value.toISOString();
  return value;
}
