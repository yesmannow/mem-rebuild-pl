import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroProfileCarousel.css';

interface HeroProfileCarouselProps {
  images?: string[];
  className?: string;
  interval?: number; // in milliseconds, default 4000 (4 seconds)
}

/**
 * HeroProfileCarousel - Premium bio photo carousel with tech-themed transitions
 * Features:
 * - Auto-rotates every 4 seconds
 * - Pauses on hover
 * - Scanline/glitch dissolve effect on image change
 * - Glass panel with glowing turquoise border
 * - Dash indicators at bottom
 */
const HeroProfileCarousel: React.FC<HeroProfileCarouselProps> = ({
  images = [
    '/images/bio/bio pic 2.png',
    '/images/bio/bio pic 3.png',
    '/images/bio/bio-photo.jpg',
    '/images/bio/IMG_20230707_235448_262~2.jpg',
    '/images/bio/QVZlSmkxeURiak5tajdscg.jpeg',
  ],
  className = '',
  interval = 4000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate every 4 seconds (or custom interval)
  useEffect(() => {
    if (images.length <= 1 || isHovered) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, interval, isHovered]);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    // Reset interval when manually changing
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className={`hero-profile-carousel ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass Panel Container */}
      <div className="hero-profile-carousel__glass-panel">
        {/* Image Container with Scanline Effect */}
        <div className="hero-profile-carousel__image-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="hero-profile-carousel__image-wrapper"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <img
                src={images[activeIndex]}
                alt={`Jacob Darling - Profile ${activeIndex + 1}`}
                className="hero-profile-carousel__image"
                loading={activeIndex === 0 ? 'eager' : 'lazy'}
              />

              {/* Scanline Effect Overlay */}
              <motion.div
                className="hero-profile-carousel__scanline"
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: '200%', opacity: [0, 0.6, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dash Indicators */}
        {images.length > 1 && (
          <div className="hero-profile-carousel__indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`hero-profile-carousel__indicator ${
                  index === activeIndex ? 'hero-profile-carousel__indicator--active' : ''
                }`}
                onClick={() => handleIndicatorClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroProfileCarousel;
