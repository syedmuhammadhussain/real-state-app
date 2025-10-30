import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src"); // ← غيّر "src" إذا كودك في موقع مختلف
    return config;
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_TBANK_TERMINAL_KEY: process.env.NEXT_PUBLIC_TBANK_TERMINAL_KEY,
    NEXT_PUBLIC_TBANK_PASSWORD: process.env.NEXT_PUBLIC_TBANK_PASSWORD,
    NEXT_PUBLIC_TBANK_INIT_ENDPOINT:
      process.env.NEXT_PUBLIC_TBANK_INIT_ENDPOINT,
    NEXT_PUBLIC_TBANK_STATUS_ENDPOINT:
      process.env.NEXT_PUBLIC_TBANK_STATUS_ENDPOINT,
    NEXT_PUBLIC_STRAPI_ADMIN_TOKEN: process.env.NEXT_PUBLIC_STRAPI_ADMIN_TOKEN,
  },
};

export default nextConfig;
