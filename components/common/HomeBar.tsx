"use client"; // Ensure the component is treated as client-side

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const HomeBar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); // Initialize router

  // Toggle function for dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Check for saved theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Update theme in localStorage and body class
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Navigate to the Courses page
  const navigateToCourses = () => {
    router.push("/courses"); // Use router.push for navigation
  };

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
            <a
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-[#2d334a] text-lg hover:text-[#ffd803]"
            >
              {item}
            </a>
          )
        )}
      </div>
      <button
        onClick={navigateToCourses} // Trigger navigation to /courses
        className="bg-green-500 text-[#272343] px-4 py-2 rounded-2xl hover:brightness-135"
      >
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
