import { Navigate } from 'react-router-dom';
import { routes } from '@shared/config/routes';
import { useAppSelector } from '@/shared/lib/storeHooks';
import { selectIsAuthenticated } from '@/entities/session';

interface IProps {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: IProps) => {
  const isAuth = useAppSelector(selectIsAuthenticated);

  if (!isAuth) {
    return <Navigate to={routes.login} replace />;
  }

  return children;
};
