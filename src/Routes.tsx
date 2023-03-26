import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to='/checkout' replace />,
      },
      {
        path: '/checkout',
        element: <p>Página de checkout!</p>,
      },
      {
        path: '*',
        element: <p>Rota não encontrada!</p>,
      },
    ],
  },
]);
