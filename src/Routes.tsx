import { Checkout } from '@pages/Checkout/Checkout';
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
        element: <Checkout />,
      },
    ],
  },
  {
    path: '*',
    element: <p>Rota não encontrada!</p>,
  },
]);
