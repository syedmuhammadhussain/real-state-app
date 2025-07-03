
import { notFound } from 'next/navigation';
import ApartmentClient from './_related/ApartmentClient';
import { getApartment } from '@/lib/api';

// seo
export async function generateMetadata({ params }) {
  const apartment = await getApartment(params.id);
  if (!apartment) return {};
  return {
    // title  : apartment.title,
    // description : apartment.description,
    // alternates: { canonical: `/apartments/${params.id}` },
    // openGraph: {
    //   type: 'article',
    //   locale: 'ru_RU',
    //   url: `/apartments/${params.id}`,
    //  title  : apartment.title,
    //   description : apartment.description,
    //   siteName: 'RentHub',
    //   // images: [{ url: apartment?.images.formats.small.url, width: 1200, height: 630, alt: title }],
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title,
    //   description,
    //   images: [ apartment?.images.formats.small.url],
    // },
    // robots: { index: true, follow: true },
  };
} 

export default async function ApartmentPage({ params }) {
  const apartment = await getApartment(params.id);
  if (!apartment) notFound();
  return <ApartmentClient apartment={apartment} />;
}
