'use client';

import { usePathname } from "next/navigation";
import HomeBar from '../common/HomeBar';
import PageBar from '../common/PageBar';
import Bottombar from "../common/BottomBar";
import SideBar from "../common/SideBar";
import { useTheme } from "../../context/themecontext"; // Import theme context

const NavbarClient = () => {
  const pathname = usePathname(); // Get the current pathname
  const { isDarkMode } = useTheme(); // Access dark mode state from context

  // Check if we are on the homepage
  const isHomePage = pathname === "/";

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}> {/* Apply dark mode class */}
      {/* Render HomeBar if on the homepage, otherwise PageBar */}
      {isHomePage ? <HomeBar /> : <PageBar />}

      {/* Conditionally render Bottombar or SideBar based on the homepage */}
      {isHomePage ? <Bottombar /> : <SideBar />}
    </div>
  );
};

export default NavbarClient;
