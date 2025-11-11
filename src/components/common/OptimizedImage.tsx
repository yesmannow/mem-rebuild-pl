import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  loading = 'lazy',
  onClick,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate WebP and AVIF sources
  const getOptimizedSources = (originalSrc: string) => {
    const basePath = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop()?.toLowerCase();

    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      original: originalSrc,
    };
  };

  const sources = getOptimizedSources(src);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || priority) {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading, priority]);

  const handleLoad = () => {
    setIsLoaded(true);

    // Performance monitoring (dev only)
    if (
      process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined' &&
      'performance' in window
    ) {
      const loadTime = performance.now();
      console.log(`🖼️ Image loaded: ${src} (${loadTime.toFixed(2)}ms)`);
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    if (process.env.NODE_ENV === 'development') {
      console.warn(`❌ Image failed to load: ${src}`);
    }
  };

  return (
    <div
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      onClick={onClick}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <motion.div
          className="image-placeholder"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(59, 130, 246, 0.3)',
              borderTop: '3px solid #3B82F6',
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      {/* Optimized image with fallbacks */}
      {isInView && (
        <motion.picture
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          {/* AVIF source for modern browsers */}
          <source srcSet={sources.avif} type="image/avif" sizes={sizes} />

          {/* WebP source for wider compatibility */}
          <source srcSet={sources.webp} type="image/webp" sizes={sizes} />

          {/* Fallback to original format */}
          <img
            src={sources.original}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: hasError ? 'grayscale(100%)' : 'none',
            }}
            sizes={sizes}
          />
        </motion.picture>
      )}

      {/* Error state */}
      {hasError && (
        <motion.div
          className="image-error"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444',
            fontSize: '0.875rem',
            textAlign: 'center',
            padding: '1rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <p style={{ margin: '8px 0 0 0' }}>Image unavailable</p>
          </div>
        </motion.div>
      )}

      {/* Cinematic overlay for hover effects */}
      <motion.div
        className="image-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(236,72,153,0.1) 100%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default OptimizedImage;
