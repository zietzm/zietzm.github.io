import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
