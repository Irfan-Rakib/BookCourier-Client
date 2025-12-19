import { NavLink, Outlet } from "react-router";
import Navbar from "../Pages/SharedPages/NavBar/NavBar";
import Footer from "../Pages/SharedPages/Footer/Footer";

const DashboardLayout = () => {
  const navItemClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition ${
      isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-base-200"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="bg-base-100 shadow-sm">
        <Navbar />
      </header>

      {/* Main Dashboard */}
      <div className="flex flex-1 container mx-auto px-4 gap-6 py-6">
        {/* Sidebar */}
        <aside className="w-64 bg-base-100 border rounded-xl p-4 hidden md:block">
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
        <main className="flex-1 bg-base-100 border rounded-xl p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
