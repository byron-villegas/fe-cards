import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.wizards.com',
        port: '',
        pathname: '/**',
        search: ''
      }
    ]
  }
};

export default nextConfig;
