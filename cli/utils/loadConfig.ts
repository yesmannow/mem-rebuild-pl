import fs from 'node:fs';
import path from 'node:path';

export function loadConfig(): {
  defaultInitials: string;
  defaultTheme: string;
  outputDir: string;
  assetDirs: {
    images: string;
    icons: string;
  };
} {
  const configPath = path.join(process.cwd(), 'cli/cli.config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`❌ CLI config not found at ${configPath}`);
  }

  const raw = fs.readFileSync(configPath, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`❌ Failed to parse CLI config: ${err}`);
  }
}