import type { NextConfig } from "next";
const { withNextVideo } = require("next-video/process");

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com", "ik.imagekit.io"],
  },
};

export default withNextVideo(nextConfig);
