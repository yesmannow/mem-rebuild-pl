/**
 * Dynamically loads all bio images from /public/images/bio
 * Returns an array of bio image objects with metadata
 */

export interface BioItem {
  id: string;
  src: string;
  title: string;
  category: string;
  filename: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

/**
 * Auto-categorize bio images based on filename patterns
 */
function categorizeBio(filename: string): string {
  const lower = filename.toLowerCase();

  if (lower.includes('bio-photo')) return 'Professional';
  if (lower.includes('adobe express')) return 'Creative';
  if (lower.includes('untitled')) return 'Artistic';
  if (lower.match(/^\d+/)) return 'Candid'; // Timestamp-based files

  return 'Professional';
}

/**
 * Generate a readable title from filename
 */
function generateTitle(filename: string): string {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');

  // Handle specific known files
  if (nameWithoutExt.includes('bio-photo')) return 'Professional Headshot';
  if (nameWithoutExt.includes('Adobe Express')) return 'Creative Portrait';
  if (nameWithoutExt.includes('Untitled-1')) return 'Artistic Study';

  // Handle timestamp files
  if (nameWithoutExt.match(/^\d+/)) return 'Portrait Session';
  if (nameWithoutExt.match(/^\d+_\d+/)) return 'Behind the Scenes';

  // Default: Clean up and capitalize
  return (
    nameWithoutExt
      .replace(/[_-]/g, ' ')
      .replace(/\(\d+\)/g, '')
      .replace(/Custom/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .trim()
      .substring(0, 30) || 'Bio Image'
  );
}

/**
 * Assign grid size based on index for visual variety
 */
function assignSize(
  index: number,
  category: string
): 'small' | 'medium' | 'large' | 'wide' | 'tall' {
  // Professional shots should be prominent
  if (category === 'Professional') return 'large';

  // Creative shots should be wide or tall
  if (category === 'Creative') return index % 2 === 0 ? 'wide' : 'tall';

  // Candid shots should be medium or small
  if (category === 'Candid') return index % 2 === 0 ? 'medium' : 'small';

  // Default pattern
  const pattern = ['large', 'medium', 'tall', 'wide', 'small'];
  return pattern[index % pattern.length] as any;
}

/**
 * Load all bio images dynamically
 */
export function loadBioImages(): BioItem[] {
  // List of all images in the bio folder (excluding manifest.json)
  const imageFiles = [
    '1732967007485.jpg',
    '241311036_10117555583372059_173429180650836298_n.webp',
    'Adobe Express 2025-10-12 09.58.18.PNG',
    'Untitled-1 (Custom).png',
    'bio-photo.jpg',
  ];

  return imageFiles.map((filename, index) => {
    const category = categorizeBio(filename);
    return {
      id: `bio-${index + 1}`,
      src: `/images/bio/${filename}`,
      filename,
      title: generateTitle(filename),
      category,
      size: assignSize(index, category),
    };
  });
}

/**
 * Get unique categories from bio collection
 */
export function getBioCategories(bioImages: BioItem[]): string[] {
  const categories = new Set(bioImages.map(b => b.category));
  return ['All', ...Array.from(categories).sort()];
}

/**
 * Category color mapping for visual consistency
 */
export const categoryColors: Record<string, string> = {
  Professional: '#4299e1',
  Creative: '#ed64a6',
  Artistic: '#9f7aea',
  Candid: '#48bb78',
};
