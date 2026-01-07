import style from './style.module.scss';

export const FormBody = ({ children }) => {
  return <div className={style.form__body}>{children}</div>;
};
