import { Navigate } from 'react-router-dom';
import { routes } from './routes';
import { useAuth } from '@/entities/auth';

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
