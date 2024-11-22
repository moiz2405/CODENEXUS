"use client";
import React, { useState, useEffect } from 'react';
import PathCarousel from '../../components/courses/PathCarousel';
import CourseDisplay from '../../components/courses/CourseDisplay';

// Define a type for Course data
interface Course {
  id: string;  // or number, based on your DB schema
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  description?: string | null;
}

const CoursesPage: React.FC = () => {
  const paths = ['Full Stack','Front End','Back End','DevOps','Cybersecurity' ,'DSA', 'AI/ML'];  // Define available paths
  const [selectedPath, setSelectedPath] = useState(paths[0]);  // Default to 'Full Stack'
  const [courses, setCourses] = useState<Course[]>([]);  // Store fetched courses, now typed
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset courses and error whenever the path changes
    setCourses([]);
    setError(null);
    setLoading(true);  // Start loading when path changes

    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/courses?path=${selectedPath}`);
        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data: Course[] = await res.json();  // Explicitly type the response data
        setCourses(data);  // Store the fetched courses
        setLoading(false);  // Stop loading once data is fetched

        if (data.length === 0) {
          setError(`No courses available for the selected path: ${selectedPath}`);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the courses.");
        setLoading(false);  // Stop loading on error
      }
    };

    fetchCourses();
  }, [selectedPath]);  // Re-fetch when path changes

  return (
    <div>
      {/* Path carousel for selecting different learning paths */}
      <PathCarousel paths={paths} onSelectPath={setSelectedPath} />

      {/* Display loading indicator */}
      {loading && <div className="loading-spinner">Loading courses...</div>}

      {/* Display error if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Display courses once fetched */}
      {!loading && !error && courses.length > 0 && (
        <CourseDisplay courses={courses} path={selectedPath} />
      )}

      {/* If no courses found */}
      {!loading && !error && courses.length === 0 && (
        <div className="no-courses-message">No courses available for the selected path.</div>
      )}
    </div>
  );
};

export default CoursesPage;
