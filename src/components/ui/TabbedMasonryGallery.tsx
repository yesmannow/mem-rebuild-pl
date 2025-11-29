/**
 * TabbedMasonryGallery - Visual Engineering Gallery Component
 *
 * A high-performance tabbed masonry gallery with context-aware overlays.
 * - Photography Mode: Shows descriptive metadata on hover
 * - Design Mode: Shows color palette (Hex codes) on hover via "HUD" overlay
 * - Glassmorphic tab navigation with animated indicator
 * - CSS Masonry layout with break-inside-avoid
 */

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera, Maximize2, Palette as PaletteIcon, X } from 'lucide-react';
import { Vibrant } from 'node-vibrant/browser';
import type { StudioItem } from '../../data/studioData';

export type GalleryTab = 'photography' | 'design';

interface TabbedMasonryGalleryProps {
  photographyItems: StudioItem[];
  designItems: StudioItem[];
  initialTab?: GalleryTab;
  activeTab?: GalleryTab;
  onTabChange?: (tab: GalleryTab) => void;
}

const paletteCache: Record<string, string[]> = {};

const TabbedMasonryGallery: React.FC<TabbedMasonryGalleryProps> = ({
  photographyItems,
  designItems,
  initialTab = 'photography',
  activeTab: controlledActiveTab,
  onTabChange,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<GalleryTab>(initialTab);
  const activeTab = controlledActiveTab ?? internalActiveTab;
  const setActiveTab = (tab: GalleryTab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [palettes, setPalettes] = useState<Record<string, string[]>>({});

  const tabs: { id: GalleryTab; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'photography',
      label: 'Photography',
      icon: <Camera size={16} />,
      color: '#FFA500' // Orange for photography
    },
    {
      id: 'design',
      label: 'Graphic Design',
      icon: <PaletteIcon size={16} />,
      color: '#40E0D0' // Teal for design
    },
  ];

  const currentItems = activeTab === 'photography' ? photographyItems : designItems;
  const activeTabConfig = tabs.find(t => t.id === activeTab);

  const showLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % currentItems.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + currentItems.length) % currentItems.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, currentItems.length]);

  const ensurePalette = async (src: string) => {
    if (paletteCache[src] || palettes[src]) return;
    try {
      const palette = await Vibrant.from(src).getPalette();
      const colors = Object.values(palette)
        .filter((swatch: unknown) => swatch && typeof (swatch as { getHex?: () => string }).getHex === 'function')
        .map((swatch: unknown) => (swatch as { getHex: () => string }).getHex()) as string[];
      paletteCache[src] = colors.slice(0, 6);
      setPalettes((prev) => ({ ...prev, [src]: colors.slice(0, 6) }));
    } catch {
      // Swallow palette errors to keep UI responsive
    }
  };

  const masonryItems = useMemo(
    () =>
      currentItems.map((item, idx) => ({
        ...item,
        idx,
        width: item.width ?? 400,
        height: item.height ?? (idx % 3 === 0 ? 600 : 400),
      })),
    [currentItems]
  );

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="w-full">
      {/* Glassmorphic Tab Navigation */}
      <div className="flex justify-center mb-10">
        <div className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-full p-1.5 inline-flex gap-1 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setLightboxIndex(null);
                setHoveredIndex(null);
              }}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 z-10 ${
                activeTab === tab.id
                  ? 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}

          {/* Animated Background Pill */}
          <motion.div
            layoutId="tabIndicator"
            className="absolute top-1.5 bottom-1.5 rounded-full"
            style={{
              backgroundColor: activeTabConfig?.color,
              boxShadow: `0 4px 20px ${activeTabConfig?.color}50`,
              left: activeTab === 'photography' ? '6px' : '50%',
              width: activeTab === 'photography' ? 'calc(50% - 8px)' : 'calc(50% - 8px)',
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          />
        </div>
      </div>

      {/* Masonry Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
        >
          {masonryItems.map((item) => {
            const isHovered = hoveredIndex === item.idx;
            const palette = palettes[item.src] || paletteCache[item.src];

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="break-inside-avoid overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 shadow-soft-dark transition-all duration-300 hover:border-brand-teal/40 hover:shadow-[0_8px_30px_rgba(64,224,208,0.25)] cursor-pointer group"
                onMouseEnter={() => {
                  setHoveredIndex(item.idx);
                  if (activeTab === 'design') {
                    void ensurePalette(item.src);
                  }
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => showLightbox(item.idx)}
              >
                <div className="relative">
                  {/* Image */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    width={item.width}
                    height={item.height}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Base Gradient Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* View Button */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="rounded-full bg-slate-900/80 px-3 py-1.5 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-lg">
                      <Maximize2 size={14} />
                      View
                    </span>
                  </div>

                  {/* HUD Overlay - Context Aware */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 p-4"
                      >
                        <div className="rounded-xl border border-white/10 bg-slate-900/85 backdrop-blur-xl p-3 shadow-xl">
                          {/* Header Row */}
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-1.5"
                              style={{ color: activeTabConfig?.color }}
                            >
                              {activeTab === 'photography' ? (
                                <>
                                  <Camera size={12} />
                                  Lens Mode
                                </>
                              ) : (
                                <>
                                  <PaletteIcon size={12} />
                                  Color DNA
                                </>
                              )}
                            </span>
                            {item.category && (
                              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                                {item.category}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-white font-semibold text-sm mb-2 truncate">
                            {item.title}
                          </h3>

                          {/* Meta Info - Context Aware */}
                          {activeTab === 'design' && palette ? (
                            // Design Mode: Show extracted color palette
                            <div className="flex gap-1">
                              {palette.slice(0, 6).map((color, i) => (
                                <div
                                  key={`${color}-${i}`}
                                  className="flex-1 flex flex-col items-center gap-1"
                                >
                                  <div
                                    className="w-full h-6 rounded border border-white/10"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                  />
                                  <span className="text-[9px] font-mono text-slate-400 uppercase">
                                    {color}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : activeTab === 'design' ? (
                            // Design Mode: Show preset hex codes from meta
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-xs px-2 py-1 rounded bg-slate-800 text-brand-teal border border-brand-teal/20">
                                {item.meta}
                              </code>
                            </div>
                          ) : (
                            // Photography Mode: Show descriptive meta
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs px-2 py-1 rounded bg-slate-800 text-brand-orange border border-brand-orange/20">
                                {item.meta}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center px-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItems[lightboxIndex].src}
                alt={currentItems[lightboxIndex].title}
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain"
              />

              {/* Lightbox Footer */}
              <div className="mt-4 flex items-center justify-between text-white">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.2em] mb-1"
                    style={{ color: activeTabConfig?.color }}
                  >
                    {activeTab === 'photography' ? 'Lens Mode' : 'Color DNA'}
                  </p>
                  <p className="text-xl font-semibold">
                    {currentItems[lightboxIndex].title}
                  </p>
                  <p className="text-sm text-slate-400 font-mono mt-1">
                    {currentItems[lightboxIndex].meta}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 mr-2">
                    {lightboxIndex + 1} / {currentItems.length}
                  </span>
                  <button
                    type="button"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10"
                    onClick={goPrev}
                    aria-label="Previous"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10"
                    onClick={goNext}
                    aria-label="Next"
                  >
                    <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10"
                    onClick={closeLightbox}
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { TabbedMasonryGallery };
export default TabbedMasonryGallery;
