"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaBook,
  FaChartBar,
  FaStore,
  FaFileAlt,
  FaUserPlus,
} from "react-icons/fa";

const HomeBar: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const sidebarItems = [
    { name: "Home", icon: <FaHome />, link: "/" },
    { name: "Courses", icon: <FaBook />, link: "/courses" },
    { name: "Trending", icon: <FaChartBar />, link: "/trending" },
    { name: "Store", icon: <FaStore />, link: "/store" },
    { name: "Resume", icon: <FaFileAlt />, link: "/resume" },
    { name: "Creator Access", icon: <FaUserPlus />, link: "/creator-access" },
  ];

  return (
    <div className="w-full h-screen bg-[#fffffe] font-sans">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-6 py-4 shadow-md">
        <div className="text-2xl font-bold text-[#272343]">
          <img src={'/images/codenexuslogo.png'} alt="Logo" style={{ height:62, width: 85 }} className="h-8 w-auto" />
        </div>
        <div className="flex space-x-6">
          {["Home", "Creator Access", "Reviews", "Community", "Alumni", "About Us"].map(
            (item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-[#2d334a] hover:text-[#ffd803]"
              >
                {item}
              </Link>
            )
          )}
        </div>
        <button className="bg-[#ffd803] text-[#272343] px-4 py-2 rounded hover:brightness-110">
          Explore Courses
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-10">
        <h1 className="text-4xl font-bold text-[#272343]">
          Your Journey to <span className="text-[#ffd803]">MASTERY</span> Starts HERE!
        </h1>
        <p className="text-[#2d334a] mt-4 text-xl max-w-xl">
        LEARN, GROW, GLOW.
        </p>
        {/* <img
          src="/your-hero-image.jpg" // Replace this with your preferred image
          alt="Hero"
          className="w-96 h-auto mt-8"
        /> */}
        <div className="flex justify-start items-center mt-10">
          <img
            src={'/images/peepcn.png'} // Replace with an OpenPeeps illustration URL
            alt="OpenPeeps Illustration"
            className="w-48 h-auto mt-6 ml-10"
          />
          <button className="bg-[#ffd803] text-[#272343] px-6 py-3 rounded hover:brightness-110 mt-[-300px]">
            Start Learning Now →
          </button>
        </div>
      </div>

      {/* Sidebar at Bottom Center */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-6 bg-[#fffffe] py-2 px-4 rounded-full shadow-lg">
        {sidebarItems.map((item) => (
          <div
            key={item.name}
            className="relative group"
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link href={item.link}>
              <div className="flex flex-col items-center text-center text-[#272343] hover:text-[#ffd803]">
                <div className="text-2xl">{item.icon}</div>
              </div>
            </Link>
            {hovered === item.name && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#ffd803] text-[#272343] text-sm px-2 py-1 rounded shadow-lg">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBar;
