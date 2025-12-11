/**
 * Page Background Service
 * 
 * Provides themed background images for different pages
 * Maps pages to appropriate themes and imagery
 */

interface PageTheme {
  primary: string;
  secondary?: string;
  overlay: 'turquoise' | 'orange' | 'dark';
  overlayOpacity: number;
}

const pageThemes: Record<string, PageTheme> = {
  // Homepage
  home: {
    primary: 'technology,workspace,minimal,modern',
    secondary: 'innovation,digital,future',
    overlay: 'dark',
    overlayOpacity: 0.85,
  },
  
  // Portfolio / Case Studies
  portfolio: {
    primary: 'business,success,analytics,charts',
    secondary: 'growth,marketing,strategy',
    overlay: 'dark',
    overlayOpacity: 0.82,
  },
  
  caseStudies: {
    primary: 'team,collaboration,office,meeting',
    secondary: 'project,planning,whiteboard',
    overlay: 'dark',
    overlayOpacity: 0.80,
  },
  
  // About / Resume
  about: {
    primary: 'professional,portrait,workspace',
    secondary: 'career,expertise,leadership',
    overlay: 'dark',
    overlayOpacity: 0.85,
  },
  
  // Services
  services: {
    primary: 'strategy,consulting,planning',
    secondary: 'solutions,architecture,systems',
    overlay: 'dark',
    overlayOpacity: 0.83,
  },
  
  // Tools / DevOps
  tools: {
    primary: 'code,programming,developer,terminal',
    secondary: 'automation,cli,tools,workflow',
    overlay: 'dark',
    overlayOpacity: 0.88,
  },
  
  devops: {
    primary: 'server,infrastructure,network,cloud',
    secondary: 'deployment,ci-cd,pipeline',
    overlay: 'dark',
    overlayOpacity: 0.87,
  },
  
  // Creative
  photography: {
    primary: 'camera,photography,art,creative',
    secondary: 'gallery,portfolio,visual',
    overlay: 'dark',
    overlayOpacity: 0.75,
  },
  
  design: {
    primary: 'design,creative,ui,ux',
    secondary: 'graphics,layout,branding',
    overlay: 'dark',
    overlayOpacity: 0.78,
  },
  
  // Applications / Lab
  applications: {
    primary: 'app,software,interface,dashboard',
    secondary: 'product,platform,saas',
    overlay: 'dark',
    overlayOpacity: 0.85,
  },
  
  lab: {
    primary: 'experiment,innovation,research,tech',
    secondary: 'prototype,testing,development',
    overlay: 'dark',
    overlayOpacity: 0.84,
  },
  
  // Contact
  contact: {
    primary: 'communication,connection,network',
    secondary: 'collaboration,partnership,handshake',
    overlay: 'dark',
    overlayOpacity: 0.86,
  },
};

// Skill category themes for resume page
const skillCategoryThemes: Record<string, string> = {
  leadership: 'team,collaboration,leadership,meeting',
  strategy: 'analytics,data,charts,metrics',
  automation: 'technology,code,automation,systems',
  analytics: 'data,visualization,metrics,dashboard',
  development: 'coding,programming,developer,software',
  tools: 'workspace,tools,software,productivity',
  marketing: 'marketing,advertising,social-media,campaigns',
  design: 'design,creative,ui,branding',
};

class PageBackgroundService {
  /**
   * Get theme for a specific page
   */
  getPageTheme(pageName: string): PageTheme {
    return pageThemes[pageName] || pageThemes.home;
  }

  /**
   * Get all page themes
   */
  getAllThemes(): Record<string, PageTheme> {
    return pageThemes;
  }

  /**
   * Get skill category theme
   */
  getSkillCategoryTheme(category: string): string {
    const normalized = category.toLowerCase().replace(/\s+/g, '-');
    return skillCategoryThemes[normalized] || 'technology,workspace';
  }

  /**
   * Get all skill category themes
   */
  getSkillCategoryThemes(): Record<string, string> {
    return skillCategoryThemes;
  }

  /**
   * Generate image URL for a page
   */
  getPageImageUrl(pageName: string, width = 1920, height = 1080): string {
    const theme = this.getPageTheme(pageName);
    return `https://source.unsplash.com/${width}x${height}/?${theme.primary}`;
  }

  /**
   * Generate multiple image URLs for variety
   */
  getPageImageUrls(pageName: string, count = 3, width = 1920, height = 1080): string[] {
    const theme = this.getPageTheme(pageName);
    const urls: string[] = [];
    
    // Primary theme image
    urls.push(`https://source.unsplash.com/${width}x${height}/?${theme.primary}`);
    
    // Secondary theme image if available
    if (theme.secondary && count > 1) {
      urls.push(`https://source.unsplash.com/${width}x${height}/?${theme.secondary}`);
    }
    
    // Fill remaining slots with variations
    while (urls.length < count) {
      const index = urls.length;
      const seedTheme = index % 2 === 0 ? theme.primary : theme.secondary || theme.primary;
      urls.push(`https://source.unsplash.com/${width}x${height}/?${seedTheme}&sig=${index}`);
    }
    
    return urls.slice(0, count);
  }

  /**
   * Get random image from a list of themes
   */
  getRandomThemedImage(themes: string[], width = 1920, height = 1080): string {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    return `https://source.unsplash.com/${width}x${height}/?${randomTheme}`;
  }

  /**
   * Generate blur placeholder URL
   */
  getPlaceholderUrl(width = 20, height = 20): string {
    return `https://picsum.photos/${width}/${height}?blur=10`;
  }
}

export const pageBackgroundService = new PageBackgroundService();
export type { PageTheme };
export { skillCategoryThemes };
