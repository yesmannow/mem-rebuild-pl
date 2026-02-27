/**
 * Illustration Component
 * 
 * Dynamically loads SVG illustrations from public/illustrations/
 * Supports theming with color overrides
 * 
 * Illustrations sourced from unDraw (https://undraw.co) - MIT Licensed
 */

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface IllustrationProps {
  name: string;
  className?: string;
  themeColor?: string; // Override the primary color
  alt?: string;
}

/**
 * Illustration component for loading themed SVG illustrations
 * 
 * @example
 * <Illustration name="analytics" className="w-64" alt="Analytics dashboard" />
 * <Illustration name="marketing-strategy" themeColor="#40E0D0" />
 */
export function Illustration({
  name,
  className,
  themeColor,
  alt,
}: IllustrationProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function loadSvg() {
      try {
        const response = await fetch(`/illustrations/${name}.svg`);
        if (!response.ok) {
          throw new Error(`Failed to load illustration: ${name}`);
        }
        
        let content = await response.text();
        
        // Apply theme color if provided
        if (themeColor) {
          // Replace common color placeholders used by unDraw
          content = content.replace(/#6c63ff/gi, themeColor);
          content = content.replace(/#3f3d56/gi, themeColor);
        } else {
          // Default to brand turquoise
          content = content.replace(/#6c63ff/gi, '#40E0D0');
          content = content.replace(/#3f3d56/gi, '#40E0D0');
        }
        
        setSvgContent(content);
      } catch (err) {
        console.warn(`Could not load illustration: ${name}`, err);
        setError(true);
      }
    }

    loadSvg();
  }, [name, themeColor]);

  if (error) {
    return (
      <div className={cn('flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-lg', className)}>
        <p className="text-gray-400 text-sm">Illustration not found</p>
      </div>
    );
  }

  if (!svgContent) {
    return (
      <div className={cn('animate-pulse bg-gray-200 rounded-lg', className)} />
    );
  }

  return (
    <div
      className={cn('illustration-wrapper', className)}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-label={alt || `Illustration: ${name}`}
      role="img"
    />
  );
}

export default Illustration;
