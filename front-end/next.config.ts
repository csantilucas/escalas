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

  // 🟢 Adiciona a permissão para o IP de rede e localhost não travarem o WebSocket/HMR
  //allowedOrigins: ['192.168.1.9:5004', 'localhost:5004', '192.168.1.9:5005', '192.168.1.27:3000', 'localhost:3000'],
  allowedOrigins: ['192.168.1.9:5004', 'localhost:5004', '192.168.1.9:5005', '192.168.1.27:3000', 'localhost:3000'],
};

export default nextConfig;