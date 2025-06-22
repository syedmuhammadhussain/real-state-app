'use client';
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ZoomIn, Maximize } from "lucide-react";
import React, { useCallback, useEffect, useState } from 'react';
import { StrapiImage } from "../strapi-image/StrapiImage";

const ImageCarousel = ({ images, apartment = null, mainAmenities = null, auto = false }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden shadow-xl",
       isFullscreen ? "fixed inset-0 z-50 bg-black rounded-none" : ""
    )}>
      
      {/* Fullscreen toggle button */}
       {!!auto &&   
       <button
        onClick={isFullscreen ? closeFullscreen : openFullscreen}
        className={cn(
          "absolute z-10 transition-all duration-300 hover:scale-110",
          "bg-white/90 p-2 rounded-full shadow-md",
          isFullscreen ? "top-6 right-6" : "top-4 right-4"
        )}
        aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
      >
        {isFullscreen  ? (
          <Maximize className="w-5 h-5 text-gray-800" />
        ) : (
          <Maximize className="w-5 h-5 text-gray-800" />
        )}
      </button>}
      

      {/* Carousel Container */}
      <div 
        className={cn(
          "embla overflow-hidden",
          isFullscreen ? "h-screen " : ""
        )} 
        ref={emblaRef}
      >
        <div className={cn(
          "embla__container w-full",
          isFullscreen ? "lg:max-h-screen mx-auto" : "lg:max-h-[650px]"
        )}>
          {images.map((image, idx) => (
            <div 
              key={idx} 
              className="relative flex-[0_0_100%]"
              onMouseEnter={() => setHoveredImage(idx)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className={cn(
                "relative w-full h-full transition-all duration-300 ",
                !!auto ? "aspect-square " : "aspect-square",
                isFullscreen ? "h-screen flex justify-center " : ""
              )}>
                <StrapiImage
                  src={image.url}
                  alt={image.url}
                  fill
                  className={cn(
                    "object-contain transition-transform duration-500",
                     hoveredImage === idx && !isFullscreen ? "scale-105" : "scale-100"
                  )}
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                {/* { images.length > 1 && !!isFullscreen && (
                  <div className={cn(
                    "absolute top-4 left-1/2 transform -translate-x-1/2  bg-white flex  gap-2 transition-all duration-300",
                    isFullscreen ? "opacity-0" : "opacity-100"
                  )}>
                    {images.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollTo(idx)}
                        className={cn(
                          "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:border-white focus:outline-none",
                          idx === selectedIndex ? "border-white scale-110" : "border-transparent"
                        )}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        <StrapiImage
                          src={image.url}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )} */}

                {/* Zoom overlay */}
                {hoveredImage === idx && !isFullscreen &&  !!auto && (
                  <div 
                    className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-zoom-in"
                    onClick={openFullscreen}
                  >
                    <div className="bg-white p-3 rounded-full shadow-lg animate-pulse">
                      <ZoomIn className="w-8 h-8 text-gray-800" />
                    </div>
                  </div>
                )}
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
            className={cn(
              "absolute top-1/2 -translate-y-1/2 bg-white/90 hover:bg-primary-dark p-3 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white z-10",
              isFullscreen ? "left-6" : "left-2"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-primary-dark hover:text-white" />
          </button>
          <button
            onClick={scrollNext}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 bg-white/90 hover:bg-primary-dark p-3 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white z-10",
              isFullscreen ? "right-6" : "right-2"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-primary-dark hover:text-white" />
          </button>
        </>
      )}

      {/* Bottom Slider */}
      {images.length > 1 && !!auto && (
        <div className={cn(
          "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex  gap-2 transition-all duration-300",
          isFullscreen ? "opacity-0" : "opacity-100"
        )}>
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={cn(
                "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:border-white focus:outline-none",
                idx === selectedIndex ? "border-white scale-110" : "border-transparent"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <StrapiImage
                src={image.url}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Top-left Badges */}
      {!isFullscreen && (
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
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
      )}

      {/* Bottom-left Amenities */}
      {!isFullscreen && mainAmenities?.length > 0 && (
        <div className="absolute bottom-3 left-3 flex gap-2 z-10">
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

      {/* Fullscreen close button */}
      {isFullscreen && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={closeFullscreen}
            className="bg-white/90 text-gray-800 py-2 px-6 rounded-full shadow-lg hover:bg-white transition-all"
          >
           Закрыть 
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;