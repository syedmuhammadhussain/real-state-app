"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Wifi,
  Wind,
  WashingMachine,
  Heart,
  BedDouble,
  Users,
  MapPin,
  Building,
  Bath,
  Car,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ApartmentCard({ apartment }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  // Carousel controls
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Update selected slide index
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect(); // set initial index
  }, [emblaApi]);

  // Show/hide phone number
  const handleShowPhone = () => setShowPhoneNumber(!showPhoneNumber);

  // Copy text to clipboard
  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  return (
    <div
      className="
        w-full bg-white 
        border border-gray-100 
        rounded-xl 
        shadow-sm 
        overflow-hidden 
        hover:shadow-md 
        transition-shadow 
        duration-300 
        relative
      "
    >
      <div className="flex flex-col lg:flex-row">
        {/* IMAGE SLIDER SECTION */}
        <div className="relative w-full lg:w-1/2 h-72 sm:h-80 md:h-96 lg:h-[500px]">
          <div className="embla h-full overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex h-full">
              {images.map((image, idx) => (
                // embla__slide 
                <div key={idx} className="flex-[0_0_100%] relative">
                  <Image
                    // src={image.url}
                    src="/images/bag.png" 
                    alt={image.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 40vw, 33vw"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SLIDER CONTROLS (if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {/* SLIDER DOTS */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`
                    h-2 rounded-full transition-all duration-300 
                    ${idx === selectedIndex ? "bg-white w-4" : "bg-white/50 w-2"}
                  `}
                />
              ))}
            </div>
          )}

          {/* BADGES (top-left) */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {apartment.checkInConditions?.petsAllowed && (
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                Pets allowed
              </span>
            )}
            {apartment.apartmentParameters?.balconyType && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                {apartment.apartmentParameters.balconyType} balcony
              </span>
            )}
          </div>

          {/* AMENITIES (bottom-left) */}
          {mainAmenities.length > 0 && (
            <div className="absolute bottom-3 left-2 flex gap-2">
              {mainAmenities.map(({ icon: Icon }, idx) => (
                <div key={idx} className="bg-white/90 p-1.5 rounded-md shadow-sm">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
              ))}
            </div>
          )}

          {/* LIKE BUTTON (top-right) */}
          <button
            onClick={() => setIsLiked((prev) => !prev)}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked ? "text-red-500 fill-current" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* DETAILS SECTION */}
        <div className="w-full lg:w-1/2 p-4 lg:p-6 flex flex-col justify-between">
          {/* Title & Address */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-primary-dark mb-1">
              {apartment.title}
            </h2>
            <div className="flex items-center text-sm text-primary-default gap-1.5 flex-wrap">
              <MapPin className="w-4 h-4  " />
              <span>{apartment.mapInfo?.address}</span>
              {apartment.mapInfo?.district && (
                <>
                  <span className="text-gray-400">•</span>
                  <span>{apartment.mapInfo.district} District</span>
                </>
              )}
            </div>
          </div>

          {/* Parameters Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
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

          {/* Short Description */}
          {apartment.descriptionShort && (
            <p className="text-sm text-primary-default line-clamp-2">
              {apartment.descriptionShort}
            </p>
          )}

          {/* Price & Contact */}
          <div className="mt-4 border-t border-gray-100 pt-4 space-y-4">
            {/* Price and CTA */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-xl md:text-2xl font-bold text-primary-default">
                  {/* Example price (replace with real data as needed) */}
                  1,000 ₽<span className="text-base font-normal text-primary-dark"> / сутки</span>
                </div>
                {apartment.checkInConditions?.prepaymentRequired && (
                  <p className="text-sm text-primary-default mt-1">Prepayment required</p>
                )}
              </div>
              {/* Normal button (removed Framer Motion) */}
              <button
                className="
                  bg-primary-default
                  hover: hover:bg-primary-dark shadow-primary-default/20
                  text-white 
                  px-6 py-3 
                  rounded-lg 
                  font-medium 
                  transition-colors
                "
              >
                View Details
              </button>
            </div>

            {/* Contact Owner */}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-dark">Contact owner:</span>

                {showPhoneNumber ? (
                  /* If phone is shown */
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyToClipboard(contactInfo.phone)}
                      className="flex items-center gap-1 text-primary-light hover:text-primary-dark transition-colors">
                        <Phone className="w-4 h-4" />
                        <span>{contactInfo.phone}</span>
                    </button>
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  /* If phone is hidden */
                  <button
                    onClick={handleShowPhone}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                    <span>{contactInfo.hiddenPhone}</span>
                    <span className="text-primary-dark ml-2">Show number</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
