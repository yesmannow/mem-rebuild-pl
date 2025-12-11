/**
 * TechIcon Component
 * 
 * Unified tech stack icon system with consistent styling
 * Loads SVG icons from /public/images/tech-icons/
 */

import React from 'react';
import { cn } from '../../lib/utils';

interface TechIconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'gradient' | 'mono';
}

const sizeMap = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

// Mapping of common tech names to icon filenames
const iconNameMap: Record<string, string> = {
  // Frontend
  'react': 'react',
  'vue': 'vue',
  'angular': 'angular',
  'svelte': 'svelte',
  'next.js': 'nextjs',
  'typescript': 'typescript',
  'javascript': 'javascript',
  'tailwind': 'tailwindcss',
  'tailwind css': 'tailwindcss',
  'css': 'css',
  'html': 'html',
  'sass': 'sass',
  'framer': 'framer',
  'framer motion': 'framer',
  
  // Backend
  'node.js': 'nodejs',
  'node': 'nodejs',
  'express': 'express',
  'python': 'python',
  'django': 'django',
  'flask': 'flask',
  'fastapi': 'fastapi',
  'php': 'php',
  'laravel': 'laravel',
  'ruby': 'ruby',
  'rails': 'rails',
  
  // Databases
  'mongodb': 'mongodb',
  'postgres': 'postgresql',
  'postgresql': 'postgresql',
  'mysql': 'mysql',
  'redis': 'redis',
  'supabase': 'supabase',
  
  // Cloud & DevOps
  'aws': 'AWS',
  'azure': 'Azure',
  'gcp': 'googlecloud',
  'google cloud': 'googlecloud',
  'cloudflare': 'cloudflare',
  'vercel': 'vercel',
  'netlify': 'netlify',
  'docker': 'docker',
  'kubernetes': 'kubernetes',
  'github': 'github',
  'gitlab': 'gitlab',
  'git': 'git',
  
  // Tools
  'vite': 'vite',
  'webpack': 'webpack',
  'figma': 'figma',
  'photoshop': 'photoshop',
  'illustrator': 'illustrator',
  'sketch': 'sketch',
  
  // Marketing & CRM
  'hubspot': 'hubspot',
  'salesforce': 'salesforce',
  'mailchimp': 'mailchimp',
  'google analytics': 'googleanalytics',
  'ga4': 'googleanalytics',
  'gtm': 'googletagmanager',
  'google tag manager': 'googletagmanager',
  
  // CMS & E-commerce
  'wordpress': 'wordpress',
  'shopify': 'shopify',
  'woocommerce': 'woocommerce',
  'stripe': 'stripe',
  
  // API & Data
  'graphql': 'graphql',
  'rest': 'rest',
  'openai': 'openai',
  'gemini': 'gemini',
  
  // Other
  'cheerio': 'cheerio',
  'puppeteer': 'puppeteer',
};

// Tech name display labels (proper casing)
const techLabels: Record<string, string> = {
  'react': 'React',
  'node.js': 'Node.js',
  'typescript': 'TypeScript',
  'javascript': 'JavaScript',
  'tailwind css': 'Tailwind CSS',
  'next.js': 'Next.js',
  'aws': 'AWS',
  'azure': 'Azure',
  'gcp': 'Google Cloud',
  'mongodb': 'MongoDB',
  'postgresql': 'PostgreSQL',
  'mysql': 'MySQL',
  'graphql': 'GraphQL',
  'ga4': 'Google Analytics 4',
  'gtm': 'Google Tag Manager',
  'wordpress': 'WordPress',
  'woocommerce': 'WooCommerce',
};

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  size = 'md',
  className = '',
  showLabel = false,
  variant = 'default',
}) => {
  const normalizedName = name.toLowerCase().trim();
  const iconFilename = iconNameMap[normalizedName] || normalizedName;
  const iconPath = `/images/tech-icons/${iconFilename}.svg`;
  const displayLabel = techLabels[normalizedName] || name;

  const variantStyles = {
    default: '',
    gradient: 'tech-icon-gradient',
    mono: 'grayscale hover:grayscale-0 transition-all duration-300',
  };

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <img
        src={iconPath}
        alt={`${displayLabel} icon`}
        className={cn(sizeMap[size], variantStyles[variant], 'object-contain')}
        loading="lazy"
        onError={(e) => {
          // Fallback to a generic icon or hide
          e.currentTarget.style.display = 'none';
        }}
      />
      {showLabel && (
        <span className="text-sm font-medium text-brand-text">{displayLabel}</span>
      )}
    </div>
  );
};

/**
 * TechStack Component
 * 
 * Display a row/grid of tech icons
 */
interface TechStackProps {
  technologies: string[];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLabels?: boolean;
  variant?: 'default' | 'gradient' | 'mono';
  layout?: 'row' | 'grid';
  className?: string;
}

export const TechStack: React.FC<TechStackProps> = ({
  technologies,
  size = 'sm',
  showLabels = false,
  variant = 'default',
  layout = 'row',
  className = '',
}) => {
  const layoutStyles = {
    row: 'flex flex-wrap gap-3',
    grid: 'grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4',
  };

  return (
    <div className={cn(layoutStyles[layout], className)}>
      {technologies.map((tech, index) => (
        <TechIcon
          key={`${tech}-${index}`}
          name={tech}
          size={size}
          showLabel={showLabels}
          variant={variant}
        />
      ))}
    </div>
  );
};

/**
 * TechBadge Component
 * 
 * Tech icon combined with a badge for use in cards
 */
interface TechBadgeProps {
  name: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name, className = '' }) => {
  const normalizedName = name.toLowerCase().trim();
  const displayLabel = techLabels[normalizedName] || name;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg',
        'bg-brand-turquoise/10 border border-brand-turquoise/20',
        'hover:bg-brand-turquoise/20 transition-colors duration-200',
        className
      )}
    >
      <TechIcon name={name} size="xs" />
      <span className="text-xs font-medium text-brand-turquoise">{displayLabel}</span>
    </div>
  );
};

export default TechIcon;
