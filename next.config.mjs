// next.config.mjs  ✅ استخدم الامتداد mjs (ES Modules)

import path from "path";
import { fileURLToPath } from "url";

// للحصول على __dirname داخل ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //   /* إعدادات الصور البعيدة (Strapi) – عدّلها حسب الحاجة */
  //   images: {
  //     remotePatterns: [
  //       {
  //         protocol: 'https',
  //         hostname: 'supportive-book-28b595a0b7.strapiapp.com',
  //         pathname: '/uploads/**',
  //       },
  //     ],
  //   },

  /* تعريف alias @/ بحيث يشير إلى مجلّد src (أو غيّره للجذر) */
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src"); // ← غيّر "src" إذا كودك في موقع مختلف
    return config;
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
