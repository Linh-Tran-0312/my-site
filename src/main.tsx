import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './components/admin/AdminApp.tsx';
import App from './App.tsx';

const isAdminPage = new URLSearchParams(window.location.search).get('page') === 'admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isAdminPage ? <AdminApp /> : <App />}</StrictMode>
);
