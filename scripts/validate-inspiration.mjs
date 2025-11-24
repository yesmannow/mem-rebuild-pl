import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

/**
 * Validate and fix inspiration projects data
 * Ensures all projects have:
 * - Valid slugs
 * - Internal route URLs
 * - Required fields (title, image, summary)
 */
async function validateInspirationData() {
  const dataFile = path.join(repoRoot, 'src', 'data', 'inspiration-projects.json');

  try {
    // Check if file exists
    try {
      await fs.access(dataFile);
    } catch {
      return {
        total: 0,
        fixed: 0,
        issues: [{ project: 'System', issue: `File not found: ${dataFile}`, fixed: false }],
        projects: [],
      };
    }

    const content = await fs.readFile(dataFile, 'utf8');
    if (!content || content.trim() === '' || content.trim() === '[]') {
      return {
        total: 0,
        fixed: 0,
        issues: [{ project: 'System', issue: 'File is empty or contains empty array', fixed: false }],
        projects: [],
      };
    }

    let projects;
    try {
      projects = JSON.parse(content);
    } catch (parseError) {
      return {
        total: 0,
        fixed: 0,
        issues: [{ project: 'System', issue: `JSON parse error: ${parseError.message}`, fixed: false }],
        projects: [],
      };
    }

    if (!Array.isArray(projects)) {
      return {
        total: 0,
        fixed: 0,
        issues: [{ project: 'System', issue: 'Invalid JSON format - expected array', fixed: false }],
        projects: [],
      };
    }

    const issues = [];
    const fixed = [];

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      let modified = false;

      // Ensure slug exists
      if (!project.slug) {
        project.slug = project.title
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 100) || `project-${i}`;
        modified = true;
        issues.push({ project: project.title || 'Unknown', issue: 'Missing slug', fixed: true });
      }

      // Store external URL separately and ensure internal route exists
      const hasExternalUrl = project.url && project.url.startsWith('http');
      if (hasExternalUrl) {
        if (!project.externalUrl) {
          project.externalUrl = project.url;
          modified = true;
        }
        // Convert to internal route
        project.url = `/inspiration/${project.slug}`;
        modified = true;
        issues.push({ project: project.title || 'Unknown', issue: 'Converted external URL to internal route', fixed: true });
      } else if (!project.url || !project.url.startsWith('/inspiration/')) {
        // Ensure internal route URL is set for navigation
        project.url = `/inspiration/${project.slug}`;
        modified = true;
      }

      // Validate required fields
      if (!project.title || project.title.trim() === '') {
        issues.push({ project: 'Unknown', issue: 'Missing title', fixed: false });
      }

      if (!project.image || project.image.trim() === '') {
        // Set a default placeholder image
        project.image = '/images/design/placeholder-inspiration.jpg';
        modified = true;
        issues.push({ project: project.title || 'Unknown', issue: 'Missing image - using placeholder', fixed: true });
      }

      if (!project.summary || project.summary.trim() === '') {
        // Generate a basic summary if missing
        project.summary = project.fullContent
          ? project.fullContent.split('\n\n')[0].slice(0, 150) + '...'
          : `Design project: ${project.title}`;
        modified = true;
        issues.push({ project: project.title || 'Unknown', issue: 'Missing summary', fixed: true });
      }

      // Ensure date exists
      if (!project.date) {
        project.date = new Date().toISOString();
        modified = true;
      }

      // Ensure tags exist
      if (!project.tags || !Array.isArray(project.tags) || project.tags.length === 0) {
        project.tags = ['Design', 'Branding', 'Inspiration'];
        modified = true;
      }

      if (modified) {
        fixed.push(project.title || `Project ${i}`);
      }
    }

    // Save fixed data
    if (fixed.length > 0) {
      await fs.writeFile(dataFile, JSON.stringify(projects, null, 2));
    }

    return {
      total: projects.length,
      fixed: fixed.length,
      issues,
      projects,
    };
  } catch (error) {
    console.error('Error validating inspiration data:', error);
    return {
      total: 0,
      fixed: 0,
      issues: [{ project: 'System', issue: error.message, fixed: false }],
      projects: [],
    };
  }
}

// If run directly, output results
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` || process.argv[1]?.includes('validate-inspiration')) {
  validateInspirationData().then(result => {
    console.log(JSON.stringify(result, null, 2));
  }).catch(console.error);
}

export { validateInspirationData };

