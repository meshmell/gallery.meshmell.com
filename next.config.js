/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["three"],
  images: {
    domains: ["storage.ko-fi.com", "storage.googleapis.com"],
  },
};

module.exports = {
  output: "standalone",
  reactStrictMode: true,
  ...nextConfig,
};
