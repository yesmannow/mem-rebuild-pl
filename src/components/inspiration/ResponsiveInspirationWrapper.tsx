import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ModernInspirationHero from "./ModernInspirationHero";
import AdvancedFilterSystem from "./AdvancedFilterSystem";
import ModernInspirationGrid from "./ModernInspirationGrid";
import MobileOptimizedInspiration from "./MobileOptimizedInspiration";
import ColorPaletteExtractor from "./ColorPaletteExtractor";

interface ResponsiveInspirationWrapperProps {
  items: any[];
  onItemClick: (item: any, index: number) => void;
  onFilterChange: (filters: any) => void;
  availableTags: string[];
  selectedImage: any;
  filters: any;
}

const ResponsiveInspirationWrapper: React.FC<ResponsiveInspirationWrapperProps> = ({
  items,
  onItemClick,
  onFilterChange,
  availableTags,
  selectedImage,
  filters
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full" />
          <p className="text-sm text-gray-400">Loading inspiration...</p>
        </motion.div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <MobileOptimizedInspiration
        items={items}
        onItemClick={onItemClick}
        onFilterChange={onFilterChange}
        availableTags={availableTags}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop Hero Section */}
      <ModernInspirationHero />

      {/* Desktop Filter System */}
      <AdvancedFilterSystem
        onFilterChange={onFilterChange}
        totalItems={items.length}
        availableTags={availableTags}
      />

      {/* Desktop Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Collection Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="text-4xl font-bold mb-2">Visual Collection</h2>
            <p className="text-gray-400">
              {items.length} items
              {filters.category !== 'All' && ` in ${filters.category}`}
              {filters.search && ` matching "${filters.search}"`}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Click to expand • Scroll for magic</span>
          </div>
        </motion.div>

        {/* Desktop Grid */}
        <ModernInspirationGrid
          items={items}
          viewMode={filters.viewMode}
          onItemClick={onItemClick}
        />

        {/* Color Palette Extractor (for selected image) */}
        {selectedImage && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ColorPaletteExtractor
              imageUrl={selectedImage.src}
              onColorsExtracted={(colors) => {
                console.log('Extracted colors:', colors);
              }}
            />
          </motion.div>
        )}

        {/* No Results */}
        {items.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">No inspiration found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveInspirationWrapper;
