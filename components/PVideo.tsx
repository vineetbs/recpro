"use client";

import React, { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

import type Plyr from "plyr";

const PVideo = ({ videoUrl }: { videoUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      import("plyr").then((PlyrModule) => {
        const Plyr = PlyrModule.default;

        if (!playerRef.current) {
          //@ts-ignore
          playerRef.current = new Plyr(videoRef.current);
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        key={videoUrl}
        className="w-full h-auto"
      />
    </div>
  );
};

export default PVideo;
