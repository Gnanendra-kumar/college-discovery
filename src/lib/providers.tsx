"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { CompareProvider } from "@/hooks/useCompare";
import { BookmarksProvider } from "@/hooks/useBookmarks";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CompareProvider>
        <BookmarksProvider>{children}</BookmarksProvider>
      </CompareProvider>
    </SessionProvider>
  );
}
