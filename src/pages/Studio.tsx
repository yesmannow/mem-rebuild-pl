import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TabbedMasonryGallery, type GalleryTab } from '../components/ui/TabbedMasonryGallery';
import MagneticCursor from '../components/ui/MagneticCursor';
import { Camera, Palette, Sparkles } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<GalleryTab>('photography');

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const cursorColor = activeTab === 'photography' ? '#FFA500' : '#40E0D0';

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
          content="Visual Engineering - A cutting-edge showcase of photography and graphic design work. Featuring advanced filtering, 3D interactions, and intelligent color palette analysis."
        />
      </Helmet>

      {/* Magnetic Cursor Effect */}
      <MagneticCursor color={cursorColor} enabled={true} />

      {/* Deep Slate Background - War Room ecosystem integration */}
      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        {/* Animated gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 pointer-events-none" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{
              background: activeTab === 'photography' 
                ? 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(64,224,208,0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{
              background: activeTab === 'photography' 
                ? 'radial-gradient(circle, rgba(64,224,208,0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Main Content */}
        <main className="relative z-10 pt-24 pb-32 px-6">
          <section className="max-w-6xl mx-auto">
            {/* Header Section with Parallax */}
            <motion.div
              className="mb-12 text-center"
              style={{ y: headerY, opacity: headerOpacity }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <Sparkles className="text-brand-teal" size={32} />
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                  Visual <span className="text-brand-teal">Engineering</span>
                </h1>
                <Sparkles className="text-brand-orange" size={32} />
              </motion.div>
              <motion.p
                className="text-lg text-slate-400 max-w-2xl mx-auto mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                An interactive showcase featuring advanced filtering, 3D tilt effects, and intelligent sorting.
                <span className="block mt-2 text-slate-500 text-sm font-mono">
                  🎨 Filter by category • 🔄 Shuffle • 🔍 Search • ↕️ Sort • 🖱️ 3D interactions
                </span>
              </motion.p>

              <motion.div
                className="intro-section max-w-3xl mx-auto text-left bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className="text-slate-300 leading-relaxed mb-4">
                  This gallery showcases my visual work with cutting-edge interactions. Experience <strong>3D tilt effects</strong> on hover,
                  intelligent <strong>category filtering</strong>, and smooth <strong>parallax scrolling</strong>. Each piece is dynamically loaded
                  and features context-aware overlays showing technical metadata and color palettes. Use the advanced filtering controls to
                  explore by category, sort by different criteria, or shuffle for inspiration.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="px-3 py-1 bg-brand-teal/20 border border-brand-teal/30 rounded-full text-sm text-brand-teal flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                    3D Interactions
                  </span>
                  <span className="px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-sm text-brand-orange flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                    Smart Filtering
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    Parallax Scroll
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

            {/* Hero Intro Section - Context Aware */}
            {!isLoading && (photos.length > 0 || designs.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-16"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-950/80 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
                  >
                    {/* Background gradient based on tab */}
                    <div
                      className="absolute inset-0 opacity-10 transition-opacity duration-500"
                      style={{
                        background: activeTab === 'photography'
                          ? 'radial-gradient(circle at 30% 50%, rgba(255,165,0,0.3), transparent 70%)'
                          : 'radial-gradient(circle at 30% 50%, rgba(64,224,208,0.3), transparent 70%)',
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="p-4 rounded-2xl backdrop-blur-md border transition-all duration-300"
                          style={{
                            backgroundColor: activeTab === 'photography' ? 'rgba(255,165,0,0.15)' : 'rgba(64,224,208,0.15)',
                            borderColor: activeTab === 'photography' ? 'rgba(255,165,0,0.3)' : 'rgba(64,224,208,0.3)',
                          }}
                        >
                          {activeTab === 'photography' ? (
                            <Camera size={32} className="text-brand-orange" />
                          ) : (
                            <Palette size={32} className="text-brand-teal" />
                          )}
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {activeTab === 'photography' ? 'Photography' : 'Graphic Design'}
                          </h2>
                          <div
                            className="h-1 w-20 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: activeTab === 'photography' ? '#FFA500' : '#40E0D0',
                            }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      {activeTab === 'photography' ? (
                        <div className="space-y-4">
                          <p className="text-lg text-slate-300 leading-relaxed">
                            Capturing moments through the lens with a focus on composition, lighting, and storytelling.
                            My photography work spans commercial campaigns, brand documentation, and creative portraiture.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                              <h3 className="text-brand-orange font-semibold mb-2 text-sm uppercase tracking-wider">Commercial</h3>
                              <p className="text-slate-400 text-sm">Product photography, brand campaigns, and marketing visuals that tell your story.</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                              <h3 className="text-brand-orange font-semibold mb-2 text-sm uppercase tracking-wider">Portraiture</h3>
                              <p className="text-slate-400 text-sm">Professional headshots and character-driven portraits that capture personality.</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                              <h3 className="text-brand-orange font-semibold mb-2 text-sm uppercase tracking-wider">Documentation</h3>
                              <p className="text-slate-400 text-sm">Event coverage, behind-the-scenes, and brand documentation photography.</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-lg text-slate-300 leading-relaxed">
                            Crafting visual identities and design systems that communicate brand values and engage audiences.
                            From logo design to complete brand systems, I create cohesive visual experiences.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                              <h3 className="text-brand-teal font-semibold mb-2 text-sm uppercase tracking-wider">Brand Identity</h3>
                              <p className="text-slate-400 text-sm">Complete brand systems including logos, color palettes, typography, and style guides.</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                              <h3 className="text-brand-teal font-semibold mb-2 text-sm uppercase tracking-wider">Visual Design</h3>
                              <p className="text-slate-400 text-sm">Marketing materials, social media graphics, and digital assets that drive engagement.</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                              <h3 className="text-brand-teal font-semibold mb-2 text-sm uppercase tracking-wider">Color Systems</h3>
                              <p className="text-slate-400 text-sm">Strategic color palette development and implementation across all brand touchpoints.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Full Gallery Section */}
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
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <TabbedMasonryGallery
                  photographyItems={photos}
                  designItems={designs}
                  initialTab="photography"
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
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
