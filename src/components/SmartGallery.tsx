import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, Palette as PaletteIcon, X } from 'lucide-react';
// node-vibrant types are not ESM-friendly in this toolchain; rely on runtime API.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Vibrant from 'node-vibrant';

export type GalleryMode = 'photo' | 'design';

export interface GalleryItem {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
}

interface SmartGalleryProps {
  mode: GalleryMode;
  items: GalleryItem[];
}

const paletteCache: Record<string, string[]> = {};

const SmartGallery: React.FC<SmartGalleryProps> = ({ mode, items }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [palettes, setPalettes] = useState<Record<string, string[]>>({});

  const showLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, items.length]);

  const ensurePalette = async (src: string) => {
    if (paletteCache[src] || palettes[src]) return;
    try {
      const palette = await (Vibrant as any).from(src).getPalette();
      const colors = Object.values(palette)
        .filter((swatch: any) => swatch && typeof swatch.getHex === 'function')
        .map((swatch: any) => swatch.getHex()) as string[];
      paletteCache[src] = colors.slice(0, 6);
      setPalettes((prev) => ({ ...prev, [src]: colors.slice(0, 6) }));
    } catch {
      // swallow palette errors to keep UI responsive
    }
  };

  const masonryItems = useMemo(
    () =>
      items.map((item, idx) => ({
        ...item,
        idx,
      })),
    [items]
  );

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {masonryItems.map((item) => {
          const isHovered = hoveredIndex === item.idx;
          const palette = palettes[item.src] || paletteCache[item.src];
          return (
            <motion.div
              key={`${mode}-${item.idx}-${item.src}`}
              layout
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 shadow-soft-dark transition hover:border-brand-teal/40 hover:shadow-accent"
              onMouseEnter={() => {
                setHoveredIndex(item.idx);
                if (mode === 'design') {
                  void ensurePalette(item.src);
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => showLightbox(item.idx)}
            >
              <div className="relative">
                <motion.img
                  src={item.src}
                  alt={item.alt || item.title || 'Gallery item'}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/40" />
                <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-brand-text/80">
                  <span className="rounded-full bg-slate-900/70 px-2 py-1 backdrop-blur-md border border-white/10 flex items-center gap-1">
                    <Maximize2 size={14} /> View
                  </span>
                </div>

                {mode === 'design' && palette && (isHovered || lightboxIndex !== null) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute inset-x-3 bottom-3 rounded-lg border border-white/10 bg-slate-900/70 backdrop-blur-md p-2 shadow-soft-dark"
                  >
                    <div className="flex items-center justify-between mb-2 text-[11px] uppercase tracking-[0.2em] text-brand-muted">
                      <span className="inline-flex items-center gap-1">
                        <PaletteIcon size={12} className="text-brand-teal" />
                        Color DNA
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {palette.slice(0, 6).map((color) => (
                        <div
                          key={color}
                          className="h-8 flex-1 rounded-sm border border-white/10"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-brand-muted">{item.category || (mode === 'photo' ? 'Photography' : 'Design')}</p>
                <p className="text-base font-semibold text-brand-text line-clamp-2">{item.title || item.alt || 'Untitled'}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && items[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center px-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[lightboxIndex].src}
                alt={items[lightboxIndex].alt || items[lightboxIndex].title || 'Gallery item'}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="mt-4 flex items-center justify-between text-brand-text">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
                    {mode === 'photo' ? 'Lens Mode' : 'Color DNA'}
                  </p>
                  <p className="text-xl font-semibold">
                    {items[lightboxIndex].title || items[lightboxIndex].alt || 'Untitled'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10"
                    onClick={goPrev}
                    aria-label="Previous"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10"
                    onClick={goNext}
                    aria-label="Next"
                  >
                    <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10"
                    onClick={closeLightbox}
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartGallery;
