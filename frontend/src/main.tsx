import ReactDOM from "react-dom/client";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "@/App.tsx";
import "@/index.css";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Error from "@/pages/Error";
import Interview from "@/pages/Interview";
import MCQ from "@/pages/MCQ";
import Dashboard from "@/pages/Dashboard";
import OpenRoute from "@/components/auth/OpenRoute";
import PrivateRoute from "@/components/auth/PrivateRoute";
import Auth from "@/pages/Auth";
import ErrorBoundary from "@/components/error/ErrorBoundary";

const router = createBrowserRouter([
  {
    // main app route and sub routes
    // only MainNavbar is used in outlet in App element
    // and childrens are used as routes
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      /* ===== public route ===== */
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "auth/:type",
        element: (
          <OpenRoute>
            <Auth />
          </OpenRoute>
        ),
      },
      /* ===== private routes ===== */
      {
        path: "interview",
        element: (
          <PrivateRoute>
            <Interview />
          </PrivateRoute>
        ),
      },
      {
        path: "mcq",
        element: (
          <PrivateRoute>
            <MCQ />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      /* ===== error route ===== */
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/error" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
