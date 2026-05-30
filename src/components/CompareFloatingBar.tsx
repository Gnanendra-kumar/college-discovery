"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCompare } from "@/hooks/useCompare";

interface CollegeBasic {
  id: string;
  name: string;
}

export default function CompareFloatingBar() {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const [colleges, setColleges] = useState<CollegeBasic[]>([]);

  // Fetch college names for display
  useEffect(() => {
    if (compareIds.length === 0) {
      setColleges([]);
      return;
    }

    const fetchNames = async () => {
      try {
        const results = await Promise.all(
          compareIds.map((id) =>
            fetch(`/api/colleges/${id}`).then((r) => (r.ok ? r.json() : null))
          )
        );
        setColleges(
          results
            .filter(Boolean)
            .map((c: { id: string; name: string }) => ({ id: c.id, name: c.name }))
        );
      } catch {
        // Fallback: show IDs
        setColleges(compareIds.map((id) => ({ id, name: id })));
      }
    };

    fetchNames();
  }, [compareIds]);

  if (compareIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-600">Compare:</span>
          {colleges.map((c) => (
            <span key={c.id} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
              {c.name.length > 25 ? c.name.slice(0, 25) + "..." : c.name}
              <button onClick={() => removeFromCompare(c.id)} className="ml-1 hover:text-red-500">✕</button>
            </span>
          ))}
          <span className="text-xs text-gray-400">({compareIds.length}/3)</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearCompare} className="text-sm text-gray-500 hover:text-gray-700">
            Clear
          </button>
          <Link
            href={`/compare?ids=${compareIds.join(",")}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Compare Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
