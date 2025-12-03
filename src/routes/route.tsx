import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/main/Homepage';
import OnboardingLandingPage from '@/pages/onboarding/OnboardingLandingPage';
import LoginPage from '@/pages/login/LoginPage';
import BookDetailPage from '@/pages/detail/BookDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/onboardingLandingPage',
    element: <OnboardingLandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/book/:bookId',
    element: <BookDetailPage />,
  },
]);
