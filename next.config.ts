import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strongterra-canada-v1772059806.websitepro-cdn.com",
      },
    ],
  },
};

export default nextConfig;
