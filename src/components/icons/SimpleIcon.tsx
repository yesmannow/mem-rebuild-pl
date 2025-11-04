import React, { useState, useEffect } from "react";

// Cache for lazy-loaded simple-icons to avoid multiple imports
let simpleIconsCache: any = null;
let iconsLoadingPromise: Promise<any> | null = null;

// Helper to lazily load simple-icons (5MB+ library - only load when needed)
const loadSimpleIcons = async (): Promise<any> => {
  if (simpleIconsCache) {
    return simpleIconsCache;
  }

  if (iconsLoadingPromise) {
    return iconsLoadingPromise;
  }

  iconsLoadingPromise = import("simple-icons").then((icons) => {
    simpleIconsCache = icons;
    return icons;
  });

  return iconsLoadingPromise;
};

// Helper to safely get an icon from simple-icons
// Note: simple-icons v15+ uses named exports with "si" prefix (e.g., siReact, siJavascript)
const getSimpleIcon = async (slug: string): Promise<any> => {
  try {
    const simpleIcons = await loadSimpleIcons();

    // Convert slug to camelCase with "si" prefix
    // e.g., "react" -> "siReact", "javascript" -> "siJavascript"
    const slugLower = slug.toLowerCase();
    const camelCase = slugLower
      .split('-')
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');

    const iconKey = `si${camelCase.charAt(0).toUpperCase()}${camelCase.slice(1)}`;

    // Method 1: Try exact match with si prefix
    if ((simpleIcons as any)[iconKey]) {
      return (simpleIcons as any)[iconKey];
    }

    // Method 2: Try with original slug as key
    if ((simpleIcons as any)[slugLower]) {
      return (simpleIcons as any)[slugLower];
    }

    // Method 3: Try to find by iterating through exports
    for (const key in simpleIcons) {
      if (key.toLowerCase().includes(slugLower) ||
          (simpleIcons as any)[key]?.slug === slugLower) {
        return (simpleIcons as any)[key];
      }
    }

    return null;
  } catch (e) {
    // Silently fail - don't crash the app
    return null;
  }
};

interface SimpleIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Maps common technology names to Simple Icons slugs
 */
export const getIconSlug = (name: string): string | null => {
  const iconMap: { [key: string]: string } = {
    // Programming Languages
    "PHP": "php",
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "jQuery": "jquery",
    "SQL": "sqlite",
    "CSS": "css3",
    "SCSS": "sass",
    "HTML": "html5",

    // Frontend Frameworks
    "React": "react",
    "Tailwind CSS": "tailwindcss",
    "Bootstrap": "bootstrap",
    "Webpack": "webpack",
    "Vite": "vite",
    "Framer Motion": "framer",

    // Backend & Infrastructure
    "Node.js": "nodedotjs",
    "Express": "express",
    "Apache": "apache",
    "Nginx": "nginx",
    "MySQL": "mysql",
    "PostgreSQL": "postgresql",
    "Redis": "redis",
    "MongoDB": "mongodb",

    // WordPress
    "WooCommerce": "woocommerce",
    "WordPress": "wordpress",
    "Elementor": "elementor",
    "Divi": "divi",

    // E-commerce & Payments
    "Stripe": "stripe",
    "PayPal": "paypal",

    // CDN & Security
    "Cloudflare": "cloudflare",

    // Analytics
    "GTM": "googletagmanager",
    "GA4": "googleanalytics",
    "Google Analytics": "googleanalytics",
    "Google Tag Manager": "googletagmanager",

    // Advertising
    "Google Ads": "googleads",
    "Meta Ads": "meta",
    "LinkedIn Ads": "linkedin",

    // Marketing Automation
    "FluentCRM": "fluentcrm",
    "ActiveCampaign": "activecampaign",
    "Mailchimp": "mailchimp",
    "WP Fusion": "wpfusion",
    "Zapier": "zapier",
    "Make (Integromat)": "integromat",
    "Make": "integromat",
    "Integromat": "integromat",

    // Hosting & Infrastructure
    "Vercel": "vercel",
    "Netlify": "netlify",
    "Liquid Web": "liquidweb",

    // Development Tools
    "Git": "git",
    "GitHub": "github",
    "VS Code": "visualstudiocode",
    "GitHub Actions": "githubactions",
    "Postman": "postman",

    // Design Tools
    "Figma": "figma",
    "Canva": "canva",
    "Adobe": "adobe",
    "Photoshop": "adobephotoshop",
    "Illustrator": "adobeillustrator",

    // Project Management
    "Notion": "notion",
    "Asana": "asana",
    "Trello": "trello",
    "Slack": "slack",
    "Microsoft Teams": "microsoftteams",

    // SEO & Content
    "Google Search Console": "googlesearchconsole",
    "Ahrefs": "ahrefs",
    "SEMrush": "semrush",

    // Social & Communication
    "LinkedIn": "linkedin",

    // Additional Tools
    "Wordfence": "wordfence",
    "Hotjar": "hotjar",
    "WP Rocket": "wprocket",
    "LiteSpeed": "litespeed",
    "LiteSpeed Cache": "litespeed",
    "Umami": "umami",
    "Microsoft Clarity": "microsoft",
    "Netdata": "netdata",
    "Sucuri": "sucuri",
    "Cloudflare Tunnel": "cloudflare",
    "PixelYourSite Pro": "facebook",
    "OptinMonster": "optinmonster",
    "Easy Digital Downloads": "wordpress",
    "MemberPress": "wordpress",
  };

  // Direct lookup
  if (iconMap[name]) {
    return iconMap[name];
  }

  // Case-insensitive lookup
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(iconMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  // Return slug directly if name looks like a slug
  // (Don't call getSimpleIcon here as it's async - just return the slug)
  return name.toLowerCase();
};

/**
 * SimpleIcon component that renders icons from simple-icons
 * Uses lazy loading to avoid blocking initial page load
 */
const SimpleIcon: React.FC<SimpleIconProps> = ({
  name,
  size = 24,
  color,
  className = ""
}) => {
  const [icon, setIcon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = getIconSlug(name);

    if (!slug) {
      setLoading(false);
      return;
    }

    // Load icon asynchronously
    getSimpleIcon(slug)
      .then((loadedIcon) => {
        setIcon(loadedIcon);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [name]);

  if (loading || !icon) {
    // Return a placeholder while loading or if icon not found
    return null;
  }

  const iconColor = color || `#${icon.hex}`;
  const svgPath = icon.path;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={iconColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{icon.title}</title>
      <path d={svgPath} />
    </svg>
  );
};

export default SimpleIcon;

