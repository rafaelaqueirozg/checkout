import { Checkout } from '@pages/Checkout/Checkout';
import { SignatureDone } from '@pages/SignatureDone/SignatureDone';
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
      {
        path: '/signature_done',
        element: <SignatureDone />,
      },
    ],
  },
  {
    path: '*',
    element: <p>Rota não encontrada!</p>,
  },
]);
