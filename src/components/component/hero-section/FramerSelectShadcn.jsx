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
             className="flex items-center  justify-center gap-3 px-8 py-3 bg-primary-default hover:bg-primary-dark text-white font-semibold rounded-md shadow-lg shadow-primary-default/20 transition-all transform active:scale-95"
           >
             <Home className="w-5 h-5" /> Найти
             <span className="hidden lg:block">   жилье в {selectedCity?.ru} </span>
           </NextLink>
         </div>
    )
}

export default FramerSelectShadcn