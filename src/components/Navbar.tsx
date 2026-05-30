"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCompare } from "@/hooks/useCompare";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { compareIds } = useCompare();
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-600">🎓 CollegeFind</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/colleges" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Colleges
            </Link>
            <Link href="/compare" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
              Compare
              {compareIds.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {compareIds.length}
                </span>
              )}
            </Link>
            <Link href="/dashboard/saved" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Saved
            </Link>

            {session?.user ? (
              <div className="flex items-center gap-3">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700">{session.user.name?.split(" ")[0]}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link href="/colleges" className="block text-gray-600 hover:text-indigo-600" onClick={() => setMobileOpen(false)}>
              Colleges
            </Link>
            <Link href="/compare" className="block text-gray-600 hover:text-indigo-600" onClick={() => setMobileOpen(false)}>
              Compare {compareIds.length > 0 && `(${compareIds.length})`}
            </Link>
            <Link href="/dashboard/saved" className="block text-gray-600 hover:text-indigo-600" onClick={() => setMobileOpen(false)}>
              Saved
            </Link>
            {session?.user ? (
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="block w-full text-left text-red-500"
              >
                Logout ({session.user.name?.split(" ")[0]})
              </button>
            ) : (
              <Link
                href="/login"
                className="block bg-indigo-600 text-white px-4 py-2 rounded-lg text-center hover:bg-indigo-700"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
