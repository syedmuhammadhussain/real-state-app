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




//  server side 

// // app/apartment/[id]/page.tsx
// import React from 'react';
// import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
// import ImageCarousel from "@/components/component/card/ImageCarousel";
// import { ApartmentHeader } from "./_related/ApartmentHeader";
// import { ApartmentTabs } from "./_related/ApartmentTabs";
// import { LoadingState } from "@/components/component/handle-event-loading/HandleEvents";
// import { getApartmentById } from '@/lib/utils';

// export default async function ApartmentPage({ params }) {
//   const id = params.id; // الحصول على المعرّف مباشرة من params
//   // const token = localStorage.get('authToken')

//   // جلب بيانات الشقة مباشرة على الخادم
//   const currentApartment = await getApartmentById(id);
  
//   // إذا لم يتم العثور على الشقة، عرض حالة التحميل
//   if (!currentApartment) return <LoadingState />;
  
//   return (
//     <div className="mt-5 min-h-screen mx-auto px-4 space-y-10">
//       <Breadcrumbs
//         items={[
//           { label: "Главная", href: "/" },
//           { 
//             label: currentApartment?.city?.name, 
//             href: `/${currentApartment.city?.slug}` 
//           },
//           { label: currentApartment?.address || currentApartment.title },
//         ]}
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <div className="lg:col-span-2">
//           <ImageCarousel 
//             images={currentApartment.images ?? []} 
//             auto 
//             className="h-full" 
//           />
//         </div>
//         <div className="lg:col-span-2">
//           <ApartmentHeader 
//             product={currentApartment} 
//             className="lg:sticky lg:top-6" 
//           />
//         </div>
//       </div>

//       <ApartmentTabs
//         product={currentApartment}
//         description={currentApartment.description}
//         amenities={currentApartment.amenities}
//         infrastructure={currentApartment.infrastructures}
//       />
//     </div>
//   );
// }