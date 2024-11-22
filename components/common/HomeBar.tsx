"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const HomeBar: React.FC = () => {
  // State to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // UseEffect to check for saved theme in localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Update theme in localStorage and body class when the theme changes
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md">
      <div className="text-2xl font-bold text-[#272343]">
        <img
          src={"/images/codenexuslogo.png"}
          alt="Logo"
          style={{ height: 62, width: 85 }}
          className="h-8 w-auto"
        />
      </div>
      <div className="flex space-x-6">
        {["Home", "Creator Access", "Reviews", "Community", "Alumni", "About Us"].map(
          (item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-[#2d334a] hover:text-[#ffd803]"
            >
              {item}
            </Link>
          )
        )}
      </div>
      <button className="bg-[#ffd803] text-[#272343] px-4 py-2 rounded hover:brightness-110">
        Explore Courses
      </button>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="ml-4 p-2 rounded bg-gray-300 dark:bg-gray-700 dark:text-white"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default HomeBar;
