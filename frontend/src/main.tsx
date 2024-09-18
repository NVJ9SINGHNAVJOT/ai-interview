import ReactDOM from "react-dom/client";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "@/App.tsx";
import "@/index.css";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Error from "@/pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
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
    element: <Navigate to="error" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
