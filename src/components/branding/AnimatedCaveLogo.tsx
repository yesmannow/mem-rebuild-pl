import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedCaveLogoProps {
  variant?: 'icon' | 'full' | 'lockup';
  size?: number;
  animated?: boolean;
  className?: string;
}

/**
 * Animated Cave Logo - Inspired by Bear Cave Marketing
 * Features cave/mountain silhouette with animated entrance reveal
 */
export const AnimatedCaveLogo: React.FC<AnimatedCaveLogoProps> = ({
  variant = 'lockup',
  size = 48,
  animated = true,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!animated) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const caveVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
    hover: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const mountainVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, delay: 0.3, ease: 'easeInOut' },
    },
  };

  const bearVariants = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.8, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const glowVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.3, 0.2],
      transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' as const },
    },
    hover: {
      opacity: 0.5,
      transition: { duration: 0.3 },
    },
  };

  const IconMark = (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: animated ? rotateX : 0,
        rotateY: animated ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
    >
      <defs>
        {/* Signal Orange gradient */}
        <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff8c5a" stopOpacity="0.7" />
        </linearGradient>

        {/* Telemetry Teal gradient */}
        <linearGradient id="telemetryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00d4d4" stopOpacity="0.6" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Parchment texture */}
        <pattern id="parchmentTexture" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="var(--color-surface)" />
          <circle cx="1" cy="1" r="0.3" fill="#e8e0d0" opacity="0.3" />
          <circle cx="3" cy="3" r="0.2" fill="#e8e0d0" opacity="0.2" />
        </pattern>
      </defs>

      {/* Background circle with texture */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="url(#parchmentTexture)"
        opacity="0.1"
      />

      {/* Mountain range silhouette */}
      <motion.path
        d="M 20 140 L 60 80 L 100 100 L 140 60 L 180 100 L 200 140 L 20 140 Z"
        fill="var(--ink-900)"
        stroke="var(--signal-500)"
        strokeWidth="2"
        opacity="0.8"
        variants={mountainVariants}
        initial="initial"
        animate="animate"
      />

      {/* Cave entrance arch */}
      <motion.path
        d="M 70 140 Q 100 100 130 140"
        fill="none"
        stroke="url(#signalGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        variants={caveVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        filter="url(#glow)"
      />

      {/* Inner cave depth */}
      <motion.path
        d="M 80 140 Q 100 120 120 140"
        fill="var(--ink-900)"
        opacity="0.6"
        variants={caveVariants}
        initial="initial"
        animate="animate"
      />

      {/* Bear silhouette inside cave */}
      <motion.g
        variants={bearVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {/* Bear body */}
        <ellipse cx="100" cy="130" rx="25" ry="20" fill="var(--ink-700)" />

        {/* Bear head */}
        <circle cx="100" cy="115" r="15" fill="var(--ink-700)" />

        {/* Bear ears */}
        <circle cx="90" cy="108" r="5" fill="var(--ink-700)" />
        <circle cx="110" cy="108" r="5" fill="var(--ink-700)" />

        {/* Bear snout */}
        <ellipse cx="100" cy="120" rx="6" ry="8" fill="var(--ink-700)" />

        {/* Eye glow */}
        <circle cx="95" cy="112" r="2" fill="var(--signal-500)" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.8;1;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </motion.g>

      {/* Animated glow from cave */}
      <motion.circle
        cx="100"
        cy="130"
        r="30"
        fill="url(#signalGradient)"
        opacity="0"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        filter="url(#glow)"
      />

      {/* Telemetry accent lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <line
          x1="50"
          y1="120"
          x2="70"
          y2="120"
          stroke="var(--telemetry-400)"
          strokeWidth="2"
          opacity="0.6"
        />
        <line
          x1="130"
          y1="120"
          x2="150"
          y2="120"
          stroke="var(--telemetry-400)"
          strokeWidth="2"
          opacity="0.6"
        />
      </motion.g>
    </motion.svg>
  );

  if (variant === 'icon') return IconMark;

  const Wordmark = (
    <motion.span
      className="ml-3 font-display font-bold tracking-tight"
      style={{ fontSize: `${size * 0.5}px` }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <span className="text-[var(--signal-500)]">Bear</span>
      <span className="text-[var(--parchment-050)]">Cave</span>
      {variant === 'full' && (
        <span className="ml-2 text-[var(--telemetry-400)] font-body font-normal text-sm">
          Marketing
        </span>
      )}
    </motion.span>
  );

  return (
    <motion.div
      className="inline-flex items-center"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {IconMark}
      {variant !== 'icon' && Wordmark}
    </motion.div>
  );
};

export default AnimatedCaveLogo;

