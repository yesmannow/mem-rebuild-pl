/**
 * Image API Usage Examples
 *
 * This file demonstrates how to use the unified image service
 * with Pexels, Pixabay, and Unsplash APIs
 */

import React from 'react';
import { ApiImageGallery } from '../ui/ApiImageGallery';
import { ApiBackgroundImage } from '../ui/ApiBackgroundImage';
import { useUnifiedImage, useUnifiedImages, useCuratedImages, useThemedImages } from '../../hooks/useUnifiedImage';
import EnhancedImage from '../ui/EnhancedImage';

/**
 * Example 1: Single Image Hook
 */
export const SingleImageExample: React.FC = () => {
  const { image, isLoading, error } = useUnifiedImage('technology workspace', {
    preferredSource: 'pexels',
  });

  if (isLoading) return <div className="animate-pulse bg-brand-dark/50 h-64 rounded-lg" />;
  if (error || !image) return <div>Failed to load image</div>;

  return (
    <div className="relative h-64 rounded-lg overflow-hidden">
      <EnhancedImage
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white text-sm">{image.alt}</p>
        {image.photographer && (
          <p className="text-white/70 text-xs">Photo by {image.photographer}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Example 2: Multiple Images Hook
 */
export const MultipleImagesExample: React.FC = () => {
  const { images, isLoading } = useUnifiedImages({
    query: 'marketing strategy',
    perPage: 6,
    preferredSource: 'auto',
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-brand-dark/50 aspect-video rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, i) => (
        <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
          <EnhancedImage
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

/**
 * Example 3: Curated Images
 */
export const CuratedImagesExample: React.FC = () => {
  const { images, isLoading } = useCuratedImages(12);

  if (isLoading) {
    return <div className="text-center py-8">Loading curated images...</div>;
  }

  return (
    <ApiImageGallery
      curated
      count={12}
      columns={4}
      showAttribution
    />
  );
};

/**
 * Example 4: Themed Images
 */
export const ThemedImagesExample: React.FC = () => {
  const themes = ['technology', 'business', 'marketing', 'design'];
  const { images, isLoading } = useThemedImages(themes, 3);

  if (isLoading) {
    return <div className="text-center py-8">Loading themed images...</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Themed Image Gallery</h3>
      <ApiImageGallery
        themes={themes}
        count={12}
        columns={3}
      />
    </div>
  );
};

/**
 * Example 5: Background Image
 */
export const BackgroundImageExample: React.FC = () => {
  return (
    <section className="relative min-h-screen">
      <ApiBackgroundImage
        query="modern office workspace"
        source="pexels"
        overlayColor="dark"
        overlayOpacity={0.6}
      />
      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-4">
          Beautiful Background Images
        </h1>
        <p className="text-white/80 text-lg">
          Powered by Pexels, Pixabay, and Unsplash APIs
        </p>
      </div>
    </section>
  );
};

/**
 * Example 6: Image Gallery Component
 */
export const ImageGalleryExample: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Search Results Gallery</h2>
        <ApiImageGallery
          query="digital marketing"
          count={9}
          columns={3}
          showAttribution
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Themed Gallery</h2>
        <ApiImageGallery
          themes={['technology', 'business', 'innovation']}
          count={12}
          columns={4}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Curated Gallery</h2>
        <ApiImageGallery
          curated
          count={8}
          columns={2}
        />
      </div>
    </div>
  );
};

export default {
  SingleImageExample,
  MultipleImagesExample,
  CuratedImagesExample,
  ThemedImagesExample,
  BackgroundImageExample,
  ImageGalleryExample,
};
