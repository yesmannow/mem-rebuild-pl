import React from "react";
import OptimizedImage from "@components/media/OptimizedImage";

export interface HeroMediaProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function HeroMedia({ src, alt, className = "" }: HeroMediaProps) {
  if (!src) return null;

  return (
    <div className={`mb-8 overflow-hidden rounded-2xl ring-1 ring-white/5 ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt ?? "Case study hero"}
        className="h-64 w-full md:h-[28rem] object-cover"
      />
    </div>
  );
}

