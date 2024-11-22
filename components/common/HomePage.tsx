// Homepage.tsx
import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mt-10">
      <h1 className="text-4xl font-bold  text-purple-500">
        Your Journey to <span className="text-[#ffd803]">MASTERY</span> Starts HERE!
      </h1>
      <p className="text-yellow-300-400 mt-4 text-xl max-w-xl">
        LEARN, GROW, GLOW.
      </p>
      <div className="flex justify-start items-center mt-10">
        <img
          src={"/images/peepcn.png"}
          alt="OpenPeeps Illustration"
          className="w-48 h-auto mt-6 ml-10"
        />
        <button className="bg-[#ffd803] text-purple-700 px-6 py-3 rounded hover:brightness-110 mt-[-300px]">
          Start Learning Now →
        </button>
      </div>
    </div>
  );
};

export default Homepage;
