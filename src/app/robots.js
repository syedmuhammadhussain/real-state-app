
// import { productCategories } from '@/utility/data';

// export default async function sitemap() {
//   const websiteUrl = process.env.NEXT_PUBLIC_JOEY_PUBLIC_URL || 'https://www.joeymed.com';
//   const products = [
//     ...productCategories['weight-loss'].basic,
//     ...productCategories['weight-loss'].gold,
//     ...productCategories['weight-loss'].premium,
//     ...productCategories['sexual-health'].pills,
//     ...productCategories['sexual-health'].Sprays,
//     ...productCategories['sexual-health'].Creams,
//     ...productCategories['wellness'].unisex,
//     // ...productCategories['wellness'].women
//   ];

//   const currentDate = new Date().toISOString();

//   const existProducts = products.map(({ href }) => ({
//     url: `${websiteUrl}${href}`,
//     lastModified: currentDate,
//     changeFrequency: "weekly",
//     priority: 0.9,
//   }));

//   return [
//     {
//       url: `${websiteUrl}/sexual-health`,
//       lastModified: currentDate,
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },
//     {
//       url: `${websiteUrl}/weight-loss`,
//       lastModified: currentDate,
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },
//     {
//       url: `${websiteUrl}/wellness`,
//       lastModified: currentDate,
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },
//     {
//       url: 'https://blog.joeymed.com/',
//       lastModified: currentDate,
//       changeFrequency: "weekly",
//       priority: 0.7,
//     },
//     {
//       url: `${websiteUrl}/about-us`,
//       lastModified: currentDate,
//       changeFrequency: "yearly",
//       priority: 0.7,
//     },
//     {
//       url: `${websiteUrl}/contact-us`,
//       lastModified: currentDate,
//       changeFrequency: "yearly",
//       priority: 0.7,
//     },
//     ...existProducts,
//   ];
// }