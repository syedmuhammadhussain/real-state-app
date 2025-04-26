'use client'
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay';

const ImageCarousel = ({images , apartment = null, mainAmenities = null , auto = false}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }); //, [Autoplay()]
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    // Carousel controls
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  
    // Update selected slide index
    useEffect(() => {
      if (!emblaApi) return;
      const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", onSelect);
      onSelect(); 
    }, [emblaApi]);
  
    return(
    <>
     <div className={`relative lg:min-auto rounded-md lg:${ auto ? 'w-2/4' : 'w-1/3' } h-auto overflow-hidden`}>
      <div className="embla h-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {images.map((image, idx) => (
            // embla__slide 
            <div key={idx} className={`relative ${auto ?'min-h-[400px] lg:h-[600px]  ':'min-h-[350px] lg:h-auto '} flex-[0_0_100%] overflow-hidden`}>
              <Image
                // src={image.url}
                src="/images/bag.png" 
                alt={image.caption}
                // width={10000}
                // height={10000}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 40vw, 33vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
           className="group absolute top-1/2 bg-white/80 left-2 -translate-y-1/2 p-2 text-primary-dark hover:text-primary-dark/80 group hover:bg-primary-dark rounded-full shadow-sm transition-colors border hover:border-white"
          >
            <ChevronLeft className="w-5 h-5 text-primary-dark group-hover:text-white" />
          </button>
          <button
            onClick={scrollNext}
          className="absolute top-1/2 right-2 bg-white/80  -translate-y-1/2 p-2 text-primary-dark hover:text-primary-dark/80 group hover:bg-primary-dark rounded-full shadow-sm transition-colors border hover:border-white"
          >
            <ChevronRight className="w-5 h-5 text-primary-dark  group-hover:text-white" />
          </button>
        </>
      )}

      {/* SLIDER DOTS */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
         {images.map((_, idx) => (
            <div
                key={idx}
                className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === selectedIndex ? "bg-primary-dark w-4" : "bg-white w-2"
                )}
            />
            ))}
        </div>
      )}
         {/* BADGES (top-left) */}
         <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {apartment?.checkInConditions?.petsAllowed && (
              <span className="bg-primary-dark text-white text-xs p-2 rounded-md">
                Pets allowed
              </span>
            )}
            
            {apartment?.apartmentParameters?.balconyType && (
              <span className="bg-primary-dark text-white text-xs p-2 rounded-md">
                {apartment.apartmentParameters.balconyType} balcony
              </span>
            )}
          </div>

          {/* AMENITIES (bottom-left) */}
          {mainAmenities?.length > 0 && (
            <div className="absolute bottom-3 left-2 flex gap-2">
              {mainAmenities.map(({ icon: Icon }, idx) => (
                <div key={idx} className="bg-primary-dark text-white p-2 rounded-full shadow-sm">
                  <Icon className="w-5 h-5 text-white " />
                </div>
              ))}
            </div>
          )}

              {/* Grid Preview Overlay */}
      {images.length > 1 && auto && (
        <div className="absolute right-4 top-4 hidden lg:grid grid-cols-2 gap-2 w-32 h-32 bg-background/90 p-2 rounded-lg shadow-lg">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => scrollTo(index)}
            >
              <Image
                src={image.url}
                alt={image.caption}
                fill
                className="object-cover rounded-sm"
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-medium rounded-sm">
                  +{images.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </>
)} 
export default ImageCarousel;
