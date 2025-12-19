// import React from "react";
// import AddBook from "./Add Book/AddBook";
// import MyBooks from "./My Books/MyBooks";
// import Orders from "./Orders/Orders";

// const LibrarianDashboard = () => {
//   return (
//     <div>
//       this is Librarian Dashboard
//       <div>
//         <AddBook />
//         <MyBooks />
//         <Orders />
//       </div>
//     </div>
//   );
// };

// export default LibrarianDashboard;

import React from "react";
import { Outlet, NavLink } from "react-router";

const LibrarianDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-6">Librarian Panel</h2>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="add-books"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-600" : "text-gray-700"
            }
          >
            Add Books
          </NavLink>
          <NavLink
            to="books"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-600" : "text-gray-700"
            }
          >
            My Books
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-600" : "text-gray-700"
            }
          >
            Orders
          </NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default LibrarianDashboard;
