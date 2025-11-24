#!/usr/bin/env node
/**
 * Icon Download Helper Script
 * Provides download links and instructions for required icons
 */

const requiredIcons = [
  { name: 'menu', description: 'Hamburger menu icon', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'close', description: 'Close/X icon', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'about', description: 'About section icon', sources: ['lucide', 'phosphor'] },
  { name: 'projects', description: 'Projects section icon', sources: ['lucide', 'phosphor'] },
  { name: 'skills', description: 'Skills section icon', sources: ['lucide', 'phosphor'] },
  { name: 'tools', description: 'Tools section icon', sources: ['lucide', 'phosphor'] },
  { name: 'download', description: 'Download icon', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'email', description: 'Email icon', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'pdf', description: 'PDF document icon', sources: ['lucide', 'phosphor'] },
  { name: 'linkedin', description: 'LinkedIn icon', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'github', description: 'GitHub icon', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'twitter', description: 'Twitter/X icon', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'x', description: 'X (Twitter) icon', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'success', description: 'Success indicator', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'warning', description: 'Warning indicator', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'error', description: 'Error indicator', sources: ['lucide', 'phosphor', 'iconoir'] },
  { name: 'awards', description: 'Awards/badges icon', sources: ['lucide', 'phosphor'] },
];

const sourceUrls = {
  lucide: {
    base: 'https://lucide.dev/icons',
    download: (name) => `https://lucide.dev/icons/${name}`,
    api: (name) => `https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/${name}.svg`
  },
  phosphor: {
    base: 'https://phosphoricons.com',
    download: (name) => `https://phosphoricons.com/?icon=${name}`,
    api: (name) => `https://raw.githubusercontent.com/phosphor-icons/core/main/assets/${name}.svg`
  },
  iconoir: {
    base: 'https://iconoir.com',
    download: (name) => `https://iconoir.com/?icon=${name}`,
    api: (name) => `https://raw.githubusercontent.com/iconoir-icons/iconoir/main/icons/${name}.svg`
  }
};

const iconNameMapping = {
  lucide: {
    'menu': 'menu',
    'close': 'x',
    'about': 'user',
    'projects': 'folder-kanban',
    'skills': 'award',
    'tools': 'wrench',
    'download': 'download',
    'email': 'mail',
    'pdf': 'file-text',
    'linkedin': 'linkedin',
    'github': 'github',
    'twitter': 'twitter',
    'x': 'x',
    'success': 'check-circle',
    'warning': 'alert-triangle',
    'error': 'x-circle',
    'awards': 'award'
  },
  phosphor: {
    'menu': 'list',
    'close': 'x',
    'about': 'user',
    'projects': 'folder',
    'skills': 'medal',
    'tools': 'wrench',
    'download': 'download',
    'email': 'envelope',
    'pdf': 'file-pdf',
    'linkedin': 'linkedin-logo',
    'github': 'github-logo',
    'twitter': 'twitter-logo',
    'x': 'x',
    'success': 'check-circle',
    'warning': 'warning',
    'error': 'x-circle',
    'awards': 'medal'
  },
  iconoir: {
    'menu': 'menu',
    'close': 'cancel',
    'about': 'user',
    'projects': 'folder',
    'skills': 'medal',
    'tools': 'settings',
    'download': 'download',
    'email': 'mail',
    'pdf': 'file',
    'linkedin': 'linkedin',
    'github': 'github',
    'twitter': 'twitter',
    'x': 'cancel',
    'success': 'check',
    'warning': 'warning-triangle',
    'error': 'cancel',
    'awards': 'medal'
  }
};

function generateDownloadInstructions() {
  console.log('📥 Icon Download Instructions\n');
  console.log('='.repeat(60));
  console.log('\nRequired Icons: 17\n');

  requiredIcons.forEach((icon, index) => {
    console.log(`${index + 1}. ${icon.name.toUpperCase()} - ${icon.description}`);
    console.log(`   Sources: ${icon.sources.join(', ')}\n`);
  });

  console.log('\n' + '='.repeat(60));
  console.log('\n📋 Download Methods:\n');

  console.log('METHOD 1: Manual Download (Recommended)');
  console.log('- Visit the icon library websites');
  console.log('- Search for the icon name');
  console.log('- Download as SVG');
  console.log('- Save to: public/icons/\n');

  console.log('METHOD 2: Direct API Download');
  console.log('Run this script with --download to generate download commands\n');

  console.log('METHOD 3: Use npm packages');
  console.log('npm install lucide-react');
  console.log('Then extract SVGs from node_modules\n');

  console.log('='.repeat(60));
  console.log('\n🔗 Quick Links:\n');

  requiredIcons.forEach(icon => {
    const source = icon.sources[0];
    const mappedName = iconNameMapping[source]?.[icon.name] || icon.name;
    console.log(`${icon.name}: ${sourceUrls[source].download(mappedName)}`);
  });
}

function generateDownloadScripts() {
  console.log('📥 Icon Download Scripts\n');
  console.log('='.repeat(60));
  console.log('\n# Download icons from Lucide (recommended)\n');

  requiredIcons.forEach(icon => {
    const source = 'lucide';
    const mappedName = iconNameMapping[source]?.[icon.name] || icon.name;
    const url = sourceUrls[source].api(mappedName);
    console.log(`# ${icon.name}`);
    console.log(`curl -o public/icons/${icon.name}.svg "${url}"`);
    console.log('');
  });

  console.log('\n# After downloading, run:');
  console.log('npm run icon:generate-components:apply\n');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--download')) {
    generateDownloadScripts();
  } else {
    generateDownloadInstructions();
    console.log('\n💡 Tip: Run with --download flag to see download commands');
  }
}

main().catch(console.error);

