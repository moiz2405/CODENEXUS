// components/courses/TrendingCarousel.tsx
"use client";

import React from "react";
import Slider from "react-slick"; // Make sure to import Slider
import Image from "next/image";
import "slick-carousel/slick/slick.css"; // Add these imports for slick-carousel styles
import "slick-carousel/slick/slick-theme.css"; // Add slick-theme for the carousel styles

interface Course {
  id: string;
  title: string;
  thumbnailUrl: string;
}

const TrendingCarousel: React.FC = () => {
  // Static courses data
  const courses: Course[] = [
    {
      id: "1",
      title: "React for Beginners",
      thumbnailUrl: "https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/frontend/3.jpg",
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      thumbnailUrl: "https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/fullstack/2.jpg",
    },
    {
      id: "3",
      title: "Node.js Mastery",
      thumbnailUrl: "https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/dsa/2.jpg",
    },
    {
      id: "4",
      title: "CSS Flexbox Essentials",
      thumbnailUrl: "https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/devops/2.jpg",
    },
    {
      id: "5",
      title: "TypeScript Deep Dive",
      thumbnailUrl: "https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/backend/3.jpg",
    },
  ];

  const settings = {
    dots: true,  // Show navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,  // Show 1 slide at a time on small screens
    slidesToScroll: 1,
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 3000, // Time in milliseconds before auto-scrolling to the next slide (3 seconds)
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2, // Show 2 slides at a time on medium screens
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 slides at a time on large screens
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {courses.map((course) => (
        <div key={course.id} className="rounded-lg transition-shadow duration-300 bg-white hover:shadow-lg space-y-6 p-2 max-w-7xl ml-20">
          <Image
            className="w-full h-[400px] object-cover rounded-t-lg"
            src={course.thumbnailUrl}
            alt={course.title}
            width={800}
            height={400}
            unoptimized={true}
          />
          

        </div>
      ))}
    </Slider>
  );
};

export default TrendingCarousel;
