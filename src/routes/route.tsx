import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/main/Homepage";
import OnboardingLandingPage from "@/pages/onboarding/OnboardingLandingPage";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import SignupCelebrate from "@/pages/onboarding/SignupCelebrate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/onboardingLandingPage",
    element: <OnboardingLandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signupCelebrate",
    element: <SignupCelebrate />,
  }
]);
