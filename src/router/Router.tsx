import { Navigate, createBrowserRouter } from "react-router-dom";

import { Articles } from "../components/Articles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/articles" replace />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
]);
