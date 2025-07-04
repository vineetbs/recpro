"use client";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";
import axios from "axios";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

type Video = {
  videoId: number;
  title: string;
  description: string;
  thumbUrl: string | null;
  videoUrl: string;
  createdAt: string;
};

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  const { data, loading, error } = useFetchData("/api/videos");

  return (
    <main className="py-8 sm:mx-16 mx-2 overflow-visible">
      <Header subheading="Public Library" heading="All Videos" />
      <div className="pt-4 flex flex-col-4">
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((card) => (
            <VideoCard {...card} key={card.videoId} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
