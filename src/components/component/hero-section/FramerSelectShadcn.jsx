// 'use client'

// import NextLink from "@/components/ui/NextLink";
// import { Home } from "lucide-react";
// import { SelectFramer } from "../product-slider/SelectFramer";
// import { useApartment } from "../../../../context/ApartmentContext";

// const FramerSelectShadcn = () => {
//   const { selectedCity } = useApartment()
//     return (
//         <div className="flex flex-row   justify-center gap-1 ">
//            <SelectFramer />
//             <NextLink
//               href={selectedCity?.slug || "#"}
//               className="flex items-center  justify-center gap-3 px-8 py-3 bg-primary-dark hover:bg-gradient-to-br from-black/80 text-white font-bold rounded-xl shadow-lg  transition-all duration-300 "
//             >
//               <Home className="w-5 h-5" />
//               <span className="hidden lg:block"> Найти  жилье в {selectedCity?.name} </span>
//             </NextLink>
//          </div>
//     )
// }

// export default FramerSelectShadcn



'use client';

import NextLink from "@/components/ui/NextLink";
import { Home } from "lucide-react";
import { SelectFramer } from "../product-slider/SelectFramer";
import { useApartment } from "../../../../context/ApartmentContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const FramerSelectShadcn = () => {
  const { selectedCity } = useApartment();
  const isDisabled = !selectedCity?.slug;
  const router = useRouter()
  
  return (
    <div className="flex flex-row justify-center items-center gap-1  w-full px-4 md:px-0">
      <SelectFramer />
      {isDisabled  ? 
       <Button
        size="lg"
        disabled={isDisabled}
        onClick={()=> router.push(`/${selectedCity.slug}`)  }
        className={`flex items-center justify-center gap-3 px-8 py-4 max-w-[80px]  md:max-w-[280px] ${
          isDisabled 
            ? 'bg-gray-900 cursor-not-allowed' 
            : 'bg-primary-dark hover:bg-gradient-to-br from-black/80'
        } text-white font-bold rounded-xl shadow-lg transition-all duration-300`}
      >
        <Home className="w-5 h-5" />
        <span className="hidden lg:block">
          Найти жилье в {selectedCity?.name || 'городе'}
        </span>
      </Button>
       :
      <NextLink
              href={selectedCity?.slug || "#"}
              className="flex items-center  justify-center gap-3 px-8 py-3 bg-primary-dark hover:bg-gradient-to-br from-black/80 text-white font-bold rounded-xl shadow-lg  transition-all duration-300 "
            >
              <Home className="w-5 h-5" />
              <span className="hidden lg:block"> Найти  жилье в {selectedCity?.name} </span>
      </NextLink>
        }
   
    </div>
  );
};

export default FramerSelectShadcn;