import { createBrowserRouter } from "react-router-dom"

import { AppLayout } from "../layouts/app-layout"

import { HomePage } from "@/pages/home-page"
import { BookmarksPage } from "@/pages/bookmarks-page"
import { ProfilePage } from "@/pages/profile-page"

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
    ],
  },
])