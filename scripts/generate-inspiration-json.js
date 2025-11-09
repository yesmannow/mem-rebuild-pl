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
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
    console.log('✅ Created empty JSON file');
    process.exit(0);
  }

  const files = fs.readdirSync(markdownDir).filter(f => f.endsWith('.md'));
  console.log(`📁 Found ${files.length} markdown files`);

  const projects = [];

  for (const file of files) {
    const filePath = path.join(markdownDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    projects.push({
      ...data,
      summary: body.trim(),
      slug: file.replace('.md', ''),
    });
  }

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

