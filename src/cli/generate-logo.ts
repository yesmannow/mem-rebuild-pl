import fs from 'node:fs';
import axios from 'axios';
import path from 'node:path';
import { createSVGLogo } from '@assets/logoFactory';
import { loadConfig } from '@config/loadConfig';
import { validateSVG } from '../utils/svgValidator';

// Utility function to write output to a file
function writeToFile(outputPath: string, data: Buffer | string) {
  fs.writeFileSync(outputPath, data);
  console.log(`✅ File written → ${outputPath}`);
}

// Utility function to handle unsupported options
function handleUnsupportedOption(option: string, value: string, supportedValues: string[]) {
  console.error(`❌ Unsupported ${option}: ${value}. Supported ${option}s: ${supportedValues.join(', ')}`);
  process.exit(1);
}

const config = loadConfig();
const outputPath = process.argv[2] || `${config.outputDir}/logo.svg`;
const useRemote = process.argv.includes('--remote');

const supportedThemes = ['light', 'dark', 'gradient'];
const supportedFormats = ['svg', 'png'];
const format = process.argv.includes('--format') ? process.argv[process.argv.indexOf('--format') + 1] : 'svg';
const theme = process.argv.includes('--theme') ? process.argv[process.argv.indexOf('--theme') + 1] : config.defaultTheme;
const initials = process.argv.includes('--initials') ? process.argv[process.argv.indexOf('--initials') + 1] : config.defaultInitials;

if (!supportedThemes.includes(theme)) {
  handleUnsupportedOption('theme', theme, supportedThemes);
}

if (!supportedFormats.includes(format)) {
  handleUnsupportedOption('format', format, supportedFormats);
}

async function convertSVGToPNG(svg: string) {
  // Placeholder for SVG to PNG conversion logic
  return Buffer.from(svg); // This line should be replaced with actual conversion code
}

if (useRemote) {
  try {
    const res = await axios.post('http://localhost:8000/generate-logo', {
      initials,
      theme,
      format
    });
    const outputFilePath = path.join(config.outputDir, `logo.${format}`);
    writeToFile(outputFilePath, res.data[format]);
    console.log(`🌐 Logo fetched from MCP → ${outputFilePath}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Failed to fetch logo from remote server:', error.message);
    } else {
      console.error('❌ An unknown error occurred while fetching the logo.');
    }
    process.exit(1);
  }
} else {
  const svg = createSVGLogo({
    theme,
    initials
  });

  if (format === 'svg') {
    const outputFilePath = path.join(config.outputDir, `logo.${format}`);
    writeToFile(outputFilePath, svg);
  } else if (format === 'png') {
    const pngBuffer = await convertSVGToPNG(svg);
    const outputFilePath = path.join(config.outputDir, `logo.${format}`);
    writeToFile(outputFilePath, pngBuffer);
  }

  if (!validateSVG(svg)) {
    console.error('❌ Generated SVG failed validation. Please check the input parameters.');
    process.exit(1);
  }
}