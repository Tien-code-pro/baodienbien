/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        hostname: "localhost",
      },
    ],
    // loaderFile: "utils/next-image-config.ts",
    dangerouslyAllowSVG: true,
  },
  compiler: {
    styledComponents: {
      ssr: false,
    },
  },
};

module.exports = nextConfig;
