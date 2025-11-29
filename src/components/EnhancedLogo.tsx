import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EnhancedLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const EnhancedLogo: React.FC<EnhancedLogoProps> = ({
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
      {/* Enhanced Logo Container */}
      <motion.div
        className={`relative transition-all duration-300 ${
          isHovered
            ? 'drop-shadow-[0_0_25px_rgba(64,224,208,0.7),0_0_20px_rgba(255,165,0,0.5)]'
            : 'drop-shadow-[0_0_10px_rgba(64,224,208,0.3)]'
        }`}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Modern SVG Logo */}
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
        >
          <defs>
            {/* Primary gradient: Teal to Orange */}
            <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#40E0D0" stopOpacity="1" />
              <stop offset="50%" stopColor="#20B2AA" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
            </linearGradient>

            {/* Secondary gradient for depth */}
            <linearGradient id="gradient-secondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CED1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.8" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Inner glow for status dot */}
            <radialGradient id="status-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#40E0D0" stopOpacity="1" />
              <stop offset="70%" stopColor="#40E0D0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#40E0D0" stopOpacity="0" />
            </radialGradient>

            {/* Shadow for depth */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Background circle with subtle gradient */}
          <circle
            cx="40"
            cy="40"
            r="38"
            fill="url(#gradient-primary)"
            opacity={isHovered ? 0.15 : 0.1}
            className="transition-opacity duration-300"
          />

          {/* Outer ring for depth */}
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="url(#gradient-primary)"
            strokeWidth="1.5"
            opacity={isHovered ? 0.4 : 0.2}
            animate={{
              opacity: isHovered ? [0.4, 0.6, 0.4] : 0.2,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Modern J Letter - Stylized */}
          <g transform="translate(40, 40)">
            {/* J with modern curves */}
            <motion.path
              d="M -18 -20 L -18 12 L -8 12 L -8 8 L -2 8 L -2 4 L -6 4 L -6 -8 L -2 -12 L -8 -16 L -18 -20 Z"
              fill="url(#gradient-primary)"
              filter="url(#shadow)"
              animate={{
                opacity: [1, 0.95, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* J accent line */}
            <motion.line
              x1="-18"
              y1="-20"
              x2="-18"
              y2="-12"
              stroke="url(#gradient-secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={isHovered ? 1 : 0.7}
            />
          </g>

          {/* Modern D Letter - Stylized */}
          <g transform="translate(40, 40)">
            {/* D with modern design */}
            <motion.path
              d="M 2 -20 L 2 12 L 14 12 L 20 6 L 20 2 L 16 -2 L 20 -6 L 20 -10 L 16 -14 L 20 -18 L 20 -20 L 2 -20 Z M 6 -16 L 6 8 L 14 8 L 18 4 L 18 -2 L 14 -6 L 6 -16 Z"
              fill="url(#gradient-primary)"
              filter="url(#shadow)"
              animate={{
                opacity: [1, 0.95, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.1,
              }}
            />

            {/* D inner accent */}
            <motion.ellipse
              cx="10"
              cy="0"
              rx="4"
              ry="8"
              fill="none"
              stroke="url(#gradient-secondary)"
              strokeWidth="1.5"
              opacity={isHovered ? 0.6 : 0.3}
            />
          </g>

          {/* Connecting element between J and D */}
          <motion.path
            d="M 22 40 Q 30 35, 38 40"
            fill="none"
            stroke="url(#gradient-secondary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={isHovered ? 0.5 : 0.2}
            animate={{
              pathLength: isHovered ? [0, 1] : [0, 0.3],
            }}
            transition={{
              duration: 0.5,
            }}
          />

          {/* Status indicator - Top right */}
          <motion.circle
            cx="62"
            cy="18"
            r="5"
            fill="#40E0D0"
            filter="url(#glow-filter)"
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: isHovered ? [1, 1.3, 1] : [1, 1.15, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Status inner glow */}
          <motion.circle
            cx="62"
            cy="18"
            r="2.5"
            fill="url(#status-glow)"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Decorative corner elements */}
          <motion.circle
            cx="18"
            cy="18"
            r="2"
            fill="url(#gradient-secondary)"
            opacity={isHovered ? 0.6 : 0.3}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.circle
            cx="62"
            cy="62"
            r="2"
            fill="url(#gradient-secondary)"
            opacity={isHovered ? 0.6 : 0.3}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Text label with enhanced styling */}
      {showText && (
        <motion.span
          className="ml-3 text-brand-text font-bold text-lg tracking-tight"
          animate={{
            color: isHovered ? '#40E0D0' : undefined,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="bg-gradient-to-r from-brand-teal to-brand-orange bg-clip-text text-transparent">
            Jacob Darling
          </span>
        </motion.span>
      )}
    </div>
  );
};

export default EnhancedLogo;

