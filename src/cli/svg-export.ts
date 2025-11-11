import fs from 'fs';
import axios from 'axios';
import { exportSVGAssets } from '@utils/svgExporter';
import { loadConfig } from '@config/loadConfig';

const config = loadConfig();
const outputPath = process.argv[2] || `${config.outputDir}/exported`;
const useRemote = process.argv.includes('--remote');

async function main() {
  if (useRemote) {
    const res = await axios.post('http://localhost:8000/export-svg');
    console.log(`🌐 ${res.data.exported} SVG assets exported via MCP.`);
  } else {
    const count = exportSVGAssets(config.sourceDir || './public/icons', outputPath);
    console.log(`✅ ${count} SVG assets exported locally.`);
  }
}

main();
