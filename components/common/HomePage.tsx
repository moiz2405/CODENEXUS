"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { bebasNeue } from "../ui/fonts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Code, Layout, Server, Cloud, Shield, Brain, BrainCircuit } from "lucide-react";
import { useTheme } from "../../context/themecontext"; 

const pathData = [
  {
    title: "Full Stack",
    description: "Master both frontend and backend development for complete web applications.",
    icon: Code,
    color: "text-blue-500",
    difficulty: "Beginner",
  },
  {
    title: "Back End",
    description: "Build robust server-side applications and efficient databases.",
    icon: Server,
    color: "text-yellow-500",
    difficulty: "Advanced",
  },
  {
    title: "DevOps",
    description: "Streamline development processes and optimize deployment pipelines.",
    icon: Cloud,
    color: "text-purple-500",
    difficulty: "Expert",
  },
  {
    title: "Cybersecurity",
    description: "Protect digital assets and secure networks against cyber threats.",
    icon: Shield,
    color: "text-red-500",
    difficulty: "Advanced",
  },
  {
    title: "DSA",
    description: "Master algorithms and data structures for efficient problem-solving.",
    icon: Brain,
    color: "text-indigo-500",
    difficulty: "Intermediate",
  },
  {
    title: "AI/ML",
    description: "Develop intelligent systems and machine learning models.",
    icon: BrainCircuit,
    color: "text-pink-500",
    difficulty: "Expert",
  },
];

const HomePage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme(); 
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);

  const filteredPaths = activeFilter
    ? pathData.filter(path => path.difficulty.toLowerCase() === activeFilter.toLowerCase())
    : pathData;

  const difficultyFilters = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div className={`min-h-screen flex flex-col ${bebasNeue.className} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <main className="flex flex-col items-center text-center mt-10 flex-grow px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#227562]">
          Your Journey to <span className="text-[#6f7a4b]">MASTERY</span> Starts HERE!
        </h1>
        <p className="text-[#2d334a] mt-4 text-xl md:text-2xl max-w-2xl">
          LEARN, GROW, GLOW. Discover your path to success in tech.
        </p>
       

        <div className="flex flex-col md:flex-row justify-center items-center mt-10 w-full max-w-4xl">
          <div className="flex justify-center md:ml-10">
            <Image
              src="/images/peepcn.png"
              alt="OpenPeeps Illustration"
              width={192}
              height={192}
              className="w-48 h-auto mt-6 md:mt-0"
            />
          </div>
          <div className="flex justify-center md:ml-10 md:-mt-72">
            <Link
              href="/courses"
              className="bg-[#6f7a4b] text-white px-6 py-3 rounded hover:brightness-110 transition-all duration-300 inline-block"
            >
              Start Learning Now →
            </Link>
          </div>
        </div>

        <section className="mt-20 w-full max-w-7xl px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#227562]">Explore Learning Paths</h2>
            <p className="text-[#2d334a] mt-4 text-xl max-w-3xl mx-auto text-center">
              Embark on a journey of knowledge and skill acquisition. Choose your path and start your ascent to tech mastery today!
            </p>
          </div>

          {/* Difficulty Filter Buttons */}
          <div className="flex justify-center mb-8 space-x-4">
            {difficultyFilters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                className={`${
                  activeFilter === filter
                    ? 'bg-[#1b5d4e] text-white'
                    : 'bg-[#6f7a4b] text-[#ffd803] border-[#227562] hover:bg-[#227562] hover:text-white'
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPaths.map((path, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all duration-300 
                  hover:shadow-xl hover:scale-105 border-2 border-[#227562]/10 
                  bg-white group"
              >
                <CardHeader className="pb-4 relative">
                  {/* Difficulty Tag */}
                  <div className="absolute top-4 right-4 text-sm text-[#2d334a]/70">
                    <span className={`${
                      path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      path.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                      path.difficulty === 'Advanced' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    } px-2 py-1 rounded-full text-xs`}>
                      {path.difficulty}
                    </span>
                  </div>
                  <div className={`${path.color} mb-4 flex justify-center`}>
                    <path.icon
                      size={40}
                      strokeWidth={1.5}
                      className="group-hover:rotate-12 transition-transform"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#227562] text-center">
                    {path.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-[#2d334a] text-base">
                    {path.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-[#6f7a4b] hover:bg-[#227562]/10 
                      border-[#227562]/20 text-white hover:text-[#227562]/80"
                  >
                    <Link href={`/courses/${path.title.toLowerCase().replace(' ', '-')}`}>
                      Explore Path <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#227562] text-white text-center py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-lg mb-4">&copy; 2024 CodeNexus | Empowering the Next Generation of Tech Innovators</p>
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="hover:text-[#ffd803]">About</Link>
            <Link href="/contact" className="hover:text-[#ffd803]">Contact</Link>
            <Link href="/terms" className="hover:text-[#ffd803]">Terms & Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
