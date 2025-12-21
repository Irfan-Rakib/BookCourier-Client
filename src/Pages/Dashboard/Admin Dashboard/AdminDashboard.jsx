// import React from "react";
// import AllUsers from "./All Users/AllUsers";
// import ManageBooks from "./Manage Books/ManageBooks";
// import MyProfile from "./My Profile/MyProfile";

// const AdminDashboard = () => {
//   return (
//     <div>
//       this is Admin Dashboard
//       <div>
//         <AllUsers />
//         <ManageBooks />
//         <MyProfile />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router";
import {
  FaBars,
  FaTimes,
  FaShoppingBag,
  FaFileInvoice,
  FaHeart,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { SiBookstack } from "react-icons/si";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detect করার জন্য
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // 100px scroll হলে hidden
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navItems = [
    { to: "users", label: "All Users", icon: FaUsers },
    { to: "manage-book", label: "Manage Book", icon: SiBookstack },
    { to: "profile", label: "My Profile", icon: FaUser },
  ];

  return (
    <>
      {/* Hamburger - Scroll নিচে গেলে hidden */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-30 left-8 z-50 p-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border hover:shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 ${
          isScrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={closeSidebar}
        />
      )}

      <div className="min-h-screen flex ">
        {/* Sidebar */}
        <div
          className={`
                 shadow-lg border-r border-gray-200 transition-all duration-300
                w-64 lg:w-72 fixed lg:static inset-y-0 left-0 z-50 transform
                ${
                  isSidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }
              `}
        >
          <div className="p-6 border-b border-gray-100 sticky top-0 ">
            <h2 className="text-2xl font-bold ">Admin Panel</h2>
          </div>

          <nav className="p-6 mt-4 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-xl transition-all duration-200 hover:bg-secondary ${
                      isActive
                        ? "bg-secondary text-white shadow-lg"
                        : " hover:text-white"
                    }`
                  }
                  onClick={closeSidebar}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={20}
                        className={`mr-4 ${
                          isActive ? "text-white" : "text-gray-500"
                        } transition-colors`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 transition-all duration-300">
          <main className="p-6 lg:p-8 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
