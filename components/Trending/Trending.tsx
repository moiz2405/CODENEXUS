"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailurl: string;
  description?: string | null;
  path: string;
}

const Trending: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // For theme support
  const [paths, setPaths] = useState<string[]>([]);
  const [pathCourses, setPathCourses] = useState<Map<string, Course | null>>(new Map());

  const fetchTrendingCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data: Course[] = await response.json();

      if (response.ok) {
        setCourses(data);
        const uniquePaths = Array.from(new Set(data.map((course: Course) => course.path)));
        setPaths(uniquePaths);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (err) {
      setError("Failed to fetch trending courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseForPath = async (path: string) => {
    try {
      const response = await fetch(`/api/courses?path=${path}`);
      const data = await response.json();
      return data.length > 0 ? data[0] : null;
    } catch (err) {
      setError("Failed to fetch course for this path");
      return null;
    }
  };

  useEffect(() => {
    fetchTrendingCourses();
  }, []);

  useEffect(() => {
    if (paths.length > 0) {
      const fetchCoursesForPaths = async () => {
        const coursesForPaths = new Map();
        for (const path of paths) {
          const course = await fetchCourseForPath(path);
          coursesForPaths.set(path, course);
        }
        setPathCourses(coursesForPaths);
      };
      fetchCoursesForPaths();
    }
  }, [paths]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-6 p-2 max-w-7xl ml-20">
      <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-blue-900"}`}>
        Trending Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path) => {
          const course = pathCourses.get(path);

          return course ? (
            <div
              key={course.id}
              className={`rounded-lg transition-shadow duration-300 shadow-2xl ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:shadow-xl"
              }`}
            >
              <Image
                className="w-full h-48 object-cover rounded-t-lg"
                src={course.thumbnailurl || "/api/placeholder/400/300"} // Use placeholder if no thumbnail URL
                alt={course.title}
                width={400}
                height={300}
                unoptimized={true}
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {course.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${isDarkMode
                      ? "bg-gray-700 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {course.path}
                  </span>
                </div>
                {course.description && (
                  <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {course.description}
                  </p>
                )}
                <button
                  onClick={() => window.open(course.videoUrl, "_blank")}
                  className={`w-full py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isDarkMode ? "bg-blue-900 text-white hover:bg-blue-900" : "bg-blue-600 text-white hover:bg-blue-900"
                  }`}
                >
                  View Course
                </button>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Trending;
