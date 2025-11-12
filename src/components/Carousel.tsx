import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
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

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      } else if (event.key === 'Home') {
        event.preventDefault();
        scrollTo(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        scrollTo(children.length - 1);
      }
    },
    [scrollPrev, scrollNext, scrollTo, children.length]
  );

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
      aria-roledescription="carousel"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocus={() => pauseOnHover && setIsPaused(true)}
      onBlur={() => pauseOnHover && setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
    >
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container-inner">
          {children.map((child, index) => (
            <div
              key={index}
              className="carousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${children.length}`}
            >
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
            tabIndex={0}
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            className="carousel-button carousel-button-next"
            onClick={scrollNext}
            aria-label="Next slide"
            type="button"
            tabIndex={0}
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </>
      )}

      {showDots && (
        <div className="carousel-dots" role="tablist" aria-label="Carousel pagination">
          {children.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === selectedIndex}
              aria-current={index === selectedIndex ? 'true' : 'false'}
              role="tab"
              type="button"
              tabIndex={0}
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
