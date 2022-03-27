import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Navbar = () => {
  const { authState } = useAuth();
  const location = useLocation();
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 shadow-md">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          {authState.user.name}
        </span>
        <div className="flex md:order-2">
          {location.pathname !== "/add-student" && (
            <Link
              to="/add-student"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add a new student
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
