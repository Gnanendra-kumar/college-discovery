"use client";

import { useCompare } from "@/hooks/useCompare";
import { useBookmarks } from "@/hooks/useBookmarks";

interface Props {
  collegeId: string;
}

export default function CollegeDetailActions({ collegeId }: Props) {
  const { addToCompare, removeFromCompare, isInCompare, compareIds } = useCompare();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const inCompare = isInCompare(collegeId);
  const bookmarked = isBookmarked(collegeId);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => bookmarked ? removeBookmark(collegeId) : addBookmark(collegeId)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          bookmarked
            ? "bg-red-50 text-red-600 border border-red-200"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {bookmarked ? "❤️ Saved" : "🤍 Save"}
      </button>
      <button
        onClick={() => inCompare ? removeFromCompare(collegeId) : addToCompare(collegeId)}
        disabled={!inCompare && compareIds.length >= 3}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          inCompare
            ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
            : compareIds.length >= 3
            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {inCompare ? "✓ In Compare" : "⚖️ Compare"}
      </button>
    </div>
  );
}
