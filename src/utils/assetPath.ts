/**
 * Utility to generate correct asset paths for GitHub Pages deployment
 * 
 * When deployed to GitHub Pages with a base path (e.g., /mem-rebuild-pl/),
 * all asset references need to include that base path.
 */

// Get the base path from import.meta.env or default to '/'
const BASE_PATH = import.meta.env.BASE_URL || '/';

/**
 * Convert a relative asset path to an absolute path with the correct base
 * @param path - The asset path (e.g., '/images/logo.svg' or 'images/logo.svg')
 * @returns The full path including base (e.g., '/mem-rebuild-pl/images/logo.svg')
 */
export function assetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combine base path with clean path, ensuring no double slashes
  const fullPath = BASE_PATH.endsWith('/') 
    ? `${BASE_PATH}${cleanPath}`
    : `${BASE_PATH}/${cleanPath}`;
    
  return fullPath;
}

/**
 * Get the base URL for the application
 * @returns The base URL (e.g., '/mem-rebuild-pl/' or '/')
 */
export function getBaseUrl(): string {
  return BASE_PATH;
}
