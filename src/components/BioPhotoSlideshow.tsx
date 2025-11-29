import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BioPhoto {
  src: string;
  alt: string;
}

interface BioPhotoSlideshowProps {
  className?: string;
  interval?: number; // in milliseconds
  photos?: BioPhoto[];
}

// Default bio photos - using source images, build process will generate WebP versions
// Browser will serve the optimized versions through the build-time image processing
const defaultPhotos: BioPhoto[] = [
  { src: '/images/bio/bio-photo.jpg', alt: 'Jacob Darling - Professional portrait' },
  { src: '/images/bio/bio pic 2.png', alt: 'Jacob Darling - Portrait 2' },
  { src: '/images/bio/bio pic 3.png', alt: 'Jacob Darling - Portrait 3' },
  { src: '/images/bio/IMG_20230617_015647_366.jpg', alt: 'Jacob Darling - Portrait' },
  { src: '/images/bio/QVZlSmkxeURiak5tajdscg.jpeg', alt: 'Jacob Darling - Portrait' },
];

const BioPhotoSlideshow: React.FC<BioPhotoSlideshowProps> = ({
  className = '',
  interval = 4500,
  photos = defaultPhotos,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>([]);

  // Preload images
  useEffect(() => {
    const loadedState = new Array(photos.length).fill(false);
    photos.forEach((photo, index) => {
      const img = new Image();
      img.onload = () => {
        loadedState[index] = true;
        setIsLoaded([...loadedState]);
      };
      img.src = photo.src;
    });
  }, [photos]);

  // Auto-advance slideshow
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [interval, nextSlide]);

  const currentPhoto = photos[currentIndex];

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={currentPhoto.src}
          alt={currentPhoto.alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            opacity: { duration: 0.8, ease: 'easeInOut' },
            scale: { duration: 1.2, ease: 'easeOut' },
          }}
        />
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-brand-teal w-4'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BioPhotoSlideshow;
