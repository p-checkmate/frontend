import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/main/Homepage';
import InputPlayground from '@/components/test/InputTest';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'test-input',
    element: <InputPlayground />,
  },
]);
