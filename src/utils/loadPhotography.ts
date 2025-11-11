/**
 * Dynamically loads all photography images from /public/images/photography
 * Returns an array of photo objects with metadata
 */

export interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: string;
  filename: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

/**
 * Auto-categorize photos based on filename patterns
 */
function categorizePhoto(filename: string): string {
  const lower = filename.toLowerCase();

  if (lower.includes('portrait') || lower.includes('burst')) return 'Portrait';
  if (lower.includes('psx') || lower.includes('img_')) return 'Creative';
  if (lower.match(/202[0-4]0[6-9]|202[0-4]07/)) return 'Landscape'; // Summer months
  if (lower.match(/202[0-4]0[3-5]/)) return 'Nature'; // Spring months
  if (lower.match(/202[0-4]1[0-2]|202[0-4]01/)) return 'Urban'; // Winter months

  return 'Creative';
}

/**
 * Generate a readable title from filename
 */
function generateTitle(filename: string): string {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');

  // Handle date-based filenames (20240704_175213 -> "July 4, 2024")
  const dateMatch = nameWithoutExt.match(/^(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  }

  // Handle special prefixes
  if (nameWithoutExt.startsWith('PSX_')) return 'Edited Scene';
  if (nameWithoutExt.startsWith('IMG_')) return 'Captured Moment';
  if (nameWithoutExt.includes('PORTRAIT')) return 'Portrait Study';

  // Default: capitalize and clean up
  return nameWithoutExt
    .replace(/[_-]/g, ' ')
    .replace(/~\d+/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .substring(0, 30);
}

/**
 * Assign grid size based on index for visual variety
 */
function assignSize(index: number): 'small' | 'medium' | 'large' | 'wide' | 'tall' {
  const pattern = [
    'large',
    'tall',
    'medium',
    'wide',
    'small',
    'medium',
    'tall',
    'large',
    'small',
    'wide',
  ];
  return pattern[index % pattern.length] as any;
}

/**
 * Load all photography images dynamically
 */
export function loadPhotographyImages(): PhotoItem[] {
  // List of all images in the photography folder
  const imageFiles = [
    '00100dPORTRAIT_00100_BURST20180224211719099_COVER~2.jpg',
    '1000000219 (1).jpg',
    '20210903_182855-3.jpg',
    '20210905_173133.jpg',
    '20210907_113007~2.jpg',
    '20211024_075305~4.jpg',
    '20220226_160528-2.jpg',
    '20220604_221615-2.jpg',
    '20220605_202214~2.jpg',
    '20220722_053113.jpg',
    '20230528_105239~3.jpg',
    '20231008_175026.jpg',
    '20240512_112541~3.jpg',
    '20240512_112942~3.jpg',
    '20240607_201806.jpg',
    '20240628_185356.jpg',
    '20240628_214922.jpg',
    '20240628_215608-2.jpg',
    '20240629_214210.jpg',
    '20240629_214911.jpg',
    '20240704_175213.jpg',
    '20240704_175407_07.jpg',
    '20240704_175539.jpg',
    '20240704_180246.jpg',
    '20240704_180423.jpg',
    '20240704_180538.jpg',
    '20240712_210010.jpg',
    '20240713_065705.jpg',
    '20240713_122302.jpg',
    '20240713_151221.jpg',
    '20240803_184432.jpg',
    '20240803_192159.jpg',
    'IMG_20230604_154323_912.jpg',
    'IMG_20230707_235448_262~2.jpg',
    'IMG_20240803_210044.jpg',
    'PSX_20240717_043437.jpg',
    'PSX_20240717_043501.jpg',
    'PSX_20240717_044925.jpg',
    'QVZmSFl0bmlBMHVYd3JhSw.jpg',
    'image.jpg',
  ];

  return imageFiles.map((filename, index) => ({
    id: `photo-${index + 1}`,
    src: `/images/photography/${filename}`,
    filename,
    title: generateTitle(filename),
    category: categorizePhoto(filename),
    size: assignSize(index),
  }));
}

/**
 * Get unique categories from photo collection
 */
export function getPhotoCategories(photos: PhotoItem[]): string[] {
  const categories = new Set(photos.map(p => p.category));
  return ['All', ...Array.from(categories).sort()];
}

/**
 * Category color mapping for visual consistency
 */
export const categoryColors: Record<string, string> = {
  Landscape: '#667eea',
  Nature: '#48bb78',
  Urban: '#ed8936',
  Architecture: '#9f7aea',
  Event: '#f56565',
  Portrait: '#ed64a6',
  Creative: '#4299e1',
};
