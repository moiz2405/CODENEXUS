"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use for App Router (Next.js 13+)
import {
  Home,
  BookOpen,
  TrendingUp,
  Gift,
  FileText,
  Users,
  MessageSquare,
  LogIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ href, icon, label, isCollapsed }: NavItemProps) => {
  const pathname = usePathname(); // Replaces useRouter().pathname in App Router

  const isActive = pathname === href; // Check active route

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 transition-colors rounded-lg",
              isActive && "bg-[#6f7a4b] text-white hover:bg-[#6f7a4b]/90"
            )}
          >
            {/* Consistent Icon Size */}
            <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
            {!isCollapsed && <span className="text-lg">{label}</span>}
          </Link>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { href: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { href: "/courses", icon: <BookOpen className="w-6 h-6" />, label: "Courses" },
    { href: "/trending", icon: <TrendingUp className="w-6 h-6" />, label: "Trending" },
    { href: "/resume", icon: <FileText className="w-6 h-6" />, label: "Resume Builder" },
    { href: "/creator", icon: <Users className="w-6 h-6" />, label: "Creator Access" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#1a1a1a] text-white flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-24" : "w-64",
        "mt-16" // Adds space below the navbar (adjust as necessary)
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle sidebar"
        aria-expanded={!isCollapsed}
        className="absolute -right-4 top-4 bg-[#1a1a1a] text-white hover:bg-gray-800 rounded-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} isCollapsed={isCollapsed} />
        ))}

        {/* Additional Sections */}
        <NavItem
          href="/feedback"
          icon={<MessageSquare className="w-6 h-6" />}
          label="Send Feedback"
          isCollapsed={isCollapsed}
        />

        {!isCollapsed && (
          <div className="mt-6">
            <h3 className="text-gray-400 px-4 mb-2 text-sm">Popular Creators</h3>
          </div>
        )}
        <NavItem
          href="/creator/CodeNexus"
          icon={
            <div className="w-6 h-6 rounded-full bg-[#6f7a4b] flex items-center justify-center">
              <span className="text-xs font-bold">C</span>
            </div>
          }
          label="CodeNexus"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/creator/almoiz"
          icon={
            <div className="w-6 h-6 rounded-full bg-[#227562] flex items-center justify-center">
              <span className="text-xs font-bold">A</span>
            </div>
          }
          label="Almoiz Khan"
          isCollapsed={isCollapsed}
        />
      </nav>

      {/* Footer (Login Button) */}
      <div className="p-3 border-t border-gray-800">
        <NavItem
          href="/login"
          icon={<LogIn className="w-6 h-6" />}
          label="Login"
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
}
