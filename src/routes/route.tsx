import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/main/Homepage";
import TestImagePage from "@/components/test/ImageTest";
import InputPlayground from "@/components/test/InputTest";
import DebateDetailPage from "@/components/test/DebateTest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test-input",
    element: <InputPlayground />,
  },
  {
    path: "/test-image",
    element: <TestImagePage />,
  },
  {
    path: "/debate-test",
    element: <DebateDetailPage />,
  },
]);
