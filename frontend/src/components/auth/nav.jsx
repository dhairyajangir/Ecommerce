import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const activeNav =
  "bg-white/80 text-blue-700 shadow-md shadow-blue-300/40 backdrop-blur-[3px] ring-2 ring-blue-200 font-semibold";

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
    <nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[94vw] max-w-6xl
        bg-gradient-to-tr from-[#5f8fff]/60 via-fuchsia-400/10 to-[#7c3aed]/60
        border border-blue-300/30 backdrop-blur-2xl rounded-3xl px-3 py-1.5
        shadow-[0_12px_32px_rgba(138,104,250,0.25),_0_2px_8px_#fff] transition-all duration-500"
    >
      <div className="w-full flex justify-between items-center px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-400 to-yellow-400 p-[2px] ring-4 ring-white/30 shadow-md animate-float">
            <div className="w-full h-full bg-white/10 flex items-center justify-center rounded-full">
              <span className="material-icons text-white text-[28px] drop-shadow-md animate-pulse">store</span>
            </div>
          </div>
          <h1 className="text-white text-[1.8rem] md:text-[2.2rem] font-extrabold tracking-wide animate-gradient-text"
              style={{ textShadow: "0 2px 20px #8a68fa, 0 1px 1px #fff" }}>
            FabMart
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full transition-all duration-300 text-base font-medium 
                hover:bg-white/30 hover:text-fuchsia-400 hover:shadow-lg hover:-translate-y-0.5 
                ${isActive ? activeNav : "text-white/90"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-yellow-300 focus:outline-none z-30"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={34} /> : <Menu size={34} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-24 left-6 right-6 bg-white/90 backdrop-blur-2xl 
              border border-blue-200/40 rounded-3xl shadow-xl p-6 flex flex-col space-y-5 animate-in fade-in slide-in-from-top-5"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block text-center px-4 py-3 rounded-xl transition-all duration-300 text-[17px] font-medium
                  hover:bg-blue-600/20 hover:text-fuchsia-700 hover:scale-[1.02]
                  ${isActive ? "bg-white text-blue-700 shadow font-semibold" : "text-blue-900"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Floating Blobs */}
          <span className="absolute top-0 left-0 w-32 h-32 bg-pink-400/40 blur-3xl rounded-full -z-10 animate-blob" />
          <span className="absolute bottom-0 right-0 w-44 h-32 bg-blue-400/30 blur-3xl rounded-full -z-10 animate-blob2" />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
