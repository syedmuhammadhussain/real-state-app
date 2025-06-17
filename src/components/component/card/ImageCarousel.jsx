'use client';
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from 'react';

const ImageCarousel = ({ images, apartment = null, mainAmenities = null, auto = false }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const domain = process.env.NEXT_PUBLIC_STRAPI_URL;

  // Navigation controls
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  // Update selected index
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden shadow-lg",
     
      ""
    )}>
      {/* Carousel Container */}
      <div className="embla " ref={emblaRef}>
        <div className="embla__container w-full max-h-[400px]">
          {images.map((image, idx) => (
            <div 
              key={idx} 
              className="relative flex-[0_0_100%] "
            >
              <div className={cn(
                "relative w-full h-full",
                auto ? "aspect-video" : "aspect-square "
              )}>
                <Image
                  src={`${domain}${image.url}`}
                  alt={image.alt || "Property image"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-primary-dark p-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-primary-dark hover:text-white" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-primary-dark p-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-primary-dark hover:text-white" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 focus:outline-none",
                idx === selectedIndex ? "bg-white w-4" : "bg-white/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Top-left Badges */}
      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
        {apartment?.checkInConditions?.petsAllowed && (
          <span className="bg-primary-dark/90 backdrop-blur-sm text-white text-xs py-1.5 px-2.5 rounded-md shadow-sm">
            Pets allowed
          </span>
        )}
        {apartment?.apartmentParameters?.balconyType && (
          <span className="bg-primary-dark/90 backdrop-blur-sm text-white text-xs py-1.5 px-2.5 rounded-md shadow-sm">
            {apartment.apartmentParameters.balconyType} balcony
          </span>
        )}
      </div>

      {/* Bottom-left Amenities */}
      {mainAmenities?.length > 0 && (
        <div className="absolute bottom-3 left-3 flex gap-2">
          {mainAmenities.slice(0, 3).map(({ icon: Icon }, idx) => (
            <div 
              key={idx} 
              className="bg-primary-dark/90 backdrop-blur-sm text-white p-2 rounded-full shadow-md"
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
          ))}
        </div>
      )}

      {/* Grid Preview Overlay */}
      {images.length > 1 && auto && (
        <div className="absolute right-3 top-3 hidden lg:grid grid-cols-2 gap-1.5 w-24 h-24">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer"
              onClick={() => scrollTo(index)}
            >
              <Image
                src={`${domain}${image.url}`}
                alt={`Preview ${index + 1}`}
                fill
                className={cn(
                  "object-cover rounded-sm transition-transform hover:scale-105",
                  index === selectedIndex ? "ring-2 ring-white" : ""
                )}
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xs font-bold rounded-sm">
                  +{images.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;