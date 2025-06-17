'use client'
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export const ImageGallery = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  return (
    <div className="relative group w-1/3 ">
      <div className="overflow-hidden rounded-md shadow-xl " ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0 aspect-square"
            >
              {/* <Image
                src={image.url}
                alt={image.url}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 80vw"
              /> */}
              {index === images.length - 1 && images.length > 5 && (
                <Button
                  variant="secondary"
                  className="absolute bottom-4 right-4 backdrop-blur-sm bg-white/30 hover:bg-white/50"
                  size="sm"
                >
                  +{images.length - 5} фото
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <PrevButton
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <NextButton
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={selectedIndex === index ? 'bg-primary' : 'bg-muted'}
          />
        ))}
      </div>

      {/* Grid Preview Overlay */}
      {images.length > 1 && (
        <div className="absolute right-4 top-4 hidden lg:grid grid-cols-2 gap-2 w-32 h-32 bg-background/90 p-2 rounded-lg shadow-lg">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => scrollTo(index)}
            >
              {/* <Image
                src={image.url}
                alt={image.url}
                fill
                className="object-cover rounded-sm"
              /> */}
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
  );
};

// CarouselButtons.tsx
const PrevButton = ({ onClick, className }) => (
  <Button
    variant="secondary"
    size="icon"
    onClick={onClick}
    className={`rounded-full w-10 h-10 shadow-lg ${className}`}
  >
    <ChevronLeft className="w-5 h-5" />
  </Button>
);

const NextButton = ({ onClick, className }) => (
  <Button
    variant="secondary"
    size="icon"
    onClick={onClick}
    className={`rounded-full w-10 h-10 shadow-lg ${className}`}
  >
    <ChevronRight className="w-5 h-5" />
  </Button>
);

const DotButton = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-3 h-3 rounded-full transition-all duration-300 ${className}`}
  />
);
