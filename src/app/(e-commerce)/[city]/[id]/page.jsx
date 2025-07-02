
import { notFound } from 'next/navigation';
import ApartmentClient from './_related/ApartmentClient';

async function getApartment(id) {

const api = 'https://lovely-growth-c72512e849.strapiapp.com/api'
const url = `${api}/products/${id}?populate[images][populate]=*&populate[owner][populate]=*&populate[district][populate]=*&populate[city][populate][area][fields][0]=name&populate[location][populate]=*&populate[features][populate]=*&populate[kitchens]    [populate]=*&populate[amenities][populate]=*&populate[infrastructures][populate]=*`;

  const res = await fetch(url, { cache: 'no-store' },
  );  
  if (!res.ok) return null;
  const { data } = await res.json();
  return data;
} 

// export async function generateMetadata({ params }) {
 
// console.log(params.id, 'params.id in generateMetadata');

//   const apartment = await getApartment(params.id);
//   if (!apartment) return {};
//   return {
//     title,
//     description,
//     alternates: { canonical: `/apartments/${params.id}` },
//     openGraph: {
//       type: 'article',
//       locale: 'ru_RU',
//       url: `/apartments/${params.id}`,
//       title,
//       description,
//       siteName: 'RentHub',
//       images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: [ogImage],
//     },
//     robots: { index: true, follow: true },
//   };
// } 

export default async function ApartmentPage({ params }) {
  const apartment = await getApartment(params.id);
  if (!apartment) notFound();
  return <ApartmentClient apartment={apartment} />;
}
