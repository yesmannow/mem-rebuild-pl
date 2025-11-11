import React from 'react';

interface GalleryProps {
  children: React.ReactNode;
  cols?: 2 | 3;
}

export default function Gallery({ children, cols = 3 }: GalleryProps) {
  const gridCols = cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return <div className={`grid grid-cols-1 ${gridCols} gap-4 my-6`}>{children}</div>;
}
