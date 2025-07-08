import { prisma } from "@/lib/prisma";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string[] }> }
): Promise<NextResponse> {
  const params = await context.params;
  const idString = params.id[0];
  const id = parseInt(idString);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid Video Id" }, { status: 400 });
  }

  try {
    const video = await prisma.video.findUnique({ where: { videoId: id } });
    if (!video) {
      return NextResponse.json({ error: "Video Not Found" }, { status: 404 });
    }
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
