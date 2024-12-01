"use client";

import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { bebasNeue } from "../../ui/fonts";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="text-black hover:text-gray-700 transition-colors duration-200 font-medium"
  >
    {children}
  </Link>
);

export default function HomeBar() {
  const navItems = ["Home", "Creator Access", "Reviews", "Community", "Alumni", "About Us"];

  return (
    <nav className={`flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 ${bebasNeue.className}`}>
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        {/* <img
          src="/images/codenexuslogo.png"
          alt="Logo"
          className="h-10 w-auto"
        /> */}
        <span className={`text-2xl text-black ${bebasNeue.className}`}>CODENEXUS</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <NavLink key={item} href={`/${item.toLowerCase().replace(' ', '-')}`}>
            {item}
          </NavLink>
        ))}
      </div>

      <Link
        href="/contact"
        className={`hidden md:flex items-center gap-2 bg-[#227562] hover:bg-[#1b5d4e] text-white px-6 py-3 rounded-full transition-colors duration-200 ${bebasNeue.className}`}
      >
        Explore Courses
        <ArrowRight className="w-4 h-4" />
      </Link>

      <button className="md:hidden text-black" aria-label="Toggle menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </nav>
  );
}

