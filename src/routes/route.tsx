import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/main/Homepage";
import FirstPage from "@/pages/onboarding/FirstPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:'test',
    element:<FirstPage/>
  }
]);
