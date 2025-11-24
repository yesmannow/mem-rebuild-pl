import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid mb-4 cursor-pointer group"
            onClick={() => openLightbox(image)}
          >
            <div className="relative overflow-hidden rounded-lg border border-brand-muted/20 hover:border-brand-teal/50 transition-all duration-300">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-300" />

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs text-brand-teal font-semibold uppercase tracking-wide mb-1">
                  {image.category}
                </div>
                <div className="text-sm font-medium text-brand-text">
                  {image.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 p-2 bg-brand-surface border border-brand-muted/20 rounded-lg text-brand-text hover:bg-brand-surface/80 hover:border-brand-teal/50 transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-dark/95 to-transparent rounded-b-lg">
              <div className="text-sm text-brand-teal font-semibold uppercase tracking-wide mb-2">
                {selectedImage.category}
              </div>
              <div className="text-xl font-bold text-brand-text">
                {selectedImage.title}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MasonryGallery;

