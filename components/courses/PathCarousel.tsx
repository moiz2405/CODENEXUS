"use client";
import React, { useState, useEffect } from 'react';

interface PathCarouselProps {
  paths: string[];  // Paths like 'Full Stack', 'DevOps', 'DSA', 'AI/ML'
  onSelectPath: (path: string) => void;
}

const PathCarousel: React.FC<PathCarouselProps> = ({ paths, onSelectPath }) => {
  const [selectedPath, setSelectedPath] = useState<string>(paths[0]);

  // Debugging: log paths and selectedPath to ensure they are being passed and set correctly
  useEffect(() => {
    console.log('Paths:', paths);
    console.log('Selected Path:', selectedPath);
  }, [paths, selectedPath]);

  const handlePathClick = (path: string) => {
    setSelectedPath(path);
    onSelectPath(path); // Notify parent component about the selected path
  };

  return (
    <div className="flex justify-center items-center overflow-x-auto w-4/5 mx-auto my-4">
      <div className="flex justify-evenly items-center space-x-8">
        {paths.map((path) => (
          <div
            key={path}
            onClick={() => handlePathClick(path)}
            className={`px-6 py-3 text-lg cursor-pointer border rounded-md transition-transform duration-300 ${
              selectedPath === path ? 'bg-green-500 text-white' : 'bg-white text-black'
            } hover:bg-gray-100 active:scale-95`}
          >
            {path}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathCarousel;
