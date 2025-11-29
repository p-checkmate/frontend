import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/main/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
