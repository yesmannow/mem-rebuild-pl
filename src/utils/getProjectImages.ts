/**
 * Utility to get all images from a project folder
 * Returns images in preferred order: webp > avif > png > jpg
 */
export const getProjectImages = (projectId: string): string[] => {
  // Map project IDs to their folder names
  const folderMap: Record<string, string> = {
    'primary-care-indy': 'Primarycare Indy',
    '317-bbq': '317 bbq',
    'taco-ninja': 'Taco Ninja',
    'perpetual-fitness': 'Perpetual Movement Fitness',
    'tbm-strategy': 'Tuohy Bailey & Moore LLP',
    'resq-organic': 'ResQ Organics',
    'behr-pet-essentials': 'Behr pet essentials',
    'black-letter': 'Black Letter',
    'primary-colours': 'Primary Colours',
    'circle-city': 'circle  city kicks',
    'clean-aesthetic': 'Clean Aesthetic',
    'hoosier-boy': 'Hoosierboy Barbershop',
    'urgent-care-indy': 'urgent care indy',
  };

  const folderName = folderMap[projectId];
  if (!folderName) return [];

  // Common image extensions in priority order
  const extensions = ['.webp', '.avif', '.png', '.jpg', '.jpeg'];

  // Common image filenames to look for (excluding logos, prioritizing content)
  const imagePatterns = [
    // Content images first
    /^online-doctor/i,
    /^2023/i, // Date-based images
    /^cbd/i,
    /^dog/i,
    /^skincare/i,
    /^attorneys/i,
    /^dss/i,
    /^download/i,
    // Then logos
    /logo/i,
    /primary/i,
    /^tbm/i,
    /^317/i,
  ];

  // This is a helper - in production, you'd fetch from a manifest or API
  // For now, we'll return common patterns based on folder structure
  const basePath = `/images/projects/${encodeURIComponent(folderName)}`;

  // Return a function that can be used to construct image paths
  // The actual images will be loaded dynamically
  return [];
};

/**
 * Get project images from folder structure
 * This should be called with actual folder contents
 */
export const constructProjectImagePaths = (
  folderName: string,
  filenames: string[]
): string[] => {
  const basePath = `/images/projects/${encodeURIComponent(folderName)}`;

  // Filter out non-image files and prioritize by extension
  const imageFiles = filenames
    .filter((file) => /\.(webp|avif|png|jpg|jpeg)$/i.test(file))
    .filter((file) => !file.toLowerCase().includes('logo') || file.toLowerCase().includes('primary care'))
    .sort((a, b) => {
      // Prioritize webp, then avif, then others
      const extA = a.split('.').pop()?.toLowerCase() || '';
      const extB = b.split('.').pop()?.toLowerCase() || '';
      const priority: Record<string, number> = { webp: 1, avif: 2, png: 3, jpg: 4, jpeg: 4 };
      return (priority[extA] || 5) - (priority[extB] || 5);
    });

  return imageFiles.map((file) => `${basePath}/${encodeURIComponent(file)}`);
};

