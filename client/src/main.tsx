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
import SecretsPage from "./pages/secrets/SecretsPage.tsx";
import BadSecretPage from "./pages/badSecrets/BadSecretPage.tsx";
// Security
import ProtectedRoute from "./security/ProtectedRoutes.tsx";
// Loaders:
import { fetchSecrets } from "./components/secrets/ReadSecret/readSecret.ts";

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
    path: "/:userName",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/:userName/secrets",
        element: (
          <ProtectedRoute>
            <SecretsPage />
          </ProtectedRoute>
        ),
        loader: fetchSecrets,
      },
      {
        path: "/:userName/badSecrets",
        element: (
          <ProtectedRoute>
            <BadSecretPage />
          </ProtectedRoute>
        ),
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
