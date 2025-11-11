import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import { loadConfig } from '@config/loadConfig';
import { buildResumeHTML } from '@utils/resumeBuilder';

const config = loadConfig();
const args = process.argv.slice(2);
const outputArg = args[args.indexOf('--output') + 1] || `${config.outputDir}/resume.html`;
const themeArg = args[args.indexOf('--theme') + 1] || 'modern';
const useRemote = args.includes('--remote');

const dataPath = config.resumeData || 'data/resume.json';
const resumeData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

if (useRemote) {
  const res = await axios.post('http://localhost:8000/generate-resume', {
    theme: themeArg,
    data: resumeData
  });
  fs.writeFileSync(outputArg, res.data.html);
  console.log(`🌐 Résumé HTML via MCP → ${outputArg}`);
} else {
  const html = buildResumeHTML(resumeData, themeArg);
  fs.writeFileSync(outputArg, html);
  console.log(`✅ Résumé HTML generated → ${outputArg}`);
}