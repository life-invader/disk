import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { RouterProvider } from '@app/providers/RouterProvider';
import '@app/style/index.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
  </StrictMode>,
);
