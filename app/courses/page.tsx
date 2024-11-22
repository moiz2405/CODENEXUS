"use client";
import React, { useState, useEffect } from "react";
import PathCarousel from "../../components/courses/PathCarousel";
import CourseDisplay from "../../components/courses/CourseDisplay";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Define a type for Course data
interface Course {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  description?: string | null;
}

const CoursesPage: React.FC = () => {
  const paths = [
    "Full Stack",
    "Front End",
    "Back End",
    "DevOps",
    "Cybersecurity",
    "DSA",
    "AI/ML",
  ];
  const [selectedPath, setSelectedPath] = useState(paths[0]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch courses when the path changes
  useEffect(() => {
    setCourses([]);
    setError(null);
    setLoading(true);

    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/courses?path=${selectedPath}`);
        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data: Course[] = await res.json();
        setCourses(data);
        setLoading(false);

        if (data.length === 0) {
          setError(`No courses available for the selected path: ${selectedPath}`);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedPath]);

  // Toggle light/dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle search bar input
  const handleSearch = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      (event as React.KeyboardEvent).key === "Enter" ||
      (event as React.MouseEvent).type === "click"
    ) {
      console.log("Search Query:", searchQuery);
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#1b1b2f" : "#f4f4f9",
        color: darkMode ? "#ffffff" : "#272343",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          backgroundColor: darkMode ? "#272343" : "#fffffe",
          color: darkMode ? "#ffffff" : "#272343",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          >
            <i
              className="fas fa-bars"
              style={{ fontSize: "1.5rem", color: darkMode ? "#ffd803" : "#272343" }}
            ></i>
          </button>
          <img
            src="/images/codenexuslogo.png"
            alt="Your Logo"
            style={{
              height: "30px",
              marginRight: "0.5rem",
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>CodeNexus</span>
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            flexGrow: 1,
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Search and Learn"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              width: "100%",
              padding: "0.5rem 2.5rem 0.5rem 1rem",
              border: "1px solid",
              borderColor: darkMode ? "#2d334a" : "#ddd",
              borderRadius: "5px",
              fontSize: "1rem",
              outline: "none",
              backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
              color: darkMode ? "#ffffff" : "#272343",
              backdropFilter: "blur(5px)",
            }}
          />
          <i
            className="fas fa-search"
            onClick={handleSearch}
            style={{
              position: "absolute",
              right: "10px",
              fontSize: "1.2rem",
              color: darkMode ? "#ffd803" : "#272343",
              cursor: "pointer",
            }}
          ></i>
        </div>

        {/* User Options */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Notifications */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: "1rem",
              position: "relative",
            }}
          >
            <i
              className="fas fa-bell"
              style={{
                fontSize: "1.5rem",
                color: darkMode ? "#ffd803" : "#ffd803",
              }}
            ></i>
          </button>

          {/* Light/Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          >
            <i
              className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}
              style={{
                fontSize: "1.5rem",
                color: darkMode ? "#ffd803" : "#272343",
              }}
            ></i>
          </button>

          {/* Profile Avatar */}
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <img
              src="/images/avatar.png" // Replace with your profile image path
              alt="Profile"
              style={{
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                marginRight: "0.5rem",
              }}
            />
            <span style={{ fontWeight: "bold", color: darkMode ? "#ffd803" : "#272343" }}>
              Welcome, User
            </span>
          </div>
        </div>
      </nav>

      {/* Path Carousel */}
      <PathCarousel paths={paths} onSelectPath={setSelectedPath} />

      {/* Loading Indicator */}
      {loading && <div className="loading-spinner">Loading courses...</div>}

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Courses Display */}
      {!loading && !error && courses.length > 0 && (
        <CourseDisplay courses={courses} path={selectedPath} />
      )}

      {/* No Courses Message */}
      {!loading && !error && courses.length === 0 && (
        <div className="no-courses-message">No courses available for the selected path.</div>
      )}
    </div>
  );
};

export default CoursesPage;
