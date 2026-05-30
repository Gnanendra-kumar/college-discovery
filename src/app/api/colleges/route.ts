import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { collegesQuerySchema } from "@/validations";
import { Prisma } from "@prisma/client";

const PAGE_SIZE = 12;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query params
    const parsed = collegesQuerySchema.safeParse(
      Object.fromEntries(searchParams.entries())
    );

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { search, state, type, ratingMin, ratingMax, feesMin, feesMax, sortBy, page } =
      parsed.data;

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
    if (ratingMin !== undefined) where.rating = { ...((where.rating as object) || {}), gte: ratingMin };
    if (ratingMax !== undefined) where.rating = { ...((where.rating as object) || {}), lte: ratingMax };
    if (feesMin !== undefined) where.fees = { ...((where.fees as object) || {}), gte: feesMin };
    if (feesMax !== undefined) where.fees = { ...((where.fees as object) || {}), lte: feesMax };

    // Build orderBy
    let orderBy: Prisma.CollegeOrderByWithRelationInput = { rating: "desc" };
    switch (sortBy) {
      case "fees-low":
        orderBy = { fees: "asc" };
        break;
      case "fees-high":
        orderBy = { fees: "desc" };
        break;
      case "rating-high":
        orderBy = { rating: "desc" };
        break;
      case "placement-high":
        orderBy = { placementPercentage: "desc" };
        break;
    }

    // Get total count and paginated results
    const [total, colleges] = await Promise.all([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        orderBy,
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: {
          courses: true,
          reviews: true,
        },
      }),
    ]);

    return NextResponse.json({
      colleges,
      total,
      page,
      totalPages: Math.ceil(total / PAGE_SIZE),
    });
  } catch (error) {
    console.error("GET /api/colleges error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
