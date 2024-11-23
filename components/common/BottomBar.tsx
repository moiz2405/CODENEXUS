// Sidebar.tsx
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
    <div className="z-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 
    flex space-x-6 bg-[#202020] py-2 px-4 rounded-full shadow-lg border">
      {sidebarItems.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => setHovered(item.name)}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={item.link}>
            <div className="flex flex-col items-center text-center text-white hover:text-[#ffd803]">
              <div className="text-2xl">{item.icon}</div>
            </div>
          </Link>
          {hovered === item.name && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 
            bg-[#ffd803] text-[#272343] text-sm px-2 py-1 rounded shadow-lg">
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bottombar;
