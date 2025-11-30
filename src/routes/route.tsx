import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/main/Homepage";
import DebateDetailPage from "@/components/test/DebateTest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test",
    element: <DebateDetailPage />,
  },
]);
