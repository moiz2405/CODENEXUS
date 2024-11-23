"use client";
import React from 'react';

interface Course {
  id: string;  // or number, based on your DB schema
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  description?: string | null;
}

interface CourseDisplayProps {
  courses: Course[];
  path: string;
}

const CourseDisplay: React.FC<CourseDisplayProps> = ({ courses, path }) => {
  return (
    <div className="courses-container border border-transparent">
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
