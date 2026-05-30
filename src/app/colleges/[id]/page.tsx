import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatPackage } from "@/utils/format";
import StarRating from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import CollegeDetailActions from "./CollegeDetailActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { id } = await params;

  const college = await prisma.college.findUnique({
    where: { id },
    include: { courses: true, reviews: true },
  });

  if (!college) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{college.name}</h1>
            <p className="text-gray-500 mt-1">📍 {college.city}, {college.state}</p>
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={college.rating} />
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                college.type === "Government"
                  ? "bg-green-100 text-green-700"
                  : college.type === "Private"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-purple-100 text-purple-700"
              }`}>
                {college.type}
              </span>
            </div>
          </div>
          <CollegeDetailActions collegeId={college.id} />
        </div>
        <p className="text-gray-600 mt-4 leading-relaxed">{college.description}</p>
        <p className="text-sm text-gray-400 mt-2">Established: {college.establishedYear}</p>
      </div>

      {/* Placement Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Placement Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">{college.placementPercentage}%</p>
            <p className="text-sm text-green-600 mt-1">Placement Rate</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">{formatPackage(college.averagePackage)}</p>
            <p className="text-sm text-blue-600 mt-1">Average Package</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">{formatPackage(college.highestPackage)}</p>
            <p className="text-sm text-purple-600 mt-1">Highest Package</p>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Courses Offered</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-600">Course Name</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Duration</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">Fees</th>
              </tr>
            </thead>
            <tbody>
              {college.courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-gray-800">{course.name}</td>
                  <td className="py-3 px-2 text-gray-600">{course.duration}</td>
                  <td className="py-3 px-2 text-gray-800">{formatCurrency(course.fees)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Student Reviews ({college.reviews.length})
        </h2>
        <div className="space-y-4">
          {college.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
