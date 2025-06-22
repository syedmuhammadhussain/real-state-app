"use client";

import React, { useEffect, use as usePromise } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ImageCarousel from "@/components/component/card/ImageCarousel";
import { ApartmentHeader } from "./_related/ApartmentHeader";
import { ApartmentTabs } from "./_related/ApartmentTabs";
import { useApartment } from "../../../../../context/ApartmentContext";
import { LoadingState } from "@/components/component/handle-event-loading/HandleEvents";

export default function ApartmentPage({ params }) {

  /* Unwrap the params promise once */
  const { id } = usePromise(params);

  const { fetchApartmentById, currentApartment, loading } = useApartment();

  /* Fetch data when the ID changes */
  useEffect(() => { if (id) fetchApartmentById(id) }, []);

  /* Loading spinner */
  if (loading) return  <LoadingState/>

  /* Page content */
  if (currentApartment !== null ) return (
    
    // max-w-7xl
    <div className=" mt-5  min-h-screen mx-auto px-4 space-y-10">
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