/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ← this line disables lint during Vercel builds
  },
};

export default nextConfig;