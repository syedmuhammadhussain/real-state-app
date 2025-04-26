import { notFound } from 'next/navigation'
import { products } from '@/constants/data'
import { ApartmentHeader } from './_related/ApartmentHeader'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import ImageCarousel from '@/components/component/card/ImageCarousel'
import { BookingCard } from './_related/BookingCard'
import { ApartmentTabs } from './_related/ApartmentTabs'

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
    <div className="w-full mx-auto px-4 space-y-10">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: product?.city , href: `/${product?.city}` },
          // //${product?.mapInfo?.district}
          { label: `${product?.mapInfo?.address  }`}]}/> 
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Image Carousel - Takes full width on mobile, 2/3 on desktop */}
              <div className="lg:col-span-2">
                <ImageCarousel 
                  images={product.images} 
                  auto={true}
                  className="h-full"
                />
              </div>
              {/* Apartment Header - Takes full width on mobile, 1/3 on desktop */}
              <div className="lg:col-span-2">
                <ApartmentHeader 
                  product={product}
                  className="lg:sticky lg:top-6" // Optional sticky positioning
                />
              </div>
            </div>

          <ApartmentTabs
            product={product}
            description={product.descriptionShort}
            amenities={product.amenities}
            infrastructure={product.infrastructure}
          />
    </div>
  )
}