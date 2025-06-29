"use client";

/* ------------------------------------------------------------------
 *  Updated & Responsive Components (ApartmentCard + ImageCarousel)
 *  Author: ChatGPT – June 2025
 * ------------------------------------------------------------------*/

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import PropTypes from "prop-types";
import {
  Wifi,
  Wind,
  BedDouble,
  Users,
  MapPin,
  Building,
  Pen,
  Trash2,
  WashingMachine,
  Bath,
  Car,
  Info,
  UtensilsCrossed,
  Coffee,
  Tv,
  Fan,
  Snowflake,
  Star,
  ChevronLeft,
  ChevronRight,
  Maximize,
} from "lucide-react";

/* ------------ Project‑level shared helpers ------------- */
import { Button } from "@/components/ui/button";
import { StrapiImage } from "@/components/ui/StrapiImage";
import NextLink from "@/components/ui/NextLink";
import { ContactInfo } from "./ContactInfo";
import { useIsMobile } from "@/hooks/use-mobile";
import ReklamaPaymentDialog from "../dialog-popups/ReklamaPaymentDialog";
import { DeleteDialog } from "../dialog-popups/DeleteDialog";
import { useApartment } from "../../../../context/ApartmentContext";
import { cn } from "@/lib/utils";

/* ========================================================
 *  ImageCarousel – cleaner API, thumbnail strip & fullscreen
 * ====================================================== */
export function ImageCarousel({
  images,
  apartment = null,
  mainAmenities = [],
  showThumbnails = true,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ---------- Embla event binding ---------- */
  useEffect(() => {
    if (!emblaApi) return;
    const cb = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", cb);
    return () => emblaApi.off("select", cb);
  }, [emblaApi]);

  /* ---------- Carousel controls ---------- */
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx) => emblaApi?.scrollTo(idx), [emblaApi]);

  /* ---------- Full‑screen helpers ---------- */
  const openFs = () => {
    setIsFullscreen(true);
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  };
  const closeFs = () => {
    setIsFullscreen(false);
    if (typeof document !== "undefined") document.body.style.overflow = "auto";
  };

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl shadow-xl",
        isFullscreen && "fixed inset-0 z-50 rounded-none bg-black"
      )}
    >
      {/* Fullscreen toggle */}
      {images.length > 0 && (
        <button
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className={cn(
            "absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-md transition-transform duration-300 hover:scale-110 focus:outline-none",
            isFullscreen && "right-6 top-6"
          )}
          onClick={isFullscreen ? closeFs : openFs}
        >
          <Maximize className="h-5 w-5 text-gray-800" />
        </button>
      )}

      {/* Embla */}
      <div
        ref={emblaRef}
        className={cn("embla h-full w-full overflow-hidden", isFullscreen && "h-screen")}
      >
        <div
          className={cn(
            "embla__container h-full w-full",
            isFullscreen ? "mx-auto h-screen lg:max-h-screen" : "lg:max-h-[650px]"
          )}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative flex-[0_0_100%]">
              <StrapiImage
                src={img.url}
                alt={img.caption ?? `Image ${idx + 1}`}
                fill
                sizes="(max-width:768px) 100vw, 80vw"
                className="object-contain"
              />

              {/* Amenities (bottom‑left) */}
              {!isFullscreen && idx === selectedIndex && mainAmenities.length > 0 && (
                <div className="absolute bottom-3 left-3 z-10 flex gap-2">
                  {mainAmenities.slice(0, 3).map(({ icon: Icon }, key) => (
                    <span
                      key={key}
                      className="rounded-full bg-primary-dark/90 p-2 shadow-md backdrop-blur-sm"
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white",
              isFullscreen && "left-6"
            )}
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6 text-primary-dark hover:text-white" />
          </button>
          <button
            aria-label="Next image"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white",
              isFullscreen && "right-6"
            )}
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6 text-primary-dark hover:text-white" />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && showThumbnails && (
        <figcaption
          className={cn(
            "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 transition-opacity",
            isFullscreen ? "opacity-0" : "opacity-100"
          )}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              aria-label={`Thumbnail ${idx + 1}`}
              onClick={() => scrollTo(idx)}
              className={cn(
                "relative h-14 w-14 overflow-hidden rounded-lg border-2 transition-transform duration-300 hover:scale-105",
                idx === selectedIndex ? "border-white" : "border-transparent"
              )}
            >
              <StrapiImage src={img.url} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </figcaption>
      )}

      {/* Close fs */}
      {isFullscreen && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <Button
            variant="outline"
            size="md"
            className="rounded-full bg-white/90 px-6 py-2 text-primary-dark shadow-lg hover:bg-white"
            onClick={closeFs}
          >
            Закрыть
          </Button>
        </div>
      )}
    </figure>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ url: PropTypes.string.isRequired, caption: PropTypes.string })
  ).isRequired,
  apartment: PropTypes.object,
  mainAmenities: PropTypes.array,
  showThumbnails: PropTypes.bool,
};
