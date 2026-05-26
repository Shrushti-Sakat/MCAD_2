import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['10.63.120.199', '192.168.43.137', '10.139.37.199'],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mcadsolution.in" }],
        destination: "https://mcadsolution.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
