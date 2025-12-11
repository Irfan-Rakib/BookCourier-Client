import React from "react";
import Logo from "../../../Components/Logo";
import UseAuth from "../../../Hooks/UseAuth";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../../../Components/ThemeToggle";

// React Icons
import {
  FiHome,
  FiBook,
  FiMapPin,
  FiGrid,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { BiLogIn } from "react-icons/bi";

const Navbar = () => {
  const { logOut, user } = UseAuth();

  const handleLogout = () => {
    logOut().catch((err) => console.log(err));
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <FiHome />
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/books" className="flex items-center gap-2">
          <FiBook />
          Books
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <FiGrid />
          Dashboard
        </NavLink>
      </li>

      <li>
        <NavLink to="/coverage" className="flex items-center gap-2">
          <FiMapPin />
          Coverage
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar container mx-auto">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h10M4 18h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex items-center gap-3">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* USER SECTION */}
        {user ? (
          <div className="dropdown dropdown-end">
            {/* Avatar with border + tooltip */}
            <div
              tabIndex={0}
              className="w-11 h-11 rounded-full overflow-hidden cursor-pointer 
              border-2 border-accent shadow-md tooltip"
              data-tip={user?.displayName || "User"}
            >
              <img
                src={user?.photoURL || "https://i.ibb.co/sK9bM8g/user.png"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-48"
            >
              <li>
                <Link to="/profile" className="flex items-center gap-2">
                  <FiUser className="text-lg" />
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <FiLogOut className="text-lg" />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary hover:btn-secondary">
            <BiLogIn className="text-lg" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
