import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.paytowin.cl',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
