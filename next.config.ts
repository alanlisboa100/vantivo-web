import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "frcnaraherfzduyvqqxf.supabase.co" },
      { protocol: "https", hostname: "static.wavespeed.ai" },
      { protocol: "https", hostname: "wavespeed.ai" },
      { protocol: "https", hostname: "cdn.wavespeed.ai" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
