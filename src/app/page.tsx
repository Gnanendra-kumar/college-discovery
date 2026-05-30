import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch top 6 colleges by rating from DB
  const featuredColleges = await prisma.college.findMany({
    orderBy: { rating: "desc" },
    take: 6,
  });

  // Fetch stats
  const [collegeCount, courseCount, reviewCount] = await Promise.all([
    prisma.college.count(),
    prisma.course.count(),
    prisma.review.count(),
  ]);

  const stateCount = (await prisma.college.findMany({ distinct: ["state"], select: { state: true } })).length;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="text-indigo-600">College</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Explore {collegeCount}+ colleges across India. Compare fees, placements, and ratings to make the right choice for your future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/colleges"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Browse Colleges →
            </Link>
            <Link
              href="/compare"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Compare Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-indigo-600">{collegeCount}+</p>
            <p className="text-sm text-gray-500 mt-1">Colleges</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-600">{stateCount}</p>
            <p className="text-sm text-gray-500 mt-1">States</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-600">{courseCount}+</p>
            <p className="text-sm text-gray-500 mt-1">Courses</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-600">{reviewCount}+</p>
            <p className="text-sm text-gray-500 mt-1">Reviews</p>
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated Colleges</h2>
          <Link href="/colleges" className="text-indigo-600 hover:underline text-sm font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredColleges.map((college) => (
            <Link key={college.id} href={`/colleges/${college.id}`}>
              <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="h-2 bg-indigo-600 rounded-t-lg -mt-5 -mx-5 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-1">{college.name}</h3>
                <p className="text-sm text-gray-500 mb-3">📍 {college.city}, {college.state}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-500">★ {college.rating}</span>
                  <span className="text-gray-600">{college.placementPercentage}% placement</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to find your college?</h2>
          <p className="text-indigo-100 mb-6">Search, filter, and compare colleges to make an informed decision.</p>
          <Link
            href="/colleges"
            className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
