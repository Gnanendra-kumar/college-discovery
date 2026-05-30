"use client";

import { useRouter, useSearchParams } from "next/navigation";

const allStates = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "West Bengal",
];

const allTypes = ["Government", "Private", "Deemed"];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentState = searchParams.get("state") || "";
  const currentType = searchParams.get("type") || "";
  const currentSort = searchParams.get("sortBy") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/colleges?${params.toString()}`);
  };

  const clearAll = () => {
    router.push("/colleges");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button onClick={clearAll} className="text-sm text-indigo-600 hover:underline">
          Clear all
        </button>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <select
          value={currentSort}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Default (Rating)</option>
          <option value="fees-low">Fees: Low → High</option>
          <option value="fees-high">Fees: High → Low</option>
          <option value="rating-high">Rating: High → Low</option>
          <option value="placement-high">Placement: High → Low</option>
        </select>
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
        <select
          value={currentState}
          onChange={(e) => updateFilter("state", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All States</option>
          {allStates.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">College Type</label>
        <select
          value={currentType}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Types</option>
          {allTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Rating Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={searchParams.get("ratingMin") || "0"}
          onChange={(e) => updateFilter("ratingMin", e.target.value === "0" ? "" : e.target.value)}
          className="w-full accent-indigo-600"
        />
        <span className="text-sm text-gray-500">
          {searchParams.get("ratingMin") || "0"}+ stars
        </span>
      </div>

      {/* Fee Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Fees</label>
        <select
          value={searchParams.get("feesMax") || ""}
          onChange={(e) => updateFilter("feesMax", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Any</option>
          <option value="100000">Under ₹1 Lakh</option>
          <option value="300000">Under ₹3 Lakh</option>
          <option value="500000">Under ₹5 Lakh</option>
          <option value="1000000">Under ₹10 Lakh</option>
        </select>
      </div>
    </div>
  );
}
