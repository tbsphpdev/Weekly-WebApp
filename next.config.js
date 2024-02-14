/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactDevOverlay: false,
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
