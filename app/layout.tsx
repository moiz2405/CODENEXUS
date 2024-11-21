import { Metadata } from "next";
import "./globals.css";
import NavbarClient from '../components/common/NavbarClient';
import sidebar from './dashboard/page';
import BottomBar from '../components/common/BottomBar';

export const metadata: Metadata = {
  title: "CodeNexus",
  description: "AI Skill Development Platform Tailored for You",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarClient />
        {children}
        <BottomBar />   
      </body>
    </html>
  );
}
