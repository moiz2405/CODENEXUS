import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import Image from 'next/image'; // Import Image component from Next.js

interface Course {
    id: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    description?: string | null;
    path: string;
}

interface PathCarouselWithCoursesProps {
    paths: string[];
    selectedPath: string;
    onSelectPath: (path: string) => void;
    courses: Course[];
    loading: boolean;
    error: string | null;
    isDarkMode?: boolean;
}

const PathCarouselWithCourses: React.FC<PathCarouselWithCoursesProps> = ({
    paths,
    selectedPath,
    onSelectPath,
    courses,
    loading,
    error,
    isDarkMode = false
}) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = containerRef.current.clientWidth / 2;
            containerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    return (
        <div className={`w-full max-w-7xl mx-auto ${isDarkMode ? 'bg-[#202020] text-white' : 'bg-#202020 text-black'}`}>
            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Navigation Buttons */}
                {showLeftArrow && (
                    <div className={`absolute left-0 top-0 bottom-0 flex items-center z-30 transition-all duration-300
                        ${isDarkMode ? 'bg-gradient-to-r from-[#202020] to-transparent' : 'bg-gradient-to-r from-white to-transparent'}
                        ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                        <button
                            onClick={() => scroll('left')}
                            className={`group flex items-center justify-center w-12 h-12 ml-2
                                ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
                                rounded-lg transition-colors duration-200`}
                            aria-label="Scroll left"
                        >
                            <ArrowLeftCircle
                                className={`w-8 h-8 transition-colors duration-200
                                    ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                )}

                {showRightArrow && (
                    <div className={`absolute right-0 top-0 bottom-0 flex items-center z-30 transition-all duration-300
                        ${isDarkMode ? 'bg-gradient-to-l from-[#202020] to-transparent' : 'bg-gradient-to-l from-white to-transparent'}
                        ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                        <button
                            onClick={() => scroll('right')}
                            className={`group flex items-center justify-center w-12 h-12 mr-2
                                ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
                                rounded-lg transition-colors duration-200`}
                            aria-label="Scroll right"
                        >
                            <ArrowRightCircle
                                className={`w-8 h-8 transition-colors duration-200
                                    ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                )}

                {/* Path Carousel */}
                <div
                    ref={containerRef}
                    className="overflow-x-auto scrollbar-hide relative px-4 py-3"
                    onScroll={checkScroll}
                >
                    <div className="flex gap-4 overflow-x-auto">
                        <button
                            onClick={() => onSelectPath('')}
                            className={`px-5 py-2 rounded-lg
                                text-sm font-medium whitespace-nowrap
                                transition-all duration-200 ease-out
                                ${!selectedPath
                                    ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white')
                                    : (isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 border border-purple-400 hover:bg-gray-200 hover:text-black')
                                }`}>
                            All Courses
                        </button>
                        {paths.map((path) => (
                            <button
                                key={path}
                                onClick={() => onSelectPath(path)}
                                className={`px-5 py-2 rounded-lg
                                    text-sm font-medium whitespace-nowrap
                                    transition-all duration-200 ease-out
                                    ${isDarkMode
                                        ? (selectedPath === path
                                            ? 'bg-white text-black'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700') // Dark mode: active and hover styles
                                        : (selectedPath === path
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-800 border border-purple-400 hover:bg-gray-200 hover:text-black') // Light mode: active, border, and hover styles
                                    }`}>
                                {path}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Courses Section */}
            <div className="mt-8 px-4">
                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDarkMode ? 'border-white' : 'border-blue-500'}`}></div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-center py-4">{error}</div>
                )}

                {!loading && !error && courses.length === 0 && (
                    <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No courses available {selectedPath && `for ${selectedPath}`} .
                    </p>
                )}

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className={`rounded-lg transition-shadow duration-300 ${isDarkMode
                            ? 'bg-gray-800 hover:bg-gray-700'
                            : 'bg-white hover:shadow-lg border border-gray-300'}`} // Border for light mode
                        >
                            <Image
                                className="w-full h-48 object-cover rounded-t-lg"
                                src={course.thumbnailUrl || '/api/placeholder/400/300'} // Use placeholder if no thumbnail URL
                                alt={course.title}
                                width={400} // Add width and height for Next.js Image optimization
                                height={300}
                                unoptimized={true} // Disable Next.js optimization if the image is from an external source
                            />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {course.title}
                                    </h3>
                                    <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode
                                        ? 'bg-gray-700 text-blue-300'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {course.path}
                                    </span>
                                </div>
                                {course.description && (
                                    <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                        }`}>
                                        {course.description}
                                    </p>
                                )}
                                <button
                                    onClick={() => window.open(course.videoUrl, "_blank")}
                                    className={`w-full py-2 px-4 rounded-lg transition-colors duration-300 ${isDarkMode
                                        ? 'bg-blue-500 text-white hover:bg-blue-400'
                                        : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                                        }`}>
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
