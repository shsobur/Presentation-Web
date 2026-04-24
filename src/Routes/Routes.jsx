import Main from "../Layout/Main/Main";
import { createBrowserRouter } from "react-router-dom";
import HomePageLayout from "../Layout/Pages/Home/HomePageLayout/HomePageLayout";
import SlidesPageLayout from "../Layout/Pages/Slides/SlidesPageLayout/SlidesPageLayout";
import End from "../Layout/Pages/Home/End/End";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePageLayout></HomePageLayout>,
      },
    ],
  },
  {
    path: "/all-slides",
    element: <SlidesPageLayout></SlidesPageLayout>,
  },
  {
    path: "/end-path",
    element: <End></End>,
  },
]);

export default router;