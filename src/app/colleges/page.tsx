import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import CollegeCard from "@/components/CollegeCard";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import { ListingSkeleton } from "@/components/Skeleton";

const PAGE_SIZE = 12;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CollegesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const search = params.search || "";
  const state = params.state || "";
  const type = params.type || "";
  const ratingMin = params.ratingMin ? Number(params.ratingMin) : undefined;
  const feesMax = params.feesMax ? Number(params.feesMax) : undefined;
  const sortBy = params.sortBy || "";
  const page = params.page ? Number(params.page) : 1;

  // Build where clause
  const where: Prisma.CollegeWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { state: { contains: search, mode: "insensitive" } },
    ];
  }
  if (state) where.state = state;
  if (type) where.type = type;
  if (ratingMin !== undefined) where.rating = { gte: ratingMin };
  if (feesMax !== undefined) where.fees = { lte: feesMax };

  // Build orderBy
  let orderBy: Prisma.CollegeOrderByWithRelationInput = { rating: "desc" };
  switch (sortBy) {
    case "fees-low": orderBy = { fees: "asc" }; break;
    case "fees-high": orderBy = { fees: "desc" }; break;
    case "rating-high": orderBy = { rating: "desc" }; break;
    case "placement-high": orderBy = { placementPercentage: "desc" }; break;
  }

  const [total, colleges] = await Promise.all([
    prisma.college.count({ where }),
    prisma.college.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { courses: true, reviews: true },
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Explore Colleges</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <Suspense>
            <FilterSidebar />
          </Suspense>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Showing {colleges.length} of {total} colleges
          </p>

          {colleges.length === 0 ? (
            <EmptyState
              title="No colleges found"
              description="Try adjusting your filters or search query."
              icon="🔍"
            />
          ) : (
            <Suspense fallback={<ListingSkeleton />}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            </Suspense>
          )}

          <Suspense>
            <Pagination currentPage={page} totalPages={totalPages} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
