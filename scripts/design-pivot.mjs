import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');

// Define replacements
const REPLACEMENTS = [
  // Typography
  {
    regex: /font-\['Playfair_Display'\]\s*italic/g,
    replacement: "font-sans font-black tracking-tighter"
  },
  {
    regex: /font-\['Playfair_Display'\]/g,
    replacement: "font-sans font-black tracking-tighter"
  },
  {
    regex: /fontFamily:\s*['"`]?"?Playfair Display"?[^'"`]*['"`]?/gi,
    replacement: "fontFamily: '\"Space Grotesk\", \"Clash Display\", sans-serif'"
  },
  
  // Legacy light mode primitives
  {
    regex: /bg-white(?!\/)/g,
    replacement: "bg-white/5 backdrop-blur-xl"
  },
  {
    regex: /bg-gray-100/g,
    replacement: "bg-white/5 backdrop-blur-xl"
  },
  {
    regex: /shadow-md/g,
    replacement: "border border-white/10"
  },
  {
    regex: /border-gray-200/g,
    replacement: "border-white/10"
  },
  {
    regex: /text-gray-800/g,
    replacement: "text-white"
  },
  {
    regex: /text-gray-900/g,
    replacement: "text-white"
  }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const { regex, replacement } of REPLACEMENTS) {
    content = content.replace(regex, replacement);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${path.relative(SRC_DIR, filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(file)) {
      processFile(fullPath);
    }
  }
}

console.log('🚀 Starting Global UI/UX Unification Sweep...');
walkDir(SRC_DIR);
console.log('✨ Sweep Complete!');
