export async function GET() {
  const baseUrl = 'https://kvkey.com';

  // You can fetch this from DB or filesystem in real app
  const staticPages = ['', '/about', '/contact', '/premium', '/faq'];
  const dynamicCities = ['moskva', 'sochi', 'kazan', 'spb']; // <- replace with real slugs

  const urls = [
    ...staticPages.map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    ),
    ...dynamicCities.map(
      (slug) => `
  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
