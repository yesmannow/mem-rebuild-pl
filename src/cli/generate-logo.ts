import fs from 'node:fs';
import axios from 'axios';
import { createSVGLogo } from '@assets/logoFactory';
import { loadConfig } from '@config/loadConfig';

const config = loadConfig();
const outputPath = process.argv[2] || `${config.outputDir}/logo.svg`;
const useRemote = process.argv.includes('--remote');

async function main() {
  if (useRemote) {
    const res = await axios.post('http://localhost:8000/generate-logo', {
      initials: config.defaultInitials,
      theme: config.defaultTheme
    });
    fs.writeFileSync(outputPath, res.data.svg);
    console.log(`🌐 Logo fetched from MCP → ${outputPath}`);
  } else {
    const svg = createSVGLogo({
      theme: config.defaultTheme,
      initials: config.defaultInitials
    });
    fs.writeFileSync(outputPath, svg);
    console.log(`✅ Logo generated locally → ${outputPath}`);
  }
}

main();