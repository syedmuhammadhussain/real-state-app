export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // disallow: ["/terms-conditions", "/risks-benefits"],
      },
    ],
    // sitemap: `${process.env.NEXT_PUBLIC_JOEY_PUBLIC_URL}/sitemap.xml`,
  };
}