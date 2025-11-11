import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Eye,
  Heart,
  Share2,
  Download,
  Palette,
  Camera,
  Code,
  Layers,
  Grid3X3,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface InspirationItem {
  id: string;
  src: string;
  title: string;
  category: string;
  source: string;
  tags?: string[];
  colors?: string[];
  description?: string;
}

interface ModernInspirationGridProps {
  items: InspirationItem[];
  viewMode: 'grid' | 'masonry' | 'list';
  onItemClick?: (item: InspirationItem, index: number) => void;
}

const ModernInspirationGrid: React.FC<ModernInspirationGridProps> = ({
  items,
  viewMode,
  onItemClick,
}) => {
  const [selectedItem, setSelectedItem] = useState<{ item: InspirationItem; index: number } | null>(
    null
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance animation for grid items
      gsap.fromTo(
        gridRef.current?.children || [],
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotationX: 15,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [items]);

  const handleItemClick = (item: InspirationItem, index: number) => {
    setSelectedItem({ item, index });
    onItemClick?.(item, index);
  };

  const handlePrevious = () => {
    if (selectedItem && selectedItem.index > 0) {
      const newIndex = selectedItem.index - 1;
      setSelectedItem({ item: items[newIndex], index: newIndex });
    }
  };

  const handleNext = () => {
    if (selectedItem && selectedItem.index < items.length - 1) {
      const newIndex = selectedItem.index + 1;
      setSelectedItem({ item: items[newIndex], index: newIndex });
    }
  };

  const handleShare = async (item: InspirationItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this ${item.category} from ${item.source}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(`${window.location.href} - ${item.title}`);
      // You could add a toast notification here
    }
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
      case 'masonry':
        return 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6';
      case 'list':
        return 'flex flex-col gap-4';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
    }
  };

  const renderGridItem = (item: InspirationItem, index: number) => {
    const isHovered = hoveredItem === item.id;
    const isSelected = selectedItem?.item.id === item.id;

    if (viewMode === 'list') {
      return (
        <motion.div
          key={item.id}
          className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.02, y: -2 }}
          onClick={() => handleItemClick(item, index)}
          onHoverStart={() => setHoveredItem(item.id)}
          onHoverEnd={() => setHoveredItem(null)}
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1 truncate">{item.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Palette className="w-3 h-3" />
                {item.category}
              </span>
              <span>•</span>
              <span>{item.source}</span>
            </div>
            {item.tags && (
              <div className="flex gap-1 mt-2">
                {item.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={e => {
                e.stopPropagation();
                handleShare(item);
              }}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              title="Share image"
              aria-label="Share image"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={item.id}
        className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-500 cursor-pointer"
        whileHover={{
          scale: 1.02,
          y: -8,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
        onClick={() => handleItemClick(item, index)}
        onHoverStart={() => setHoveredItem(item.id)}
        onHoverEnd={() => setHoveredItem(null)}
        layout
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.category}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={e => {
                e.stopPropagation();
                handleShare(item);
              }}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              title="Share image"
              aria-label="Share image"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                // Add to favorites functionality
              }}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              title="Add to favorites"
              aria-label="Add to favorites"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Palette className="w-3 h-3" />
                {item.category}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                View
              </span>
            </div>

            {/* Color Palette Preview */}
            {item.colors && (
              <div className="flex gap-1 mt-3">
                {item.colors.slice(0, 4).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border border-white/20 color-swatch"
                    data-color={color}
                    title={`Color: ${color}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div ref={gridRef} className={getGridClasses()}>
        {items.map((item, index) => renderGridItem(item, index))}
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Navigation Buttons */}
            <motion.button
              onClick={e => {
                e.stopPropagation();
                handlePrevious();
              }}
              disabled={selectedItem.index === 0}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={e => {
                e.stopPropagation();
                handleNext();
              }}
              disabled={selectedItem.index === items.length - 1}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image Counter */}
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {selectedItem.index + 1} / {items.length}
            </motion.div>

            <motion.div
              className="relative max-w-6xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
              key={selectedItem.item.id}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors z-20"
                title="Close lightbox"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={selectedItem.item.src}
                alt={selectedItem.item.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Enhanced Info Panel */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm rounded-b-lg p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedItem.item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                      <span className="flex items-center gap-1">
                        <Palette className="w-4 h-4" />
                        {selectedItem.item.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        {selectedItem.item.source}
                      </span>
                    </div>

                    {/* Color Palette */}
                    {selectedItem.item.colors && (
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm text-gray-400">Colors:</span>
                        <div className="flex gap-2">
                          {selectedItem.item.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full border border-white/20 shadow-lg color-swatch"
                              data-color={color}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {selectedItem.item.tags && (
                      <div className="flex gap-2">
                        {selectedItem.item.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare(selectedItem.item)}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                      title="Share image"
                      aria-label="Share image"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                      title="Download image"
                      aria-label="Download image"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                      title="Add to favorites"
                      aria-label="Add to favorites"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Keyboard hints */}
                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-400">
                  <span>← Previous</span>
                  <span>→ Next</span>
                  <span>ESC Close</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernInspirationGrid;
