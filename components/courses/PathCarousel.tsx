"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

interface PathCarouselProps {
  paths: string[];
  onSelectPath: (path: string) => void;
}

const PathCarousel: React.FC<PathCarouselProps> = ({ paths, onSelectPath }) => {
  const [selectedPath, setSelectedPath] = useState<string>(paths[0]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePathClick = (path: string) => {
    setSelectedPath(path);
    onSelectPath(path);
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

  return (
    <div
      className="border border-transparent relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Left Navigation Button */}
      {showLeftArrow && (
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 transform
            ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        >
          <button
            onClick={() => scroll('left')}
            className="group relative flex items-center justify-center w-10 h-10"
            aria-label="Scroll left"
          >
            <span className="absolute inset-0 bg-white/90 rounded-full shadow-lg transform transition-all duration-200
              group-hover:scale-110 group-active:scale-95" />
            <ArrowLeftCircle
              className="w-8 h-8 text-gray-400 relative z-10 transition-colors duration-200
                group-hover:text-blue-500"
              strokeWidth={1.5}
            />
          </button>
        </div>
      )}

      {/* Right Navigation Button */}
      {showRightArrow && (
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 transform
            ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
        >
          <button
            onClick={() => scroll('right')}
            className="group relative flex items-center justify-center w-10 h-10"
            aria-label="Scroll right"
          >
            <span className="absolute inset-0 bg-white/90 rounded-full shadow-lg transform transition-all duration-200
              group-hover:scale-110 group-active:scale-95" />
            <ArrowRightCircle
              className="w-8 h-8 text-gray-400 relative z-10 transition-colors duration-200
                group-hover:text-blue-500"
              strokeWidth={1.5}
            />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide relative px-2"
        onScroll={checkScroll}
      >
        <div className="flex gap-3 px-4 py-4 justify-center">
          {paths.map((path) => (
            <button
              key={path}
              onClick={() => handlePathClick(path)}
              className={`relative px-4 py-2 rounded-full
                text-sm font-medium
                transition-all duration-300 ease-out
                transform hover:scale-105 active:scale-95
                ${selectedPath === path
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:from-blue-700 hover:to-blue-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
            >
              {path}
            </button>
          ))}
        </div>

        {/* Gradient Shadows */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white via-white to-transparent pointer-events-none" />
        )}
        {showRightArrow && (
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white via-white to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default PathCarousel;
