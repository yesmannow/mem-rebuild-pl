import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import './BearCaveLogo.css';

interface BearCaveLogoProps {
  variant?: 'icon' | 'full';
  size?: number;
  className?: string;
  animated?: boolean;
}

const BearCaveLogo: React.FC<BearCaveLogoProps> = ({
  variant = 'icon',
  size = 48,
  className = '',
  animated = true,
}) => {
  // ViewBox dimensions - larger for more detail
  const iconViewBox = '0 0 200 180';
  const fullViewBox = '0 0 200 240';

  // Text sizes in viewBox coordinates
  const primaryTextSize = 32;
  const secondaryTextSize = 18;

  const logoVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      // TODO: Convert cubic-bezier array to proper easing type - using string format for compatibility
      transition: { duration: 0.6, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' as any },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      // TODO: Ease string needs type assertion for framer-motion compatibility
      transition: { duration: 1.2, ease: 'easeInOut' as any },
    },
  };

  const Component = animated ? motion.svg : 'svg';
  const PathComponent = animated ? motion.path : 'path';
  const CircleComponent = animated ? motion.circle : 'circle';

  const svgProps: MotionProps = animated
    ? {
        initial: 'initial',
        animate: 'animate',
        whileHover: 'hover',
        variants: logoVariants,
      }
    : {};

  const pathProps = animated
    ? {
        variants: pathVariants,
        initial: 'initial',
        animate: 'animate',
      }
    : {};

  // Icon Mark Component - Redesigned with more detail
  const IconMark = () => (
    <g className="bearcave-logo__icon">
      {/* Outer cave arch frame - more sophisticated shape */}
      <PathComponent
        d="M20 140 L35 50 Q50 25 100 25 Q150 25 165 50 L180 140 L180 165 Q165 170 100 170 Q35 170 20 165 Z"
        stroke="url(#bearcaveGradientMain)"
        strokeWidth="4"
        fill="url(#bearcaveGradientFill)"
        fillOpacity="0.08"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="bearcave-logo__arch-outer"
        {...pathProps}
      />

      {/* Middle arch layer for depth */}
      <PathComponent
        d="M40 140 L50 70 Q60 50 100 50 Q140 50 150 70 L160 140"
        stroke="url(#bearcaveGradientMain)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
        className="bearcave-logo__arch-middle"
        {...pathProps}
      />

      {/* Inner arch - deepest layer */}
      <PathComponent
        d="M60 140 Q70 100 100 100 Q130 100 140 140"
        stroke="url(#bearcaveGradientAccent)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
        className="bearcave-logo__arch-inner"
        {...pathProps}
      />

      {/* Cave entrance depth lines */}
      <g className="bearcave-logo__depth-lines" opacity="0.4">
        <line x1="70" y1="120" x2="70" y2="140" stroke="url(#bearcaveGradientMain)" strokeWidth="1.5" strokeLinecap="round" {...pathProps} />
        <line x1="100" y1="110" x2="100" y2="140" stroke="url(#bearcaveGradientMain)" strokeWidth="1.5" strokeLinecap="round" {...pathProps} />
        <line x1="130" y1="120" x2="130" y2="140" stroke="url(#bearcaveGradientMain)" strokeWidth="1.5" strokeLinecap="round" {...pathProps} />
      </g>

      {/* Enhanced Handprint - upper left, more detailed */}
      <g className="bearcave-logo__handprint" opacity="0.85">
        {/* Palm base with gradient fill */}
        <ellipse
          cx="50"
          cy="60"
          rx="10"
          ry="12"
          fill="url(#bearcaveGradientMain)"
          fillOpacity="0.25"
          {...(animated ? { initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 0.4, type: 'spring', stiffness: 200 } } } : {})}
        />
        {/* Palm outline */}
        <PathComponent
          d="M45 55 Q40 50 42 48 Q45 46 48 48 Q50 50 52 48 Q55 46 58 48 Q60 50 55 55 Q52 60 50 65 Q48 60 45 55"
          stroke="url(#bearcaveGradientMain)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...pathProps}
        />
        {/* Thumb */}
        <PathComponent
          d="M42 58 Q38 54 36 50 Q34 46 32 42"
          stroke="url(#bearcaveGradientMain)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          {...pathProps}
        />
        {/* Fingers - more natural curves */}
        <PathComponent
          d="M48 52 L48 38 M52 53 L52 36 M56 54 L56 40 M60 55 L60 42"
          stroke="url(#bearcaveGradientMain)"
          strokeWidth="2.5"
          strokeLinecap="round"
          {...pathProps}
        />
        {/* Finger details */}
        <circle cx="48" cy="38" r="2" fill="url(#bearcaveGradientMain)" opacity="0.6" />
        <circle cx="52" cy="36" r="2" fill="url(#bearcaveGradientMain)" opacity="0.6" />
        <circle cx="56" cy="40" r="1.5" fill="url(#bearcaveGradientMain)" opacity="0.6" />
        <circle cx="60" cy="42" r="1.5" fill="url(#bearcaveGradientMain)" opacity="0.6" />
      </g>

      {/* Enhanced Sun symbol - upper right, more detailed */}
      <g className="bearcave-logo__sun" opacity="0.9">
        {/* Sun center with glow */}
        <CircleComponent
          cx="150"
          cy="60"
          r="8"
          fill="url(#bearcaveGradientAccent)"
          fillOpacity="0.4"
          {...(animated ? { initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 0.5, type: 'spring', stiffness: 200 } } } : {})}
        />
        <CircleComponent
          cx="150"
          cy="60"
          r="6"
          fill="url(#bearcaveGradientMain)"
          fillOpacity="0.3"
        />
        {/* Outer rays - longer and more prominent */}
        <g stroke="url(#bearcaveGradientMain)" strokeWidth="2" strokeLinecap="round">
          <line x1="150" y1="40" x2="150" y2="25" {...pathProps} />
          <line x1="170" y1="60" x2="185" y2="60" {...pathProps} />
          <line x1="150" y1="80" x2="150" y2="95" {...pathProps} />
          <line x1="130" y1="60" x2="115" y2="60" {...pathProps} />
        </g>
        {/* Diagonal rays */}
        <g stroke="url(#bearcaveGradientAccent)" strokeWidth="1.8" strokeLinecap="round">
          <line x1="162" y1="48" x2="172" y2="38" {...pathProps} />
          <line x1="162" y1="72" x2="172" y2="82" {...pathProps} />
          <line x1="138" y1="72" x2="128" y2="82" {...pathProps} />
          <line x1="138" y1="48" x2="128" y2="38" {...pathProps} />
        </g>
        {/* Inner accent rays */}
        <g stroke="url(#bearcaveGradientMain)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
          <line x1="155" y1="45" x2="158" y2="42" {...pathProps} />
          <line x1="155" y1="75" x2="158" y2="78" {...pathProps} />
          <line x1="145" y1="75" x2="142" y2="78" {...pathProps} />
          <line x1="145" y1="45" x2="142" y2="42" {...pathProps} />
        </g>
      </g>

      {/* Primitive marks - more sophisticated */}
      <g className="bearcave-logo__marks" opacity="0.65">
        {/* Left side marks */}
        <g>
          <line x1="75" y1="125" x2="75" y2="140" stroke="url(#bearcaveGradientMain)" strokeWidth="2" strokeLinecap="round" {...pathProps} />
          <line x1="80" y1="128" x2="80" y2="142" stroke="url(#bearcaveGradientMain)" strokeWidth="2" strokeLinecap="round" {...pathProps} />
          <circle cx="77.5" cy="145" r="1.5" fill="url(#bearcaveGradientMain)" opacity="0.8" />
        </g>
        {/* Right side marks */}
        <g>
          <line x1="125" y1="125" x2="125" y2="140" stroke="url(#bearcaveGradientMain)" strokeWidth="2" strokeLinecap="round" {...pathProps} />
          <line x1="120" y1="128" x2="120" y2="142" stroke="url(#bearcaveGradientMain)" strokeWidth="2" strokeLinecap="round" {...pathProps} />
          <circle cx="122.5" cy="145" r="1.5" fill="url(#bearcaveGradientMain)" opacity="0.8" />
        </g>
      </g>

      {/* Subtle texture overlay for depth */}
      <g className="bearcave-logo__texture" opacity="0.15">
        <circle cx="50" cy="100" r="2" fill="url(#bearcaveGradientMain)" />
        <circle cx="150" cy="100" r="2" fill="url(#bearcaveGradientMain)" />
        <circle cx="100" cy="120" r="1.5" fill="url(#bearcaveGradientAccent)" />
      </g>
    </g>
  );

  // Wordmark Component - Enhanced typography
  const Wordmark = () => (
    <g className="bearcave-logo__wordmark">
      {/* BearCave text with gradient */}
      <text
        x="100"
        y="200"
        textAnchor="middle"
        fontSize={primaryTextSize}
        fontWeight="800"
        fill="url(#bearcaveGradientMain)"
        fontFamily="var(--font-display), 'Clash Display', 'Arial Black', system-ui, sans-serif"
        letterSpacing="-0.03em"
        className="bearcave-logo__text-primary"
      >
        BearCave
      </text>
      {/* Marketing text */}
      <text
        x="100"
        y="220"
        textAnchor="middle"
        fontSize={secondaryTextSize}
        fontWeight="600"
        fill="url(#bearcaveGradientAccent)"
        fontFamily="var(--font-body), 'Inter', system-ui, sans-serif"
        opacity="0.85"
        letterSpacing="0.05em"
        className="bearcave-logo__text-secondary"
      >
        MARKETING
      </text>
      {/* Subtle underline accent */}
      <line
        x1="60"
        y1="225"
        x2="140"
        y2="225"
        stroke="url(#bearcaveGradientMain)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </g>
  );

  // TODO: MotionStyle -> SVGProps mismatch - wrap props with type assertion for compatibility
  return (
    <Component
      className={`bearcave-logo bearcave-logo--${variant} ${className}`}
      width={size}
      height={variant === 'full' ? size * 1.33 : size * 0.9}
      viewBox={variant === 'full' ? fullViewBox : iconViewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={variant === 'full' ? 'BearCave Marketing Logo' : 'BearCave Logo'}
      {...(svgProps as unknown as any)}
    >
      <defs>
        {/* Main brand gradient */}
        <linearGradient id="bearcaveGradientMain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
        </linearGradient>

        {/* Accent gradient for highlights */}
        <linearGradient id="bearcaveGradientAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="1" />
        </linearGradient>

        {/* Fill gradient for arch background */}
        <linearGradient id="bearcaveGradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
        </linearGradient>

        {/* Enhanced glow filter */}
        <filter id="bearcaveGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Shadow filter for depth */}
        <filter id="bearcaveShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Icon mark */}
      <g transform={variant === 'full' ? 'translate(0, 15)' : ''}>
        <IconMark />
      </g>

      {/* Wordmark (only for full variant) */}
      {variant === 'full' && <Wordmark />}
    </Component>
  );
};

export default BearCaveLogo;
