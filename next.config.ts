import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'rickandmortyapi.com' }] },
  async rewrites() {
    return [
      {
        source: '/api/character//:path*',
        destination: 'https://rickandmortyapi.com/api/character/:path*',
      },
    ];
  },
};

export default nextConfig;
