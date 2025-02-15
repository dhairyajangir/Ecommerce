import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon imports for a modern look

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold tracking-wide">Brand</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "My Products", path: "/my-products" },
            { name: "Add Products", path: "/create-product" },
            { name: "Cart", path: "/cart" },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-lg transition-all duration-300 ${
                  isActive ? "bg-white text-blue-600 shadow-md" : "text-gray-200 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700 p-4 rounded-lg mt-2 shadow-md">
          <ul className="space-y-4">
            {[
              { name: "Home", path: "/" },
              { name: "My Products", path: "/my-products" },
              { name: "Add Products", path: "/create-product" },
              { name: "Cart", path: "/cart" },
            ].map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-lg rounded-md transition-all duration-300 ${
                      isActive ? "bg-white text-indigo-700" : "text-gray-200 hover:text-white"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;