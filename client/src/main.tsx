import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/authContext";

import HomePage from "./pages/homepage/HomePage.tsx";
import { SignupFormDemo } from "./pages/signup/SignUpForm.tsx";
import { LoginFormDemo } from "./pages/login/LoginForm.tsx";
import Home from "./pages/homepage/Home.tsx";
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
  { path: "/home", element: <Home /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
