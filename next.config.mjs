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
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "shop.bench.com.ph",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      // أضفت النطاقات من 'domains' إلى 'remotePatterns'
    ],
    // حذفت 'domains' لأنها مهملة وتسبب التحذير
  },
  // معالجة الأخطاء بشكل أفضل
  typescript: {
    // IgnoreDevErrors تجاهل أخطاء TypeScript أثناء التطوير
    ignoreBuildErrors: false,
  },
};

export default nextConfig;