import { NavLink, Outlet } from "react-router";
import Navbar from "../Pages/SharedPages/NavBar/NavBar";
import Footer from "../Pages/SharedPages/Footer/Footer";

const DashboardLayout = () => {
  const navItemClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm sm:text-base transition ${
      isActive ? "bg-primary text-white" : " hover:bg-base-200"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="bg-base-100 shadow-sm">
        <Navbar />

        {/* Mobile navlinks: visible only on small devices */}
        <nav className="flex md:hidden justify-around bg-base-100 border-t border-b py-2">
          <NavLink to="/dashboard/user" className={navItemClass}>
            User
          </NavLink>
          <NavLink to="/dashboard/librarian" className={navItemClass}>
            Librarian
          </NavLink>
          <NavLink to="/dashboard/admin" className={navItemClass}>
            Admin
          </NavLink>
        </nav>
      </header>

      {/* Main Dashboard */}
      <div className="flex flex-1 flex-col md:flex-row container mx-auto gap-4 px-4 py-4 md:gap-6">
        {/* Sidebar: hidden on small devices */}
        <aside className="hidden md:block w-64 bg-base-100 border rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
          <nav className="flex flex-col gap-2">
            <NavLink to="/dashboard/user" className={navItemClass}>
              User Dashboard
            </NavLink>
            <NavLink to="/dashboard/librarian" className={navItemClass}>
              Librarian Dashboard
            </NavLink>
            <NavLink to="/dashboard/admin" className={navItemClass}>
              Admin Dashboard
            </NavLink>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-base-100 border rounded-xl p-6 sm:p-4">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
