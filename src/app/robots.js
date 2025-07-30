
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // disallow: ["/terms-conditions", "/risks-benefits"],
      },
    ],
    sitemap:'https://kvkey.ru/sitemap.xml',
  };
}
