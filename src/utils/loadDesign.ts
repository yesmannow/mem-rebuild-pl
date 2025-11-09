/**
 * Dynamically loads all design images from /public/images/design
 * Returns an array of design objects with metadata
 */

export interface DesignItem {
  id: string;
  src: string;
  title: string;
  category: string;
  filename: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
}

/**
 * Auto-categorize designs based on filename patterns
 */
function categorizeDesign(filename: string): string {
  const lower = filename.toLowerCase();

  // Branding & Logos
  if (lower.includes('logo') || lower.includes('brand') || lower.includes('monogram')) return 'Branding';
  if (lower.includes('font') || lower.includes('typography')) return 'Branding';

  // Print & Advertising
  if (lower.includes('ad') || lower.includes('print') || lower.includes('flyer')) return 'Print';
  if (lower.includes('flu shot') || lower.includes('health care')) return 'Print';

  // Digital Marketing
  if (lower.includes('instagram') || lower.includes('post') || lower.includes('social')) return 'Digital';
  if (lower.includes('online') || lower.includes('digital')) return 'Digital';

  // Sales & Promotions
  if (lower.includes('sale') || lower.includes('promo') || lower.includes('discount')) return 'Sales';
  if (lower.includes('percent') || lower.includes('%')) return 'Sales';

  // Product Design
  if (lower.includes('koozie') || lower.includes('packaging') || lower.includes('product')) return 'Product';
  if (lower.includes('front') || lower.includes('back')) return 'Product';
  if (lower.includes('sandwich') || lower.includes('food') || lower.includes('menu')) return 'Product';

  // Event & Racing
  if (lower.includes('indy') || lower.includes('racing') || lower.includes('event')) return 'Event';
  if (lower.includes('brady') || lower.includes('rbe')) return 'Event';
  if (lower.includes('bicentennial') || lower.includes('contest')) return 'Event';

  // Creative Concepts
  if (lower.includes('hot-sauce') || lower.includes('dall') || lower.includes('concept')) return 'Concept';
  if (lower.includes('bird') || lower.includes('illustration')) return 'Concept';
  if (lower.includes('file_')) return 'Concept';

  // Logo files
  if (lower.includes('logo-01') || lower.startsWith('logo')) return 'Branding';

  // Default to Digital for generic IMG files
  if (lower.startsWith('img_')) return 'Digital';

  return 'Branding';
}

/**
 * Generate a readable title from filename
 */
function generateTitle(filename: string): string {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif|mp4)$/i, '');

  // Handle specific known files
  if (nameWithoutExt.includes('Forty Under 40')) return 'Forty Under 40 Recognition';
  if (nameWithoutExt.includes('Health Care')) return 'Healthcare Campaign';
  if (nameWithoutExt.includes('Flu Shot')) return 'Flu Shot Awareness';
  if (nameWithoutExt.includes('Online Doctor')) return 'Telehealth Social Post';
  if (nameWithoutExt.includes('Spring')) return 'Spring Sale Campaign';
  if (nameWithoutExt.includes('Dog Summer')) return 'Summer Pet Promo';
  if (nameWithoutExt.includes('Koozie')) return 'Koozie Merchandise';
  if (nameWithoutExt.includes('Brisket')) return 'Food Menu Design';
  if (nameWithoutExt.includes('Indy 500')) return 'Indy 500 Racing Graphics';
  if (nameWithoutExt.includes('hot-sauce-playful')) return 'Hot Sauce Concept - Playful';
  if (nameWithoutExt.includes('hot-sauce-dark')) return 'Hot Sauce Concept - Dark';

  // Handle IMG_ files with dates
  if (nameWithoutExt.startsWith('IMG_')) {
    const dateMatch = nameWithoutExt.match(/IMG_(\d{4})(\d{2})(\d{2})/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      return `Design Work ${month}/${year}`;
    }
    return 'Creative Design';
  }

  // Handle generic files
  if (nameWithoutExt.startsWith('file_')) return 'Design Concept';

  // Default: Clean up and capitalize
  return nameWithoutExt
    .replace(/[_-]/g, ' ')
    .replace(/~\d+/g, '')
    .replace(/\(\d+\)/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .substring(0, 40);
}

