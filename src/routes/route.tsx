import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/main/Homepage';
import OnboardingLandingPage from '@/pages/onboarding/OnboardingLandingPage';
import LoginPage from '@/pages/login/LoginPage';
import BookDetailPage from '@/pages/detail/BookDetailPage';
import SignupPage from '@/pages/signup/SignupPage';
import SignupCelebrate from '@/pages/onboarding/SignupCelebrate';
import OnboardingPage1 from '@/pages/onboarding/OnboardingPage1';
import OnboardingPage2 from '@/pages/onboarding/OnboardingPage2';
import DebateRoomPage from '@/pages/debate/DebateRoomPage';
import OnboardingPage3 from '@/pages/onboarding/OnboardingPage3';
import OnboardingPage4 from '@/pages/onboarding/OnboardingPage4';

import ToastTest from '@/components/test/ToastTest';


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
    path: '/onboarding/nickname',
    element: <OnboardingPage1 />,
  },
  {
    path: '/onboarding/book',
    element: <OnboardingPage2 />,
  },
  {
    path: '/onboarding/genre',
    element: <OnboardingPage3 />,
  },
  {
    path: '/onboarding/subgenre',
    element: <OnboardingPage4 />,
  },
  {
    path: '/book/:bookId',
    element: <BookDetailPage />,
  },
  {
    path:'/debate/:debateRoomId',
    element:<DebateRoomPage/>
  },
  {
    path: '/toasttest',
    element: <ToastTest />,
  },
]);
