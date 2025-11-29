import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SmartGallery } from '../components/SmartGallery';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import { loadPhotography, type PhotoItem } from '../utils/loadPhotography';

const Studio: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    loadPhotography()
      .then((data) => {
        if (mounted) {
          setPhotos(data);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>The Studio | Visual Engineering & Creative Direction</title>
        <meta
          name="description"
          content="Visual Engineering & Creative Direction. Explore photography and design work by Jacob Darling."
        />
      </Helmet>

      <OceanAuroraBackground>
        <main className="min-h-screen relative z-10 pt-24 pb-12 px-6">
          <section className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-brand-teal mb-3">Visual Engineering</h1>
              <p className="text-lg text-brand-muted">
                Photography selections powered by the live manifest to keep every capture in sync.
              </p>
            </div>

            {photos.length > 0 ? (
              <SmartGallery items={photos} mode="photo" />
            ) : (
              <div className="text-brand-muted">
                {isLoading ? 'Loading visual assets...' : 'No photography assets available.'}
              </div>
            )}
          </section>
        </main>
      </OceanAuroraBackground>
    </>
  );
};

export default Studio;
