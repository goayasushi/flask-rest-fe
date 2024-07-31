import { Navigate, createBrowserRouter } from "react-router-dom";

import { Articles } from "../components/Articles";
import { ArticleRegist } from "../components/ArticleRegist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/articles" replace />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/create",
    element: <ArticleRegist />,
  },
]);
