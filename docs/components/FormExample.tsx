import { useState } from 'react';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { RHFDatePicker, RHFDateRangePicker } from '@artemy-tech/rtdp/rhf';
import { ArrowRight } from 'lucide-react';
import CodeHighlight from './CodeHighlight';
import styles from './Landing.module.css';

type FormValues = {
  name: string;
  birthday: Date | null;
  vacation: { from: Date | undefined; to: Date | undefined } | null;
};

const CODE_SNIPPET = `import { useForm, FormProvider } from 'react-hook-form'
import {
  RHFDatePicker,
  RHFDateRangePicker,
} from '@artemy-tech/rtdp/rhf'

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

export default function FormExample() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const methods = useForm<FormValues>({
    defaultValues: { name: '', birthday: null, vacation: null },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmitted(data);
  };

  return (
    <section className={styles.formSection} id="form-example">
      <div className={styles.formHeader}>
        <h2>В реальной форме</h2>
        <p>
          Через <code>rtdp/rhf</code> — типобезопасный{' '}
          <code>name</code>, валидация, defaultValues, control из{' '}
          <code>useForm</code>.
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
              <span className={styles.formFloatLabel}>Имя</span>
            </label>

            <div className={`${styles.formPickerSlot}`}>
              <RHFDatePicker
                name="birthday"
                label="Дата рождения"
                rules={{ required: true }}
              />
            </div>

            <div className={`${styles.formPickerSlot}`}>
              <RHFDateRangePicker name="vacation" label="Отпуск" />
            </div>

            <button type="submit" className={styles.formSubmit}>
              Отправить
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            {methods.formState.isSubmitted && !methods.formState.isValid && (
              <p className={styles.formError}>
                Заполни обязательные поля — имя и дату рождения.
              </p>
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
              <span className={styles.demoOutputLabel}>onSubmit value</span>
            </div>
            <pre className={styles.demoOutputBody}>
              <code>
                {submitted
                  ? JSON.stringify(submitted, dateReplacer, 2)
                  : '// Заполни форму и нажми «Отправить»'}
              </code>
            </pre>
          </div>

          <div className={styles.codeBlock}>
            <div className={styles.demoOutputHeader}>
              <span className={styles.codeBadge}>tsx</span>
              <span className={styles.demoOutputLabel}>пример кода</span>
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
