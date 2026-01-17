/**
 * PageWithApiBackground Component
 *
 * Reusable page wrapper that adds themed API backgrounds to any page
 * Provides consistent styling and performance optimization across the site
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ApiBackgroundImage } from '../ui/ApiBackgroundImage';
import { EnhancedImage } from '../ui/EnhancedImage';
import { pageBackgroundService } from '../../services/pageBackgroundService';

interface PageWithApiBackgroundProps {
  pageName: string;
  children: React.ReactNode;
  className?: string;
  includeBackground?: boolean;
  overlayOpacity?: number;
  priority?: boolean;
}

export const PageWithApiBackground: React.FC<PageWithApiBackgroundProps> = ({
  pageName,
  children,
  className = '',
  includeBackground = true,
  overlayOpacity,
  priority = false,
}) => {
  const theme = pageBackgroundService.getPageTheme(pageName);

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* API Background Image */}
      {includeBackground && (
        <ApiBackgroundImage
          query={theme.primary}
          source="auto"
          overlayColor={theme.overlay as 'dark' | 'light' | 'brand'}
          overlayOpacity={overlayOpacity || theme.overlayOpacity}
          priority={priority}
          className="fixed inset-0 z-0"
        />
      )}

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

/**
 * SectionWithApiBackground Component
 *
 * Section-level background for specific content blocks
 */
interface SectionWithApiBackgroundProps {
  theme: string;
  children: React.ReactNode;
  className?: string;
  overlayColor?: 'turquoise' | 'orange' | 'dark' | 'none';
  overlayOpacity?: number;
  minHeight?: string;
  imageSrc?: string;
}

export const SectionWithApiBackground: React.FC<SectionWithApiBackgroundProps> = ({
  theme,
  children,
  className = '',
  overlayColor = 'dark',
  overlayOpacity = 0.85,
  minHeight = 'auto',
  imageSrc,
}) => {
  return (
    <section className={`relative overflow-hidden ${className}`} style={{ minHeight }}>
      {imageSrc ? (
        <EnhancedImage
          src={imageSrc}
          alt={`${theme} background`}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
          className="absolute inset-0 z-0"
          priority
        />
      ) : (
        <ApiBackgroundImage
          theme={theme}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
          className="absolute inset-0 z-0"
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

/**
 * HeroWithApiBackground Component
 *
 * Hero section with parallax effect and API background
 */
interface HeroWithApiBackgroundProps {
  theme: string;
  children: React.ReactNode;
  className?: string;
  height?: string;
  imageSrc?: string;
  overlayOpacity?: number;
}

export const HeroWithApiBackground: React.FC<HeroWithApiBackgroundProps> = ({
  theme,
  children,
  className = '',
  height = 'min-h-screen',
  imageSrc,
  overlayOpacity,
}) => {
  const ov = overlayOpacity ?? 0.85;
  return (
    <motion.section
      className={`relative ${height} flex items-center overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {imageSrc ? (
        <EnhancedImage
          src={imageSrc}
          alt={`${theme} background`}
          overlayColor="dark"
          overlayOpacity={ov}
          priority={true}
          className="absolute inset-0 z-0"
        />
      ) : (
        <ApiBackgroundImage
          query={theme}
          source="auto"
          overlayColor="dark"
          overlayOpacity={ov}
          priority={true}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark" />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </motion.section>
  );
};

export default PageWithApiBackground;
