import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Register/Register";
import Coverage from "../Pages/HomePage/Coverage/Coverage";
import Books from "../Pages/Books/Books";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../Pages/Dashboard/UserProfile/Profile";
import AdminDashboard from "../Pages/Dashboard/Admin Dashboard/AdminDashboard";
import LibrarianDashboard from "../Pages/Dashboard/Librarian Dashboard/LibrarianDashboard";
import UserDashboard from "../Pages/Dashboard/User Dashboard/userDashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import BookDetails from "../Pages/Books/BookDetails/BookDetails";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },

      {
        path: "/books",
        element: <Books />,
      },

      {
        path: "/books/:id",
        element: (
          <PrivateRouter>
            <BookDetails />
          </PrivateRouter>
        ),
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

  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/user-dashboard", element: <UserDashboard /> },
      { path: "/librarian-dashboard", element: <LibrarianDashboard /> },
      { path: "/admin-dashboard", element: <AdminDashboard /> },
    ],
  },
]);
