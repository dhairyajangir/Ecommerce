import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Custom neon accent for the active tab
const activeNav =
  "bg-white/70 text-blue-700 shadow-lg shadow-blue-400/20 backdrop-blur-[2px] border border-blue-200 ring-2 ring-blue-200 font-extrabold";

// Main NavBar
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/home" },
    { name: "My Products", path: "/my-products" },
    { name: "Add Products", path: "/create-product" },
    { name: "Cart", path: "/cart" },
    { name: "Profile", path: "/profile" },
    { name: "My Orders", path: "/myorders" },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full bg-gradient-to-r from-blue-500/70 via-fuchsia-500/20 via-40% to-indigo-700/80 backdrop-blur-2xl shadow-2xl shadow-blue-500/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 relative">
        {/* FABULOUS Floating Brand */}
        <div className="flex items-center gap-x-2">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-400/80 via-pink-400/80 to-yellow-400/80 rounded-full ring-4 ring-white/30 shadow-md shadow-fuchsia-400/25 relative">
            <span className="material-icons text-3xl text-white drop-shadow animate-pulse">store</span>
          </span>
          <h1
            className="ml-2 text-white text-2xl md:text-3xl font-extrabold tracking-wide bg-clip-text drop-shadow-sm"
            style={{
              textShadow: "0 2px 20px #8a68fa, 0 1px 1px #fff"
            }}
          >
            FabMart
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-3">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                  px-5 py-2 rounded-full transition-all duration-300 outline-none
                  hover:bg-white/30 hover:text-white hover:shadow-xl hover:-translate-y-1
                  font-semibold text-[17px] tracking-wide
                  ${isActive ? activeNav : "text-white/90"}
                `
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white hover:text-yellow-200 focus:outline-none z-20"
          onClick={() => setIsOpen(o => !o)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu - Fabulous floating glassy blur */}
      {isOpen && (
        <div className="fixed md:hidden top-0 left-0 w-full h-full bg-black/40 z-10" onClick={() => setIsOpen(false)}>
          <div
            className="absolute top-20 right-4 left-4 bg-white/70 backdrop-blur-2xl border border-blue-200/40 rounded-2xl shadow-2xl shadow-fuchsia-400/10 p-6 flex flex-col items-stretch animate-in fade-in slide-in-from-top-5"
            style={{ zIndex: 999 }}
            onClick={e => e.stopPropagation()}
          >
            <ul className="space-y-4">
              {links.map(link => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `
                        block px-4 py-3 rounded-xl transition-all duration-300 text-[18px] font-semibold
                        hover:bg-blue-600/20 hover:text-fuchsia-700
                        ${isActive ? "bg-white/90 text-blue-700 shadow shadow-pink-400/10 font-bold" : "text-blue-900/90"}
                      `
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Floating color blobs for mobile menu */}
          <span className="absolute top-0 left-0 w-32 h-32 bg-pink-400/30 blur-3xl rounded-full -z-1" />
          <span className="absolute bottom-0 right-0 w-40 h-24 bg-blue-400/20 blur-3xl rounded-full -z-1" />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
