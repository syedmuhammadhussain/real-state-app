"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "@/components/ui/NextLink";
import { Home, Info, MapPin, Search, MessageCircle } from "lucide-react";
import { cityOptions, slides } from "@/constants/data";
import { SelectFramer } from "../product-slider/SelectFramer";

const StepsOverlay = () => {
  const steps = [
    {
      title: "Укажите город",
      icon: MapPin,
    },
    {
      title: "Найдите лучшее",
      icon: Search,
    },
    {
      title: "Обсудите условия",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl px-4 hidden md:block">
      <div className="grid grid-cols-3 gap-6 backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4 text-white/90 group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full group-hover:bg-white/20 transition-all">
              <step.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-primary-hi">Шаг {index + 1}</div>
              <div className="font-medium">{step.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {

  // City selector
  const [selectedCityKey, setSelectedCityKey] = useState(cityOptions[0].ru);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const selectedCity = cityOptions.find((city) => city.ru === selectedCityKey);

  // City selection
  const handleCitySelect = (cityKey) => {
    setSelectedCityKey(cityKey);
    setIsPopoverOpen(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
     <StepsOverlay />
      <div className="embla__viewport w-full h-full">
        <div className="embla__container flex h-full">
            <div className=" relative flex-[0_0_100%] h-full" >
              {/* Background Image */}
              <Image
                src={slides[0].image}
                alt={slides[0].title}
                priority
                quality={100}
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent" />
              {/* Slide Content */}
             
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
             
                {/* For the currently visible slide, show text (or show for all if you want) */}
                  
                  <div className="max-w-6xl w-full space-y-8">
                    <h1 className=" text-5xl text-white drop-shadow-xl">
                      ПОСУТОЧНАЯ АРЕНДА ЖИЛЬЯ <br/> В ГОРОДАХ РОССИИ
                    </h1>
                    <p className="mt-4 md:mt-6 text-lg md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
                      {slides[0].subtitle}
                    </p>

                    {/* CTA Buttons */}
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
                  </div>
              </div>
            </div>
      
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
