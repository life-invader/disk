import { RouterProvider as RRProvider } from 'react-router-dom';
import { router } from '@app/router';

export const RouterProvider = () => {
  return <RRProvider router={router} />;
};
