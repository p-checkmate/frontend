import { createBrowserRouter } from 'react-router-dom';
import TextTest from '@/components/test/textTest';
import HomePage from '@/pages/main/Homepage';
import ButtonTest from '@/components/test/ButtonTest';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path:'/test-text',
    element: <TextTest/>
  },
  {
    path: '/test-button',
    element: <ButtonTest/>
  }
]);
