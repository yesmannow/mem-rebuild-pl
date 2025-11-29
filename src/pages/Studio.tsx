import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SmartGallery } from '../components/SmartGallery';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import { loadPhotography, type PhotoItem } from '../utils/loadPhotography';

// Fallback placeholder images when manifest is empty or fails to load
const FALLBACK_PHOTOS: PhotoItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    width: 800,
    height: 600,
    alt: 'Abstract tech patterns - creative direction',
    key: 'fallback-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    width: 800,
    height: 1000,
    alt: 'Retro tech design aesthetic',
    key: 'fallback-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    width: 800,
    height: 600,
    alt: 'Technology circuits and engineering',
    key: 'fallback-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    width: 800,
    height: 1000,
    alt: 'Digital matrix visualization',
    key: 'fallback-4',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    width: 800,
    height: 600,
    alt: 'Earth from space - global perspective',
    key: 'fallback-5',
  },
  {
    src: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80',
    width: 800,
    height: 800,
    alt: 'Neon lights and urban design',
    key: 'fallback-6',
  },
];

const Studio: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useFallback, setUseFallback] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    loadPhotography()
      .then((data) => {
        if (mounted) {
          // Debug: Log loaded photos
          console.log('Loaded Photos:', data);
          
          if (data && data.length > 0) {
            setPhotos(data);
          } else {
            // Use fallback if no photos loaded
            console.log('No photos in manifest, using fallback images');
            setPhotos(FALLBACK_PHOTOS);
            setUseFallback(true);
          }
        }
      })
      .catch((error) => {
        console.warn('Failed to load photography manifest:', error);
        if (mounted) {
          setPhotos(FALLBACK_PHOTOS);
          setUseFallback(true);
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
              <h1 className="text-4xl font-bold text-brand-teal mb-3 drop-shadow-neon">Visual Engineering</h1>
              <p className="text-lg text-brand-muted">
                Photography selections powered by the live manifest to keep every capture in sync.
              </p>
              {useFallback && (
                <p className="text-sm text-brand-orange mt-2 italic">
                  Displaying curated placeholder images. Run <code className="bg-slate-800 px-2 py-0.5 rounded">npm run magic:assets</code> to populate with your content.
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-pulse text-brand-teal">Loading visual assets...</div>
              </div>
            ) : photos.length > 0 ? (
              <SmartGallery items={photos} mode="photo" />
            ) : (
              <div className="text-brand-muted py-12 text-center">
                No photography assets available.
              </div>
            )}
          </section>
        </main>
      </OceanAuroraBackground>
    </>
  );
};

export default Studio;
