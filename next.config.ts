import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/desk",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;