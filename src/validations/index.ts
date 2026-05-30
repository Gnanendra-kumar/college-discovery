import { z } from "zod";

// Query params for GET /api/colleges
export const collegesQuerySchema = z.object({
  search: z.string().optional().default(""),
  state: z.string().optional().default(""),
  type: z.string().optional().default(""),
  ratingMin: z.coerce.number().min(0).max(5).optional(),
  ratingMax: z.coerce.number().min(0).max(5).optional(),
  feesMin: z.coerce.number().min(0).optional(),
  feesMax: z.coerce.number().min(0).optional(),
  sortBy: z
    .enum(["fees-low", "fees-high", "rating-high", "placement-high", ""])
    .optional()
    .default(""),
  page: z.coerce.number().int().min(1).optional().default(1),
});

// Body for POST /api/bookmarks
export const createBookmarkSchema = z.object({
  collegeId: z.string().min(1, "College ID is required"),
});

// Body for POST /api/comparisons
export const createComparisonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  collegeIds: z
    .array(z.string().min(1))
    .min(2, "At least 2 colleges required")
    .max(3, "Maximum 3 colleges allowed"),
});
