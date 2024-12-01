"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bebasNeue } from "../../ui/fonts";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 font-medium"
  >
    {children}
  </Link>
);

export default function HomeBar() {
  const navItems = ["Home", "Creator Access", "Reviews", "Community", "Alumni", "About Us"];

  return (
    <nav
      className={`flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ${bebasNeue.className}`}
    >
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <span className={`text-2xl text-black dark:text-white ${bebasNeue.className}`}>
          CODENEXUS
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <NavLink key={item} href={`/${item.toLowerCase().replace(" ", "-")}`}>
            {item}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/contact"
          className={`hidden md:flex items-center gap-2 bg-[#227562] hover:bg-[#1b5d4e] text-white px-6 py-3 rounded-full transition-colors duration-200 ${bebasNeue.className}`}
        >
          Explore Courses
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <button className="md:hidden text-black dark:text-white" aria-label="Toggle menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}
