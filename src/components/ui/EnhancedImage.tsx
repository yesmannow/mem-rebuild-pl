/**
 * EnhancedImage Component
 * 
 * A responsive image component with:
 * - Lazy loading
 * - Blur-up placeholder
 * - Brand color overlay
 * - Accessibility features
 * - Automatic AVIF/WebP picture element generation
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedImageProps {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  overlayColor?: 'turquoise' | 'orange' | 'dark' | 'none' | 'light' | 'brand';
  overlayOpacity?: number;
  lazy?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  priority?: boolean;
  usePicture?: boolean; // Enable <picture> with AVIF/WebP sources
}

export const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  placeholderSrc,
  className = '',
  overlayColor = 'none',
  overlayOpacity = 0.5,
  lazy = true,
  aspectRatio,
  objectFit = 'cover',
  priority = false,
  usePicture = true, // Default to true for modern format support
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [imageSrc, setImageSrc] = useState(placeholderSrc || '');
  const [error, setError] = useState(false);

  const overlayColors = {
    turquoise: 'rgba(64, 224, 208, 0.3)',
    orange: 'rgba(255, 165, 0, 0.3)',
    dark: 'rgba(15, 23, 42, 0.6)',
    light: 'rgba(255, 255, 255, 0.35)',
    brand: 'rgba(0, 255, 255, 0.35)',
    none: 'transparent',
  };

  useEffect(() => {
    if (!lazy || priority || isInView) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };

      img.onerror = () => {
        setError(true);
        setIsLoaded(true);
      };

      img.src = src;
    }
  }, [src, lazy, priority, isInView]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (lazy && !priority) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );

      const element = document.getElementById(`enhanced-img-${src}`);
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [lazy, priority, src]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-900/50 ${className}`}
        style={{ aspectRatio }}
      >
        <p className="text-brand-muted text-sm">Image failed to load</p>
      </div>
    );
  }

  return (
    <div
      id={`enhanced-img-${src}`}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <AnimatePresence mode="wait">
        {!isLoaded && placeholderSrc && (
          <motion.img
            key="placeholder"
            src={placeholderSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full blur-xl scale-110"
            style={{ objectFit }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {(isLoaded || imageSrc) && (
          usePicture ? (
            <motion.picture
              key="main"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <source
                srcSet={imageSrc.replace(/\.(webp|jpg|jpeg|png)$/i, '.avif')}
                type="image/avif"
              />
              <source
                srcSet={imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                type="image/webp"
              />
              <img
                src={imageSrc}
                alt={alt}
                className="w-full h-full"
                style={{ objectFit }}
                loading={lazy && !priority ? 'lazy' : 'eager'}
              />
            </motion.picture>
          ) : (
            <motion.img
              key="main"
              src={imageSrc}
              alt={alt}
              className="absolute inset-0 w-full h-full"
              style={{ objectFit }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              loading={lazy && !priority ? 'lazy' : 'eager'}
            />
          )
        )}
      </AnimatePresence>

      {/* Brand color overlay */}
      {overlayColor !== 'none' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: overlayColors[overlayColor],
            opacity: overlayOpacity,
            mixBlendMode: 'multiply',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: overlayOpacity }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}

      {/* Gradient overlay for text readability */}
      {overlayColor !== 'none' && (
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-brand-dark/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
    </div>
  );
};

export default EnhancedImage;
