import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface GalleryItem {
  file: string;
  title?: string;
  description?: string;
}

export interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const getAltText = (item: GalleryItem): string => {
    if (item.title) return item.title;
    const filename = item.file.split('/').pop() ?? '';
    return filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <motion.button
            key={item.file}
            onClick={() => handleImageClick(item)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group relative overflow-hidden rounded-xl ring-1 ring-white/5 transition-all hover:ring-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal"
            aria-label={`View ${getAltText(item)}`}
          >
            <div className="aspect-square">
              <img
                src={item.file}
                alt={getAltText(item)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute -right-4 -top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage.file}
                alt={getAltText(selectedImage)}
                className="max-h-[85vh] max-w-full rounded-lg object-contain"
              />
              {(selectedImage.title || selectedImage.description) && (
                <div className="mt-4 text-center">
                  {selectedImage.title && (
                    <h3 className="text-lg font-semibold text-white">{selectedImage.title}</h3>
                  )}
                  {selectedImage.description && (
                    <p className="mt-1 text-sm text-white/70">{selectedImage.description}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;
