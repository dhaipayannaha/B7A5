import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    // Remove CaseSensitiveModulesPlugin to avoid duplicate module errors
    // caused by mixed casing of the project path on Windows
    // (C:\projects\M27-nextjs vs C:\projects\m27-nextjs)
    config.plugins = config.plugins?.filter(
      (p: { constructor: { name: string } }) =>
        p?.constructor?.name !== "CaseSensitiveModulesPlugin"
    );
    return config;
  },
};

export default nextConfig;
