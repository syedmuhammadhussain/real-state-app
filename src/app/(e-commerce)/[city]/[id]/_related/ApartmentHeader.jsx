import { Share2, Heart, Star, MapPin } from 'lucide-react'
import { KeyFeatures } from './KeyFeatures'
import { ApartmentTabs } from './ApartmentTabs'
import { BookingCard } from './BookingCard'
import { ContactInfo } from '@/components/component/card/ContactInfo'
import { Home, Users, BedDouble, Ruler, Building, BedDoubleIcon } from 'lucide-react'

export const ApartmentHeader = ({ product }) =>{
  const contactInfo = {
    phone: product?.phone || "+7 (XXX) XXX-XX-XX",
    whatsapp: product?.phone|| "79123456789",
    hiddenPhone: product.owner?.hiddenPhone || "+7••• •••••••",
  };
   
  console.log('contactInfo.profile',contactInfo.profile)
  return (
  <div className="space-y-4">
    <div className="">
      <div className='mb-11'>
        <h1 className="text-2xl text-primary-dark">{product.title}</h1>
        <p className="text-base text-primary-default w-[80%]">{product.description}</p>
      </div>
    </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1 text-primary-default">
          <MapPin className="w-5 h-5 text-primary-light " />
          <span>{product?.district ?? ''}, {product?.address  ?? ''} </span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-primary-dark">4.8</span>
          <span className="text-primary-light ">(124 отзыва)</span>
        </div>
      </div>
    <div className="mx-auto " >
      {/* <KeyFeatures params={product.apartmentParameters} /> */}
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <Building className="w-4 h-4 text-primary-default shrink-0 "  />
                {product.apartmentParameters?.apartmentType || "Apartment"}
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-smtext-primary-default">
                <Users className="w-4 h-4 text-primary-default  shrink-0" />
                Up to {product.apartmentParameters?.maxGuests || 1} guests
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <BedDoubleIcon className="w-4 h-4 text-primary-default  shrink-0" />
                {product?.doubleBeds || 0} double beds
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <span className="text-primary-default  shrink-0">🛏</span>
                {product?.bedrooms || 0} single beds
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <span className="text-primary-default  shrink-0">📏</span>
                {product?.sizes || 0} m²
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <span className="text-primary-default  shrink-0">🏗</span>
                {product?.protoType || "Modern"}
              </div>
           
              
      </div>
      {/* Contact Owner */}
        {/* Contact Owner */}
        <ContactInfo contact = {contactInfo}   initialOpen={false}/>
        <BookingCard price={product.price} />
      </div>
  </div>
)} 