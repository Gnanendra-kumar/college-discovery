"use client";

import Link from "next/link";
import { College } from "@/types";
import { formatCurrency, formatPackage } from "@/utils/format";
import { useCompare } from "@/hooks/useCompare";
import { useBookmarks } from "@/hooks/useBookmarks";
import StarRating from "./StarRating";

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, compareIds } = useCompare();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const inCompare = isInCompare(college.id);
  const bookmarked = isBookmarked(college.id);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Top color bar */}
      <div className="h-2 bg-indigo-600" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <Link href={`/colleges/${college.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors truncate">
                {college.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              📍 {college.city}, {college.state}
            </p>
          </div>
          <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
            college.type === "Government"
              ? "bg-green-100 text-green-700"
              : college.type === "Private"
              ? "bg-blue-100 text-blue-700"
              : "bg-purple-100 text-purple-700"
          }`}>
            {college.type}
          </span>
        </div>

        {/* Rating */}
        <StarRating rating={college.rating} size="sm" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div>
            <p className="text-gray-500">Annual Fees</p>
            <p className="font-semibold text-gray-800">{formatCurrency(college.fees)}</p>
          </div>
          <div>
            <p className="text-gray-500">Placement</p>
            <p className="font-semibold text-gray-800">{college.placementPercentage}%</p>
          </div>
          <div>
            <p className="text-gray-500">Avg Package</p>
            <p className="font-semibold text-gray-800">{formatPackage(college.averagePackage)}</p>
          </div>
          <div>
            <p className="text-gray-500">Highest Package</p>
            <p className="font-semibold text-gray-800">{formatPackage(college.highestPackage)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <Link
            href={`/colleges/${college.id}`}
            className="flex-1 text-center py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => bookmarked ? removeBookmark(college.id) : addBookmark(college.id)}
            className={`p-2 rounded-lg border transition-colors ${
              bookmarked
                ? "bg-red-50 border-red-200 text-red-500"
                : "border-gray-200 text-gray-400 hover:text-red-500"
            }`}
            title={bookmarked ? "Remove bookmark" : "Save college"}
          >
            {bookmarked ? "❤️" : "🤍"}
          </button>
          <button
            onClick={() => inCompare ? removeFromCompare(college.id) : addToCompare(college.id)}
            disabled={!inCompare && compareIds.length >= 3}
            className={`p-2 rounded-lg border transition-colors ${
              inCompare
                ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                : compareIds.length >= 3
                ? "border-gray-100 text-gray-300 cursor-not-allowed"
                : "border-gray-200 text-gray-400 hover:text-indigo-600"
            }`}
            title={inCompare ? "Remove from compare" : compareIds.length >= 3 ? "Max 3 colleges" : "Add to compare"}
          >
            ⚖️
          </button>
        </div>
      </div>
    </div>
  );
}
