import { colleges } from "./colleges";
import { College, CollegeFilters, PaginatedResponse } from "@/types";

const PAGE_SIZE = 12;

// TODO: Replace with actual API call to GET /api/colleges
export function getColleges(filters: Partial<CollegeFilters>): PaginatedResponse {
  let filtered = [...colleges];

  // Search
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query) ||
        c.state.toLowerCase().includes(query)
    );
  }

  // Filter by state
  if (filters.state) {
    filtered = filtered.filter((c) => c.state === filters.state);
  }

  // Filter by type
  if (filters.type) {
    filtered = filtered.filter((c) => c.type === filters.type);
  }

  // Filter by rating range
  if (filters.ratingMin !== undefined) {
    filtered = filtered.filter((c) => c.rating >= filters.ratingMin!);
  }
  if (filters.ratingMax !== undefined) {
    filtered = filtered.filter((c) => c.rating <= filters.ratingMax!);
  }

  // Filter by fees range
  if (filters.feesMin !== undefined) {
    filtered = filtered.filter((c) => c.fees >= filters.feesMin!);
  }
  if (filters.feesMax !== undefined) {
    filtered = filtered.filter((c) => c.fees <= filters.feesMax!);
  }

  // Sorting
  switch (filters.sortBy) {
    case "fees-low":
      filtered.sort((a, b) => a.fees - b.fees);
      break;
    case "fees-high":
      filtered.sort((a, b) => b.fees - a.fees);
      break;
    case "rating-high":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "placement-high":
      filtered.sort((a, b) => b.placementPercentage - a.placementPercentage);
      break;
    default:
      // Default: sort by rating
      filtered.sort((a, b) => b.rating - a.rating);
  }

  // Pagination
  const page = filters.page || 1;
  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  return { colleges: paged, total, page, totalPages };
}

// TODO: Replace with actual API call to GET /api/colleges/:id
export function getCollegeById(id: string): College | undefined {
  return colleges.find((c) => c.id === id);
}

// TODO: Replace with actual API call to GET /api/colleges?ids=...
export function getCollegesByIds(ids: string[]): College[] {
  return colleges.filter((c) => ids.includes(c.id));
}
