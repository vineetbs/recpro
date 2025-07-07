"use client";
import useFetchData from "@/hooks/useFetchData";

import { SyncLoader } from "react-spinners";
import React from "react";
import VideoCard, { IVideoCard } from "./VideoCard";
import { ServerCrash } from "lucide-react";

const VideoList = ({ url }: { url: string }) => {
  const { loading, data, error } = useFetchData(url);
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
        <ServerCrash />{" "}
        <div className="text-gray-800">Error while fetching</div>
      </div>
    );
  }
  if (!videoData || videoData.length === 0) {
    return (
      <div className="flex items-center justify-center h-78 gap-2">
        <ServerCrash /> <div className="text-gray-800">No Videos Found</div>
      </div>
    );
  }

  return (
    <div className="pt-4 px-4 md:px-0 ">
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-full gap-6 ">
        {videoData.map((card: IVideoCard) => (
          <VideoCard {...card} key={card.videoId} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
