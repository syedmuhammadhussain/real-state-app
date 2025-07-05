"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import NextLink from "@/components/ui/NextLink";
import { Eye } from "lucide-react";
import { PrevButton, NextButton, usePrevNextButtons } from "./ArrowButton";


const EmblaCarousel = ({ slides }) => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Tracks which slide is "hovered" or "tapped"
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Check if user is on mobile (for custom logic)
  const [isMobile, setIsMobile] = useState(false);

  // Setup responsive slidesToShow
  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      if (width < 480) setSlidesToShow(1);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  // Embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    loop: false,
    align: "start",
    slidesToScroll: 1,
    slidesToShow,
  });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  // Handle the "tap to reveal" on mobile
  // If the user taps the same card twice in a row, we navigate immediately.
  const handleTouch = (cardIndex, link) => {
    if (hoveredIndex === cardIndex) {
      // Second tap: open the link
      // window.location.href = link; 
    } else {
      // First tap: just reveal the overlay
      setHoveredIndex(cardIndex);
    }
  };

  // For desktop hover, just set/unset hoveredIndex
  const handleMouseEnter = (cardIndex) => {
    if (!isMobile) {
      setHoveredIndex(cardIndex);
    }
  };
  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredIndex(null);
    }
  };

  return (
    <section className="embla group">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex h-[35rem] transition-opacity duration-500">
          {slides.map((slide, index) => {
            const isActive = hoveredIndex === index;

            return (
              <div
                key={slide.key}
                className=" embla__slide relative w-full min-h-120 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 "
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => handleTouch(index, slide.link)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.img}
                    alt={`${slide.ru} - ${slide.description}`}
                    fill
                    priority
                    quality={100}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* OVERLAY - shows on desktop hover or first tap on mobile */}
                  <div
                    className={`
                      absolute bottom-0 left-0 right-0 z-20 p-4
                      bg-black/50 text-white
                      transition-opacity duration-300
                      ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <NextLink href={slide.link} className="flex justify-normal items-start gap-3">
                        <h2  className=" text-xl font-bold responsive-appbar-button" > {slide.ru} </h2>
                        <div> <Eye strokeWidth={1}  className='mt-2 w-6 h-6 text-white  animate-pulse' /> </div>
                      </NextLink>
                    </div>
                    <p className="mt-2 text-white/80 text-base">{slide.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Buttons */}
      <div className="embla__controls flex gap-1 mt-3">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

export default EmblaCarousel;
