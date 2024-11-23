"use client";
import React from "react";
import { useEffect } from "react";

const Homepage: React.FC = () => {
  useEffect(() => {
    // Trigger animation on load
    const elements = document.querySelectorAll('.animate');
    elements.forEach((el, index) => {
      el.classList.add('animate__fadeIn');
      el.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-800 min-h-screen flex flex-col justify-center items-center text-center py-10">
      {/* Hero Section */}
      <h1 className="text-5xl font-extrabold text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Your Journey to{" "}
        <span className="text-yellow-400 hover:text-white transition duration-300 ease-in-out shadow-lg">
          MASTERY
        </span>{" "}
        Starts HERE!
      </h1>
      <p className="text-yellow-200 mt-4 text-xl max-w-xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
        LEARN, GROW, GLOW. Discover new paths and skill sets with interactive courses.
      </p>

      {/* Hero Section with Image and Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-10 space-y-6 sm:space-y-0 sm:space-x-8">
        <img
          src={"/images/peepcn.png"}
          alt="OpenPeeps Illustration"
          className="w-72 h-auto sm:w-80 transition-transform duration-300 hover:scale-105 shadow-xl animate__animated animate__fadeIn animate__delay-2s"
        />
        <div className="flex flex-col items-center sm:items-start animate__animated animate__fadeIn animate__delay-2s">
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-2xl hover:bg-yellow-500 transform transition duration-300 ease-out mt-6 sm:mt-0 shadow-lg hover:shadow-2xl">
            Start Learning Now →
          </button>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-20 flex flex-col items-center">
        <p className="text-lg text-white mb-6 font-semibold animate__animated animate__fadeIn animate__delay-2s">
          Explore courses across various paths and start your journey today!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-8 animate__animated animate__fadeIn animate__delay-3s">
          {/* Path Cards */}
          {["Full Stack", "Front End", "Back End", "DevOps", "Cybersecurity", "DSA", "AI/ML"].map((path, index) => (
            <div
              key={index}
              className="bg-white text-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2 group"
            >
              <h3 className="text-xl font-semibold mb-3 text-center">{path}</h3>
              <p className="text-gray-700 text-center mb-4">
                {path === "Full Stack"
                  ? "Master the skills of both frontend and backend development."
                  : path === "Front End"
                    ? "Focus on building interactive, user-friendly web applications."
                    : path === "Back End"
                      ? "Dive deep into server-side technologies and database management."
                      : path === "DevOps"
                        ? "Learn how to automate, integrate, and manage applications in cloud environments."
                        : path === "Cybersecurity"
                          ? "Gain expertise in securing networks, systems, and applications."
                          : path === "DSA"
                            ? "Strengthen your problem-solving skills with data structures and algorithms."
                            : "Dive into Artificial Intelligence and Machine Learning to build smarter systems."}
              </p>
              <button className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600 transition duration-200 w-full group-hover:scale-110 group-hover:translate-x-2 group-hover:shadow-2xl">
                Explore Path
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-black text-white text-center py-4 mt-20 w-full">
        <p className="text-sm">&copy; 2024 Skill Development Platform | All Rights Reserved</p>
        <div className="mt-4">
          <a href="#" className="text-yellow-400 hover:text-white mx-4 transition duration-300">About Us</a>
          <a href="#" className="text-yellow-400 hover:text-white mx-4 transition duration-300">Contact</a>
          <a href="#" className="text-yellow-400 hover:text-white mx-4 transition duration-300">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
