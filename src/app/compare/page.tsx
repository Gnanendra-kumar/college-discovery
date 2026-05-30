"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCompare } from "@/hooks/useCompare";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useSession } from "next-auth/react";
import ComparisonTable from "@/components/ComparisonTable";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";
import { College } from "@/types";

function CompareContent() {
  const searchParams = useSearchParams();
  const { compareIds } = useCompare();
  const { saveComparison } = useBookmarks();
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  // Use IDs from URL if provided, else from context
  const idsParam = searchParams.get("ids");
  const ids = idsParam ? idsParam.split(",") : compareIds;

  // Fetch colleges from API
  useEffect(() => {
    if (ids.length === 0) {
      setColleges([]);
      setLoading(false);
      return;
    }

    const fetchColleges = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          ids.map((id) => fetch(`/api/colleges/${id}`).then((r) => r.ok ? r.json() : null))
        );
        setColleges(results.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [ids.join(",")]);

  const handleSave = () => {
    if (!session?.user) {
      alert("Please login to save comparisons.");
      return;
    }
    if (colleges.length < 2) return;
    const title = colleges.map((c) => c.name.split(",")[0]).join(" vs ");
    saveComparison(title, ids);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-gray-400">
        Loading comparison...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compare Colleges</h1>
        {colleges.length >= 2 && (
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              saved
                ? "bg-green-100 text-green-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {saved ? "✓ Saved!" : "Save Comparison"}
          </button>
        )}
      </div>

      {colleges.length === 0 ? (
        <EmptyState
          title="No colleges selected"
          description="Go to the colleges page and click the compare button on college cards to add them here."
          icon="⚖️"
        />
      ) : colleges.length === 1 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Select at least 2 colleges to compare.</p>
          <Link href="/colleges" className="text-indigo-600 hover:underline">
            Browse Colleges →
          </Link>
        </div>
      ) : (
        <ComparisonTable colleges={colleges} />
      )}

      {colleges.length > 0 && colleges.length < 3 && (
        <div className="mt-6 text-center">
          <Link href="/colleges" className="text-indigo-600 hover:underline text-sm">
            + Add more colleges to compare (max 3)
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-400">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
