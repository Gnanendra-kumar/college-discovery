export interface College {
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  type: string;
  establishedYear: number;
  fees: number;
  rating: number;
  placementPercentage: number;
  averagePackage: number;
  highestPackage: number;
  image?: string;
  courses: Course[];
  reviews: Review[];
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
}

export interface Bookmark {
  id: string;
  collegeId: string;
}

export interface SavedComparison {
  id: string;
  title: string;
  collegeIds: string[];
  createdAt: string;
}

export interface CollegeFilters {
  search: string;
  state: string;
  type: string;
  ratingMin: number;
  ratingMax: number;
  feesMin: number;
  feesMax: number;
  sortBy: string;
  page: number;
}

export interface PaginatedResponse {
  colleges: College[];
  total: number;
  page: number;
  totalPages: number;
}
