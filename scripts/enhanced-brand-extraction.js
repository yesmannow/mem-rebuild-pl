/**
 * Enhanced Brand Data Extraction & Learning Tools
 * ===============================================
 *
 * This module provides advanced tools for extracting brand information
 * and creating educational content for users.
 */

import axios from 'axios';
import { OpenAI } from 'openai';
import Vibrant from 'node-vibrant';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI (if API key is available)
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * 1. AI-Powered Content Enrichment
 * Uses OpenAI to generate educational content about brands
 */
export async function enrichBrandWithAI(brandData: any): Promise<any> {
  if (!openai) {
    console.warn('⚠️  OpenAI API key not found. Skipping AI enrichment.');
    return brandData;
  }

  try {
    const prompt = `Analyze this brand identity and provide educational insights:

Brand: ${brandData.title}
Category: ${brandData.category}
Colors: ${JSON.stringify(brandData.brandInfo?.colors)}
Typography: ${JSON.stringify(brandData.brandInfo?.typography)}
Design Principles: ${brandData.designPrinciples?.join(', ')}

Provide:
1. A brief history paragraph (2-3 sentences)
2. Key design lessons users can learn (3-5 bullet points)
3. Common use cases or applications
4. What makes this brand unique or notable

Format as JSON with keys: history, lessons, useCases, uniqueAspects`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a design educator specializing in brand identity analysis. Provide clear, educational insights.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' }
    });

    const aiContent = JSON.parse(completion.choices[0].message.content || '{}');

    return {
      ...brandData,
      educationalContent: {
        ...brandData.educationalContent,
        aiGenerated: {
          history: aiContent.history,
          lessons: aiContent.lessons,
          useCases: aiContent.useCases,
          uniqueAspects: aiContent.uniqueAspects,
          generatedAt: new Date().toISOString()
        }
      }
    };
  } catch (error) {
    console.error('❌ Error enriching brand with AI:', error);
    return brandData;
  }
}

/**
 * 2. Image Color Extraction
 * Extracts dominant colors from brand logos/images using Vibrant.js
 */
export async function extractColorsFromImage(imagePath: string): Promise<string[]> {
  try {
    const palette = await Vibrant.from(imagePath).getPalette();
    const colors: string[] = [];

    if (palette.Vibrant) colors.push(palette.Vibrant.hex);
    if (palette.Muted) colors.push(palette.Muted.hex);
    if (palette.DarkVibrant) colors.push(palette.DarkVibrant.hex);
    if (palette.DarkMuted) colors.push(palette.DarkMuted.hex);
    if (palette.LightVibrant) colors.push(palette.LightVibrant.hex);
    if (palette.LightMuted) colors.push(palette.LightMuted.hex);

    return [...new Set(colors)];
  } catch (error) {
    console.error('❌ Error extracting colors from image:', error);
    return [];
  }
}

/**
 * 3. CSS Variable & Design Token Extraction
 * Extracts CSS custom properties and design tokens from websites
 */
export async function extractDesignTokens(url: string): Promise<any> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const tokens = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      const cssVars: Record<string, string> = {};
      const tokens: any = {
        colors: {},
        typography: {},
        spacing: {},
        shadows: {}
      };

      // Extract CSS custom properties
      stylesheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule instanceof CSSStyleRule) {
              const style = rule.style;
              Array.from(style).forEach(prop => {
                const value = style.getPropertyValue(prop);
                if (prop.startsWith('--')) {
                  cssVars[prop] = value.trim();

                  // Categorize tokens
                  if (prop.includes('color')) {
                    tokens.colors[prop] = value.trim();
                  } else if (prop.includes('font') || prop.includes('type')) {
                    tokens.typography[prop] = value.trim();
                  } else if (prop.includes('spacing') || prop.includes('gap') || prop.includes('padding') || prop.includes('margin')) {
                    tokens.spacing[prop] = value.trim();
                  } else if (prop.includes('shadow')) {
                    tokens.shadows[prop] = value.trim();
                  }
                }
              });
            }
          });
        } catch (e) {
          // Cross-origin stylesheets may throw
        }
      });

      return { cssVars, tokens };
    });

    await browser.close();
    return tokens;
  } catch (error) {
    await browser.close();
    console.error('❌ Error extracting design tokens:', error);
    return null;
  }
}

/**
 * 4. Comprehensive Brand Extraction
 * Combines multiple extraction methods for comprehensive data
 */
