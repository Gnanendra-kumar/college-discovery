"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useBookmarks } from "@/hooks/useBookmarks";
import CollegeCard from "@/components/CollegeCard";
import EmptyState from "@/components/EmptyState";
import { ListingSkeleton } from "@/components/Skeleton";
import { College } from "@/types";

export default function SavedPage() {
  const { data: session, status } = useSession();
  const { bookmarkedIds, savedComparisons, removeComparison, loading: bookmarksLoading } = useBookmarks();
  const [savedColleges, setSavedColleges] = useState<College[]>([]);
  const [loadingColleges, setLoadingColleges] = useState(false);

  // Fetch full college data for bookmarked IDs
  useEffect(() => {
    if (bookmarkedIds.length === 0) {
      setSavedColleges([]);
      return;
    }

    const fetchColleges = async () => {
      setLoadingColleges(true);
      try {
        const results = await Promise.all(
          bookmarkedIds.map((id) =>
            fetch(`/api/colleges/${id}`).then((r) => (r.ok ? r.json() : null))
          )
        );
        setSavedColleges(results.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch saved colleges:", error);
      } finally {
        setLoadingColleges(false);
      }
    };

    fetchColleges();
  }, [bookmarkedIds]);

  // Not logged in
  if (status === "loading" || bookmarksLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
        <ListingSkeleton />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <EmptyState
          title="Login required"
          description="Please sign in to view your saved colleges and comparisons."
          icon="🔒"
        />
        <div className="text-center mt-4">
          <Link href="/login" className="text-indigo-600 hover:underline font-medium">
            Go to Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Saved Items</h1>

      {/* Saved Colleges */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Saved Colleges ({savedColleges.length})
        </h2>
        {loadingColleges ? (
          <ListingSkeleton />
        ) : savedColleges.length === 0 ? (
          <EmptyState
            title="No saved colleges"
            description="Browse colleges and click the heart icon to save them here."
            icon="❤️"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </section>

      {/* Saved Comparisons */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Saved Comparisons ({savedComparisons.length})
        </h2>
        {savedComparisons.length === 0 ? (
          <EmptyState
            title="No saved comparisons"
            description="Compare colleges and save the comparison to access it later."
            icon="⚖️"
          />
        ) : (
          <div className="space-y-3">
            {savedComparisons.map((comp) => (
              <div
                key={comp.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <Link
                    href={`/compare?ids=${comp.collegeIds.join(",")}`}
                    className="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {comp.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {comp.collegeIds.length} colleges • Saved on{" "}
                    {new Date(comp.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/compare?ids=${comp.collegeIds.join(",")}`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => removeComparison(comp.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
