import { RegisterForm } from '@features/auth/register';
import style from './style.module.scss';

const RegisterPage = () => {
  return (
    <div className={style.page}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
