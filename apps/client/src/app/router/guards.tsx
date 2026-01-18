import { Navigate } from 'react-router-dom';
import { useAuth } from '@/entities/auth';
import { routes } from '@shared/config/routes';

interface IProps {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: IProps) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to={routes.login} replace />;
  }

  return children;
};
