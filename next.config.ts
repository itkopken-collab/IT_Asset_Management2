import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  // Exclude favicon from build
  excludeDefaultMomentLocales: false,
};

export default nextConfig;