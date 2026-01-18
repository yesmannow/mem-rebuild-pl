/**
 * API Image Gallery Component
 *
 * Displays a beautiful gallery of images fetched from Pexels, Pixabay, or Unsplash
 * Perfect for showcasing visual content throughout the site
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useUnifiedImages, useCuratedImages, useThemedImages } from '../../hooks/useUnifiedImage';
import EnhancedImage from './EnhancedImage';

export interface ApiImageGalleryProps {
  query?: string;
  themes?: string[];
  curated?: boolean;
  count?: number;
  columns?: 2 | 3 | 4;
  showAttribution?: boolean;
  className?: string;
  onImageClick?: (imageUrl: string) => void;
}

export const ApiImageGallery: React.FC<ApiImageGalleryProps> = ({
  query,
  themes,
  curated = false,
  count = 12,
  columns = 3,
  showAttribution = true,
  className = '',
  onImageClick,
}) => {
  const themeList = themes ?? [];
  const hasThemes = themeList.length > 0;
  const themeCount = hasThemes ? Math.ceil(count / themeList.length) : 0;

  const curatedData = useCuratedImages(count, curated);
  const themedData = useThemedImages(themeList, themeCount, hasThemes);
  const unifiedData = useUnifiedImages({
    query: query || 'technology',
    perPage: count,
    enabled: !curated && !hasThemes,
  });

  const selectedHook = curated
    ? curatedData
    : hasThemes
      ? themedData
      : unifiedData;

  const { images, isLoading, error } = selectedHook;

  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="aspect-video bg-brand-dark/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error || !images.length) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-brand-teal/60">Unable to load images at this time.</p>
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`${gridCols[columns]} gap-4 ${className}`}>
      {images.map((image, index) => (
        <motion.div
          key={`${image.source}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer"
          onClick={() => onImageClick?.(image.url)}
        >
          <EnhancedImage
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            overlayColor="dark"
            overlayOpacity={0.3}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-medium mb-1">{image.alt}</p>
              {showAttribution && image.photographer && (
                <p className="text-white/70 text-xs">
                  Photo by{' '}
                  {image.photographer_url ? (
                    <a
                      href={image.photographer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {image.photographer}
                    </a>
                  ) : (
                    image.photographer
                  )}
                  {' '}on {image.source === 'pexels' ? 'Pexels' : image.source === 'pixabay' ? 'Pixabay' : 'Unsplash'}
                </p>
              )}
            </div>
          </div>

          {/* Source Badge */}
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/80">
            {image.source}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ApiImageGallery;
