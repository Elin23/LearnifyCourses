import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import CoursesDetails from "./pages/CoursesDetails";
import InstructionsPage from "./pages/InstructionsPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/AuthPages/Login";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import ForgotPasswordPage from "./pages/AuthPages/ForgotPasswordPage";
import type { PropsWithChildren } from "react";
import CourseSession from "./pages/CourseSession";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isAuthed = true;
  return isAuthed ? children : <Navigate to="/auth/login" replace />;
};

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "courses/:slug", element: <CoursesDetails /> },
      {path:"/courses/:slug/session/:index", element: <CourseSession /> },
      { path: "instructions", element: <InstructionsPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },                                                    
      {
        path: "my-courses",
        element: (
          <ProtectedRoute>
            <MyCoursesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      { path: "terms", element: <TermsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <SignUpPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
];
