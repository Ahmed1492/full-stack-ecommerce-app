/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    loader: "default",
    domains: ["res.cloudinary.com"],

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
        hostname: "res.cloudinary.com",
      },
    ]
  },
};

export default nextConfig;
