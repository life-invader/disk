import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from '@app/providers/store';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <StoreProvider>123</StoreProvider>
  </StrictMode>,
);
