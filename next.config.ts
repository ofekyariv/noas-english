import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/noas-english",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
