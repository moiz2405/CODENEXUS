import React, { useState, useEffect } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';

const PathCarouselWithCourses = ({
  paths,
  selectedPath,
  onSelectPath,
  isDarkMode = false,
}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/courses?path=${selectedPath}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data.courses);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedPath]);

  return (
    <div className={`w-full max-w-7xl mx-auto ${isDarkMode ? 'bg-[#202020] text-white' : 'bg-white text-black'}`}>
      {/* Path Carousel */}
      <div className="overflow-x-auto scrollbar-hide relative px-4 py-3">
        <div className="flex gap-4">
          <button
            onClick={() => onSelectPath('')}
            className={`px-5 py-2 rounded-lg ${
              !selectedPath
                ? isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}>
            All Courses
          </button>
          {paths.map((path) => (
            <button
              key={path}
              onClick={() => onSelectPath(path)}
              className={`px-5 py-2 rounded-lg ${
                selectedPath === path
                  ? isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                  : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}>
              {path}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Section */}
      <div className="mt-8 px-4">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && courses.length === 0 && <p className="text-center">No courses available.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="rounded-lg bg-white hover:shadow-lg">
              <Image
                src={course.thumbnailUrl || '/placeholder.jpg'}
                alt={course.title}
                width={400}
                height={300}
                className="rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.description}</p>
                <button
                  onClick={() => window.open(course.videoUrl, '_blank')}
                  className="w-full py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PathCarouselWithCourses;
