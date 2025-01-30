import React from "react";


import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 fixed top-0 w-full z-50 h-[12vh] shadow-md">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          
          <span className="hidden md:block text-white text-2xl font-bold ml-2">
            MyApp
          </span>
        </NavLink>

        {/* Navigation Links */}
        <div className="Navbar-left">
          <ul className="flex list-none p-0 m-0 space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-black rounded-md px-3 py-2"
                    : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-black rounded-md px-3 py-2"
                    : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                }
              >
                Phones
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;