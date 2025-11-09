import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart } from 'lucide-react';
import './Lightbox.css';

interface LightboxProps {
  isOpen: boolean;
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    category?: string;
    tags?: string[];
  }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}) => {
  const currentImage = images[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrevious]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        {/* Backdrop blur */}
        <motion.div
          className="lightbox-backdrop"
          initial={{ backdropFilter: 'blur(0px)' }}
          animate={{ backdropFilter: 'blur(20px)' }}
          exit={{ backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.4 }}
        />

        {/* Main lightbox container */}
        <motion.div
          className="lightbox-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            className="lightbox-close"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <X size={24} />
          </motion.button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                className="lightbox-nav lightbox-prev"
                onClick={onPrevious}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ChevronLeft size={32} />
              </motion.button>

              <motion.button
                className="lightbox-nav lightbox-next"
                onClick={onNext}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ChevronRight size={32} />
              </motion.button>
            </>
          )}

          {/* Image container */}
          <motion.div
            className="lightbox-image-wrapper"
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="lightbox-image"
              draggable={false}
            />
          </motion.div>

          {/* Image details */}
          <motion.div
            className="lightbox-details"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="lightbox-info">
              <h3 className="lightbox-title">
                {currentImage.title || `Image ${currentIndex + 1}`}
              </h3>
              {currentImage.category && (
                <span className="lightbox-category">{currentImage.category}</span>
              )}
              {currentImage.tags && (
                <div className="lightbox-tags">
                  {currentImage.tags.map((tag, index) => (
                    <span key={index} className="lightbox-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="lightbox-actions">
              <motion.button
                className="lightbox-action"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  // Download functionality
                  const link = document.createElement('a');
                  link.href = currentImage.src;
                  link.download = currentImage.title || 'image';
                  link.click();
                }}
              >
                <Download size={18} />
              </motion.button>

              <motion.button
                className="lightbox-action"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  // Share functionality
                  if (navigator.share) {
                    navigator.share({
                      title: currentImage.title,
                      url: currentImage.src,
                    });
                  }
                }}
              >
                <Share2 size={18} />
              </motion.button>

              <motion.button
                className="lightbox-action"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Image counter */}
          {images.length > 1 && (
            <motion.div
              className="lightbox-counter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <motion.div
              className="lightbox-thumbnails"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`lightbox-thumbnail ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    // This would need to be passed as a prop
                    // onSetIndex(index);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={image.src} alt={image.alt} />
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
