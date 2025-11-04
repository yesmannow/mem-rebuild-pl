import fs from 'node:fs';
import { createSVGLogo } from '../src/assets/logoFactory';

const outputPath = process.argv[2] || 'public/logo.svg';
const svg = createSVGLogo({ theme: 'modern', initials: 'JD' });

fs.writeFileSync(outputPath, svg);
console.log(`✅ Logo exported to ${outputPath}`);