/**
 * Assign grid size based on index for visual variety
 */
function assignSize(index: number, category: string): "small" | "medium" | "large" | "wide" | "tall" {
  // Logos and small graphics should be small
  if (category === 'Branding' && index % 3 === 0) return 'small';

  // Print ads and campaigns should be large or wide
  if (category === 'Print') {
    return index % 2 === 0 ? 'large' : 'wide';
  }

  // Products can be tall
  if (category === 'Product' && index % 3 === 1) return 'tall';

  // Concepts should be featured
  if (category === 'Concept') return index % 2 === 0 ? 'large' : 'wide';

  // Default pattern for variety
  const pattern = ['medium', 'large', 'small', 'wide', 'medium', 'tall', 'small', 'large', 'medium', 'wide'];
  return pattern[index % pattern.length] as any;
}

/**
 * Load all design images dynamically
 */
export function loadDesignImages(): DesignItem[] {
  // List of all images in the design folder (excluding videos for now)
  const imageFiles = [
    '2020 Forty Under 40 Ad.jpg',
    '2021 Health Care Ad.png',
    '236802803_10117457411055169_5004587858113382909_n.jpg',
    '25 percent sale - Spring.png',
    '323700270_2415730071915448_2322941324611558798_n.jpg',
    '521745_229161850524724_1718400251_n.jpg',
    'AM-Logo.png',
    'Adobe_Express_20220527_2105230.6071119382485303.png',
    'BF MOGOGRAM final-02.jpg',
    'Back 1.png',
    'Blue - RBE Indy 500 Design.png',
    'CA.jpg',
    'ChoppedBrisketSandwich_LG.jpg',
    'Dog Summer Sale-1.png',
    'Flu Shot 2021.jpg',
    'Font 1.png',
    'Front Updated.png',
    'Herbs Rub Logo.png',
    'IMG_20211002_204207_713.jpg',
    'IMG_20211225_203321_050.jpg',
    'IMG_20220402_195539_486.jpg',
    'IMG_20220513_222748_444.jpg',
    'IMG_20220529_193948_726.jpg',
    'IMG_20220529_195734_101.jpg',
    'IMG_20220606_011741_906.jpg',
    'IMG_20220607_151217_860.jpg',
    'IMG_20220612_010021_558.jpg',
    'IMG_20220701_141651_802.jpg',
    'IMG_20220709_015653_187.jpg',
    'IMG_20220723_183814_569.jpg',
    'IMG_20220901_174114_810.jpg',
    'IMG_20220904_153503_226.jpg',
    'IMG_20221023_020849_206.jpg',
    'IMG_20221029_025225_059.jpg',
    'IMG_20221029_031339_559.jpg',
    'IMG_20230617_015647_366.jpg',
    'Jacob Brady resized.jpg',
    'Koozie design - final.png',
    'My Post (2).jpg',
    'Online Doctor Consultation Instagram Post.png',
    'bird.png',
    'bicentinial design contest.jpg',
    'file_0000000040d46230b3f420ddf8f917de.png',
    'file_000000009d0861f8a59c35ae82dde4b7 (1).png',
    'file_00000000c524623091018296ba5b34a3.png',
    'hot-sauce-dark.webp',
    'hot-sauce-playful.webp',
    'logo-01.svg',
    'taco ninja logo.png'
  ];

  return imageFiles.map((filename, index) => {
    const category = categorizeDesign(filename);
    return {
      id: `design-${index + 1}`,
      src: `/images/design/${filename}`,
      filename,
      title: generateTitle(filename),
      category,
      size: assignSize(index, category)
    };
  });
}

/**
 * Get unique categories from design collection
 */
export function getDesignCategories(designs: DesignItem[]): string[] {
  const categories = new Set(designs.map(d => d.category));
  return ['All', ...Array.from(categories).sort()];
}

/**
 * Category color mapping for visual consistency
 */
export const categoryColors: Record<string, string> = {
  Branding: '#f093fb',
  Digital: '#4facfe',
  Print: '#43e97b',
  Product: '#fa709a',
  Sales: '#feca57',
  Event: '#ff6b6b',
  Concept: '#a8edea'
};
