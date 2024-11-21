// HomeBar.tsx
"use client";
import React from "react";
import Link from "next/link";

const HomeBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md">
      <div className="text-2xl font-bold text-[#272343]">
        <img
          src={"/images/codenexuslogo.png"}
          alt="Logo"
          style={{ height: 62, width: 85 }}
          className="h-8 w-auto"
        />
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
  );
};

export default HomeBar;
