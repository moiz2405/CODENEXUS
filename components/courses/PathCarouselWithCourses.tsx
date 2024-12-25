"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';

interface Course {
    id: string;
    title: string;
    videoUrl: string;
    thumbnailurl: string;
    description?: string | null;
    path: string;
}

interface PathCarouselWithCoursesProps {
    paths: string[];
    isDarkMode?: boolean;
}

const PathCarouselWithCourses: React.FC<PathCarouselWithCoursesProps> = ({
    paths,
    isDarkMode = false
}) => {
    const [selectedPath, setSelectedPath] = useState('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Path map for quick reference
    const pathMap: Record<string, string> = {
        'Full Stack': 'fullstack',
        'DevOps': 'devops',
        'Web Development': 'web-development',
        'Front End': 'frontend',
        'Back End': 'backend',
        'DSA': 'dsa',
        'Cyber Security': 'cybersecurity',
        'Cloud Computing': 'cloud-computing',
        'AI/ML': 'ai-ml',
    };

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

    useEffect(() => {
        setCourses([]);
        setError(null);
        setLoading(true);

        const fetchCourses = async () => {
            try {
                const url = selectedPath ? `/api/courses?path=${selectedPath}` : '/api/courses';
                const res = await fetch(url);

                if (!res.ok) throw new Error('Failed to fetch courses');

                const data: Course[] = await res.json();
                setCourses(data);
                setLoading(false);

                if (data.length === 0) {
                    setError(`No courses available${selectedPath ? ` for ${selectedPath}` : ''}`);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
                setLoading(false);
            }
        };

        fetchCourses();
    }, [selectedPath]);

    const validPaths = Array.isArray(paths) ? paths : [];
    const validCourses = Array.isArray(courses) ? courses : [];

    const pathButtons = validPaths.map((path) => (
        <button
            key={path}
            onClick={() => setSelectedPath(pathMap[path] || '')}
            className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ease-out ${isDarkMode
                    ? selectedPath === pathMap[path]
                        ? 'bg-white text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : selectedPath === pathMap[path]
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-800 border border-purple-400 hover:bg-gray-200 hover:text-black'
                }`}>
            {path}
        </button>
    ));

    const courseCards = validCourses.map((course) => (
        <div key={course.id} 
        className={`rounded-lg transition-shadow duration-300 ${isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-white hover:shadow-lg border border-gray-300'}`}>
            <Image
                className="w-full h-48 object-cover rounded-t-lg"
                src={course.thumbnailurl || '/api/placeholder/400/300'} 
                alt={course.title}
                width={400}
                height={300}
                unoptimized={true}
            />
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {course.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode
                        ? 'bg-gray-700 text-blue-300 '
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-300'
                        }
                        `}>
                        {course.path}
                    </span>
                </div>
                {course.description && (
                    <p className={`text-sm mb-4 line-clamp-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        {course.description}
                    </p>
                )}
                <div className="flex justify-between items-center">
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
        </div>
        
    ));

    return (
        <div className={`w-full max-w-7xl mx-auto ${isDarkMode ? 'bg-[#202020] text-white' : 'bg-#202020 text-black'}`}>
            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
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

                <div
                    ref={containerRef}
                    className="overflow-x-auto scrollbar-hide relative px-4 py-3"
                    onScroll={checkScroll}
                >
                    <div className="flex gap-4 overflow-x-auto">
                        <button
                            onClick={() => setSelectedPath('')}
                            className={`px-5 py-2 rounded-lg
                                text-sm font-medium whitespace-nowrap
                                transition-all duration-200 ease-out
                                ${!selectedPath
                                    ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white')
                                    : (isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 border border-purple-400 hover:bg-gray-200 hover:text-black')
                                }`}>
                            All Courses
                        </button>
                        {pathButtons}
                    </div>
                </div>
            </div>

            <div className="mt-8 px-4">
                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDarkMode ? 'border-white' : 'border-blue-500'}`}></div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-center py-4">{error}</div>
                )}

                {!loading && !error && validCourses.length === 0 && (
                    <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No courses available {selectedPath && `for ${selectedPath}`} .
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseCards}
                </div>
            </div>
        </div>
    );
};

export default PathCarouselWithCourses;
