import fs from 'node:fs';
import path from 'node:path';
var root = process.cwd();
var oldPaths = [
    'src/utils',
    'src/images',
    'src/components',
];
var newPaths = {
    images: 'src/assets/images',
    icons: 'src/assets/icons',
    branding: 'public/branding',
};
var imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp']);
function ensureDirs() {
    for (var _i = 0, _a = Object.values(newPaths); _i < _a.length; _i++) {
        var dir = _a[_i];
        var fullPath = path.join(root, dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log("\uD83D\uDCC1 Created ".concat(dir));
        }
    }
}
function migrateAssets() {
    for (var _i = 0, oldPaths_1 = oldPaths; _i < oldPaths_1.length; _i++) {
        var oldDir = oldPaths_1[_i];
        var fullOldPath = path.join(root, oldDir);
        if (!fs.existsSync(fullOldPath))
            continue;
        for (var _a = 0, _b = fs.readdirSync(fullOldPath); _a < _b.length; _a++) {
            var file = _b[_a];
            var ext = path.extname(file).toLowerCase();
            if (!imageExtensions.has(ext))
                continue;
            var source = path.join(fullOldPath, file);
            var targetDir = ext === '.svg' ? newPaths.icons : newPaths.images;
            var target = path.join(root, targetDir, file);
            fs.renameSync(source, target);
            console.log("\uD83D\uDCE6 Moved ".concat(file, " \u2192 ").concat(targetDir));
        }
    }
}
function updateCLIConfig() {
    var configPath = path.join(root, 'cli/cli.config.json');
    var config = {
        defaultInitials: 'JD',
        defaultTheme: 'modern',
        outputDir: newPaths.branding,
        assetDirs: {
            images: newPaths.images,
            icons: newPaths.icons,
        }
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log("\uD83D\uDEE0\uFE0F Updated CLI config at cli/cli.config.json");
}
function updatePrompts() {
    var promptPath = path.join(root, 'prompts/branding.json');
    var prompts = {
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
    console.log("\uD83E\uDDE0 Updated assistant prompts at prompts/branding.json");
}
ensureDirs();
migrateAssets();
updateCLIConfig();
updatePrompts();
console.log('✅ Asset migration and CLI update complete.');
