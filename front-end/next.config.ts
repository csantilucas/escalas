// next.config.js (ou next.config.mjs)
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",

  images: {
    domains: [],
  },
  
  typescript: {
    ignoreBuildErrors: false, 
  },
};

export default nextConfig;