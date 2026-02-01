import { RouterProvider } from './providers/RouterProvider';
import { useAppDispatch } from '@/shared/lib/storeHooks';
import { useEffect } from 'react';
import { initSession } from '@/entities/session';
import '@shared/config/env'; // Валидация env
import '@app/style/index.scss';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initSession());
  }, [dispatch]);

  return <RouterProvider />;
};
