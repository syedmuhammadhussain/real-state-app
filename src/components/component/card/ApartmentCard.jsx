"use client";

import { useState } from "react";
import { Wifi, Wind, BedDouble, Users, MapPin, Building, Pen, Trash2, WashingMachine, Bath, Car, Info, UtensilsCrossed, Coffee, Tv, Fan, Snowflake, Star, StarIcon, House, SquareDashedBottom, Radius, RailSymbol } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactInfo } from "./ContactInfo";
import NextLink from "@/components/ui/NextLink";
import { useIsMobile } from "@/hooks/use-mobile";
import ReklamaPaymentDialog from "../dialog-popups/ReklamaPaymentDialog";
import { DeleteDialog } from "../dialog-popups/DeleteDialog";
import { useApartment } from "../../../../context/ApartmentContext";
import { ImageCarousel } from "./ImageCarousel";
import { Param } from "@/components/ui/Param";
import AdvertismentDialog from "../dialog-popups/AdvertismentDialog";

export default function ApartmentCard({ data, onEdit, showButtonEdit = false, city = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenR, setIsOpenR] = useState(false);

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const isMobile = useIsMobile();

  const { loading, deleteApartment, handlePositionByCity } = useApartment();

  const openDeleteDialog = () => setIsOpenDelete(true);

  const handleDelete = async (documentId) => {
    await deleteApartment(documentId);
  };

  const dedup = (arr) => Array.from(new Set(arr));

  const apartment = {
    address: data.address,
    district: data.district ? data.district.name : "",
    metro_station: data.metro_station ? data.metro_station.name : "",
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    rooms: data.bathrooms,
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
      airConditioning: data.amenities?.some(
        (a) => a.name === "Air Conditioner"
      ),
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
    images: (data.images || []).map((img) => ({
      url: img.formats?.medium?.url || img.formats?.small?.url || img.formats?.thumbnail?.url  || img.url,
      caption: img.name,
    })) || [{ url: "/default-villa.jpg", caption: "Villa preview" }],
  };

  /* --------------------------- ICON MAP FOR EXTRAS -------------------------- */
  const extraIconMap = {
    "Wi-Fi": Wifi,
    WiFi: Wifi,
    "Air Conditioner": Snowflake,
    "Cable TV": Tv,
    TV: Tv,
    Dishwasher: WashingMachine,
    "Washing machine": WashingMachine,
    "Coffee Machine": Coffee,
    "Coffee Maker": Coffee,
    Fan: Fan,
  };

  const getExtraIcon = (name) => extraIconMap[name] || UtensilsCrossed;

  /* ------------------------------ ICON HELPERS ------------------------------ */
  const mainAmenities = [
    { icon: Wifi, condition: apartment.extras.includes("Wi-Fi") },
    { icon: Wind, condition: apartment.checkInConditions.airConditioning },
    {
      icon: WashingMachine,
      condition:
        apartment.extras.includes("Washing machine") ||
        apartment.extras.includes("Dishwasher"),
    },
    { icon: Bath, condition: apartment.bathrooms > 0 },
    { icon: Car, condition: apartment.apartmentParameters.parkingAvailable },
  ].filter((a) => a.condition);

  const images =
    apartment.images.length > 0
      ? apartment.images
      : [{ url: "/images/trveller.jpg", caption: "Apartment preview" }];

  const handlePosition = async () => {
    await setIsOpen(true);
    // alert (data?.city.id)
    await handlePositionByCity(data?.city.id);
    // await handlePositionByCity(data?.city.id)
  };

  /* ---------------------------------- JSX ---------------------------------- */
  return (
    <div className="relative w-full  bg-white border  border-primary-light rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300">

      {/* EDIT / LIKE BUTTONS */}
      {showButtonEdit ? (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-full flex gap-2 center ">
               <Button variant="outline" size="md" onClick={()=>setIsOpenR(true)} className="group ">
              <RailSymbol className="h-4 w-4 text-black group-hover:text-black" />
              <span className="hidden  md:flex items-center text-sm  gap-2">
                 Поднимать
              </span>
            </Button>
            <Button
              variant="outline"
              size="md"
              className="group bg-black" 
              onClick={handlePosition}
            >
              <StarIcon className="group w-4 h-4 text-yellow-500 group-hover:text-primary-dark" />
              {!isMobile && (
                <>
                  <span className="hidden  md:flex items-center text-sm text-yellow-500 group-hover:text-yellow-500  gap-2">
                    Рекламировать
                    <span className="hidden  md:block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full gropup-hover:border-black/80 group-hover:animate-bounce ">
                      PRO
                    </span>
                  </span>
                </>
              )}
            </Button>
            <Button variant="outline" size="md" onClick={onEdit} className="group bg-black">
              <Pen className="h-4 w-4 text-white group-hover:text-black" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={openDeleteDialog}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        data?.sequence_order && (
          <Button
            size="md"
            variant="outline"
            // onClick={() => setIsLiked((prev) => !prev)}
            className="group bg-white absolute top-2 right-2 p-2 z-10  rounded-full shadow transition-colors"
          >
            <Star className={`w-6 h-6 " text-base text-yellow-700 animate-pulse`} />
          </Button>
        )
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-3">
        {/* IMAGE SLIDER */}
        <div className="lg:col-span-1">
          <ImageCarousel
            images={images}
            mainAmenities={mainAmenities}
            apartment={apartment}
          />
        </div>

        {/* DETAILS */}
        <div className="lg:col-span-2">
          <div className="w-full pt-2 px-2 lg:pt-4 lg:px-4 flex flex-col justify-between md:gap-2">
            {/* Title & Address */}
            <div className="mb-2">
              <h2 className="text-lg md:text-xl max-w-sm font-semibold text-primary-dark mb-1 truncate">
                {data.title}
              </h2>
              <div className="flex items-start text-primary-default gap-1.5">
                <div className="w-5 h-5">
                <MapPin className="w-4 h-4 mt-1" />

                </div>
                <span className="text-sm md:text-base text-primary-dark  ">
                  {" "}
                  {`${data.city?.area?.name || "Unknown Region"}, `}{" "}
                  {`${data.city.name}, `}
                  {data.district ? data.district.name : ""}
                  {/* {apartment.district !== null && ',' } */}
                  {data.metro_station ? data.metro_station.name : ""}
                  {/* {apartment.metro_station !== null && ',' } */}
                  {`${data.address}`}{" "}
                </span>
              </div>
            </div>

            {/* Core parameters grid // Коттедж // Квартиры/ */}
            {
              !isMobile && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Param
                  icon={
                    apartment.apartmentParameters.apartmentType === "APARTMENT"
                      ? Building
                      : House
                  }
                  label={
                    apartment.apartmentParameters.apartmentType === "APARTMENT"
                      ? "Квартиры"
                      : "Коттедж"
                  }
                />
                <Param icon={Users} label={`Up to ${data.bedrooms * 2} `} />
                <Param icon={BedDouble} label={`${data.bedrooms} спальни`} />
                <Param icon={Bath} label={`${data.bathrooms} ванные комнаты`} />
                <Param icon={Radius} label={`${data.size} m²`} />
                <Param icon={SquareDashedBottom} label={data.rooms} />
              </div>
              )
            }

            {/* Features / Kitchen list */}
            {!isMobile && apartment.extras.length > 0 && (
              <ul className="flex flex-wrap gap-2 text-xs mt-2">
                {apartment.extras.slice(0, 4).map((item, idx) => {
                  const IconCmp = getExtraIcon(item);
                  return (
                    <li
                      key={`${item}-${idx}`}
                      className="flex items-center gap-1 bg-primary-light/20 text-primary-dark px-2 py-1 rounded-full truncate border border-primary-dark"
                    >
                      <IconCmp className="h-3 w-3" />
                      <span className="text-xs ">{item}</span>
                    </li>
                  );
                })}
                {apartment.extras.length > 4 && (
                  <li className="text-primary-dark">
                    +{apartment.extras.length - 4} более
                  </li>
                )}
              </ul>
            )}

            {/* Price & CTA */}
            <div className="flex flex-row items-center justify-between border-t border-gray-100 pt-2 mb-2 ">
              <div>
                <p className=" text-base md:text-lg font-bold text-primary-dark !mb-0">
                  {data.price}{" "}
                  <span className="text-sm md:text-base font-normal text-primary-dark">
                    ₽ / сутки
                  </span>
                </p>
              </div>
              <NextLink
                href={`/${data.city.slug}/${data.documentId}`}
                className="group flex items-center gap-1 bg-primary-dark hover:bg-gradient-to-br from-black/80 shadow-primary-dark/20 text-white px-5 py-2 rounded-xl font-medium transition-colors duration-300 w-max"
              >
                <span className="text-sm md:text-base">Подробнее..</span>
                <Info className="h-5 w-5 group-hover:text-green-400 transition-colors" />
              </NextLink>
            </div>

            {/* Contact */}
            <ContactInfo contact={apartment.contactInfo} initialOpen={false} />
          </div>
        </div>
      </div>
      <ReklamaPaymentDialog isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
      <AdvertismentDialog isOpen={isOpenR} setIsOpen={setIsOpenR} data={data} />

      <DeleteDialog
        isOpenDelete={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
        onConfirm={() => handleDelete(data?.documentId)}
        isLoading={loading}
      />
    </div>
  );
}


