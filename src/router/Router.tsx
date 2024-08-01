import { Navigate, createBrowserRouter } from "react-router-dom";

import { Articles } from "../components/Articles";
import { ArticleRegist } from "../components/ArticleRegist";
import { EditArticle } from "../components/EditArticle";

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
  {
    path: "/:id/update",
    element: <EditArticle />,
  },
]);
