import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-400">WebCoin</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-gray-300">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#security" className="hover:text-white transition">Security</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>

          {/* Connect Wallet (coming soon) Button */}
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-lg">
            Connect Wallet
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 py-6 px-6 space-y-6 text-gray-300">
          <a href="#" className="block hover:text-white transition">Home</a>
          <a href="#features" className="block hover:text-white transition">Features</a>
          <a href="#security" className="block hover:text-white transition">Security</a>
          <a href="#faq" className="block hover:text-white transition">FAQ</a>

          <button className="w-full mt-4 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-lg">
            Connect Wallet
          </button>
        </div>
      )}
    </header>
  );
}
