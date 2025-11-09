import fs from 'fs';
import axios from 'axios';
import { buildPreviewHTML } from '@utils/previewBuilder';
import { loadConfig } from '@config/loadConfig';

const config = loadConfig();
const outputPath = process.argv[2] || `${config.outputDir}/preview.html`;
const useRemote = process.argv.includes('--remote');

async function main() {
  if (useRemote) {
    const res = await axios.post('http://localhost:8000/preview-layout');
    fs.writeFileSync(outputPath, res.data.html);
    console.log(`🌐 Preview fetched from MCP → ${outputPath}`);
  } else {
    const html = buildPreviewHTML();
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Preview generated locally → ${outputPath}`);
  }
}

main();
