import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dd4yykxrb/image/upload/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // You can set this to 2mb, 4mb, 10mb, etc.
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/shop",
        permanent: true, // Set to false for temporary redirect
      },
    ];
  },
};

export default nextConfig;
