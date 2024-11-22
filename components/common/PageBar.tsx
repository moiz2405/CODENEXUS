"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "../../lib/utils"; // Optional utility for conditional classes
import { Menu, X } from "lucide-react"; // Icons for the menu

export default function PageBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-[#1a1a1a] text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#6f7a4b]">
          MyLogo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg hover:text-[#6f7a4b] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-[#6f7a4b] transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#1a1a1a] text-white">
          <ul className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 px-3 rounded-lg hover:bg-[#6f7a4b] hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
