import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@flu-wop/design-system"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
