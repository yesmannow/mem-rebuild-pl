import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const InteractiveLogo: React.FC<InteractiveLogoProps> = ({
  className = '',
  size = 40,
  showText = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo container with static glow */}
      <motion.div
        className={`relative transition-all duration-300 ${
          isHovered
            ? 'drop-shadow-[0_0_20px_rgba(64,224,208,0.6)] drop-shadow-[0_0_15px_rgba(255,165,0,0.4)]'
            : 'drop-shadow-[0_0_8px_rgba(64,224,208,0.2)]'
        }`}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* SVG Logo */}
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
        >
          <defs>
            {/* Main gradient: Teal to Orange */}
            <linearGradient id="gradient-cybernetic-logo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#40E0D0" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow-cybernetic-logo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Status dot glow */}
            <radialGradient id="status-glow-cybernetic-logo" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#40E0D0" stopOpacity="1" />
              <stop offset="70%" stopColor="#40E0D0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#40E0D0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background circle (subtle) */}
          <circle cx="32" cy="32" r="30" fill="#0f172a" opacity="0.3"/>

          {/* Tech bracket: Opening */}
          <path
            d="M 12 20 L 12 44 L 18 44 L 18 26 L 16 24 L 12 20 Z"
            fill="url(#gradient-cybernetic-logo)"
            opacity={isHovered ? 0.8 : 0.6}
            className="transition-opacity duration-300"
          />

          {/* Tech bracket: Closing */}
          <path
            d="M 52 20 L 52 44 L 46 44 L 46 26 L 48 24 L 52 20 Z"
            fill="url(#gradient-cybernetic-logo)"
            opacity={isHovered ? 0.8 : 0.6}
            className="transition-opacity duration-300"
          />

          {/* JD Monogram */}
          <g transform="translate(32, 32)">
            {/* J */}
            <path
              d="M -8 -12 L -8 8 L -4 8 L -4 4 L 0 4 L 0 0 L -4 0 L -4 -8 L -8 -12 Z"
              fill="url(#gradient-cybernetic-logo)"
            />
            {/* D */}
            <path
              d="M 4 -12 L 4 8 L 12 8 L 16 4 L 16 0 L 12 -4 L 16 -8 L 16 -12 L 4 -12 Z M 8 -8 L 8 4 L 12 4 L 14 2 L 14 -2 L 12 -4 L 8 -8 Z"
              fill="url(#gradient-cybernetic-logo)"
            />
          </g>

          {/* Status dot (top right) - Breathing animation */}
          <motion.circle
            cx="50"
            cy="14"
            r="4"
            fill="#40E0D0"
            filter="url(#glow-cybernetic-logo)"
            animate={{
              opacity: [0.9, 1, 0.9],
              scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Status dot inner glow */}
          <motion.circle
            cx="50"
            cy="14"
            r="2"
            fill="url(#status-glow-cybernetic-logo)"
            animate={{
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Text label (optional) */}
      {showText && (
        <motion.span
          className="ml-2 text-brand-text font-bold text-lg tracking-tight"
          animate={{
            color: isHovered ? '#40E0D0' : undefined,
          }}
          transition={{ duration: 0.3 }}
        >
          Jacob Darling
        </motion.span>
      )}
    </div>
  );
};

export default InteractiveLogo;

