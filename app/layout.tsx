import { Metadata } from "next";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import "./globals.css";
import NavbarClient from '../components/common/navigation/NavbarClient';
import { ThemeProvider } from "../context/themecontext"; 


export const metadata = {
  title: "CodeNexus",
  description: "AI Skill Development Platform Tailored for You",
  openGraph: {
    title: "CodeNexus",
    description: "AI Skill Development Platform Tailored for You",
    images: [
      {
        url: "/path/to/your-image.jpg", // Relative path
        width: 800,
        height: 600,
        alt: "CodeNexus AI Skill Development",
      },
    ],
  },
  metadataBase: new URL("https://code-nexus-delta.vercel.app/"), // Replace with your deployed URL
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Wrapping the entire layout with SessionProvider to manage session */}
        <SessionProviderWrapper>
          <ThemeProvider>
            <NavbarClient />
            {children}
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
