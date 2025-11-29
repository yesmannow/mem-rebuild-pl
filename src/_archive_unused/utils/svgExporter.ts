// svgExporter.ts
import fs from 'node:fs';
import path from 'node:path';

export function exportSVGAssets(sourceDir: string, outputDir: string): number {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`⚠️ Source directory not found: ${sourceDir}`);
    return 0;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.svg'));

  for (const file of files) {
    const src = path.join(sourceDir, file);
    const dest = path.join(outputDir, file);
    fs.copyFileSync(src, dest);
    console.log(`📤 Exported ${file} → ${outputDir}`);
  }

  return files.length;
}
