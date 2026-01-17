import React from 'react';
import { Helmet } from 'react-helmet-async';
import MasonryGallery from '../components/MasonryGallery';
import { GalleryImage } from '../components/MasonryGallery';
import photographyData from '../data/photography.json';
import { ApiImageGallery } from '../components/ui/ApiImageGallery';
import { ApiBackgroundImage } from '../components/ui/ApiBackgroundImage';

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
        {/* Hero Section with API Background */}
        <section className="relative min-h-[50vh] flex items-center mb-16 overflow-hidden">
          <ApiBackgroundImage
            query="photography creative art visual"
            source="pexels"
            overlayColor="dark"
            overlayOpacity={0.75}
            className="absolute inset-0 z-0"
            priority
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-4">
              Visual Perspectives
            </h1>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto">
              Beyond code and strategy, I capture the world through a lens.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Featured API Images Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6 text-center">
              Featured Visual Inspiration
            </h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-8 text-center">
              Curated high-quality imagery that inspires creative work and visual storytelling.
            </p>
            <ApiImageGallery
              curated
              count={12}
              columns={4}
              showAttribution
            />
          </section>

          {/* Personal Photography Gallery */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6 text-center">
              Personal Photography Collection
            </h2>
            <MasonryGallery images={photos} />
          </section>
        </div>
      </div>
    </>
  );
};

export default Photography;
