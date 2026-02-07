import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@widgets/layout';
import { LoginPage } from '@pages/loginPage';
import { RegisterPage } from '@pages/registerPage';
import { routes } from '@shared/config/routes';
import { RequireAuth } from './guards';

const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const HomePage = lazy(() => import('@pages/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routes.home,
        element: <HomePage />,
      },
      {
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: routes.register,
        element: <RegisterPage />,
      },
      {
        path: routes.profile,
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
