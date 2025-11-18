import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const activeStyle =
    "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1";
  const normalStyle = "hover:text-white transition";

  return (
    <header className=" w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Updated Logo */}
        <Link
          to="/"
          className=" uppercase text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          chainconnectx
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-gray-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeStyle : normalStyle
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/scan"
            className={({ isActive }) =>
              isActive ? activeStyle : normalStyle
            }
          >
            Security
          </NavLink>

          <NavLink
            to="/faq"
            className={({ isActive }) =>
              isActive ? activeStyle : normalStyle
            }
          >
            FAQ
          </NavLink>

          <Link
            to="/connect"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-lg"
          >
            Connect Wallet
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 py-6 px-6 space-y-6 text-gray-300">

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              "block transition " + (isActive ? "text-blue-400 font-semibold" : "hover:text-white")
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/security"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              "block transition " + (isActive ? "text-blue-400 font-semibold" : "hover:text-white")
            }
          >
            Security
          </NavLink>

          <NavLink
            to="/faq"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              "block transition " + (isActive ? "text-blue-400 font-semibold" : "hover:text-white")
            }
          >
            FAQ
          </NavLink>

          <Link
            to="/connect"
            onClick={() => setOpen(false)}
            className="w-full mt-4 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-lg block text-center"
          >
            Connect Wallet
          </Link>
        </div>
      )}
    </header>
  );
}
