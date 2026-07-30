import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rose-app.elevate-bootcamp.cloud',
        pathname: '/**'
      }
    ]
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);