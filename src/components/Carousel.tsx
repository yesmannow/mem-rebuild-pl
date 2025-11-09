import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  ariaLabel?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  pauseOnHover = true,
  ariaLabel = 'Carousel',
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused || !emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, emblaApi]);

  if (!children || children.length === 0) return null;

  return (
    <div
      className="carousel-container"
      aria-label={ariaLabel}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocus={() => pauseOnHover && setIsPaused(true)}
      onBlur={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container-inner">
          {children.map((child, index) => (
            <div key={index} className="carousel-slide">
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            className="carousel-button carousel-button-prev"
            onClick={scrollPrev}
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="carousel-button carousel-button-next"
            onClick={scrollNext}
            aria-label="Next slide"
            type="button"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {showDots && (
        <div className="carousel-dots" role="tablist" aria-label="Carousel navigation">
          {children.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === selectedIndex}
              role="tab"
              type="button"
            />
          ))}
        </div>
      )}

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {selectedIndex + 1} of {children.length}
      </div>
    </div>
  );
};

export default Carousel;

