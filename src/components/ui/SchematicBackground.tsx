"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface FloatingOrbProps {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  color: "teal" | "orange" | "blue";
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ size, x, y, delay, duration, color }) => {
  const colorClasses = {
    teal: "bg-brand-teal/20",
    orange: "bg-brand-orange/15",
    blue: "bg-sky-400/15",
  };

  const glowColors = {
    teal: "rgba(64, 224, 208, 0.3)",
    orange: "rgba(255, 165, 0, 0.2)",
    blue: "rgba(56, 189, 248, 0.2)",
  };

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-xl pointer-events-none",
        colorClasses[color]
      )}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        boxShadow: `0 0 ${size / 2}px ${glowColors[color]}`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

interface SchematicBackgroundProps {
  className?: string;
  variant?: "default" | "dense" | "sparse";
  showGrid?: boolean;
  showOrbs?: boolean;
  showBeams?: boolean;
  gridOpacity?: number;
}

export const SchematicBackground: React.FC<SchematicBackgroundProps> = ({
  className,
  variant = "default",
  showGrid = true,
  showOrbs = true,
  showBeams = true,
  gridOpacity = 0.03,
}) => {
  // Generate random orbs based on variant
  const orbs = useMemo(() => {
    const orbCount = variant === "dense" ? 8 : variant === "sparse" ? 3 : 5;
    const orbConfigs: FloatingOrbProps[] = [];

    for (let i = 0; i < orbCount; i++) {
      orbConfigs.push({
        size: Math.random() * 200 + 100,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        color: ["teal", "orange", "blue"][Math.floor(Math.random() * 3)] as "teal" | "orange" | "blue",
      });
    }

    return orbConfigs;
  }, [variant]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Blueprint Grid Pattern */}
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(64, 224, 208, ${gridOpacity}) 1px, transparent 0)
            `,
            backgroundSize: "24px 24px",
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/50 to-brand-dark" />

      {/* Floating Orbs */}
      {showOrbs && orbs.map((orb, index) => (
        <FloatingOrb key={index} {...orb} />
      ))}

      {/* Animated Beam Lines */}
      {showBeams && (
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="beam-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#40E0D0" stopOpacity="0" />
              <stop offset="50%" stopColor="#40E0D0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#40E0D0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA500" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Diagonal Beam 1 */}
          <motion.line
            x1="-10%"
            y1="20%"
            x2="110%"
            y2="80%"
            stroke="url(#beam-gradient-1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Diagonal Beam 2 */}
          <motion.line
            x1="110%"
            y1="30%"
            x2="-10%"
            y2="70%"
            stroke="url(#beam-gradient-2)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 10,
              delay: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Horizontal scan line */}
          <motion.line
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            stroke="#40E0D0"
            strokeWidth="1"
            strokeOpacity="0.2"
            animate={{
              y1: ["0%", "100%"],
              y2: ["0%", "100%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      )}

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-brand-teal/10 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-brand-teal/10 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-brand-orange/10 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-brand-orange/10 rounded-br-3xl" />

      {/* Radial gradient from center */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(64, 224, 208, 0.05) 0%, transparent 60%)",
        }}
      />
    </div>
  );
};

export default SchematicBackground;
