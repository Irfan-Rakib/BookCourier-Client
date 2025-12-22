// import { createBrowserRouter } from "react-router";
// import RootLayout from "../Layouts/RootLayout";
// import DashboardLayout from "../Layouts/DashboardLayout";
// import Home from "../Pages/HomePage/Home/Home";
// import Books from "../Pages/Books/Books";
// import BookDetails from "../Pages/Books/BookDetails/BookDetails";
// import Coverage from "../Pages/HomePage/Coverage/Coverage";
// import Login from "../Pages/AuthPages/Login/Login";
// import Register from "../Pages/AuthPages/Register/Register";
// import Dashboard from "../Pages/Dashboard/Dashboard";
// import Profile from "../Pages/Dashboard/UserProfile/Profile";
// import AdminDashboard from "../Pages/Dashboard/Admin Dashboard/AdminDashboard";
// import LibrarianDashboard from "../Pages/Dashboard/Librarian Dashboard/LibrarianDashboard";
// import UserDashboard from "../Pages/Dashboard/User Dashboard/userDashboard";
// import ErrorPage from "../Pages/ErrorPage/ErrorPage";
// import PrivateRouter from "./PrivateRouter";
// import PaymentPage from "../Components/PaymentPage";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "books", element: <Books /> },
//       {
//         path: "books/:id",
//         element: (
//           <PrivateRouter>
//             <BookDetails />
//           </PrivateRouter>
//         ),
//       },
//       {
//         path: "/payment/:orderId",
//         element: <PaymentPage />,
//       },

//       { path: "coverage", element: <Coverage /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: <DashboardLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Dashboard /> }, // optional public dashboard
//       {
//         path: "profile",
//         element: (
//           <PrivateRouter>
//             <Profile />
//           </PrivateRouter>
//         ),
//       },
//       { path: "user", element: <UserDashboard /> }, // public or accessible differently
//       {
//         path: "librarian",
//         element: (
//           <PrivateRouter>
//             <LibrarianDashboard />
//           </PrivateRouter>
//         ),
//       },
//       {
//         path: "admin",
//         element: (
//           <PrivateRouter>
//             <AdminDashboard />
//           </PrivateRouter>
//         ),
//       },
//     ],
//   },
// ]);

import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Home from "../Pages/HomePage/Home/Home";
import Books from "../Pages/Books/Books";
import BookDetails from "../Pages/Books/BookDetails/BookDetails";
import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/UserProfile/Profile";
import AdminDashboard from "../Pages/Dashboard/Admin Dashboard/AdminDashboard";
import LibrarianDashboard from "../Pages/Dashboard/Librarian Dashboard/LibrarianDashboard";
import MyBooks from "../Pages/Dashboard/Librarian Dashboard/My Books/MyBooks";
import Orders from "../Pages/Dashboard/Librarian Dashboard/Orders/Orders";
import AddBook from "../Pages/Dashboard/Librarian Dashboard/Add Book/AddBook";
import MyOrders from "../Pages/Dashboard/User Dashboard/My Orders/MyOrders";
import Invoices from "../Pages/Dashboard/User Dashboard/Invoices/Invoices";
import UserDashboard from "../Pages/Dashboard/User Dashboard/userDashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRouter from "./PrivateRouter";
import EditBook from "../Pages/Dashboard/Librarian Dashboard/My Books/EditBook";
import Wishlist from "../Pages/Dashboard/User Dashboard/Wishlist";
import AllUsers from "../Pages/Dashboard/Admin Dashboard/All Users/AllUsers";
import ManageBooks from "../Pages/Dashboard/Admin Dashboard/Manage Books/ManageBooks";
import Coverage from "../Pages/HomePage/Coverage/Coverage";
import PaymentPage from "../Components/PaymentPage";
import UserDashboardChart from "../Components/UserDasboardChart";
import AdminDashboardChart from "../Components/AdminDashboardChart";
import LibrarianDashboardChart from "../Components/LibrarianDashboardChart";
import AdminPrivateRouter from "./AdminPrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <Books /> },
      { path: "coverage", element: <Coverage /> },
      {
        path: "books/:id",
        element: (
          <PrivateRouter>
            <BookDetails />
          </PrivateRouter>
        ),
      },
      {
        path: "/payment/:id",
        element: <PaymentPage />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
      },
      {
        path: "librarian",
        element: (
          // <PrivateRouter>
          //   <AdminPrivateRouter>
          //     <LibrarianDashboard />
          //   </AdminPrivateRouter>
          // </PrivateRouter>
          <PrivateRouter>
            <LibrarianDashboard />
          </PrivateRouter>
        ),
        children: [
          { path: "books", element: <MyBooks /> },
          { path: "orders", element: <Orders /> },
          { path: "add-books", element: <AddBook /> },
          { path: "books/edit/:id", element: <EditBook /> },
          { path: "chart", element: <LibrarianDashboardChart /> },
        ],
      },

      {
        path: "user",
        element: <UserDashboard />,
        children: [
          { path: "my-orders", element: <MyOrders /> },
          { path: "invoices", element: <Invoices /> },
          { path: "profile", element: <Profile /> },
          { path: "wishlist", element: <Wishlist /> },
          {
            path: "payment/:orderId",
            element: <PaymentPage />,
          },
          {
            path: "chart",
            element: <UserDashboardChart />,
          },
        ],
      },

      {
        path: "admin",
        element: <AdminPrivateRouter />, // <-- modal + authentication wrapper
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "users", element: <AllUsers /> },
          { path: "manage-book", element: <ManageBooks /> },
          { path: "profile", element: <Profile /> },
          { path: "chart", element: <AdminDashboardChart /> },
        ],
      },
    ],
  },
]);
