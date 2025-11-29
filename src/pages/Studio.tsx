import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Camera, Palette } from 'lucide-react';
import { SmartGallery } from '../components/SmartGallery';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import { loadPhotography, type PhotoItem } from '../utils/loadPhotography';
import { loadDesignAssets } from '../utils/loadDesign';

type ActiveTab = 'photography' | 'design';

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
  const [activeTab, setActiveTab] = useState<ActiveTab>('photography');
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [designAssets, setDesignAssets] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useFallback, setUseFallback] = useState<boolean>(false);

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'photography', label: 'Photography', icon: <Camera size={16} /> },
    { id: 'design', label: 'Graphic Design', icon: <Palette size={16} /> },
  ];

  useEffect(() => {
    let mounted = true;

    const loadAssets = async () => {
      try {
        const [photoData, designData] = await Promise.all([
          loadPhotography(),
          loadDesignAssets(),
        ]);

        if (mounted) {
          if (photoData && photoData.length > 0) {
            setPhotos(photoData);
          } else {
            setPhotos(FALLBACK_PHOTOS);
            setUseFallback(true);
          }

          if (designData && designData.length > 0) {
            setDesignAssets(designData);
          }
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Failed to load assets:', error);
        }
        if (mounted) {
          setPhotos(FALLBACK_PHOTOS);
          setUseFallback(true);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadAssets();

    return () => {
      mounted = false;
    };
  }, []);

  const currentItems = activeTab === 'photography' ? photos : designAssets;
  const currentMode = activeTab === 'photography' ? 'photo' : 'design';

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
                Photography and design work powered by live manifests to keep every capture in sync.
              </p>
              {useFallback && activeTab === 'photography' && (
                <p className="text-sm text-brand-orange mt-2 italic">
                  Displaying curated placeholder images. Run <code className="bg-slate-800 px-2 py-0.5 rounded">npm run magic:assets</code> to populate with your content.
                </p>
              )}
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-full p-2 inline-flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-brand-teal text-brand-dark shadow-[0_10px_30px_rgba(64,224,208,0.35)]'
                        : 'text-brand-muted hover:text-brand-text hover:bg-slate-800/60'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-pulse text-brand-teal">Loading visual assets...</div>
              </div>
            ) : currentItems.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SmartGallery items={currentItems} mode={currentMode} />
              </motion.div>
            ) : (
              <div className="text-brand-muted py-12 text-center">
                No {activeTab === 'photography' ? 'photography' : 'design'} assets available.
              </div>
            )}
          </section>
        </main>
      </OceanAuroraBackground>
    </>
  );
};

export default Studio;
