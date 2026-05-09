import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "./app/providers/query-provider";
import { AuthProvider } from "./app/providers/auth-provider";
import { router } from "./app/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </AuthProvider>,
);
