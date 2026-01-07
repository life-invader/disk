import { useForm, FormProvider, type FieldValues } from 'react-hook-form';
import { FormBody } from './FormBody';
import { FormFooter } from './FormFooter';
import type { FormProps } from '../model/types';
import style from './style.module.scss';

export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  options,
  submitBtnLabel,
}: FormProps<T>) => {
  const methods = useForm(options);

  return (
    <FormProvider {...methods}>
      <form className={style.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className={style.form__title}>{submitBtnLabel}</h2>

        {children}

        <div className={style.form__footer}>
          <button type="submit" className={style.form__btn}>
            {submitBtnLabel}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

Form.Body = FormBody;
Form.Footer = FormFooter;
