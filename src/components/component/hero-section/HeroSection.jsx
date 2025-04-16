"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import NextLink from "@/components/ui/NextLink";
import { Home, Info } from "lucide-react";

import { cityOptions, slides } from "@/constants/data";
import { SelectFramer } from "../product-slider/SelectFramer";


const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const autoplayRef = useRef(null);

  // For progress bars & manual updates:
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // City selector
  const [selectedCityKey, setSelectedCityKey] = useState(cityOptions[0].ru);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const selectedCity = cityOptions.find((city) => city.ru === selectedCityKey);

  // Embla callback to get the new index when the slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setCurrentIndex(index);
    setProgress(0);
  }, [emblaApi]);

  // Initialize Embla, set callbacks
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // // Auto-play every 8 seconds (8000 ms)
  // useEffect(() => {
  //   if (!emblaApi) return;

  //   // Clear existing timer (if any) to avoid duplication
  //   if (autoplayRef.current) {
  //     clearInterval(autoplayRef.current);
  //   }

  //   autoplayRef.current = setInterval(() => {
  //     // Scroll to next slide
  //     emblaApi.scrollNext();
  //     setProgress(0);
  //   }, 8000);

  //   return () => {
  //     if (autoplayRef.current) clearInterval(autoplayRef.current);
  //   };
  // }, [emblaApi, currentIndex]);

  // // Progress bar logic: Increase ~1.25% every 100ms -> 8s total
  // useEffect(() => {
  //   const progressInterval = setInterval(() => {
  //     setProgress((prev) => Math.min(prev + 100 / 80, 100)); // +1.25 each 100ms
  //   }, 100);

  //   return () => clearInterval(progressInterval);
  // }, [currentIndex]);


  // City selection
  const handleCitySelect = (cityKey) => {
    setSelectedCityKey(cityKey);
    setIsPopoverOpen(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Embla viewport & container */}
      <div ref={emblaRef} className="embla__viewport w-full h-full">
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div
            // embla__slide
              className=" relative flex-[0_0_100%] h-full"
              key={index}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
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
                {index === currentIndex && (
                  <div className="max-w-4xl w-full space-y-8">
                    {/* Title & Subtitle */}
                    <h1 className=" text-white drop-shadow-xl">
                      {slide.title}
                    </h1>
                    <p className="mt-4 md:mt-6 text-lg md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
                      {slide.subtitle}
                    </p>

                    {/* City Selector */}
                    <div className="max-w-xs mx-auto">
                      <SelectFramer
                        handleCitySelect={handleCitySelect}
                        isPopoverOpen={isPopoverOpen}
                        setIsPopoverOpen={setIsPopoverOpen}
                        selectedCityKey={selectedCityKey}
                        selectedCity={selectedCity}
                      />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-row sm:flex-row justify-center gap-4 mt-8">
                      <NextLink
                        href={selectedCity?.link || "#"}
                        className="flex items-center max-h-[47px] justify-center gap-3 px-8 py-4 bg-primary-default hover:bg-primary-dark text-white font-semibold rounded-md shadow-lg shadow-primary-default/20 transition-all transform active:scale-95"
                      >
                        <Home className="w-5 h-5" />
                        Explore {selectedCity?.ru}
                      </NextLink>

                      <NextLink
                        href="/contact"
                        className="flex items-center max-h-[47px] justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-md shadow-lg shadow-gray-900/10 transition-all transform active:scale-95"
                      >
                        <Info className="w-5 h-5" />
                        {/* Learn More */}
                      </NextLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                emblaApi?.scrollTo(index);
                setProgress(0);
                setCurrentIndex(index); // Force immediate update
              }}
              className="relative h-1.5 w-8 rounded-full bg-white/30 overflow-hidden"
              aria-label={`Slide ${index + 1}`}
            >
              {/* For the active slide, show a filling bar */}
              {index === currentIndex && (
                <div
                  className="absolute inset-0 bg-white origin-left"
                  style={{
                    transform: `scaleX(${progress / 100})`,
                    transition: "transform 0.1s linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
