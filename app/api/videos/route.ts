import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, thumbUrl, videoUrl, visibility } =
    await request.json();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let finalThumb = `${thumbUrl}/ik-thumbnail.jpg`;
  if (!thumbUrl) {
    finalThumb = `${videoUrl}/ik-thumbnail.jpg`;
  }
  let duration = 0;
  // const cleanUrl = videoUrl.split("?")[0];

  // try {
  //   const response = await axios.get("https://api.imagekit.io/v1/metadata", {
  //     params: {
  //       url: cleanUrl,
  //       fields: "duration",
  //     },
  //     auth: {
  //       username: process.env.IMAGEKIT_PRIVATE_KEY!,
  //       password: "",
  //     },
  //   });
  //   if (!response) {
  //     return;
  //   }
  //   if (response || response.data.duration) {
  //     duration = response.data.duration as number;
  //   }
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: "Error fetching the duration" },
  //     { status: 500 }
  //   );
  // }
  try {
    const video = await prisma.video.create({
      data: {
        title,
        description,
        thumbUrl: finalThumb,
        videoUrl,
        visibility,
        username: session?.user?.name!,
        userImg: session?.user?.image,
        duration,
        user: {
          connect: { id: session.user.id },
        },
      },
    });
    console.log(video);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
