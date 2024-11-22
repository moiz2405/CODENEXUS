'use client';

import { usePathname } from "next/navigation";
import HomeBar from '../common/HomeBar';
import PageBar from '../common/PageBar';
import Bottombar from "../common/BottomBar";

const NavbarClient = () => {
  const pathname = usePathname();  // Get the current pathname

  // Check if we are on the homepage
  const isHomePage = pathname === "/";

  return (
    <div>
      {isHomePage ? <HomeBar /> : <PageBar />}
      {isHomePage && <Bottombar />} {/* Render BottomBar only on the homepage */}
    </div>
  );
};

export default NavbarClient;
