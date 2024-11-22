import { Metadata } from "next";
import "./globals.css";
import NavbarClient from '../components/common/NavbarClient';
import { ThemeProvider } from "../context/themecontext"; // Ensure this is imported

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
        <ThemeProvider>
          <NavbarClient />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
