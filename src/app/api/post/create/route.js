import prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  const data = await request.formData();
  const coverImage = data.get("image");

  if (!coverImage) {
    return NextResponse.json({
      status: 400,
      message: "Image is required",
    });
  }

  const byteCover = await coverImage.arrayBuffer();
  const bufferCover = Buffer.from(byteCover);

  await writeFile(
    path.join(process.cwd(), `./public/images/${coverImage.name}`),
    bufferCover
  );

  try {
    const res = await prisma.post.create({
      data: {
        title: data.get("title"),
        description: data.get("description"),
        image: coverImage.name,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Create post successfully",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