export async function extractComprehensiveBrandData(url: string, brandId: string): Promise<any> {
  console.log(`🔍 Extracting comprehensive data for ${brandId}...`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Extract multiple data points
    const data = await page.evaluate(() => {
      // Colors from multiple sources
      const colors = new Set<string>();

      // 1. CSS custom properties
      const rootStyles = getComputedStyle(document.documentElement);
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          Array.from(sheet.cssRules).forEach(rule => {
            if (rule instanceof CSSStyleRule) {
              const style = rule.style;
              Array.from(style).forEach(prop => {
                const value = style.getPropertyValue(prop);
                if (prop.startsWith('--color') || prop.includes('color')) {
                  const hexMatch = value.match(/#[0-9A-Fa-f]{6}/i);
                  if (hexMatch) colors.add(hexMatch[0].toUpperCase());
                }
              });
            }
          });
        } catch (e) {}
      });

      // 2. Computed styles from elements
      const colorElements = document.querySelectorAll('[class*="color"], [data-color]');
      colorElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
          const rgb = bgColor.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const hex = '#' + rgb.map(x => {
              const val = parseInt(x).toString(16);
              return val.length === 1 ? '0' + val : val;
            }).join('');
            colors.add(hex.toUpperCase());
          }
        }
      });

      // 3. Text content hex codes
      const textContent = document.body.innerText;
      const hexMatches = textContent.match(/#[0-9A-Fa-f]{6}/g);
      if (hexMatches) {
        hexMatches.forEach(hex => colors.add(hex.toUpperCase()));
      }

      // Typography extraction
      const fonts = new Set<string>();
      const scales: Record<string, string> = {};

      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((h, i) => {
        const style = window.getComputedStyle(h);
        const fontFamily = style.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
        if (fontFamily && !['serif', 'sans-serif', 'monospace'].includes(fontFamily.toLowerCase())) {
          fonts.add(fontFamily);
        }
        scales[`h${i + 1}`] = style.fontSize;
      });

      const body = document.querySelector('body');
      if (body) {
        const bodyStyle = window.getComputedStyle(body);
        const bodyFont = bodyStyle.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
        if (bodyFont && !['serif', 'sans-serif', 'monospace'].includes(bodyFont.toLowerCase())) {
          fonts.add(bodyFont);
        }
        scales.body = bodyStyle.fontSize;
      }

      // Design principles/content extraction
      const principles: string[] = [];
      const textElements = document.querySelectorAll('h1, h2, h3, p, li');
      textElements.forEach(el => {
        const text = el.textContent?.trim() || '';
        if (text.length > 15 && text.length < 200) {
          const lowerText = text.toLowerCase();
          if (lowerText.includes('principle') ||
              lowerText.includes('philosophy') ||
              lowerText.includes('design') ||
              lowerText.includes('approach')) {
            principles.push(text);
          }
        }
      });

      return {
        colors: Array.from(colors).slice(0, 20),
        fonts: Array.from(fonts),
        scales,
        principles: [...new Set(principles)].slice(0, 10),
        pageTitle: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        url: window.location.href
      };
    });

    await browser.close();

    // Extract design tokens
    const tokens = await extractDesignTokens(url);

    return {
      ...data,
      designTokens: tokens,
      extractedAt: new Date().toISOString()
    };
  } catch (error) {
    await browser.close();
    console.error('❌ Error in comprehensive extraction:', error);
    throw error;
  }
}

/**
 * 5. Generate Learning Quiz Questions
 * Creates educational quiz questions about brand identity
 */
export async function generateBrandQuiz(brandData: any): Promise<any[]> {
  if (!openai) {
    return [];
  }

  try {
    const prompt = `Create 5 multiple-choice quiz questions about this brand identity:

Brand: ${brandData.title}
Colors: ${JSON.stringify(brandData.brandInfo?.colors)}
Typography: ${JSON.stringify(brandData.brandInfo?.typography)}
Design Principles: ${brandData.designPrinciples?.join(', ')}

Each question should:
- Test understanding of design concepts
- Be educational and informative
- Have 4 options with 1 correct answer
- Include an explanation

Format as JSON array with: question, options (array), correctAnswer (index), explanation`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a design educator creating quiz questions about brand identity.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return result.questions || [];
  } catch (error) {
    console.error('❌ Error generating quiz:', error);
    return [];
  }
}

/**
 * 6. Compare Brands
 * Generates comparison insights between brands
 */
export async function compareBrands(brand1: any, brand2: any): Promise<any> {
  if (!openai) {
    return null;
  }

  try {
    const prompt = `Compare these two brand identities and provide insights:

Brand 1: ${brand1.title}
- Colors: ${JSON.stringify(brand1.brandInfo?.colors)}
- Typography: ${JSON.stringify(brand1.brandInfo?.typography)}
- Principles: ${brand1.designPrinciples?.join(', ')}

Brand 2: ${brand2.title}
- Colors: ${JSON.stringify(brand2.brandInfo?.colors)}
- Typography: ${JSON.stringify(brand2.brandInfo?.typography)}
- Principles: ${brand2.designPrinciples?.join(', ')}

Provide:
1. Similarities (3-5 points)
2. Differences (3-5 points)
3. Design lessons from comparison
4. When to use each approach

Format as JSON`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a design analyst comparing brand identities.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch (error) {
    console.error('❌ Error comparing brands:', error);
    return null;
  }
}

/**
 * 7. Export Brand Data
 * Exports brand data in various formats for learning
 */
export function exportBrandData(brandData: any, format: 'json' | 'markdown' | 'pdf' = 'json'): string {
  switch (format) {
    case 'markdown':
      return `# ${brandData.title}

## Brand Identity

**Category:** ${brandData.category}
**Designer:** ${brandData.designer}
**Year:** ${brandData.year}

### Colors
${Object.entries(brandData.brandInfo?.colors || {}).map(([key, value]) =>
  `- **${key}:** ${Array.isArray(value) ? value.join(', ') : value}`
).join('\n')}

### Typography
${Object.entries(brandData.brandInfo?.typography || {}).map(([key, value]) =>
  `- **${key}:** ${typeof value === 'object' ? JSON.stringify(value) : value}`
).join('\n')}

### Design Principles
${brandData.designPrinciples?.map((p: string) => `- ${p}`).join('\n')}

### Educational Content
${brandData.educationalContent?.history ? `\n**History:** ${brandData.educationalContent.history}` : ''}
${brandData.educationalContent?.philosophy ? `\n**Philosophy:** ${brandData.educationalContent.philosophy}` : ''}
`;

    case 'json':
    default:
      return JSON.stringify(brandData, null, 2);
  }
}

export default {
  enrichBrandWithAI,
  extractColorsFromImage,
  extractDesignTokens,
  extractComprehensiveBrandData,
  generateBrandQuiz,
  compareBrands,
  exportBrandData
};

