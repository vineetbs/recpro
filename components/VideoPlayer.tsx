"use client";
import useFetchData from "@/hooks/useFetchData";
import {
  ArrowLeft,
  ArrowLeftCircle,
  Copy,
  CopyIcon,
  ServerCrash,
} from "lucide-react";
import React from "react";
import { SyncLoader } from "react-spinners";
import PVideo from "./PVideo";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";
import Link from "next/link";

const VideoPlayer = ({ id }: { id: string }) => {
  const videoUrl = `/api/videos/${id}`;
  const { loading, data, error } = useFetchData(videoUrl);
  const videoData = data?.data;

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-78">
          <div>
            <SyncLoader /> <div className="text-gray-800">Loading...</div>
          </div>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-78 gap-2">
        <ServerCrash />
        <div className="text-gray-800">Error while fetching</div>
      </div>
    );
  }
  if (!videoData) {
    return (
      <div className="flex items-center justify-center h-78 gap-2">
        <ServerCrash />
        <div className="text-gray-800">Error while fetching</div>
      </div>
    );
  }

  const createdAt = videoData.createdAt;
  const timeAgo = formatDistanceToNowStrict(new Date(createdAt), {
    addSuffix: true,
  });

  const copyFn = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}/video/${videoData.videoId}`
      );
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Error while copying the url");
    }
  };
  return (
    <div className="items-center">
      <div className="mb-4 -ml-3">
        <Link href="/videos">
          <Button
            variant="ghost"
            className="text-xl text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeftCircle className=" h-6 w-6" />
            Back to all videos
          </Button>
        </Link>
      </div>
      <Toaster position="bottom-right" richColors />
      <div className="w-full md:max-w-xl lg:max-w-screen block md:flex md:pt-8  ">
        <div className="">
          <PVideo videoUrl={videoData.videoUrl} />
        </div>

        <div className=" my-4 w-full p-2 md:pl-8     ">
          <div className="pb-2 border-gray-400 border-b-1 font-semibold text-4xl capitalize">
            {videoData.title}
          </div>
          <div className="py-2">
            <div className="font-semibold text-gray-800 text-shadow-2xs font-sans ">
              Description of the video:
            </div>
            <div className=" leading-relaxed">
              <div className="text-sm pt-2 text-gray-500 ">
                Uploaded {timeAgo}
              </div>
              {videoData.description}
            </div>
            <div className="flex  text-gray-800 my-4 pb-2 border-gray-400 border-b border-t ">
              <div className=" pt-3 ">
                {videoData.userImg ? (
                  <Image
                    src={videoData.userImg}
                    alt="user-img"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/assets/image.png"
                    alt="user-img"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                )}
              </div>

              <div className="flex pt-2 w-full   ">
                <div className="flex justify-start p-2 px-4">
                  <div className="font-semibold">{videoData.username}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-gray-700 border-gray-800 ">
              <Button variant="outline" size="sm" onClick={() => copyFn()}>
                <CopyIcon /> Copy Video Url
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
