import { useId } from 'react';
import type { InputProps } from '../model/types';
import style from './style.module.scss';

export const Input = ({ label, errorMsg, ...props }: InputProps) => {
  const id = useId();

  return (
    <div className={style.input}>
      {label && (
        <label htmlFor={id} className={style.input__label}>
          {label}
        </label>
      )}
      <input id={id} className={style.input__field} {...props} />
      {errorMsg && <p className={style.input__errorMsg}>{errorMsg}</p>}
    </div>
  );
};
