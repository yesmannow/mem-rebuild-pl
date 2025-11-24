// scripts/generate-inspiration-json.js
// Convert markdown files to JSON for easier import
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const markdownDir = path.join(__dirname, '..', 'cli-workflow', 'content', 'inspiration');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'inspiration-projects.json');

console.log('📝 Generating inspiration projects JSON...');

try {
  if (!fs.existsSync(markdownDir)) {
    console.warn(`⚠️  Directory not found: ${markdownDir}`);
    if (fs.existsSync(outputFile)) {
      const existing = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
      console.log(`ℹ️  Preserving existing ${existing.length} projects in inspiration-projects.json`);
    } else {
      fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
      console.log('✅ Created empty JSON file');
    }
    process.exit(0);
  }

  const files = fs.readdirSync(markdownDir).filter(f => f.endsWith('.md'));
  console.log(`📁 Found ${files.length} markdown files`);

  // Load existing projects to merge
  let existingProjects = [];
  if (fs.existsSync(outputFile)) {
    try {
      const existingContent = fs.readFileSync(outputFile, 'utf8');
      if (existingContent && existingContent.trim() !== '' && existingContent.trim() !== '[]') {
        existingProjects = JSON.parse(existingContent);
        console.log(`📋 Found ${existingProjects.length} existing projects to merge`);
      }
    } catch (error) {
      console.warn(`⚠️  Could not parse existing file: ${error.message}`);
    }
  }

  const markdownProjects = [];
  const existingSlugs = new Set(existingProjects.map(p => p.slug).filter(Boolean));

  for (const file of files) {
    const filePath = path.join(markdownDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    // Extract summary and full content from markdown body
    const parts = body.split('---');
    const summary = parts[0]?.trim() || '';
    let fullContent = parts[1]?.trim() || summary;

    // Remove markdown headers from fullContent
    fullContent = fullContent.replace(/^##\s*Full\s*Content\s*/i, '').trim();
    fullContent = fullContent.replace(/^#+\s*/gm, '').trim(); // Remove any remaining markdown headers

    const slug = data.slug || file.replace('.md', '');
    
    // If slug already exists in existing projects, update it; otherwise add as new
    const existingIndex = existingProjects.findIndex(p => p.slug === slug);
    const projectData = {
      ...data,
      summary: summary,
      fullContent: fullContent,
      slug: slug,
    };

    if (existingIndex >= 0) {
      // Merge with existing project (markdown takes precedence)
      existingProjects[existingIndex] = { ...existingProjects[existingIndex], ...projectData };
      console.log(`  ↻ Updated existing project: ${projectData.title || slug}`);
    } else {
      markdownProjects.push(projectData);
    }
  }

  // Combine: existing projects (updated or untouched) + new markdown projects
  const projects = [...existingProjects, ...markdownProjects];

  // Sort by date (newest first)
  projects.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });

  // Ensure output directory exists
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(projects, null, 2));
  console.log(`✅ Generated ${projects.length} projects in ${outputFile}`);
} catch (error) {
  console.error('❌ Error generating JSON:', error);
  process.exit(1);
}

