"use client";

import { useState } from "react";
import { Wifi, Wind, BedDouble, Users, MapPin, Building, Pen, Trash2, WashingMachine, Bath, Car, 
  Info, UtensilsCrossed, Coffee, Tv, Fan, Snowflake,  Star, StarIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageCarousel from "./ImageCarousel";
import { ContactInfo } from "./ContactInfo";
import NextLink from "@/components/ui/NextLink";
import { useIsMobile } from "@/hooks/use-mobile";
import ReklamaPaymentDialog from "../dialog-popups/ReklamaPaymentDialog";
import { DeleteDialog } from "../dialog-popups/DeleteDialog";
import { useApartment } from "../../../../context/ApartmentContext";

export default function ApartmentCard({ data, onEdit,  showButtonEdit = false , city=''}) {
  const [isOpen, setIsOpen] = useState(false); 
  const [isOpenDelete, setIsOpenDelete] = useState(false); 

  const isMobile = useIsMobile();

  const { loading , deleteApartment, handlePositionByCity , loadingPosition } = useApartment();
  
  const openDeleteDialog = () => setIsOpenDelete(true);
  
  const handleDelete = async (documentId) => { await deleteApartment(documentId); }

  const dedup = (arr) => Array.from(new Set(arr));
  
  const apartment = {
    title: data.title ,
    price: data.price,
    documentId: data.documentId,
    region: data.city?.area?.name || "Unknown Region",
    city: data.city.name,
    // district
    address: data.address , 
    district: data.district ?  data.district.name  : '',
    metro_station: data.metro_station ? data.metro_station.name : '',
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    apartmentParameters: {
      apartmentType: data.propertyType,
      area: {
        total: data.size,
      },
      buildingType: "Modern",
      maxGuests: data.bedrooms * 2,
      doubleBeds: Math.floor(data.bedrooms / 2),
      singleBeds: Math.ceil(data.bedrooms / 2),
      parkingAvailable: true,
    },
    checkInConditions: {
      airConditioning: data.amenities?.some((a) => a.name === "Air Conditioner"),
      prepaymentRequired: true,
    },
    extras: dedup([
      ...(data.kitchens?.map((k) => k.name) || []),
      ...(data.features?.map((f) => f.name) || []),
      ...(data.amenities?.map((a) => a.name) || []),
    ]),
    contactInfo: {
      phone: data.owner?.phone || "",
      whatsapp: data.owner?.phone || "",
      hiddenPhone: "+9••• •••••••",
    },
    images:
      (data.images || []).map((img) => ({
        url: img.formats?.medium?.url || img.formats?.small?.url || img.url,
        caption: img.name,
      })) || [{ url: "/default-villa.jpg", caption: "Villa preview" }],
  };

  /* --------------------------- ICON MAP FOR EXTRAS -------------------------- */
  const extraIconMap = {
    "Wi-Fi": Wifi,
    "WiFi": Wifi,
    "Air Conditioner": Snowflake,
    "Cable TV": Tv,
    "TV": Tv,
    Dishwasher: WashingMachine,
    "Washing machine": WashingMachine,
    "Coffee Machine": Coffee,
    "Coffee Maker": Coffee,
    Fan: Fan,
  };

  const getExtraIcon = (name) => extraIconMap[name] || UtensilsCrossed;

  /* ------------------------------ ICON HELPERS ------------------------------ */
  const mainAmenities = [
    { icon: Wifi, condition: apartment.extras.includes("Wi-Fi") || apartment.extras.includes("WiFi") },
    { icon: Wind, condition: apartment.checkInConditions.airConditioning },
    { icon: WashingMachine, condition: apartment.extras.includes("Washing machine") || apartment.extras.includes("Dishwasher") },
    { icon: Bath, condition: apartment.bathrooms > 0 },
    { icon: Car, condition: apartment.apartmentParameters.parkingAvailable },
  ].filter((a) => a.condition);


  const images = apartment.images.length > 0 ? apartment.images : [{ url: "/default-apartment.jpg", caption: "Apartment preview" }];

  const handlePosition = async () =>{
    await setIsOpen(true)
    // alert (data?.city.id)
  // console.log('data', data?.city.id)
 await handlePositionByCity(data?.city.id)
    // await handlePositionByCity(data?.city.id)
  }


  /* ---------------------------------- JSX ---------------------------------- */
  return (
    <div className="relative w-full bg-white border border-primary-light/50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* EDIT / LIKE BUTTONS */}
      {showButtonEdit ? (
        <div className="absolute top-2 right-2 z-50 ">
          <div className="w-full flex gap-2 center">
            <Button variant="secondary"  size="md" className="flex items-center b px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group" onClick={handlePosition} >
                  <StarIcon className="w-5 h-5 mr-3  text-yellow-500 group-hover:text-yellow-600" />
                  <span className="flex items-center text-white group-hover:text-yellow-600 text-sm gap-2">
                   Рекламировать
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      PRO
                    </span>
                  </span>
             </Button>
          <Button variant="outline" size="md" onClick={onEdit} >
            <Pen className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={openDeleteDialog} >
            <Trash2 className="h-4 w-4" />
          </Button>
         
         </div>
        </div>
      ) : (

        data?.sequence_order && 
        <Button
          size="sm"
          variant="ghost"
          // onClick={() => setIsLiked((prev) => !prev)}
          className="group absolute top-2 right-2 p-2   rounded-full shadow transition-colors"
        >
          <Star  className={`w-6 h-6 " text-base text-secondary-default `} />
        </Button>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-3">
        {/* IMAGE SLIDER */}
        <div className="lg:col-span-1">
          <ImageCarousel images={images} mainAmenities={mainAmenities} apartment={apartment} />
        </div>

        {/* DETAILS */}
        <div className="lg:col-span-2">
          <div className="w-full pt-2 px-2 lg:pt-4 lg:px-4 flex flex-col justify-between md:gap-4">
            {/* Title & Address */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-primary-dark mb-1 truncate" >
                {apartment.title}
              </h2>
              <div className="flex items-center text-sm text-primary-default gap-1.5 flex-wrap">
                <MapPin className="w-4 h-4" />
                <span> {apartment.region}, {apartment.city}, 
                  {apartment.district },   
                   {apartment.address  ?? ''} </span>
              </div>
            </div>

            {/* Core parameters grid */}
            {!isMobile && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Param icon={Building} label={apartment.apartmentParameters.apartmentType || "Apartment"} />
                <Param icon={Users} label={`Up to ${apartment.apartmentParameters.maxGuests}`} />
                <Param icon={BedDouble} label={`${apartment.bedrooms} bedrooms`} />
                <Param icon={Bath} label={`${apartment.bathrooms} bathrooms`} />
                <Param label={`${apartment.apartmentParameters.area.total} m²`} />
                <Param label={apartment.apartmentParameters.buildingType} />
              </div>
            )}

            {/* Features / Kitchen list */}
            {!isMobile &&  apartment.extras.length > 0 && (
              <ul className="flex flex-wrap gap-2 text-xs mt-2">
                {apartment.extras.slice(0, 8).map((item, idx) => {
                  const IconCmp = getExtraIcon(item);
                  return (
                    <li
                      key={`${item}-${idx}`}
                      className="flex items-center gap-1 bg-primary-light/20 text-primary-dark px-2 py-1 rounded-full truncate"
                    >
                      <IconCmp className="h-3 w-3" />
                      <span>{item}</span>
                    </li>
                  );
                })}
                {apartment.extras.length > 8 && (
                  <li className="text-primary-default">+{apartment.extras.length - 8} more</li>
                )}
              </ul>
            )}

            {/* Price & CTA */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t border-gray-100 pt-4">
              <div>
                <p className="text-2xl font-bold text-primary-default">
                  {apartment.price} <span className="text-base font-normal text-primary-dark">₽ / сутки</span>
                </p>
              </div>
              <NextLink
              // apartment.city?.slug
                href={`/${city.length != 0 ? city  :  apartment.city?.slug}/${apartment.documentId}`}
                className="group flex items-center gap-1 bg-primary-default hover:bg-primary-dark shadow-primary-default/20 text-white px-5 py-2 rounded-xl font-medium transition-colors duration-300 w-max"
              >
                Подробнее..
                <Info className="h-5 w-5 group-hover:text-green-400 transition-colors" />
              </NextLink>
            </div>

            {/* Contact */}
            <ContactInfo contact={apartment.contactInfo} initialOpen={false} />
          </div>
        </div>
      </div>
      <ReklamaPaymentDialog isOpen={isOpen} setIsOpen={setIsOpen} data={data}/>
        <DeleteDialog 
        isOpenDelete={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
        onConfirm={() => handleDelete(data?.documentId)}
        isLoading={loading}
      />
    </div>
  );
}

/* ----------------------------- SMALL COMPONENT ---------------------------- */
function Param({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default truncate">
      {Icon && <Icon className="w-4 h-4 shrink-0 text-primary-default" />}
      <span>{label}</span>
    </div>
  );
}