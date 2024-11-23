"use client";
import React, { useState, useEffect } from 'react';
import PathCarouselWithCourses from '../../components/courses/PathCarouselWithCourses';

// Define a type for Course data
interface Course {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  description?: string | null;
}

const CoursesPage: React.FC = () => {
  const paths = ['Full Stack', 'Front End', 'Back End', 'DevOps', 'Cybersecurity', 'DSA', 'AI/ML'];
  const [selectedPath, setSelectedPath] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCourses([]);
    setError(null);
    setLoading(true);

    const fetchCourses = async () => {
      try {
        const url = selectedPath
          ? `/api/courses?path=${selectedPath}`
          : '/api/courses';
        const res = await fetch(url);

        if (!res.ok) throw new Error('Failed to fetch courses');

        const data: Course[] = await res.json();
        setCourses(data);
        setLoading(false);

        if (data.length === 0) {
          setError(`No courses available${selectedPath ? ` for ${selectedPath}` : ''}`);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching the courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedPath]);

  return (
    <div className="w-full px-4 py-8 mx-20">
      <PathCarouselWithCourses
        paths={paths}
        selectedPath={selectedPath}
        onSelectPath={setSelectedPath}
        courses={courses}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default CoursesPage;
