import React from 'react';
import { Helmet } from 'react-helmet-async';
import MasonryGallery from '../components/MasonryGallery';
import { GalleryImage } from '../components/MasonryGallery';
import designData from '../data/design.json';

const Design: React.FC = () => {
  // Load design data from generated JSON
  const designs: GalleryImage[] = designData as GalleryImage[];

  return (
    <>
      <Helmet>
        <title>Creative Direction | Jacob Darling</title>
        <meta
          name="description"
          content="Design is problem-solving with style. Explore my design portfolio."
        />
      </Helmet>

      <div className="min-h-screen bg-brand-dark pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-4">
              Creative Direction
            </h1>
            <p className="text-xl text-brand-muted max-w-2xl">
              Design is problem-solving with style.
            </p>
          </div>

          {/* Masonry Gallery */}
          <MasonryGallery images={designs} />
        </div>
      </div>
    </>
  );
};

export default Design;
