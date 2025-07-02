import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, thumbUrl, videoUrl } = await request.json();
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const video = await prisma.video.create({
      data: {
        title,
        description,
        thumbUrl,
        videoUrl,
        userId: session.user?.id!,
      },
    });
    console.log(video);
    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
