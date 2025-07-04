import { Star, MapPin, Tally1, Toilet, Square } from 'lucide-react'
import { BookingCard } from './BookingCard'
import { ContactInfo } from '@/components/component/card/ContactInfo'
import {  Users, Building, BedDoubleIcon  } from 'lucide-react'

export const ApartmentHeader = ({ product }) =>{
  const contactInfo = {
    phone: product?.owner?.phone || "+7 (XXX) XXX-XX-XX",
    whatsapp: product?.owner?.phone|| "79123456789",
    hiddenPhone: product.owner?.hiddenPhone || "+7••••••••••",
  };
  // console.log('contactInfo.profile',contactInfo.profile)
  console.log('address',product)

  const apartment ={
      city: product.city.name ??'',
    slug: product.city.slug ?? '',
 region: product.city?.area?.name || "Unknown Region",
    // district
    address: product.address ??'', 
    district: product.district ?  product?.district.name  : '' ,
    metro_station: product.metro_station ? data.metro_station.name : '',
  }
  return (
  <div className="space-y-4">
      <div className='mb-11'>
        <h1 className="text-2xl text-primary-dark">{product.title}</h1>

            {/* addresss  */}
           <div className="flex items-center flex-wrap gap-4 mb-6">
            <div className="flex  items-center gap-1 text-primary-dark">
              <MapPin className="w-5 h-5 text-primary-dark " />
              
               {apartment.region}, {apartment.city}, 
                  {apartment.district },   
                   {apartment.address  ?? ''}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-primary-dark">4.8</span>
              <span className="text-primary-light ">(124 отзыва)</span>
            </div>
          </div>

          {/* description */}
        <p className=" text-sm md:text-md text-primary-dark max-h-[300px] overflow-auto">{product.description}</p>
      </div>
   
    <div className="mx-auto " >

      {/* <KeyFeatures params={product.apartmentParameters} /> */}
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-dark">
                <Building className="w-4 h-4 text-primary-dark shrink-0 "  />
                {product.apartmentParameters?.apartmentType || "Apartment"}
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-dark">
                <Toilet className="w-4 h-4 text-primary-default  shrink-0" />
               {product.bathrooms|| 1} Туалет
              </div>
              {/* <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-dark">
                <BedDoubleIcon className="w-4 h-4 text-primary-dark  shrink-0" />
                {product?.doubleBeds || 0} двуспальные кровати 
              </div> */}
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-dark">
                <span className="text-primary-dark  shrink-0">🛏</span>
                {product?.bedrooms || 0} односпальные кровати
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-dark">
                <span className="text-primary-dark  shrink-0">📏</span>
                {product?.size || 0} м²
              </div>
                 <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-dark">
                {/* <span className="text-primary-dark  shrink-0">📏</span> */}
                <Square className="w-4 h-4 text-primary-dark  shrink-0" />
                {product?.rooms || 0} Комнаты
              </div>
              {/* <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <span className="text-primary-default  shrink-0">🏗</span>
                {product?.protoType || "Apartment"}
              </div> */}
           
              
      </div>
      {/* Contact Owner */}
        {/* Contact Owner */}
        <ContactInfo contact = {contactInfo}   initialOpen={false}/>
        <BookingCard price={product.price} id = {product.id}/>
      </div>
  </div>
)} 