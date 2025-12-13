import React from "react";
import { NavLink, Outlet } from "react-router";
import Footer from "../Pages/SharedPages/Footer/Footer";
import Navbar from "../Pages/SharedPages/NavBar/NavBar";
import Profile from "../Pages/Dashboard/UserProfile/Profile";

const DashboardLayout = () => {
  return (
    <div>
      <div className="bg-base-100 shadow-sm mb-8">
        {" "}
        <Navbar />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex">
          <aside className="left-top-aside max-w-4/12 border">
            This is left aside
            <div>
              <li className="flex flex-col gap-3">
                {" "}
                <button className="btn-primary">
                  <NavLink to="/user-dashboard">User Dashboard</NavLink>
                </button>
                <NavLink to="/librarian-dashboard">Librarian Dashboard</NavLink>
                <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
              </li>
            </div>
          </aside>
          <div className="w-full border">
            {" "}
            <Outlet />
          </div>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
