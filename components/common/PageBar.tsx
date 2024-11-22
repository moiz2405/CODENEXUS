"use client";

import React, { useState } from "react";
import { FaBars, FaSearch, FaBell, FaSun, FaMoon } from "react-icons/fa";
import PathCarousel from "../../components/courses/PathCarousel";
import CourseDisplay from "../../components/courses/CourseDisplay";
import { useTheme } from "../../context/themecontext";

const Pagebar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  return (
    <div style={{ paddingTop: "4rem" }}>
      <nav
        className={`flex justify-between items-center px-4 py-2 fixed top-0 w-full z-10 ${
          isDarkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-800"
        } backdrop-blur-lg bg-opacity-40 border-b ${
          isDarkMode ? "border-gray-600" : "border-gray-200"
        }`}
        style={{
          backdropFilter: "blur(10px)", // Apply blur effect for glassy look
          WebkitBackdropFilter: "blur(10px)", // For Safari compatibility
        }}
      >
        <div className="flex items-center">
          <FaBars size={24} />
          <span className="font-bold ml-2">CodeNexus</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search and Learn"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`p-2 rounded ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
            }`}
          />
          <FaSearch />
        </div>
        <div className="flex items-center space-x-4">
          <FaBell />
          <button onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      <div className="mt-8">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && courses.length > 0 && <CourseDisplay courses={courses} />}
      </div>
    </div>
  );
};

export default Pagebar;
