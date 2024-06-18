import prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const res = await prisma.post.delete({
      where: {
        id,
      },
    });

    if (!res) {
      return NextResponse.json({
        status: 404,
        message: "Post not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Delete post successfully",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
