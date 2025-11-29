/**
 * Centralized tech icon mapping
 * Maps technology names to their SVG logo paths
 * Logos downloaded from Simple Icons, svglogos.dev, and GitHub repos
 */

export const TECH_ICON_MAP: Record<string, string> = {
  // Core Frontend
  'React': '/images/tech-icons/react.svg',
  'Next.js': '/images/tech-icons/nextjs.svg',
  'TypeScript': '/images/tech-icons/typescript.svg',
  'JavaScript': '/images/tech-icons/javascript.svg',
  'Tailwind CSS': '/images/tech-icons/tailwindcss.svg',
  'Vite': '/images/tech-icons/vite.svg',
  'Framer Motion': '/images/tech-icons/framer.svg',

  // Backend & Runtime
  'Node.js': '/images/tech-icons/nodejs.svg',
  'Express': '/images/tech-icons/express.svg',
  'Python': '/images/tech-icons/python.svg',

  // Databases
  'PostgreSQL': '/images/tech-icons/postgresql.svg',
  'MySQL': '/images/tech-icons/mysql.svg',
  'MongoDB': '/images/tech-icons/mongodb.svg',
  'Redis': '/images/tech-icons/redis.svg',

  // Infrastructure & DevOps
  'Docker': '/images/tech-icons/docker.svg',
  'Kubernetes': '/images/tech-icons/kubernetes.svg',
  'Cloudflare Workers': '/images/tech-icons/cloudflare.svg',
  'Cloudflare': '/images/tech-icons/cloudflare.svg',

  // APIs & Data
  'GraphQL': '/images/tech-icons/graphql.svg',
  'Supabase': '/images/tech-icons/supabase.svg',

  // Tools & Services
  'GitHub': '/images/tech-icons/github.svg',
  'Git': '/images/tech-icons/git.svg',
  'Git/GitHub': '/images/tech-icons/github.svg',
  'Figma': '/images/tech-icons/figma.svg',
  'HubSpot': '/images/tech-icons/hubspot.svg',
  'Cheerio': '/images/tech-icons/cheerio.svg',
  'Sharp': '/images/tech-icons/sharp.svg',
  'Zod': '/images/tech-icons/zod.svg',

  // Cloud
  'AWS': '/images/tech-icons/AWS.svg',
  'Azure': '/images/tech-icons/Azure.svg',

  // Additional common tech
  'HTML5': '/images/tech-icons/html5.svg',
  'CSS3': '/images/tech-icons/css3.svg',
  'Sass': '/images/tech-icons/sass.svg',
  'Webpack': '/images/tech-icons/webpack.svg',
  'npm': '/images/tech-icons/npm.svg',
  'Yarn': '/images/tech-icons/yarn.svg',
};

/**
 * Get icon path for a technology name
 * Returns undefined if not found
 */
export function getTechIconPath(tech: string): string | undefined {
  return TECH_ICON_MAP[tech];
}

/**
 * Get icon slug for a technology (for Icon component)
 * Converts tech name to slug format
 */
export function getTechIconSlug(tech: string): string {
  // Normalize to match downloaded file names
  const slugMap: Record<string, string> = {
    'React': 'react',
    'Next.js': 'nextjs',
    'TypeScript': 'typescript',
    'JavaScript': 'javascript',
    'Tailwind CSS': 'tailwindcss',
    'Vite': 'vite',
    'Framer Motion': 'framer',
    'Node.js': 'nodejs',
    'Express': 'express',
    'Python': 'python',
    'PostgreSQL': 'postgresql',
    'MySQL': 'mysql',
    'MongoDB': 'mongodb',
    'Redis': 'redis',
    'Docker': 'docker',
    'Kubernetes': 'kubernetes',
    'Cloudflare Workers': 'cloudflare',
    'Cloudflare': 'cloudflare',
    'GraphQL': 'graphql',
    'Supabase': 'supabase',
    'GitHub': 'github',
    'Git': 'git',
    'Git/GitHub': 'github',
    'Figma': 'figma',
    'HubSpot': 'hubspot',
    'Cheerio': 'cheerio',
    'Sharp': 'sharp',
    'Zod': 'zod',
    'AWS': 'aws',
    'Azure': 'azure',
  };

  return slugMap[tech] || tech.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
}

/**
 * Check if a tech icon exists
 */
export function hasTechIcon(tech: string): boolean {
  return TECH_ICON_MAP[tech] !== undefined;
}

