import React from "react";
import { motion } from "framer-motion";

type Variant = "icon" | "word" | "lockup";
type Tone = "default" | "mono";

export interface LogoProps {
  variant?: Variant;
  tone?: Tone;
  size?: number;
  glow?: boolean;
  ariaLabel?: string;
  className?: string;
}

// Inline SVG icon component
const IconSvg: React.FC<{ size: number; tone: Tone }> = ({ size, tone }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={tone === "mono" ? "text-white" : ""}
  >
    <defs>
      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6BE1CE" />
        <stop offset="100%" stopColor="#F4A264" />
      </linearGradient>
      <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6BE1CE" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#F4A264" stopOpacity="0.2" />
      </linearGradient>
    </defs>

    {/* Hexagon container */}
    <path
      d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
      fill="url(#brandGradient)"
      opacity="0.15"
    />
    <path
      d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
      stroke="url(#brandGradient)"
      strokeWidth="2.5"
      fill="none"
      strokeLinejoin="round"
    />

    {/* Bear head silhouette */}
    <g transform="translate(50, 50)">
      {/* Head shape */}
      <ellipse cx="0" cy="-5" rx="18" ry="20" fill="url(#brandGradient)" />

      {/* Ear */}
      <circle cx="-12" cy="-15" r="6" fill="url(#brandGradient)" />
      <circle cx="12" cy="-15" r="6" fill="url(#brandGradient)" />

      {/* Snout */}
      <ellipse cx="0" cy="5" rx="8" ry="10" fill="url(#brandGradient)" />

      {/* Eye */}
      <circle cx="-5" cy="-8" r="2" fill="#0b0b0c" />

      {/* Nose */}
      <ellipse cx="0" cy="8" rx="3" ry="4" fill="#0b0b0c" />
    </g>
  </svg>
);

export function Logo({
  variant = "lockup",
  tone = "default",
  size = 32,
  glow = false,
  ariaLabel = "BearCave",
  className = "",
}: LogoProps) {
  const Mark = (
    <motion.span
      aria-label={ariaLabel}
      className={`relative inline-flex items-center ${glow ? "after:content-[''] after:absolute after:inset-0 after:rounded-xl after:blur-2xl after:bg-gradient-to-tr after:from-brand-400/30 after:to-accent-400/20" : ""} ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <IconSvg size={size} tone={tone} />
    </motion.span>
  );

  if (variant === "icon") return Mark;

  const Word = (
    <span className="ml-2 text-xl font-semibold tracking-tight">
      <span className="text-white">Bear</span><span className="text-neutral-200">Cave</span>
    </span>
  );

  return (
    <span className="inline-flex items-center">
      {Mark}{variant === "lockup" && Word}
    </span>
  );
}

export default Logo;
