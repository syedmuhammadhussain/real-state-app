'use client';

import React, { useEffect, use as usePromise } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {ImageCarousel} from "@/components/component/card/ImageCarousel";
import { ApartmentHeader } from "./_related/ApartmentHeader";
import { ApartmentTabs } from "./_related/ApartmentTabs";
import { useApartment } from "../../../../../context/ApartmentContext";
import { LoadingState } from "@/components/component/handle-event-loading/HandleEvents";
import { notFound } from "next/navigation";

export default function ApartmentPage(props) {
  // Unwrap the params using use()
  const params = usePromise(props.params);
  const { id } = params;

  const { fetchApartmentById, currentApartment, loading, error } = useApartment();

  useEffect(() => {
    if (id) {
      fetchApartmentById(id);
    }
  }, [id]);

  if (error) {
    return notFound();
  }

  if (loading) return <LoadingState />;

  if (currentApartment !== null) {
    return (
      <div className="mt-5 min-h-screen max-w-7xl mx-auto px-4 space-y-10">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: currentApartment?.city?.name, href: `/${currentApartment.city?.slug}` },
            { label: currentApartment?.address || currentApartment.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <ImageCarousel images={currentApartment.images ?? []} auto className="h-full" />
          </div>
          <div className="lg:col-span-2">
            <ApartmentHeader product={currentApartment} className="lg:sticky lg:top-6" />
          </div>
        </div>

        <ApartmentTabs
          product={currentApartment}
          description={currentApartment.description}
          amenities={currentApartment.amenities}
          infrastructure={currentApartment.infrastructures}
        />
      </div>
    );
  }

  return null;
}



// import { notFound } from 'next/navigation';
// import ApartmentClient from './_related/ApartmentClient';


//   async function getApartment(id) {

//   const api = 'https://lovely-growth-c72512e849.strapiapp.com/api'
//   const url = `${api}/products/${id}?populate[images][populate]=*&populate[owner][populate]=*&populate[district][populate]=*&populate[city][populate][area][fields][0]=name&populate[location][populate]=*&populate[features][populate]=*&populate[kitchens][populate]=*&populate[amenities][populate]=*&populate[infrastructures][populate]=*`;

//   const res = await fetch(url, { cache: 'no-store' });   // true SSR; swap for revalidate if needed
//   if (!res.ok) return null;

//   const { data } = await res.json();

//   return data;
// } 


// /** Optional SEO / Open Graph */

// export async function generateMetadata(
//   { params }: { params: { id: string } },
//   _parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const apartment = await getApartment(params.id);
//   if (!apartment) return {};

//   const title = apartment.title;
//   const description = apartment.description?.slice(0, 160) ?? '';

//   // اختر أول صورة أو صورة افتراضية
//   const ogImage =
//     apartment.images?.[0]?.url
//       ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${apartment.images[0].url}`
//       : '/images/fallback-og.png';

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

// export async function generateMetadata({ params }) {
 
// console.log(params.id, 'params.id in generateMetadata');
//   const apartment = await getApartment(params.id);
//   if (!apartment) return {};
//  return {
//     title: apartment.title,
//     description: apartment.description?.slice(0, 150) ?? '',
//   }; 
// }

// export default async function ApartmentPage({ params }) {
//   const apartment = await getApartment(params.id);
//   if (!apartment) notFound();

//   return <ApartmentClient apartment={apartment} />;
// }
