import React, { useState, useEffect } from 'react';
import OptimizedImage from '@components/media/OptimizedImage';

export interface ImageLightboxProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ImageLightbox({ src, alt, className }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        className={className}
        onClick={() => setOpen(true)}
        aria-label="Open image"
        type="button"
      >
        <OptimizedImage src={src} alt={alt ?? ''} className="rounded-xl" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt ?? 'Image lightbox'}
        >
          <button
            className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
          <img
            src={`/${src}`}
            alt={alt ?? ''}
            className="mx-auto max-h-full max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

