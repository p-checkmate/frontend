import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/main/Homepage";
import ModalTest from "@/components/test/ModalTest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test",
    element: <ModalTest />,
  },
]);
