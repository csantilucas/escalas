import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.27",
    "192.168.1.*",
    "192.168.*",
  ],

  images: {
    domains: [],
  },
  
  typescript: {
    ignoreBuildErrors: false, 
  },
};

export default nextConfig;