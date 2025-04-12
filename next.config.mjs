/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.pexels.com",
        },
        {
          protocol: "https",
          hostname: "images.pinterest.com",
        },
        {
          protocol: "https",
          hostname: "i.pinimg.com", // أضف هذا النطاق
        },
      ],
    },
  };
  
  export default nextConfig;