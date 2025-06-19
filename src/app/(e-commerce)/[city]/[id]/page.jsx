"use client";
import React, { useEffect, useState, use as usePromise } from "react";
import { Loader2 } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ImageCarousel from "@/components/component/card/ImageCarousel";
import { ApartmentHeader } from "./_related/ApartmentHeader";
import { ApartmentTabs } from "./_related/ApartmentTabs";
import { useApartment } from "../../../../../context/ApartmentContext";

export default function ApartmentPage({ params }) {
  /* Unwrap the params promise once */
  const { id } = usePromise(params);

  const { fetchApartmentById, currentApartment, loading } = useApartment();

  const [error, setError] = useState(false);

  /* Fetch data when the ID changes */
  useEffect(() => {
    if (id) fetchApartmentById(id).catch(() => setError(true)) }, []);

  /* Loading spinner */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center py-10 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary-hover" />
      </div>
    );

    console.log('currentApartment',currentApartment)


  /* Page content */
  if (currentApartment !== null ) return (
    <div className=" mt-5 w-full min-h-screen mx-auto px-4 space-y-10">

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

