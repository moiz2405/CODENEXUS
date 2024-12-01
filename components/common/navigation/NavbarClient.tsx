'use client';

import { usePathname } from "next/navigation";
import HomeBar from './HomeBar';
import Bottombar from "./BottomBar";
import { useTheme } from "../../../context/themecontext"; // Import theme context
import Layout from "../SideLayout";
const NavbarClient = () => {
  const pathname = usePathname(); // Get the current pathname
  const { isDarkMode } = useTheme(); // Access dark mode state from context

  // Check if we are on the homepage
  const isHomePage = pathname === "/";

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}> {/* Apply dark mode class */}
      {/* Render HomeBar if on the homepage, otherwise PageBar */}
      {isHomePage ? <HomeBar /> : null}
      {!isHomePage ? <Layout /> : null}

      {/* Conditionally render Bottombar or SideBar based on the homepage */}
      {isHomePage ? <Bottombar /> : null}
    </div>
  );
};

export default NavbarClient;
