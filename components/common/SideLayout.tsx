import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaSearch, FaBell, FaSun, FaMoon } from "react-icons/fa";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "../ui/button"; // Assuming a button component
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { Home, BookOpen, TrendingUp, FileText, Users, MessageSquare, LogIn } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../context/themecontext";

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
                            "flex flex-col items-center gap-1 px-2 py-3 hover:bg-gray-800/50 transition-colors rounded-lg",
                            isActive && "bg-[#6f7a4b] text-white hover:bg-[#6f7a4b]/90",
                        )}
                    >
                        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
                        <span
                            className={cn(
                                "text-xs font-bold",
                            )}
                        >
                            {label}
                        </span>
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    );
};

export default function Layout() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { user } = useUser();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const navItems = [
        { href: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
        { href: "/courses", icon: <BookOpen className="w-6 h-6" />, label: "Courses" },
        { href: "/trending", icon: <TrendingUp className="w-6 h-6" />, label: "Trending" },
        // { href: "/resume", icon: <FileText className="w-6 h-6" />, label: "Resume Builder" },
        { href: "/feedback", icon: <MessageSquare className="w-6 h-6" />, label: "Send Feedback" },
        { href: "/creator", icon: <Users className="w-6 h-6" />, label: "Creator Access" },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-[5rem] h-screen flex flex-col transition-all duration-300 ease-in-out shadow-lg z-50",
                    isCollapsed ? "w-24" : "w-60",
                    isDarkMode ? "bg-[#141414] text-white shadow-black" : "bg-[#E3F2FD] text-black shadow-gray-500"

                )}
            >
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavItem key={item.label} {...item} isCollapsed={isCollapsed} />
                    ))}

                </nav>

                <div
                    className={cn(
                        "p-3 border-t",
                        isDarkMode ? "border-gray-800 text-white" : "border-gray-300 text-black",
                    )}
                >

                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <nav
                    className={cn(
                        "flex justify-between items-center px-4 py-2 fixed top-0 left-0 z-40 shadow-md",
                        isDarkMode ? "bg-[#141414] text-white shadow-black" : "bg-[#E3F2FD] text-black shadow-gray-500"
                    )}
                    style={{
                        width: "100vw",
                        height: "5rem",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    }}
                >
                    <div className="flex items-center">
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
                        {user ? (
                            <>
                                {/* User Icon (Profile Picture from Google) */}
                                <Link href="profile/me">
                                    <Image
                                        src={user.picture || "/images/default-avatar.png"}
                                        alt={user.name || "User Profile"}
                                        width={32}
                                        height={32}
                                        className="rounded-full border-2 border-gray-300"
                                    />
                                </Link>
                                {/* Logout Button */}
                                <Button
                                    onClick={() => (window.location.href = "/api/auth/logout")}
                                    className="ml-4"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => (window.location.href = "/api/auth/login")}
                                className="ml-4"
                            >
                                Login
                            </Button>
                        )}
                    </div>


                </nav>

                {/* Main content starts here */}
                <div className="pt-[5rem]">
                    {/* Your page content */}
                </div>
            </div>
        </div>
    );
}
