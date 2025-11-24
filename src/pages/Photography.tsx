import React from 'react';
import { Helmet } from 'react-helmet-async';
import MasonryGallery from '../components/MasonryGallery';
import { GalleryImage } from '../components/MasonryGallery';
import photographyData from '../data/photography.json';

const Photography: React.FC = () => {
  // Load photography data from generated JSON
  const photos: GalleryImage[] = photographyData as GalleryImage[];

  return (
    <>
      <Helmet>
        <title>Visual Perspectives | Jacob Darling</title>
        <meta
          name="description"
          content="Beyond code and strategy, I capture the world through a lens. Explore my photography portfolio."
        />
      </Helmet>

      <div className="min-h-screen bg-brand-dark pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-4">
              Visual Perspectives
            </h1>
            <p className="text-xl text-brand-muted max-w-2xl">
              Beyond code and strategy, I capture the world through a lens.
            </p>
          </div>

          {/* Masonry Gallery */}
          <MasonryGallery images={photos} />
        </div>
      </div>
    </>
  );
};

export default Photography;
