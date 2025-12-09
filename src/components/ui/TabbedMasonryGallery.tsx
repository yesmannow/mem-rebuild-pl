/**
 * TabbedMasonryGallery - Enhanced Visual Engineering Gallery Component
 *
 * A high-performance tabbed masonry gallery with cutting-edge interactions:
 * - Photography Mode: Shows descriptive metadata on hover
 * - Design Mode: Shows color palette (Hex codes) on hover via "HUD" overlay
 * - Glassmorphic tab navigation with animated indicator
 * - CSS Masonry layout with break-inside-avoid
 * - Advanced filtering, sorting, and shuffling
 * - 3D tilt effects and magnetic cursor interactions
 * - Smooth parallax scrolling
 * - Enhanced lightbox with swipe gestures
 */

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera, Maximize2, Palette as PaletteIcon, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Vibrant } from 'node-vibrant/browser';
import type { StudioItem } from '../../data/studioData';
import StudioFilterBar, { type SortOption } from './StudioFilterBar';
import EnhancedGalleryCard from './EnhancedGalleryCard';

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
  
  // Enhanced filtering and sorting state (category filtering removed)
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [shuffleKey, setShuffleKey] = useState<number>(0);
  
  // Lightbox zoom state
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);
  
  // Magnetic cursor effect
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorScale = useSpring(1, { stiffness: 400, damping: 30 });

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
      if (e.key === 'Escape') {
        closeLightbox();
        setLightboxZoom(1);
      }
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      // Zoom controls
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setLightboxZoom(prev => Math.min(prev + 0.25, 3));
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setLightboxZoom(prev => Math.max(prev - 0.25, 0.5));
      }
      if (e.key === '0') {
        e.preventDefault();
        setLightboxZoom(1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, currentItems.length]);

  // Swipe gesture handlers for lightbox
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - dragStartX.current;
    
    // Swipe threshold: 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  };

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

  // Filter, sort, and shuffle items (category filtering removed)
  const masonryItems = useMemo(() => {
    let filtered = currentItems;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.meta.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    let sorted = [...filtered];
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date':
        // Reverse order for "recently added" (assumes items are in chronological order)
        sorted.reverse();
        break;
      default:
        // Keep default order
        break;
    }

    // Apply shuffle if triggered
    if (shuffleKey > 0) {
      sorted = [...sorted].sort(() => Math.random() - 0.5);
    }

    return sorted.map((item, idx) => ({
      ...item,
      idx,
      width: item.width ?? 400,
      height: item.height ?? (idx % 3 === 0 ? 600 : 400),
    }));
  }, [currentItems, searchQuery, sortBy, shuffleKey]);

  // Shuffle handler
  const handleShuffle = () => {
    setShuffleKey(prev => prev + 1);
  };

  // Reset filters when changing tabs
  useEffect(() => {
    setSearchQuery('');
    setSortBy('default');
    setShuffleKey(0);
  }, [activeTab]);

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

      {/* Filter Bar (category filtering removed) */}
      <StudioFilterBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        onShuffle={handleShuffle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        accentColor={activeTabConfig?.color || '#40E0D0'}
      />

      {/* Results Count */}
      {masonryItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-sm text-slate-400"
        >
          Showing <span className="text-white font-semibold">{masonryItems.length}</span> {masonryItems.length === 1 ? 'item' : 'items'}
          {searchQuery && (
            <span className="ml-1">
              of <span className="text-white font-semibold">{currentItems.length}</span> total
            </span>
          )}
        </motion.div>
      )}

      {/* Masonry Grid */}
      <AnimatePresence mode="wait">
        {masonryItems.length > 0 ? (
          <motion.div
            key={`${activeTab}-${sortBy}-${shuffleKey}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
          >
            {masonryItems.map((item, displayIndex) => {
              const isHovered = hoveredIndex === item.idx;
              const palette = palettes[item.src] || paletteCache[item.src];

              return (
                <EnhancedGalleryCard
                  key={item.id}
                  item={item}
                  index={displayIndex}
                  onClick={() => showLightbox(item.idx)}
                  onMouseEnter={() => {
                    setHoveredIndex(item.idx);
                    if (activeTab === 'design') {
                      void ensurePalette(item.src);
                    }
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  isHovered={isHovered}
                  activeTab={activeTab}
                  activeTabColor={activeTabConfig?.color || '#40E0D0'}
                  palette={palette}
                />
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-24 text-center"
          >
            <p className="text-lg text-slate-400 mb-2">No items found</p>
            <p className="text-sm text-slate-500">
              Try adjusting your filters or search query
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Lightbox with Zoom & Swipe */}
      <AnimatePresence>
        {lightboxIndex !== null && masonryItems.find(item => item.idx === lightboxIndex) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center px-4"
            onClick={() => {
              closeLightbox();
              setLightboxZoom(1);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container with Zoom */}
              <div 
                className="relative overflow-hidden rounded-2xl mb-4 touch-none select-none"
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
              >
                <motion.img
                  src={masonryItems.find(item => item.idx === lightboxIndex)!.src}
                  alt={masonryItems.find(item => item.idx === lightboxIndex)!.title}
                  loading="lazy"
                  className="w-full h-auto shadow-2xl max-h-[75vh] object-contain mx-auto"
                  style={{
                    scale: lightboxZoom,
                    cursor: isDragging ? 'grabbing' : lightboxZoom > 1 ? 'grab' : 'default',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
                
                {/* Swipe indicator */}
                {isDragging && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  >
                    <div className="text-white text-sm font-mono bg-slate-900/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                      Swipe to navigate
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between gap-4">
                {/* Info Section */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs uppercase tracking-[0.2em] mb-1"
                    style={{ color: activeTabConfig?.color }}
                  >
                    {activeTab === 'photography' ? 'Lens Mode' : 'Color DNA'}
                  </p>
                  <p className="text-xl font-semibold text-white truncate">
                    {masonryItems.find(item => item.idx === lightboxIndex)!.title}
                  </p>
                  <p className="text-sm text-slate-400 font-mono mt-1">
                    {masonryItems.find(item => item.idx === lightboxIndex)!.meta}
                  </p>
                  {masonryItems.find(item => item.idx === lightboxIndex)!.category && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-slate-800/50 text-slate-300 border border-slate-700/50 capitalize">
                      {masonryItems.find(item => item.idx === lightboxIndex)!.category}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Counter */}
                  <span className="text-sm text-slate-500 mr-2 font-mono">
                    {masonryItems.findIndex(item => item.idx === lightboxIndex) + 1} / {masonryItems.length}
                  </span>

                  {/* Zoom Controls */}
                  <button
                    type="button"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                    onClick={() => setLightboxZoom(prev => Math.max(prev - 0.25, 0.5))}
                    aria-label="Zoom out"
                    title="Zoom out (-)"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10 text-white text-xs font-mono"
                    onClick={() => setLightboxZoom(1)}
                    aria-label="Reset zoom"
                    title="Reset zoom (0)"
                  >
                    {Math.round(lightboxZoom * 100)}%
                  </button>
                  <button
                    type="button"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                    onClick={() => setLightboxZoom(prev => Math.min(prev + 0.25, 3))}
                    aria-label="Zoom in"
                    title="Zoom in (+)"
                  >
                    <ZoomIn size={18} />
                  </button>

                  {/* Navigation */}
                  <div className="w-px h-8 bg-slate-700/50 mx-1" />
                  
                  <button
                    type="button"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                    onClick={goPrev}
                    aria-label="Previous"
                    title="Previous (←)"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                    onClick={goNext}
                    aria-label="Next"
                    title="Next (→)"
                  >
                    <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10 text-white"
                    onClick={() => {
                      closeLightbox();
                      setLightboxZoom(1);
                    }}
                    aria-label="Close"
                    title="Close (Esc)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Keyboard Shortcuts Helper */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-center text-xs text-slate-500 font-mono"
              >
                <span className="hidden md:inline">
                  Keyboard: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">←</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">→</kbd> navigate • 
                  <kbd className="px-1.5 py-0.5 bg-slate-800 rounded mx-1">+</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">-</kbd> zoom • 
                  <kbd className="px-1.5 py-0.5 bg-slate-800 rounded mx-1">0</kbd> reset • 
                  <kbd className="px-1.5 py-0.5 bg-slate-800 rounded mx-1">Esc</kbd> close
                </span>
                <span className="md:hidden">
                  Swipe left/right to navigate
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { TabbedMasonryGallery };
export default TabbedMasonryGallery;
