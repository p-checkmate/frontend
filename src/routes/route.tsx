import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/main/Homepage';
import TogetherReadSectionTest from '@/components/test/TogetherReadTest';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'test',
    element: <TogetherReadSectionTest />,
  },
]);
