import prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await prisma.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({
      status: 200,
      massage: "Get posts successfully",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      massage: error.message,
    });
  }
}
