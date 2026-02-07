import { LoginForm } from '@features/auth/login';
import { useNavigate } from 'react-router-dom';
import { routes } from '@shared/config/routes';
import style from './style.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(routes.home);
  };

  return (
    <div className={style.page}>
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
};

export default LoginPage;
