"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { SavedComparison } from "@/types";

interface BookmarkEntry {
  id: string;
  collegeId: string;
}

interface BookmarksContextType {
  bookmarkedIds: string[];
  addBookmark: (collegeId: string) => void;
  removeBookmark: (collegeId: string) => void;
  isBookmarked: (collegeId: string) => boolean;
  savedComparisons: SavedComparison[];
  saveComparison: (title: string, collegeIds: string[]) => void;
  removeComparison: (id: string) => void;
  loading: boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);
  const [loading, setLoading] = useState(false);

  const bookmarkedIds = bookmarks.map((b) => b.collegeId);

  // Fetch bookmarks and comparisons when user logs in
  useEffect(() => {
    if (!session?.user) {
      setBookmarks([]);
      setSavedComparisons([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [bookmarksRes, comparisonsRes] = await Promise.all([
          fetch("/api/bookmarks"),
          fetch("/api/comparisons"),
        ]);

        if (bookmarksRes.ok) {
          const data = await bookmarksRes.json();
          setBookmarks(data.map((b: { id: string; collegeId: string }) => ({
            id: b.id,
            collegeId: b.collegeId,
          })));
        }

        if (comparisonsRes.ok) {
          const data = await comparisonsRes.json();
          setSavedComparisons(data);
        }
      } catch (error) {
        console.error("Failed to fetch bookmarks/comparisons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  const addBookmark = useCallback(async (collegeId: string) => {
    if (!session?.user) return;

    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    setBookmarks((prev) => [...prev, { id: tempId, collegeId }]);

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });

      if (res.ok) {
        const bookmark = await res.json();
        setBookmarks((prev) =>
          prev.map((b) => (b.id === tempId ? { id: bookmark.id, collegeId: bookmark.collegeId } : b))
        );
      } else {
        // Rollback
        setBookmarks((prev) => prev.filter((b) => b.id !== tempId));
      }
    } catch {
      setBookmarks((prev) => prev.filter((b) => b.id !== tempId));
    }
  }, [session]);

  const removeBookmark = useCallback(async (collegeId: string) => {
    if (!session?.user) return;

    const bookmark = bookmarks.find((b) => b.collegeId === collegeId);
    if (!bookmark) return;

    // Optimistic update
    setBookmarks((prev) => prev.filter((b) => b.collegeId !== collegeId));

    try {
      const res = await fetch(`/api/bookmarks/${bookmark.id}`, { method: "DELETE" });
      if (!res.ok) {
        // Rollback
        setBookmarks((prev) => [...prev, bookmark]);
      }
    } catch {
      setBookmarks((prev) => [...prev, bookmark]);
    }
  }, [session, bookmarks]);

  const isBookmarked = useCallback(
    (collegeId: string) => bookmarkedIds.includes(collegeId),
    [bookmarkedIds]
  );

  const saveComparison = useCallback(async (title: string, collegeIds: string[]) => {
    if (!session?.user) return;

    try {
      const res = await fetch("/api/comparisons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, collegeIds }),
      });

      if (res.ok) {
        const comparison = await res.json();
        setSavedComparisons((prev) => [comparison, ...prev]);
      }
    } catch (error) {
      console.error("Failed to save comparison:", error);
    }
  }, [session]);

  const removeComparison = useCallback(async (id: string) => {
    // Optimistic update
    const removed = savedComparisons.find((c) => c.id === id);
    setSavedComparisons((prev) => prev.filter((c) => c.id !== id));

    // Note: No DELETE /api/comparisons/:id endpoint exists yet,
    // so this is client-side only for now.
    // If the API is added later, uncomment:
    // try {
    //   await fetch(`/api/comparisons/${id}`, { method: "DELETE" });
    // } catch {
    //   if (removed) setSavedComparisons((prev) => [...prev, removed]);
    // }
  }, [savedComparisons]);

  return (
    <BookmarksContext.Provider
      value={{ bookmarkedIds, addBookmark, removeBookmark, isBookmarked, savedComparisons, saveComparison, removeComparison, loading }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) throw new Error("useBookmarks must be used within BookmarksProvider");
  return context;
}
