import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/authContext";

import HomePage from "./pages/register/HomePage.tsx";
import { SignupFormDemo } from "./pages/register/SignUpForm.tsx";
import { LoginFormDemo } from "./pages/register/LoginForm.tsx";
import Home from "./pages/home/Home.tsx";
import SecretsPage from "./pages/home/secrets/SecretsPage.tsx";

// Loaders:
import fetchSecrets from "./components/secrets/ReadSecret/readSecret.ts";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      { index: true, element: <Navigate to="/signup" replace /> },
      { path: "/signup", element: <SignupFormDemo /> },
      { path: "/login", element: <LoginFormDemo /> },
    ],
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/secrets/:userId",
        element: <SecretsPage />,
        loader: fetchSecrets,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
