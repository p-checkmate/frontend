import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/main/Homepage";
import DiscussionCardTest from "@/components/test/CardTest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test",
    element: <DiscussionCardTest />,
  },
]);
