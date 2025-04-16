// src/app/(e-commerce)/[city]/[id]/page.jsx
import { notFound } from 'next/navigation'
import { products } from '@/constants/data'
import { ApartmentHeader } from './ApartmentHeader'
import { ApartmentTabs } from './ApartmentTabs'
import { BookingCard } from './BookingCard'
import { BreadcrumbNav } from './BreadcrumbNav'
import { ImageGallery } from './ImageGallery'
import { KeyFeatures } from './KeyFeatures'

export async function generateStaticParams() {
  return products.map(product => ({
    city: product.city,
    id: product.id.toString()
  }))
}

export default function ApartmentPage({ params }) {
  const product = products.find(p => p.id.toString() === params.id)
  if (!product) return notFound()

  return (
    <div className="mx-auto px-4 py-8">
      <BreadcrumbNav product={product} />
      
      <ImageGallery images={product.images} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ApartmentHeader product={product} />
          
          <KeyFeatures params={product.apartmentParameters} />
          
          <ApartmentTabs
            product={product}
            description={product.descriptionShort}
            amenities={product.amenities}
            infrastructure={product.infrastructure}
          />
        </div>

        <BookingCard price={product.pricePerNight} />
      </div>
    </div>
  )
}