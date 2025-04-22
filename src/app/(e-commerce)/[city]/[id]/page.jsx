import { notFound } from 'next/navigation'
import { products } from '@/constants/data'
import { ApartmentHeader } from './_related/ApartmentHeader'
import { ApartmentTabs } from './_related/ApartmentTabs'
import { BookingCard } from './_related/BookingCard'
import { ImageGallery } from './_related/ImageGallery'
import { KeyFeatures } from './_related/KeyFeatures'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

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
    <div className="mx-auto px-4  space-y-4">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: product?.city , href: `/${product?.city}` },
          { label: `${product?.mapInfo?.district}, ${product?.mapInfo?.address  }`}]}/>
          
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