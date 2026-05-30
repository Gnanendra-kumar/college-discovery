import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CompareFloatingBar from "@/components/CompareFloatingBar";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollegeFind - Discover Your Perfect College",
  description: "Search, compare, and save colleges across India. Find the right fit for your education.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="pb-20">{children}</main>
          <CompareFloatingBar />
        </Providers>
      </body>
    </html>
  );
}
