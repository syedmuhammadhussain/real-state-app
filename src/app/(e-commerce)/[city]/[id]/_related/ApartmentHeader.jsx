import { BookingCard } from './BookingCard'
import { ContactInfo } from '@/components/component/card/ContactInfo'
import { Param } from "@/components/ui/Param";
import { Users, MapPin, BedDouble, Building, Bath, Star,House, SquareDashedBottom , Radius } from "lucide-react";

export const ApartmentHeader = ({ product }) =>{

  const contactInfo = {
    phone: product?.owner?.phone || "+7 (XXX) XXX-XX-XX",
    whatsapp: product?.owner?.phone|| "79123456789",
    hiddenPhone: product.owner?.hiddenPhone || "+7••••••••••",
  };

  return (
  <div className="space-y-4">
      <div className='mb-11'>
        <h1 className="text-2xl text-primary-dark">{product.title}</h1>
        
            {/* addresss  */}
           <div className="flex items-center flex-wrap gap-4 mb-6">
            <div className=" gap-1 text-primary-dark flex md:items-center">
              <MapPin className="w-5 h-5 text-primary-dark " />
              <span className='text-sm md:text-md'>
                  {product.city?.area?.name || "Unknown Region"}, {product.city.name ??''}, 
                {product.district ?  product?.district.name  : '' },   
                {product.metro_station ?  product?.metro_station.name  : '' },   
                { product.address ??''}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm md:text-md font-semibold text-primary-dark">4.8</span>
              <span className=" text-sm md:text-md text-primary-dark ">(124 отзыва)</span>
            </div>
          </div>

          {/* description */}
        <p className=" text-sm md:text-md text-primary-dark max-h-[300px] overflow-auto">{product.description}</p>
      </div>
   
    <div className="mx-auto " >

      {/* <KeyFeatures params={product.apartmentParameters} /> */}
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
          <Param icon={ product.propertyType === 'APARTMENT'  ? Building :  House} label={product.propertyType} />
          <Param icon={Users} label={`Up to ${product.bedrooms * 2}`} />
          <Param icon={BedDouble} label={`${product.bedrooms} bedrooms`} />
          <Param icon={Bath} label={`${product.bathrooms} bathrooms`} />
          <Param  icon = {Radius} label={`${product?.size} m²`} />
          <Param icon={SquareDashedBottom} label={product?.rooms} />
      </div>
      {/* Contact Owner */}
        {/* Contact Owner */}
        <ContactInfo contact = {contactInfo}   initialOpen={false}/>
        <BookingCard price={product.price} id = {product.id}/>
      </div>
  </div>
)} 