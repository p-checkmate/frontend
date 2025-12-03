import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/main/Homepage';
import TogetherReadSectionTest from '@/components/test/TogetherReadTest';
import TogetherReadDetailTest from '@/components/test/TogetherReadDetail';
import OnboardingLandingPage from '@/pages/onboarding/OnboardingLandingPage';
import LoginPage from '@/pages/login/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'test',
    element: <TogetherReadSectionTest />,
  },
  {
    path: 'test1',
    element: <TogetherReadDetailTest />,
  },
  {
    path: '/onboardingLandingPage',
    element: <OnboardingLandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
