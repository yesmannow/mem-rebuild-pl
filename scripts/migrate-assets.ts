import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const oldPaths = [
  'src/utils',
  'src/images',
  'src/components',
];
const newPaths = {
  images: 'src/assets/images',
  icons: 'src/assets/icons',
  branding: 'public/branding',
};

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp']);

function ensureDirs() {
  for (const dir of Object.values(newPaths)) {
    const fullPath = path.join(root, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Created ${dir}`);
    }
  }
}

function migrateAssets() {
  for (const oldDir of oldPaths) {
    const fullOldPath = path.join(root, oldDir);
    if (!fs.existsSync(fullOldPath)) continue;

    for (const file of fs.readdirSync(fullOldPath)) {
      const ext = path.extname(file).toLowerCase();
      if (!imageExtensions.has(ext)) continue;

      const source = path.join(fullOldPath, file);
      const targetDir = ext === '.svg' ? newPaths.icons : newPaths.images;
      const target = path.join(root, targetDir, file);

      fs.renameSync(source, target);
      console.log(`📦 Moved ${file} → ${targetDir}`);
    }
  }
}

function updateCLIConfig() {
  const configPath = path.join(root, 'cli/cli.config.json');
  const config = {
    defaultInitials: 'JD',
    defaultTheme: 'modern',
    outputDir: newPaths.branding,
    assetDirs: {
      images: newPaths.images,
      icons: newPaths.icons,
    }
  };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`🛠️ Updated CLI config at cli/cli.config.json`);
}

function updatePrompts() {
  const promptPath = path.join(root, 'prompts/branding.json');
  const prompts = {
    reorganizeImages: {
      description: "Reorganize image assets into src/assets/images/, src/assets/icons/, and public/branding/",
      command: "ts-node scripts/migrate-assets.ts"
    },
    generateLogo: {
      description: "Generate a modern SVG logo with initials JD",
      command: "ts-node cli/generate-logo.ts public/branding/logo.svg"
    },
    previewLayout: {
      description: "Build and open preview layout",
      command: "ts-node cli/preview-layout.ts"
    },
    exportSVG: {
      description: "Export SVG assets for Divi",
      command: "ts-node cli/svg-export.ts public/branding"
    }
  };
  fs.writeFileSync(promptPath, JSON.stringify(prompts, null, 2));
  console.log(`🧠 Updated assistant prompts at prompts/branding.json`);
}

ensureDirs();
migrateAssets();
updateCLIConfig();
updatePrompts();
console.log('✅ Asset migration and CLI update complete.');