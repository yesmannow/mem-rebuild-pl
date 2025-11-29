/**
 * Dynamically loads all side project images from /public/images/side-projects
 * Returns an array of side project objects with metadata
 */

export interface SideProjectItem {
  id: string;
  src: string;
  title: string;
  category: string;
  filename: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

/**
 * Auto-categorize side projects based on filename patterns
 */
function categorizeSideProject(filename: string): string {
  const lower = filename.toLowerCase();

  // Healthcare & Medical
  if (lower.includes('doctor') || lower.includes('urgent care') || lower.includes('primary care'))
    return 'Healthcare';
  if (lower.includes('covid') || lower.includes('physicals') || lower.includes('occ-health'))
    return 'Healthcare';
  if (lower.includes('cbd') || lower.includes('skincare') || lower.includes('pets'))
    return 'Healthcare';

  // Food & Restaurant
  if (lower.includes('bbq') || lower.includes('gomez') || lower.includes('herbs rub'))
    return 'Food & Beverage';
  if (lower.includes('317bbq')) return 'Food & Beverage';

  // Fitness & Wellness
  if (lower.includes('fitness') || lower.includes('movement')) return 'Fitness';

  // Business & Professional
  if (lower.includes('card') || lower.includes('logo') || lower.includes('brand'))
    return 'Branding';
  if (lower.includes('playbook') || lower.includes('tbm')) return 'Branding';

  // Creative & Artistic
  if (lower.includes('bird') || lower.includes('painting') || lower.includes('illustration'))
    return 'Creative';
  if (lower.includes('untitled') || lower.includes('my project')) return 'Creative';

  // Digital & Social
  if (lower.includes('instagram') || lower.includes('post') || lower.includes('online'))
    return 'Digital';
  if (lower.includes('google review')) return 'Digital';

  return 'Branding';
}

/**
 * Generate a readable title from filename
 */
function generateTitle(filename: string): string {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');

  // Handle specific known files
  if (nameWithoutExt.includes('317BBQ')) return '317 BBQ Branding';
  if (nameWithoutExt.includes('Urgent Care')) return 'Urgent Care Identity';
  if (nameWithoutExt.includes('Primary Care')) return 'Primary Care Branding';
  if (nameWithoutExt.includes('CBD')) return 'CBD Product Design';
  if (nameWithoutExt.includes('Perpetual Movement')) return 'Fitness Brand Identity';
  if (nameWithoutExt.includes('TBM')) return 'TBM Brand System';
  if (nameWithoutExt.includes('Gomez BBQ')) return 'Gomez BBQ Logo';
  if (nameWithoutExt.includes('Online Doctor')) return 'Telehealth Social Media';
  if (nameWithoutExt.includes('Google Review')) return 'Review Card Design';
  if (nameWithoutExt.includes('bird')) return 'Bird Illustration';

  // Handle generic patterns
  if (nameWithoutExt.includes('Logo')) return `${nameWithoutExt.split(' ')[0]} Logo Design`;
  if (nameWithoutExt.includes('B Card')) return 'Business Card Design';
  if (nameWithoutExt.includes('My Post')) return 'Social Media Post';
  if (nameWithoutExt.includes('My project')) return 'Creative Project';

  // Default: Clean up and capitalize
  return nameWithoutExt
    .replace(/[_-]/g, ' ')
    .replace(/\(\d+\)/g, '')
    .replace(/~\d+/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .substring(0, 40);
}

/**
 * Assign grid size based on category and index
 */
function assignSize(
  index: number,
  category: string
): 'small' | 'medium' | 'large' | 'wide' | 'tall' {
  // Healthcare projects should be prominent
  if (category === 'Healthcare') {
    return index % 2 === 0 ? 'large' : 'wide';
  }

  // Food & Beverage should be featured
  if (category === 'Food & Beverage') {
    return index % 3 === 0 ? 'large' : 'medium';
  }

  // Branding should vary in size
  if (category === 'Branding') {
    const pattern = ['medium', 'small', 'large', 'tall'];
    return pattern[index % pattern.length] as any;
  }

  // Creative projects should be tall or wide
  if (category === 'Creative') {
    return index % 2 === 0 ? 'tall' : 'wide';
  }

  // Default pattern
  const pattern = ['medium', 'large', 'small', 'wide', 'tall', 'medium'];
  return pattern[index % pattern.length] as any;
}

/**
 * Load all side project images dynamically
 */
export function loadSideProjectImages(): SideProjectItem[] {
  // List of all images in the side-projects folder
  const imageFiles = [
    '317BBQ+Logo-11.jpg',
    '317BBQ+Logo_wht.png',
    'AM-Logo (1).png',
    'All 5.png',
    'All Three.png',
    'B Card 20232.png',
    'B Card KVB 2023 2.png',
    'BF MOGOGRAM final-02 (1).jpg',
    'Black Letter - Full Logo (1).png',
    'CA Logo - Primary (full color).jpg',
    'CBD Oil.jpg',
    'CBD-Oil-for-Pets.png',
    'CBD-for-Pets-and-Pet-Skin-Care.png',
    'Complete Solution Dogs.png',
    'Fav (1).png',
    'Gomez BBQ Logo.png',
    'Gomez PNG 2.png',
    'Herbs Rub Logo (1).png',
    'Interior_sl.jpg',
    'Logo (1).png',
    'Logo 7.png',
    'Logo_1 (1).jpg',
    'Man at the doctors office.jpg',
    'Matt Z New Logo test.png',
    'My Post (2).jpg',
    'My project (14).png',
    'My project (8).png',
    'New Logo - Transparent.png',
    'Online Doctor Consultation Instagram Post.png',
    'PCI Google Review Business Cards.jpg',
    'Perpetual Movement Fitness - Primary Logo TM.png',
    'Primary Care Logo with PMC.png',
    'Screen-Shot-2020-03-23-at-8.49.47-PM-1024x668 (1).png',
    'Skincare-for-Dogs-and-Cats.jpg',
    'TBM Brand Playbook Demo.png',
    'TBM Logo.png',
    'UCI Hours COVID.jpg',
    'Untitled-2.png',
    'Urgent Care Indy Logo - 22.png',
    'bird (1).png',
    'cropped-PC_LOGO1-1024x174.jpg',
    'dog-dry-skin-remedy.jpg',
    'dot-physicals-header.jpg',
    'edgrh.png',
    'interior_w3.jpg',
    'logo (2).png',
    'logo-01 (1).png',
    'logo-whhite red.png',
    'logo.png',
    'occ-health-header.jpg',
    'painting_illustration_01.png',
    'pci-logo-retina-rev.png',
    'sfsdf.png',
    'sports-physical-header (1).jpg',
    'what-we-treat-1.jpg',
  ];

  return imageFiles.map((filename, index) => {
    const category = categorizeSideProject(filename);
    return {
      id: `side-project-${index + 1}`,
      src: `/images/side-projects/${filename}`,
      filename,
      title: generateTitle(filename),
      category,
      size: assignSize(index, category),
    };
  });
}

/**
 * Get unique categories from side project collection
 */
export function getSideProjectCategories(projects: SideProjectItem[]): string[] {
  const categories = new Set(projects.map(p => p.category));
  return ['All', ...Array.from(categories).sort()];
}

/**
 * Category color mapping for visual consistency
 */
export const categoryColors: Record<string, string> = {
  Healthcare: '#48bb78',
  'Food & Beverage': '#ed8936',
  Fitness: '#9f7aea',
  Branding: '#4299e1',
  Creative: '#ed64a6',
  Digital: '#667eea',
};
