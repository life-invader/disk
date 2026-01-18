import { RegisterForm } from '@features/auth/register';
import { useNavigate } from 'react-router-dom';
import { routes } from '@shared/config/routes';
import style from './style.module.scss';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(routes.home);
  };

  return (
    <div className={style.page}>
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
};

export default RegisterPage;
