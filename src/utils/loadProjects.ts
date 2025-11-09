/**
 * Dynamically loads all project images from /public/images/projects
 * Returns an array of project objects with metadata organized by project folders
 */

export interface ProjectItem {
  id: string;
  src: string;
  title: string;
  category: string;
  projectSlug: string;
  filename: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
}

/**
 * Auto-categorize projects based on folder name
 */
function categorizeProject(folderName: string): string {
  const lower = folderName.toLowerCase();
  
  if (lower.includes('bbq') || lower.includes('food')) return 'Food & Beverage';
  if (lower.includes('law') || lower.includes('llp') || lower.includes('legal')) return 'Legal';
  if (lower.includes('painting') || lower.includes('art')) return 'Art & Culture';
  if (lower.includes('egloff') || lower.includes('bennett')) return 'Legal';
  
  return 'Business';
}

/**
 * Generate a readable title from folder and filename
 */
function generateTitle(folderName: string, filename: string): string {
  // Clean up folder name for project title
  const projectName = folderName
    .replace(/[_-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Clean up filename
  const fileTitle = filename
    .replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')
    .replace(/[_-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return `${projectName} - ${fileTitle}`;
}

/**
 * Generate slug from folder name
 */
function generateSlug(folderName: string): string {
  return folderName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Assign grid size based on project type and index
 */
function assignSize(index: number, category: string): "small" | "medium" | "large" | "wide" | "tall" {
  // Food & Beverage should be prominent
  if (category === 'Food & Beverage') {
    return index % 2 === 0 ? 'large' : 'wide';
  }
  
  // Legal projects should be professional (medium/large)
  if (category === 'Legal') {
    return index % 2 === 0 ? 'large' : 'medium';
  }
  
  // Art projects should be tall or wide
  if (category === 'Art & Culture') {
    return index % 2 === 0 ? 'tall' : 'wide';
  }
  
  // Default pattern
  const pattern = ['large', 'medium', 'wide', 'tall', 'small'];
  return pattern[index % pattern.length] as any;
}

/**
 * Load all project images dynamically from all project folders
 */
export function loadProjectImages(): ProjectItem[] {
  // Manual mapping of project folders and their contents
  // This would ideally be generated dynamically, but for now we'll map the known structure
  const projectStructure = {
    '317 bbq': ['317BBQLogo_wht.webp', 'download.jpg', 'download (1).jpg'],
    'Russell painting': [
      'Screenshot of Power Washing _ Russell Painting Company, Inc.jpg',
      'New-Logo-Transparent-1.png'
    ],
    'Tuohy Bailey & Moore LLP': [
      'Screenshot of Home - Tuohy Bailey & Moore LLP.jpg',
      'Screenshot of Business Transactions - Tuohy Bailey & Moore LLP.jpg',
      'Screenshot of Commercial Law - Tuohy Bailey & Moore LLP.jpg'
    ],
    'riley bennett egloff': ['attorneys.jpg', 'download.jpg', 'dss.jpg', 'RBE-Logo-with-®-RGB-jpg.jpg']
  };

  const allProjects: ProjectItem[] = [];
  let globalIndex = 0;

  Object.entries(projectStructure).forEach(([folderName, files]) => {
    const category = categorizeProject(folderName);
    const slug = generateSlug(folderName);
    
    files.forEach((filename, fileIndex) => {
      allProjects.push({
        id: `project-${globalIndex + 1}`,
        src: `/images/projects/${folderName}/${filename}`,
        filename,
        title: generateTitle(folderName, filename),
        category,
        projectSlug: slug,
        size: assignSize(globalIndex, category)
      });
      globalIndex++;
    });
  });

  return allProjects;
}

/**
 * Get projects grouped by project slug
 */
export function getProjectsBySlug(projects: ProjectItem[]): Record<string, ProjectItem[]> {
  return projects.reduce((acc, project) => {
    if (!acc[project.projectSlug]) {
      acc[project.projectSlug] = [];
    }
    acc[project.projectSlug].push(project);
    return acc;
  }, {} as Record<string, ProjectItem[]>);
}

/**
 * Get unique categories from project collection
 */
export function getProjectCategories(projects: ProjectItem[]): string[] {
  const categories = new Set(projects.map(p => p.category));
  return ['All', ...Array.from(categories).sort()];
}

/**
 * Category color mapping for visual consistency
 */
export const categoryColors: Record<string, string> = {
  'Food & Beverage': '#ed8936',
  Legal: '#4299e1',
  'Art & Culture': '#ed64a6',
  Business: '#48bb78'
};
