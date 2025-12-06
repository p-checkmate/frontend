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
import Mypage from '@/pages/mypage/Mypage';
import MyBook from '@/pages/mypage/MyBook';
import Setting from '@/pages/mypage/Setting';
import MyWrite from '@/pages/mypage/MyWrite';
import MyLiked from '@/pages/mypage/MyLiked';
import QuoteDetailPage from '@/pages/detail/QuoteDetailPage';

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
    path: '/mypage',
    element: <Mypage />,
  },
  {
    path: '/mypage/mybook',
    element: <MyBook />,
  },
  {
    path: '/mypage/setting',
    element: <Setting />,
  },
  {
    path: '/mypage/mywrite',
    element: <MyWrite />,
  },
  {
    path: '/mypage/myliked',
    element: <MyLiked />,
  },
  {
    path:'/quote/:quoteId',
    element:<QuoteDetailPage/>
  },
]);
