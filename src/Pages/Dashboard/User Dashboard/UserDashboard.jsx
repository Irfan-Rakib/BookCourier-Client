import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router";
import {
  FaBars,
  FaTimes,
  FaShoppingBag,
  FaFileInvoice,
  FaHeart,
  FaUser,
  FaChartBar,
} from "react-icons/fa";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // hide hamburger on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navItems = [
    { to: "my-orders", label: "My Orders", icon: FaShoppingBag },
    { to: "invoices", label: "Invoices", icon: FaFileInvoice },
    { to: "wishlist", label: "Wishlist", icon: FaHeart },
    { to: "profile", label: "My Profile", icon: FaUser },
    { to: "chart", label: "User Chart", icon: FaChartBar },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-30 left-8 z-50 p-3 rounded-xl
          bg-base-100 text-base-content border border-base-300
          shadow-xl transition-all duration-300
          ${isScrolled ? "-translate-y-24 opacity-0" : "opacity-100"}
        `}
      >
        {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/60 z-40"
          onClick={closeSidebar}
        />
      )}

      <div className="min-h-screen flex bg-base-200 text-base-content">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50
            w-64 lg:w-72 bg-base-100 border-r border-base-300
            shadow-xl transform transition-transform duration-300
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-base-300 sticky top-0 bg-base-100 z-10">
            <h2 className="text-2xl font-bold ">User Panel</h2>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-secondary text-secondary-content shadow-md"
                        : "hover:bg-base-200 dark:hover:bg-base-300"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={20}
                        className={
                          isActive
                            ? "text-secondary-content"
                            : "text-base-content/70"
                        }
                      />
                      <span className="font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-base-200">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
