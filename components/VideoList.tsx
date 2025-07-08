"use client";
import useFetchData from "@/hooks/useFetchData";

import { SyncLoader } from "react-spinners";
import React, { useEffect, useMemo, useState } from "react";
import VideoCard, { IVideoCard } from "./VideoCard";
import { Frown, SearchIcon, ServerCrash } from "lucide-react";
import FilterComponent from "./FilterComponent";

const VideoList = ({ url }: { url: string }) => {
  const { loading, data, error } = useFetchData(url);
  const videoData = data?.data;
  const [filteredVideos, setfilteredVideos] = useState<IVideoCard[]>([]);
  const [query, setQuery] = useState("");
  const [sortOrder, setsortOrder] = useState("newest");

  useEffect(() => {
    if (videoData) {
      setfilteredVideos(videoData);
    }
  }, [videoData]);

  const processedVideos = useMemo(() => {
    let videosToProcess: IVideoCard[] = videoData || [];
    if (query) {
      videosToProcess = videosToProcess.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return [...videosToProcess].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (sortOrder === "oldest") {
        return dateA - dateB;
      }
      return dateB - dateA;
    });
  }, [videoData, query, sortOrder]);

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

  if (!filteredVideos || filteredVideos.length === 0) {
    return (
      <div className="flex items-center justify-center h-78 gap-2">
        <ServerCrash /> <div className="text-gray-800">No Videos Found</div>
      </div>
    );
  }

  return (
    <div className="pt-4 px-4 md:px-0 ">
      <div className=" justify-around mt-4 col-span-5 relative block sm:flex  overflow-visible">
        <div className="flex px-4 py-2 border border-gray-400 rounded-3xl grid-cols-3 w-60 md:w-120 h-10 ">
          <div className="text-gray-600 pr-2">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search for videos.."
            className="w-full h-full outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="ml-auto grid-cols-2">
          <div className="">
            <FilterComponent
              newSort={() => setsortOrder("newest")}
              oldSort={() => setsortOrder("oldest")}
            />
          </div>
        </div>
      </div>
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-full gap-6 ">
        {processedVideos.length > 0 ? (
          processedVideos.map((card: IVideoCard) => (
            <VideoCard {...card} key={card.videoId} />
          ))
        ) : (
          <div className="flex items-center justify-center  w-full gap-2 col-span-full pt-24 ">
            <Frown /> <div className="text-gray-800">No Videos Found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
