import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { TabbedMasonryGallery } from '../components/ui/TabbedMasonryGallery';
import {
  photographyItems,
  designItems,
  fallbackPhotographyItems,
  fallbackDesignItems,
  type StudioItem,
} from '../data/studioData';
import { manifestToStudioItems } from '../utils/studioManifest';

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

    const fetchManifest = async (path: string): Promise<string[] | null> => {
      try {
        const response = await fetch(path, { cache: 'no-store' });
        if (!response.ok) return null;
        const payload = await response.json();
        return Array.isArray(payload) ? payload : null;
      } catch {
        return null;
      }
    };

    const loadAssets = async () => {
      try {
        const [photoManifest, designManifest] = await Promise.all([
          fetchManifest('/images/photography/manifest.json'),
          fetchManifest('/images/design/manifest.json'),
        ]);

        if (!mounted) return;

        const manifestPhotos = manifestToStudioItems(photoManifest, 'photography');
        const manifestDesigns = manifestToStudioItems(designManifest, 'design');

        const resolvedPhotos = manifestPhotos.length
          ? manifestPhotos
          : photographyItems.length
            ? photographyItems
            : fallbackPhotographyItems;

        const resolvedDesigns = manifestDesigns.length
          ? manifestDesigns
          : designItems.length
            ? designItems
            : fallbackDesignItems;

        setPhotos(resolvedPhotos);
        setDesigns(resolvedDesigns);
        setUseFallback(!(manifestPhotos.length && manifestDesigns.length));
      } catch {
        if (!mounted) return;
        setPhotos(fallbackPhotographyItems);
        setDesigns(fallbackDesignItems);
        setUseFallback(true);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadAssets();

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
              <motion.p
                className="text-lg text-slate-400 max-w-2xl mx-auto mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Photography and design work powered by live manifests.
                <span className="block mt-1 text-slate-500 text-sm font-mono">
                  Hover for technical data overlays.
                </span>
              </motion.p>

              <motion.div
                className="intro-section max-w-3xl mx-auto text-left bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className="text-slate-300 leading-relaxed mb-4">
                  This gallery showcases my visual work across photography and graphic design. Each piece represents
                  a blend of technical precision and creative vision—from brand identity systems to campaign photography.
                  The collection is dynamically loaded from live manifests, ensuring you're seeing the most current work.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="px-3 py-1 bg-brand-teal/20 border border-brand-teal/30 rounded-full text-sm text-brand-teal">
                    Photography
                  </span>
                  <span className="px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-sm text-brand-orange">
                    Design Systems
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-slate-300">
                    Live Data
                  </span>
                </div>
              </motion.div>

              {useFallback && (
                <motion.p
                  className="text-sm text-brand-orange mt-4 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Some manifest assets are unavailable, so curated placeholders are filling the gaps. Run{' '}
                  <code className="bg-slate-800 px-2 py-0.5 rounded text-brand-teal">
                    npm run magic:assets
                  </code>{' '}
                  to regenerate the image manifests and sync your full gallery.
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
