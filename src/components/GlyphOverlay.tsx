/**
 * GlyphOverlay - Decorative glyph/symbol overlay component
 * Adds futuristic tech aesthetic with animated glyphs
 */

import React from 'react';
import { motion } from 'framer-motion';

interface GlyphOverlayProps {
  className?: string;
  opacity?: number;
  color?: string;
  glyphCount?: number;
}

const GlyphOverlay: React.FC<GlyphOverlayProps> = ({
  className = '',
  opacity = 0.03,
  color = 'currentColor',
  glyphCount = 20,
}) => {
  // Generate random glyphs for tech aesthetic
  const glyphs = Array.from({ length: glyphCount }, (_, i) => ({
    id: i,
    char: ['◊', '◈', '◆', '◇', '⬡', '⬢', '⬣', '▢', '▣', '▤'][i % 10],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 1.5,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div
      className={`glyph-overlay pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {glyphs.map((glyph) => (
        <motion.div
          key={glyph.id}
          className="absolute"
          style={{
            left: `${glyph.x}%`,
            top: `${glyph.y}%`,
            fontSize: `${glyph.size}rem`,
            color,
          }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: glyph.duration,
            delay: glyph.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {glyph.char}
        </motion.div>
      ))}
    </div>
  );
};

export default GlyphOverlay;
