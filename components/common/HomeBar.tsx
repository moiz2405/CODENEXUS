import React, { useState } from "react";
import { useTheme } from "../../context/themecontext";

const HomeBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`flex justify-between items-center px-6 py-4 sticky top-0 z-50 backdrop-blur-md ${isDarkMode ? "bg-gradient-to-r from-black to-purple-800 text-white" : "bg-gradient-to-r from-black to-purple-600 text-white"} transition-all duration-300 ease-in-out`}
    >
      <div className="text-2xl font-bold">
        <img src={"/images/codenexuslogo.png"} alt="Logo" style={{ height: 62, width: 85 }} />
      </div>

      {/* Desktop Navigation */}
      <div className="flex space-x-6 hidden md:flex">
        {["Home", "Creator Access", "Reviews", "Community", "Alumni", "About Us"].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className={`text-lg hover:text-yellow-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={handleMobileMenuToggle} className="text-white hover:text-yellow-400 transition-colors">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-80 p-6 md:hidden">
          <div className="flex flex-col items-center">
            {["Home", "Creator Access", "Reviews", "Community", "Alumni", "About Us"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className={`text-lg text-white mb-4 hover:text-yellow-400 transition-colors`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBar;
