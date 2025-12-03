import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/main/Homepage';
import OnboardingLandingPage from '@/pages/onboarding/OnboardingLandingPage';
import LoginPage from '@/pages/login/LoginPage';
import BookDetailPage from '@/pages/detail/BookDetailPage';
import SignupPage from '@/pages/signup/SignupPage';
import SignupCelebrate from '@/pages/onboarding/SignupCelebrate';
import OnboardingPage1 from '@/pages/onboarding/OnboardingPage1';
import OnboardingPage2 from '@/pages/onboarding/OnboardingPage2';
import OnboardingPage3 from '@/pages/onboarding/OnboardingPage3';
import OnboardingPage4 from '@/pages/onboarding/OnboardingPage4';


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
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/signupCelebrate',
    element: <SignupCelebrate />,
  },
  {
    path: '/onboardingPage1',
    element: <OnboardingPage1 />,
  },
  {
    path: '/onboardingPage2',
    element: <OnboardingPage2 />,
  },
  {
    path: '/onboardingPage3',
    element: <OnboardingPage3 />,
  },
  {
    path: '/onboardingPage4',
    element: <OnboardingPage4 />,
  },
  {
    path: '/book/:bookId',
    element: <BookDetailPage />,
  },
]);
