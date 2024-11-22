"use client";
import React, { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  path: string;
  description: string | null;
}

interface CourseDisplayProps {
  path: string;
  loading: boolean;
  error: string | null;
}

const CourseDisplay: React.FC<CourseDisplayProps> = ({ path, loading, error }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
          const res = await fetch(`/api/courses?path=${path}`);
          if (!res.ok) {
            throw new Error("Failed to fetch courses");
          }

          const data = await res.json();
          console.log('Fetched Courses:', data); // Add this line for debugging
          setCourses(data);
        } catch (err: any) {
          console.error("Error fetching courses:", err);
        }
      };


    if (path) {
      fetchCourses();
    }
  }, [path]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="courses-container">
      {courses.length === 0 ? (
        <p>No courses found for {path}.</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <img
                className="course-thumbnail"
                src={course.thumbnailUrl || 'https://via.placeholder.com/150'}
                alt={course.title}
              />
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <button
                  className="watch-button"
                  onClick={() => window.open(course.videoUrl, "_blank")}
                >
                  Watch
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDisplay;
