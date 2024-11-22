"use client";

import React from "react";
import { useTheme } from "../../context/themecontext";

const HomeBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`flex justify-between items-center px-6 py-4 shadow-md ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <div className="text-2xl font-bold">
        <img src={"/images/codenexuslogo.png"} alt="Logo" style={{ height: 62, width: 85 }} />
      </div>
      <div className="flex space-x-6">
        {["Home", "Creator Access", "Reviews", "Community", "Alumni", "About Us"].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className={`text-lg hover:text-yellow-400 ${isDarkMode ? "text-white" : "text-gray-800"}`}
          >
            {item}
          </a>
        ))}
      </div>
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
