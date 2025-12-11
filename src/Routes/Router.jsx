import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Register/Register";
import Coverage from "../Pages/HomePage/Coverage/Coverage";
import Books from "../Pages/Books/Books";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },

      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/coverage",
        element: <Coverage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
