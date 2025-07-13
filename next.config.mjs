/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: isGithubPages ? "/portfolio-website/" : "",
  output: "export", // 👈 THIS is now required
};

export default nextConfig;
