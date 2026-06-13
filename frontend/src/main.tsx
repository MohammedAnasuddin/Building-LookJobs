import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "sonner";

import { QueryProvider } from "./app/providers/query-provider";
import { AuthProvider } from "./app/providers/auth-provider";

import { router } from "./app/router";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryProvider>
      <RouterProvider router={router} />

      <Toaster richColors position="top-right" />
    </QueryProvider>
  </AuthProvider>,
);
