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

const Bottombar: React.FC = () => {
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
    <div className="z-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 flex bg-[#227562] hover:bg-[#1b5d4e] py-2 px-4 rounded-full shadow-lg border space-x-6">
      {sidebarItems.map((item) => (
        <div
          key={item.name}
          className="relative group flex justify-center items-center"
          onMouseEnter={() => setHovered(item.name)}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={item.link}>
            <div
              className={`flex flex-col items-center text-center text-white 
              transform transition-transform duration-300 ease-in-out will-change-transform 
              ${hovered === item.name ? "scale-110 translate-y-[-5px]" : "scale-100 translate-y-0"}`}
            >
              <div className="text-2xl">{item.icon}</div>
            </div>
          </Link>
          {hovered === item.name && (
            <div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 
              bg-[#ffd803] text-[#272343] text-sm px-2 py-1 rounded shadow-lg translate-y-[-10px]"
            >
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bottombar;
