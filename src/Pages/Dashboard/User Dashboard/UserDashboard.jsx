// import React from "react";
// import MyOrders from "./My Orders/MyOrders";
// import Profile from "../UserProfile/Profile";
// import Invoices from "./Invoices/Invoices";

// const UserDashboard = () => {
//   return (
//     <div>
//       user dashboard section
//       <div>
//         <MyOrders />
//         <Profile />
//         <Invoices />
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import React from "react";
import { Outlet, NavLink } from "react-router";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-6">User Panel</h2>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="my-orders"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-600" : "text-gray-700"
            }
          >
            My Orders
          </NavLink>
          <NavLink
            to="invoices"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-600" : "text-gray-700"
            }
          >
            Invoices
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-600" : "text-gray-700"
            }
          >
            Profile
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

export default UserDashboard;
