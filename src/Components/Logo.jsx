import React from "react";
import logo from "../assets/Logo.png";
const Logo = () => {
  return (
    <div className=" w-40 md:w-50 dark:bg-gray-300 dark:border-accent rounded-xl px-2 py-1">
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
