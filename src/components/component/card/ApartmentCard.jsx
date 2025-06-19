"use client";

import { useState } from "react";
import { Wifi, Wind, Heart, BedDouble, Users, MapPin, Building, Pen, Trash2, WashingMachine, Bath, Car, Info, UtensilsCrossed, Coffee, Tv, Fan, Snowflake, AlignEndVertical, HighlighterIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageCarousel from "./ImageCarousel";
import { ContactInfo } from "./ContactInfo";
import NextLink from "@/components/ui/NextLink";
import { useIsMobile } from "@/hooks/use-mobile";
import ReklamaPaymentDialog from "./ReklamaPaymentDialog";

/**
 * Renders an apartment card that accepts the raw backend JSON directly.
 *
 * New in this revision:
 *  - Every extra (amenity / kitchen / feature) now shows a context-appropriate Lucide icon.
 *  - Fallback to UtensilsCrossed when no mapping exists.
 */
export default function ApartmentCard({ data, onEdit, onDelete, showButtonEdit = false , city=''}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  /* ----------------------------- TRANSFORM DATA ----------------------------- */
  const dedup = (arr) => Array.from(new Set(arr));

  const apartment = {
    title: data?.title,
    price: data.price,
    documentId: data.documentId,
    city: data.city,
    address: data.location?.name ? `${data.location?.name}, ${data.city?.name}` : `${data.city?.name}`,
    district: data.city?.slug,
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

  const contactInfo = {
    phone: apartment.contactInfo.phone || "+7 (XXX) XXX-XX-XX",
    whatsapp: apartment.contactInfo.whatsapp || "79123456789",
    hiddenPhone: apartment.contactInfo.hiddenPhone || "+7••• •••••••",
  };

  const images = apartment.images.length > 0 ? apartment.images : [{ url: "/default-apartment.jpg", caption: "Apartment preview" }];

  /* ---------------------------------- JSX ---------------------------------- */
  return (
    <div className="relative w-full bg-white border border-primary-light/50 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* EDIT / LIKE BUTTONS */}
      {showButtonEdit ? (
        <div className="absolute top-2 right-2 ">
          <div className="w-full flex gap-2 center">
          <Button variant="ghost" size="md"  className="p-2">
            <span className="text-primary-dark"  onClick={() => setIsOpen(true)}>  Рекламировать </span>
            <HighlighterIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="iconicon" onClick={onEdit} className="p-2">
            <Pen className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete} className="p-2">
            <Trash2 className="h-4 w-4" />
          </Button>
         
         </div>
        </div>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsLiked((prev) => !prev)}
          className="group absolute top-2 right-2 p-2 rounded-full shadow transition-colors"
        >
          <Heart
            className={`w-6 h-6 ${isLiked ? "text-red-500 fill-current" : "text-primary-dark group-hover:text-red-500"}`}
          />
        </Button>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-3">
        {/* IMAGE SLIDER */}
        <div className="lg:col-span-1">
          <ImageCarousel images={images} mainAmenities={mainAmenities} apartment={apartment} />
        </div>

        {/* DETAILS */}
        <div className="lg:col-span-2">
          <div className="w-full p-4 lg:p-6 flex flex-col justify-between gap-4">
            {/* Title & Address */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-primary-dark mb-1 truncate" title={apartment.title}>
                {apartment.title}
              </h2>
              <div className="flex items-center text-sm text-primary-default gap-1.5 flex-wrap">
                <MapPin className="w-4 h-4" />
                <span>{apartment.address}</span>
                {apartment.district && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span>{apartment.district} District</span>
                  </>
                )}
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-gray-100 pt-4">
              <div>
                <p className="text-2xl font-bold text-primary-default">
                  {apartment.price} <span className="text-base font-normal text-primary-dark">₽ / сутки</span>
                </p>
              </div>
              <NextLink
              // apartment.city?.slug
                href={`/${city.length != 0 ? city  :  apartment.city?.slug}/${apartment.documentId}`}
                className="group flex items-center gap-1 bg-primary-default hover:bg-primary-dark shadow-primary-default/20 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-300 w-max"
              >
                Подробнее..
                <Info className="h-5 w-5 group-hover:text-green-400 transition-colors" />
              </NextLink>
            </div>

            {/* Contact */}
            <ContactInfo contact={contactInfo} initialOpen={false} />
          </div>
        </div>
      </div>
      <ReklamaPaymentDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
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