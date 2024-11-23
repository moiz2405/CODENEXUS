import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

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
}

const PathCarouselWithCourses: React.FC<PathCarouselWithCoursesProps> = ({
    paths,
    selectedPath,
    onSelectPath,
    courses,
    loading,
    error
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
        <div className="w-full max-w-7xl mx-auto">
            <div
                className="relative w-full rounded-xl overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Navigation Buttons */}
                {showLeftArrow && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 transform
                        ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <button
                            onClick={() => scroll('left')}
                            className="group relative flex items-center justify-center w-10 h-10"
                            aria-label="Scroll left"
                        >
                            <ArrowLeftCircle
                                className="w-8 h-8 text-gray-400 relative z-10 transition-colors duration-200
                                group-hover:text-blue-500"
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                )}

                {showRightArrow && (
                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 transform
                        ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <button
                            onClick={() => scroll('right')}
                            className="group relative flex items-center justify-center w-10 h-10"
                            aria-label="Scroll right"
                        >
                            <ArrowRightCircle
                                className="w-8 h-8 text-gray-400 relative z-10 transition-colors duration-200
                                group-hover:text-blue-500"
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                )}

                {/* Path Carousel */}
                <div
                    ref={containerRef}
                    className="overflow-x-auto scrollbar-hide relative px-2"
                    onScroll={checkScroll}
                >
                    <div className="flex gap-3 px-4 py-4 justify-center">
                        <button
                            onClick={() => onSelectPath('')}
                            className={`relative px-4 py-2 rounded-full
                                text-sm font-medium
                                transition-all duration-300 ease-out
                                transform hover:scale-105 active:scale-95
                                ${!selectedPath
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:from-blue-700 hover:to-blue-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                }
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                            All Courses
                        </button>
                        {paths.map((path) => (
                            <button
                                key={path}
                                onClick={() => onSelectPath(path)}
                                className={`relative px-4 py-2 rounded-full
                                    text-sm font-medium
                                    transition-all duration-300 ease-out
                                    transform hover:scale-105 active:scale-95
                                    ${selectedPath === path
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:from-blue-700 hover:to-blue-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                            >
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
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-center py-4">{error}</div>
                )}

                {!loading && !error && courses.length === 0 && (
                    <p className="text-center text-gray-500">
                        No courses available {selectedPath && `for ${selectedPath}`}.
                    </p>
                )}

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                className="w-full h-48 object-cover rounded-t-lg"
                                src={course.thumbnailUrl || '/api/placeholder/400/300'}
                                alt={course.title}
                            />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        {course.path}
                                    </span>
                                </div>
                                {course.description && (
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                                )}
                                <button
                                    onClick={() => window.open(course.videoUrl, "_blank")}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Watch Course
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