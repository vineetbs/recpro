"use client";
import useFetchData from "@/hooks/useFetchData";
// import { Video } from "@imagekit/next";
import { ServerCrash } from "lucide-react";
import React from "react";
import { SyncLoader } from "react-spinners";
import Video from "next-video";

const VideoPlayer = ({ id }: { id: string }) => {
  const videoUrl = `/api/videos/${id}`;
  const { loading, data, error } = useFetchData(videoUrl);

  //   console.log(data);

  const videoData = data?.data;

  console.log(videoData);

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
  return (
    <div>
      <div className="w-full  content-center">
        <Video src={videoData.videoUrl} />
      </div>
    </div>
  );
};

export default VideoPlayer;
