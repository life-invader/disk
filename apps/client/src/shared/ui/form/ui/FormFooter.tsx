import style from './style.module.scss';

export const FormFooter = ({ children }) => {
  return <div className={style.form__footer}>{children}</div>;
};
