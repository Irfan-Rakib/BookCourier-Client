import React from "react";
import ErrImg from "../../assets/error-404.png";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-4 max-w-xl w-full">
        {/* Image */}
        <img
          src={ErrImg}
          alt="404 Error"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-6"
        />

        {/* Text */}
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Oops, page not found!
        </h1>

        <p className="font-medium text-sm sm:text-base text-gray-600">
          The page you are looking for is not available.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
          <Link
            to="/"
            className="btn bg-[#4A7BA8] hover:bg-[#A88647] text-white px-6 py-3 w-full sm:w-auto"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard/user"
            className="btn bg-[#4A7BA8] hover:bg-[#A88647] text-white px-6 py-3 w-full sm:w-auto"
          >
            Go Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
