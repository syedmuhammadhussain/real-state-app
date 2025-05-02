
"use client";

import { useState } from "react";
import { Wifi, Wind, Heart, BedDouble, Users, MapPin, Building,  Pen, Trash2, Info, WashingMachine ,Bath, Car} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import ImageCarousel from "./ImageCarousel";
import { ContactInfo } from "./ContactInfo";
import NextLink from "@/components/ui/NextLink";

export default function ApartmentCard({ apartment, onEdit, onDelete, showButtonEdit = false }) {
  const [isLiked, setIsLiked] = useState(false);

  const isMobile = useIsMobile()
 // Main amenities to display as icons (only shown if "condition" is true)
 const mainAmenities = [
  { icon: Wifi, condition: apartment.amenities?.includes("Wi-Fi") },
  { icon: Wind, condition: apartment.checkInConditions?.airConditioning },
  {
    icon: WashingMachine,
    condition: apartment.amenities?.includes("Washing machine"),
  },
  {
    icon: Bath,
    condition: apartment.apartmentParameters?.bathroom === "Separate",
  },
  { icon: Car, condition: apartment.apartmentParameters?.parkingAvailable },
].filter((a) => a.condition);
// apartment
  // Contact info fallback
  const contactInfo = {
    phone: apartment.contactInfo?.phone || "+7 (XXX) XXX-XX-XX",
    whatsapp: apartment.contactInfo?.whatsapp || "79123456789",
    hiddenPhone: apartment.contactInfo?.hiddenPhone || "+7••• •••••••",
  };

  // Images (fallback if none provided)
  const images =
    apartment?.images?.length && apartment.images.length > 0
      ? apartment.images
      : [{ url: "/default-apartment.jpg", caption: "Apartment preview" }];

  return (
    <div className="relative  w-full min-h- bg-white  border border-primary-light/50 border-px  rounded-md shadow-sm hover:shadow-md  transition-shadow  duration-300">
    {showButtonEdit ?  
        <div className="absolute top-2 right-2 flex gap-2 ">
          <Button variant="outline" size="icon" onClick={onEdit} className=" p-2 ">
            <Pen className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete} className=" p-2 ">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div> 
        :   
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsLiked((prev) => !prev)}
          className="group absolute top-2 right-2 p-2 rounded-full shadow transition-colors"
      >
        <Heart
          className={`w-6 h-6 ${
            isLiked ? "text-red-500 fill-current" : "text-primary-dark group-hover:text-red-500 group "
          }`}
        />
      </Button> }
      <div className="w-full grid grid-cols-1 lg:grid-cols-3">
        {/* IMAGE SLIDER SECTION */}
        <div className="lg:col-span-1">
          <ImageCarousel images = {images} mainAmenities={mainAmenities} apartment = {apartment} />
        </div>
        <div className="lg:col-span-2">
            {/* DETAILS SECTION */}
            <div className=" w-full  p-4 lg:p-6 flex flex-col justify-between">
            {/* Title & Address */}
            <div>
              <h2 className="text-base md:text-lg font-semibold text-primary-dark mb-1">
                {apartment.title}
              </h2>
              <div className="flex items-center text-sm text-primary-default gap-1.5 flex-wrap">
                <MapPin className="w-4 h-4  " />
                <span className="text-sm md:text-base ">{apartment.mapInfo?.address}</span>
                {apartment.mapInfo?.district && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span>{apartment.mapInfo.district} District</span>
                  </>
                )}
              </div>
            </div>

            {/* Parameters Grid  need to optimize  */}
            {!isMobile &&
              <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <Building className="w-4 h-4 text-primary-default shrink-0 "  />
                {apartment.apartmentParameters?.apartmentType || "Apartment"}
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-smtext-primary-default">
                <Users className="w-4 h-4 text-primary-default  shrink-0" />
                Up to {apartment.apartmentParameters?.maxGuests || 1} guests
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <BedDouble className="w-4 h-4 text-primary-default  shrink-0" />
                {apartment.apartmentParameters?.doubleBeds || 0} double beds
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <span className="text-primary-default  shrink-0">🛏</span>
                {apartment.apartmentParameters?.singleBeds || 0} single beds
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <span className="text-primary-default  shrink-0">📏</span>
                {apartment.apartmentParameters?.area?.total || 0} m²
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
                <span className="text-primary-default  shrink-0">🏗</span>
                {apartment.apartmentParameters?.buildingType || "Modern"}
              </div>
            </div>
            }

            {/* Price & Contact */}
            <div className=" border-t border-gray-100 pt-4 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-primary-default">
                    {apartment?.price} <span className="text-base font-normal text-primary-dark"> / сутки</span>
                  </div>
                  {apartment.checkInConditions?.prepaymentRequired && (
                    <p className="text-sm text-primary-default mt-1">Prepayment required</p>
                  )}
                </div>

                <NextLink href={`/${apartment.city}/${apartment.id}`} 
                className="group flex gap-1  bg-primary-default hover: hover:bg-primary-dark shadow-primary-default/20 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                Подробнее..
                <Info className="h-5 w-5 group-hover:text-green-500"/>
                </NextLink>
              </div>

              {/* Contact Owner */}
              <ContactInfo  contact = {contactInfo}   initialOpen={false}/>
            </div>

            </div>
        </div>
     
      </div>
    </div>
  );
}
