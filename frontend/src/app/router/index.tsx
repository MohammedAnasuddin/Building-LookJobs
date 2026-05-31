import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../layouts/app-layout";

import { HomePage } from "@/pages/home-page";
import { ProfilePage } from "@/pages/profile-page";
import { BookmarksPage } from "@/pages/bookmarks-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "/bookmarks",

        element: <BookmarksPage />,
      },
    ],
  },
]);
