import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "frcnaraherfzduyvqqxf.supabase.co" },
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
