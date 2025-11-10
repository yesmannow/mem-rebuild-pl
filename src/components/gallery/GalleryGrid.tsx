import React from 'react';
import ImageLightbox from '@components/media/ImageLightbox';

export interface GalleryGridProps {
  items: { file: string }[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((it) => (
        <ImageLightbox
          key={it.file}
          src={it.file}
          alt={it.file.split('/').pop() ?? ''}
          className="overflow-hidden rounded-xl ring-1 ring-white/5 transition-transform hover:scale-105"
        />
      ))}
    </div>
  );
}

