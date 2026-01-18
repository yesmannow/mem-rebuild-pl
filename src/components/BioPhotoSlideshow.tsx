import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BioPhoto {
  src: string;
  fallback?: string;
  alt: string;
}

interface BioPhotoSlideshowProps {
  className?: string;
  interval?: number; // in milliseconds
  photos?: BioPhoto[];
}

// Default bio photos - using optimized formats with proper fallback chain
// Format priority in <picture>: AVIF (best) -> WebP (good) -> PNG (universal)
const defaultPhotos: BioPhoto[] = [
  {
    src: '/images/bio/bio-photo.webp',
    fallback: '/images/bio/bio-photo.avif', // AVIF in source, WebP fallback, PNG in img src
    alt: 'Jacob Darling - Professional portrait'
  },
  {
    src: '/images/bio/bio pic 2.webp',
    fallback: '/images/bio/bio pic 2.png', // PNG fallback (user confirmed this exists)
    alt: 'Jacob Darling - Portrait 2'
  },
  {
    src: '/images/bio/bio pic 3.webp',
    fallback: '/images/bio/bio pic 3.png', // PNG fallback (user confirmed this exists)
    alt: 'Jacob Darling - Portrait 3'
  },
  {
    src: '/images/bio/IMG_20230617_015647_366.webp',
    fallback: '/images/bio/IMG_20230617_015647_366.avif',
    alt: 'Jacob Darling - Portrait'
  },
  {
    src: '/images/bio/QVZlSmkxeURiak5tajdscg.webp',
    fallback: '/images/bio/QVZlSmkxeURiak5tajdscg.avif',
    alt: 'Jacob Darling - Portrait'
  },
];

const BioPhotoSlideshow: React.FC<BioPhotoSlideshowProps> = ({
  className = '',
  interval = 4500,
  photos = defaultPhotos,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload images with error handling
  useEffect(() => {
    photos.forEach((photo, index) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(index));
      };
      img.onerror = () => {
        setFailedImages(prev => new Set(prev).add(index));
      };
      img.src = photo.src;
    });
  }, [photos]);

  // Filter out failed images for slideshow
  const validPhotos = photos.filter((_, index) => !failedImages.has(index));
  const validIndices = photos.map((_, i) => i).filter(i => !failedImages.has(i));

  // Auto-advance slideshow
  const nextSlide = useCallback(() => {
    if (validPhotos.length === 0) return;
    setCurrentIndex((prev) => {
      const currentValidIndex = validIndices.indexOf(prev);
      const nextValidIndex = (currentValidIndex + 1) % validIndices.length;
      return validIndices[nextValidIndex];
    });
    // Reset image loaded state when changing slides
    setImageLoaded(false);
  }, [validPhotos.length, validIndices]);

  useEffect(() => {
    if (validPhotos.length === 0) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [interval, nextSlide, validPhotos.length]);

  // Reset image loaded state when current index changes
  useEffect(() => {
    setImageLoaded(loadedImages.has(currentIndex));

    // Fallback: ensure image becomes visible after a short delay even if load event doesn't fire
    const fallbackTimer = setTimeout(() => {
      setImageLoaded(true);
    }, 500);

    return () => clearTimeout(fallbackTimer);
  }, [currentIndex, loadedImages]);

  // If no valid photos, show nothing
  if (validPhotos.length === 0) {
    return null;
  }

  const currentPhoto = photos[currentIndex];
  const isCurrentImageLoaded = loadedImages.has(currentIndex);

  // Handle image load event to ensure animation triggers
  const handleImageLoad = () => {
    setImageLoaded(true);
    setLoadedImages(prev => new Set(prev).add(currentIndex));
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: (isCurrentImageLoaded || imageLoaded) ? 1 : 0.7, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            opacity: { duration: 0.8, ease: 'easeInOut' },
            scale: { duration: 1.2, ease: 'easeOut' },
          }}
        >
          <picture className="absolute inset-0 w-full h-full">
            {/* Try AVIF first (best compression, smallest file size) */}
            {currentPhoto.fallback && currentPhoto.fallback.endsWith('.avif') && (
              <source srcSet={currentPhoto.fallback} type="image/avif" />
            )}
            {/* Fallback to WebP (good browser support, good compression) */}
            {currentPhoto.src.endsWith('.webp') && (
              <source srcSet={currentPhoto.src} type="image/webp" />
            )}
            {/* Final fallback: Use PNG if fallback is PNG, otherwise derive PNG from src */}
            <img
              src={
                currentPhoto.fallback && !currentPhoto.fallback.endsWith('.avif')
                  ? currentPhoto.fallback // Use explicit PNG fallback
                  : currentPhoto.src.replace(/\.(webp|avif)$/i, '.png') // Derive PNG from src
              }
              alt={currentPhoto.alt}
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={handleImageLoad}
              onError={() => {
                // If PNG also fails, mark image as failed
                setFailedImages(prev => new Set(prev).add(currentIndex));
              }}
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators - only show for valid images */}
      {validPhotos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {validIndices.map((originalIndex) => (
            <button
              key={originalIndex}
              onClick={() => setCurrentIndex(originalIndex)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                originalIndex === currentIndex
                  ? 'bg-brand-teal w-4'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${validIndices.indexOf(originalIndex) + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BioPhotoSlideshow;
