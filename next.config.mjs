/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com", // ✅ Added Wix Static
      },
    ],
  },
};

export default nextConfig;
