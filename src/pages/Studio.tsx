import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { TabbedMasonryGallery } from '../components/ui/TabbedMasonryGallery';
import { 
  photographyItems, 
  designItems, 
  fallbackPhotographyItems, 
  fallbackDesignItems,
  type StudioItem 
} from '../data/studioData';

/**
 * Studio Page - Visual Engineering
 * 
 * A data-driven visual showcase featuring:
 * - Deep Slate background with proper layout structure
 * - Tabbed masonry gallery with context-aware HUD overlays
 * - Photography mode: Shows descriptive metadata
 * - Design mode: Shows color palettes (Hex codes)
 */
const Studio: React.FC = () => {
  const [photos, setPhotos] = useState<StudioItem[]>([]);
  const [designs, setDesigns] = useState<StudioItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useFallback, setUseFallback] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const loadAssets = async () => {
      try {
        // Check if local photography images exist by testing first item
        const testPhotoResponse = await fetch(photographyItems[0]?.src || '', { method: 'HEAD' });
        const testDesignResponse = await fetch(designItems[0]?.src || '', { method: 'HEAD' });

        if (mounted) {
          // Use curated items from studioData.ts if available
          if (testPhotoResponse.ok && photographyItems.length > 0) {
            setPhotos(photographyItems);
          } else {
            setPhotos(fallbackPhotographyItems);
            setUseFallback(true);
          }

          if (testDesignResponse.ok && designItems.length > 0) {
            setDesigns(designItems);
          } else {
            setDesigns(fallbackDesignItems);
          }
        }
      } catch {
        if (mounted) {
          setPhotos(fallbackPhotographyItems);
          setDesigns(fallbackDesignItems);
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

  return (
    <>
      <Helmet>
        <title>Visual Engineering | Studio</title>
        <meta
          name="description"
          content="Visual Engineering - A data-driven showcase of photography and graphic design work. Featuring context-aware overlays and color palette analysis."
        />
      </Helmet>

      {/* Deep Slate Background - War Room ecosystem integration */}
      <div className="min-h-screen bg-slate-900 relative">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 pointer-events-none" />
        
        {/* Main Content */}
        <main className="relative z-10 pt-24 pb-32 px-6">
          <section className="max-w-6xl mx-auto">
            {/* Header Section */}
            <motion.div 
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Visual <span className="text-brand-teal">Engineering</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Photography and design work powered by live manifests.
                <span className="block mt-1 text-slate-500 text-sm font-mono">
                  Hover for technical data overlays.
                </span>
              </p>
              
              {useFallback && (
                <motion.p 
                  className="text-sm text-brand-orange mt-4 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Displaying curated placeholder images. Run{' '}
                  <code className="bg-slate-800 px-2 py-0.5 rounded text-brand-teal">
                    npm run magic:assets
                  </code>{' '}
                  to populate with your content.
                </motion.p>
              )}
            </motion.div>

            {/* Gallery Section */}
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
                  <span className="text-brand-teal text-sm font-mono">
                    Loading visual assets...
                  </span>
                </div>
              </div>
            ) : photos.length > 0 || designs.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TabbedMasonryGallery
                  photographyItems={photos}
                  designItems={designs}
                  initialTab="photography"
                />
              </motion.div>
            ) : (
              <div className="text-slate-500 py-24 text-center">
                <p className="text-lg">No visual assets available.</p>
                <p className="text-sm mt-2 font-mono">
                  Run <code className="bg-slate-800 px-2 py-0.5 rounded">npm run magic:assets</code> to generate content.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Studio;
