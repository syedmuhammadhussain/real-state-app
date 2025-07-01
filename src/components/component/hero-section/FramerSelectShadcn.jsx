'use client'

import NextLink from "@/components/ui/NextLink";
import { Home } from "lucide-react";
import { SelectFramer } from "../product-slider/SelectFramer";
import { useApartment } from "../../../../context/ApartmentContext";

const FramerSelectShadcn = () => {
  const {selectedCityKey, isPopoverOpen, setIsPopoverOpen, selectedCity, handleCitySelect, } = useApartment()
    return (
        <div className="flex flex-row   justify-center gap-1 ">
           <SelectFramer
             handleCitySelect={handleCitySelect}
             isPopoverOpen={isPopoverOpen}
             setIsPopoverOpen={setIsPopoverOpen}
             selectedCityKey={selectedCityKey}
             selectedCity={selectedCity}
           />
           <NextLink
             href={selectedCity?.link || "#"}
             className="flex items-center  justify-center gap-3 px-8 py-3 bg-primary-dark hover:bg-gradient-to-br from-black/80 text-white font-bold rounded-xl shadow-lg  transition-all duration-300 "
           >
             <Home className="w-5 h-5" />
             <span className="hidden lg:block">    Найти  жилье в {selectedCity?.ru} </span>
           </NextLink>
         </div>
    )
}

export default FramerSelectShadcn