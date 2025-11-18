import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className=" w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          WebCoin
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/features" className="hover:text-white transition">Features</Link>
          <Link to="/scan" className="hover:text-white transition">Security</Link>
          <Link to="/faq" className="hover:text-white transition">FAQ</Link>

          {/* Connect Wallet button now navigates to /scan */}
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
          <Link to="/" onClick={() => setOpen(false)} className="block hover:text-white transition">Home</Link>
          <Link to="/features" onClick={() => setOpen(false)} className="block hover:text-white transition">Features</Link>
          <Link to="/security" onClick={() => setOpen(false)} className="block hover:text-white transition">Security</Link>
          <Link to="/faq" onClick={() => setOpen(false)} className="block hover:text-white transition">FAQ</Link>

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
