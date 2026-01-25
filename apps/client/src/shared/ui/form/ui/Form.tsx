import { FormProvider, type FieldValues } from 'react-hook-form';
import { FormBody } from './FormBody';
import { FormFooter } from './FormFooter';
import type { FormProps } from '../model/types';
import style from './style.module.scss';

export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  methods,
  submitBtnLabel,
  isLoading = false,
  errorMsg,
}: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form className={style.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className={style.form__title}>{submitBtnLabel}</h2>

        <fieldset disabled={isLoading}>{children}</fieldset>

        {errorMsg && <p className={style.form__error}>{errorMsg}</p>}

        <div className={style.form__footer}>
          <button type="submit" className={style.form__btn} disabled={isLoading}>
            {submitBtnLabel}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

Form.Body = FormBody;
Form.Footer = FormFooter;
