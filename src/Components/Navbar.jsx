import React from "react";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 fixed top-0 w-full z-50 h-[12vh] shadow-md">
      <div className="flex justify-between items-center px-8 py-4">
      
        <NavLink to="/" className="flex items-center">
          
          <span className="hidden md:block text-white text-2xl font-bold ml-2">
            MyApp
          </span>
        </NavLink>

       <NavLink to="/ProfilesList" className="flex items-center">
          
          <span className="hidden md:block text-white text-2xl font-bold ml-2">
            ProfileList
          </span>
        </NavLink>


        <NavLink to="/features" className="flex items-center">
          
          <span className="hidden md:block text-white text-2xl font-bold ml-2">
          features
          </span>
        </NavLink>


        <NavLink to="/AddPhones" className="flex items-center">
          
          <span className="hidden md:block text-white text-2xl font-bold ml-2">
            Add Phone
          </span>
        </NavLink>

         <div className="Navbar-left">
          <ul className="flex list-none p-0 m-0 space-x-4">
            <li>
            
            </li>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;