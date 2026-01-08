import React from 'react';
import { motion } from 'framer-motion';
import {
  GridPattern,
  DotPattern,
  DiagonalLines,
  HexagonPattern,
  NoiseTexture,
  CircuitPattern,
  GradientMesh,
  SpotlightEffect,
} from './backgrounds/BackgroundPatterns';
import {
  WaveDivider,
  DiagonalDivider,
  ZigzagDivider,
  CircuitDivider,
} from './dividers';

type BackgroundPattern =
  | 'grid'
  | 'dots'
  | 'diagonal'
  | 'hexagon'
  | 'noise'
  | 'circuit'
  | 'gradient-mesh'
  | 'spotlight'
  | 'none';

type DividerType = 'wave' | 'diagonal' | 'zigzag' | 'circuit' | 'none';

type BackgroundTheme =
  | 'dark' // Deep slate
  | 'darker' // Almost black
  | 'light' // Lighter slate
  | 'accent-teal' // Teal glow
  | 'accent-orange' // Orange glow
  | 'gradient-purple' // Purple gradient
  | 'gradient-warm' // Warm gradient
  | 'custom';

interface EnhancedSectionProps {
  children: React.ReactNode;
  className?: string;
  
  // Background
  theme?: BackgroundTheme;
  customBg?: string;
  pattern?: BackgroundPattern;
  patternOpacity?: number;
  
  // Dividers
  topDivider?: DividerType;
  bottomDivider?: DividerType;
  dividerColor?: string;
  
  // Layout
  container?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Animation
  animated?: boolean;
  parallax?: boolean;
}

const themeClasses: Record<BackgroundTheme, string> = {
  dark: 'bg-slate-900',
  darker: 'bg-slate-950',
  light: 'bg-slate-800',
  'accent-teal': 'bg-slate-950',
  'accent-orange': 'bg-slate-950',
  'gradient-purple': 'bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900',
  'gradient-warm': 'bg-gradient-to-br from-slate-950 via-orange-950/10 to-slate-900',
  custom: '',
};

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-[1400px]',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'py-12 px-4 sm:px-6',
  md: 'py-16 px-4 sm:px-6 lg:px-8',
  lg: 'py-24 px-4 sm:px-6 lg:px-8',
  xl: 'py-32 px-4 sm:px-6 lg:px-8',
};

/**
 * EnhancedSection - Flexible section wrapper with backgrounds, patterns, and dividers
 * 
 * Usage:
 * <EnhancedSection
 *   theme="gradient-purple"
 *   pattern="grid"
 *   topDivider="wave"
 *   bottomDivider="diagonal"
 *   padding="lg"
 * >
 *   {children}
 * </EnhancedSection>
 */
export const EnhancedSection: React.FC<EnhancedSectionProps> = ({
  children,
  className = '',
  theme = 'dark',
  customBg,
  pattern = 'none',
  patternOpacity = 0.05,
  topDivider = 'none',
  bottomDivider = 'none',
  dividerColor = '#0f172a',
  container = true,
  maxWidth = '7xl',
  padding = 'lg',
  animated = false,
  parallax = false,
}) => {
  const bgClass = customBg || themeClasses[theme];
  const paddingClass = paddingClasses[padding];
  const maxWidthClass = maxWidthClasses[maxWidth];

  // Render pattern component
  const renderPattern = () => {
    const props = { opacity: patternOpacity };
    switch (pattern) {
      case 'grid':
        return <GridPattern {...props} />;
      case 'dots':
        return <DotPattern {...props} />;
      case 'diagonal':
        return <DiagonalLines {...props} />;
      case 'hexagon':
        return <HexagonPattern {...props} />;
      case 'noise':
        return <NoiseTexture {...props} />;
      case 'circuit':
        return <CircuitPattern {...props} />;
      case 'gradient-mesh':
        return <GradientMesh />;
      case 'spotlight':
        return <SpotlightEffect />;
      default:
        return null;
    }
  };

  // Render divider component
  const renderDivider = (type: DividerType, position: 'top' | 'bottom') => {
    const dividerProps = { color: dividerColor, animated };
    switch (type) {
      case 'wave':
        return <WaveDivider {...dividerProps} flip={position === 'bottom'} />;
      case 'diagonal':
        return <DiagonalDivider {...dividerProps} direction={position === 'top' ? 'right' : 'left'} />;
      case 'zigzag':
        return <ZigzagDivider color={dividerColor} />;
      case 'circuit':
        return <CircuitDivider animated={animated} />;
      default:
        return null;
    }
  };

  // Add accent overlays for themed sections
  const renderAccentOverlay = () => {
    if (theme === 'accent-teal') {
      return (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-teal/10 via-transparent to-transparent pointer-events-none" />
      );
    }
    if (theme === 'accent-orange') {
      return (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/10 via-transparent to-transparent pointer-events-none" />
      );
    }
    return null;
  };

  const sectionContent = (
    <div className={`relative ${bgClass} ${className}`}>
      {/* Top Divider */}
      {topDivider !== 'none' && (
        <div className="absolute top-0 left-0 right-0 z-10">
          {renderDivider(topDivider, 'top')}
        </div>
      )}

      {/* Background Pattern */}
      {renderPattern()}

      {/* Accent Overlay */}
      {renderAccentOverlay()}

      {/* Content */}
      <div className={`relative z-10 ${paddingClass}`}>
        {container ? (
          <div className={`${maxWidthClass} mx-auto`}>{children}</div>
        ) : (
          children
        )}
      </div>

      {/* Bottom Divider */}
      {bottomDivider !== 'none' && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          {renderDivider(bottomDivider, 'bottom')}
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {sectionContent}
      </motion.section>
    );
  }

  if (parallax) {
    return (
      <motion.section
        style={{
          backgroundPositionY: '0px',
        }}
        whileInView={{
          backgroundPositionY: '-50px',
        }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        {sectionContent}
      </motion.section>
    );
  }

  return <section>{sectionContent}</section>;
};

export default EnhancedSection;
