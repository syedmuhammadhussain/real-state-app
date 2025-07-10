'use client';


import { ImageCarousel } from '@/components/component/card/ImageCarousel';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ApartmentHeader } from './ApartmentHeader';
import { ApartmentTabs } from './ApartmentTabs';

export default function ApartmentClient({ apartment }) {
  return (
    <div className="px-4 lg:px-0  mt-24 min-h-screen max-w-7xl mx-auto  space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: apartment.city?.name, href: `/${apartment.city?.slug}` },
          { label: apartment.address || apartment.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <ImageCarousel images={apartment.images ?? []} auto className="h-full" />
        </div>
        <div className="lg:col-span-2">
          <ApartmentHeader product={apartment} className="lg:sticky lg:top-6" />
        </div>
      </div>
      
      <div className='mb-9'> 
        <ApartmentTabs
          product={apartment}
          description={apartment.description}
          amenities={apartment.amenities}
          infrastructure={apartment.infrastructures}
        />
      </div>
    </div>

  );
}
