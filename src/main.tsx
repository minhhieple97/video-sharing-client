import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { LoadingProvider } from './contexts/LoadingContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
);
