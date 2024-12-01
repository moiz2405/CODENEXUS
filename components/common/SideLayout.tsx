"use client";

import React, { useState } from "react";
import { FaBars, FaSearch, FaBell, FaSun, FaMoon } from "react-icons/fa";
import {
    Home,
    BookOpen,
    TrendingUp,
    FileText,
    Users,
    MessageSquare,
    LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useTheme } from "../../context/themecontext";

// Define NavItemProps interface for prop types
interface NavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    isCollapsed: boolean;
}

const NavItem = ({ href, icon, label, isCollapsed }: NavItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-800/50 transition-colors rounded-lg",
                            isActive && "bg-[#6f7a4b] text-white hover:bg-[#6f7a4b]/90"
                        )}
                    >
                        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
                        {!isCollapsed && <span className="text-lg">{label}</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    );
};

export default function Layout() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navItems = [
        { href: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
        { href: "/courses", icon: <BookOpen className="w-6 h-6" />, label: "Courses" },
        { href: "/trending", icon: <TrendingUp className="w-6 h-6" />, label: "Trending" },
        { href: "/resume", icon: <FileText className="w-6 h-6" />, label: "Resume Builder" },
        { href: "/creator", icon: <Users className="w-6 h-6" />, label: "Creator Access" },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-[5rem] h-screen flex flex-col transition-all duration-300 ease-in-out shadow-lg z-50", // Set top to 5rem to ensure sidebar starts below navbar
                    isCollapsed ? "w-24" : "w-64",
                    isDarkMode ? "bg-[#202020] text-white" : "bg-white text-black"
                )}
            >
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavItem key={item.label} {...item} isCollapsed={isCollapsed} />
                    ))}
                    <NavItem
                        href="/feedback"
                        icon={<MessageSquare className="w-6 h-6" />}
                        label="Send Feedback"
                        isCollapsed={isCollapsed}
                    />
                </nav>

                <div
                    className={cn(
                        "p-3 border-t",
                        isDarkMode ? "border-gray-800" : "border-gray-300"
                    )}
                >
                    <NavItem
                        href="/login"
                        icon={<LogIn className="w-6 h-6" />}
                        label="Login"
                        isCollapsed={isCollapsed}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <nav
                    className={cn(
                        "flex justify-between items-center px-4 py-2 fixed top-0 left-0 z-40 shadow-lg", // Keep navbar fixed with z-100
                        isDarkMode ? "bg-[#202020] text-white" : "bg-white text-black"
                    )}
                    style={{
                        width: "100vw", // Full width
                        height: "5rem", // Navbar height
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    }}
                >
                    <div className="flex items-center">
                        {/* Hamburger Icon */}
                        <FaBars
                            size={24}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="cursor-pointer"
                        />
                        <Link href="/" >
                            <span className="font-bold ml-2">CodeNexus</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2 rounded-lg w-72">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search and Learn"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full p-2 pr-10 rounded-3xl ${isDarkMode ? "bg-[#202020] text-white" : "bg-gray-200 text-black"}`}
                            />
                            <FaSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <FaBell />
                        <button onClick={toggleDarkMode}>
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                </nav>

                {/* Main content starts here */}
                <div className="pt-[5rem]"> {/* Adjusted padding to ensure content starts below navbar */}
                    {/* Your page content */}
                </div>
            </div>
        </div>
    );
}
