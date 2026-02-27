import React from 'react';
import { motion } from 'framer-motion';
import { useUnifiedImage } from '../../hooks/useUnifiedImage';
import type { StudioItem } from '../../data/studioData';

interface StudioGridItemProps {
  item: StudioItem;
  isFeatured: boolean;
  loupeEnabled: boolean;
  onMouseMove: (e: React.MouseEvent<HTMLElement>, item: StudioItem) => void;
  onMouseLeave: () => void;
}

const TWILIGHT_FILTER = 'brightness(0.4) contrast(1.2) grayscale(0.2)';

const StudioGridItem: React.FC<StudioGridItemProps> = ({
  item,
  isFeatured,
  loupeEnabled,
  onMouseMove,
  onMouseLeave,
}) => {
  const { image, isLoading } = useUnifiedImage(item.imageQuery ?? '', {
    preferredSource: 'pexels',
    enabled: !!item.imageQuery,
  });

  const resolvedSrc = item.imageQuery && image ? image.url : item.src;
  const resolvedAlt = item.imageQuery && image ? (image.alt || item.title) : item.title;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl group ${
        isFeatured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
      }`}
      onMouseMove={(e) => {
        if (!loupeEnabled) return;
        onMouseMove(e, item);
      }}
      onMouseLeave={onMouseLeave}
    >
      {isLoading && item.imageQuery ? (
        <div className="w-full h-full bg-slate-900/80 animate-pulse" />
      ) : (
        <img
          src={resolvedSrc}
          alt={resolvedAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: item.imageQuery ? TWILIGHT_FILTER : undefined }}
          loading="lazy"
        />
      )}

      {/* Cyan vignette for dynamically sourced items */}
      {item.imageQuery && !isLoading && image && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,10,20,0.85) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 60px rgba(0,242,255,0.07)' }}
          />
        </>
      )}

    </motion.article>
  );
};

export default StudioGridItem;
