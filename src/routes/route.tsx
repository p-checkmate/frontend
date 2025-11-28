import { createBrowserRouter } from 'react-router-dom';
import TextTest from '@/components/test/textTest';
import HomePage from '@/pages/main/Homepage';
import TestImagePage from '@/components/test/TestImage';

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
    path:'/test-image',
    element: <TestImagePage/>
  }
]);
