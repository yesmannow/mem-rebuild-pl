/**
 * EnhancedGalleryCard - Advanced interactive gallery card with 3D effects
 * 
 * Features:
 * - 3D tilt effect on hover
 * - Magnetic cursor interaction
 * - Smooth parallax on scroll
 * - Image zoom preview
 * - Advanced micro-interactions
 */

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Maximize2, Camera, Palette as PaletteIcon } from 'lucide-react';
import type { StudioItem } from '../../data/studioData';

interface EnhancedGalleryCardProps {
  item: StudioItem;
  index: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
  activeTab: 'photography' | 'design';
  activeTabColor: string;
  palette?: string[];
}

const EnhancedGalleryCard: React.FC<EnhancedGalleryCardProps> = ({
  item,
  index,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  activeTab,
  activeTabColor,
  palette,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth motion
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);

  // Scale effect on hover
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate relative position (-0.5 to 0.5)
    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseEnter = () => {
    scale.set(1.02);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    onMouseLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      className="break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group perspective-1000"
      style={{
        scale,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Card Container with 3D transform */}
      <motion.div
        className="relative bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-soft-dark"
        style={{
          boxShadow: isHovered
            ? `0 20px 60px rgba(${activeTab === 'photography' ? '255,165,0' : '64,224,208'}, 0.3)`
            : '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <motion.img
            src={item.src}
            alt={item.title}
            loading="lazy"
            width={item.width}
            height={item.height}
            className="w-full h-auto object-cover"
            style={{
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isHovered
                ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)'
                : 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.3) 100%)',
              transition: 'background 0.3s ease',
            }}
          />

          {/* Shine Effect on Hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '100%', opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              }}
            />
          )}

          {/* View Button */}
          <motion.div
            className="absolute top-3 right-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="rounded-full px-3 py-1.5 backdrop-blur-md border flex items-center gap-1.5 shadow-lg text-xs text-white"
              style={{
                backgroundColor: `${activeTabColor}20`,
                borderColor: `${activeTabColor}40`,
              }}
            >
              <Maximize2 size={14} />
              <span>View</span>
            </div>
          </motion.div>

          {/* Category Badge */}
          {item.category && (
            <motion.div
              className="absolute top-3 left-3"
              initial={{ opacity: 0, x: -10 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-full bg-slate-900/80 backdrop-blur-sm text-slate-300 border border-white/10">
                {item.category}
              </span>
            </motion.div>
          )}

          {/* HUD Overlay - Context Aware */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-3 shadow-xl">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-1.5"
                  style={{ color: activeTabColor }}
                >
                  {activeTab === 'photography' ? (
                    <>
                      <Camera size={12} />
                      Lens Mode
                    </>
                  ) : (
                    <>
                      <PaletteIcon size={12} />
                      Color DNA
                    </>
                  )}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-sm mb-2 truncate">
                {item.title}
              </h3>

              {/* Meta Info - Context Aware */}
              {activeTab === 'design' && palette && palette.length > 0 ? (
                // Design Mode: Show extracted color palette
                <div className="flex gap-1">
                  {palette.slice(0, 6).map((color, i) => (
                    <div
                      key={`${color}-${i}`}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full h-6 rounded border border-white/10"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                      <span className="text-[9px] font-mono text-slate-400 uppercase">
                        {color.substring(0, 7)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'design' ? (
                // Design Mode: Show preset hex codes from meta
                <div className="flex items-center gap-2">
                  <code className="font-mono text-xs px-2 py-1 rounded bg-slate-800 text-brand-teal border border-brand-teal/20">
                    {item.meta}
                  </code>
                </div>
              ) : (
                // Photography Mode: Show descriptive meta
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-1 rounded bg-slate-800 text-brand-orange border border-brand-orange/20">
                    {item.meta}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedGalleryCard;
