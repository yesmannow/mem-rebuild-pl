// cli-workflow/scrapeAndGenerate.js
const axios = require('axios');
const cheerio = require('cheerio');
const { htmlToText } = require('html-to-text');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- Configuration ---
const inputURLs = [
  'https://the-brandidentity.com/project/los-yorks-pixel-based-system-gives-netflixs-eyeline-a-bold-new-vision',
  'https://the-brandidentity.com/project/how-wedge-shifted-allergen-brand-growhappy-from-fear-to-confidence',
  'https://the-brandidentity.com/project/how-kimera-built-cursors-identity-around-a-custom-typeface-system',
  'https://the-brandidentity.com/project/for-fellowkids-studio-kiln-shows-how-brands-can-behave-like-fans',
  // Add more links here
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Use __dirname to ensure paths are relative to the script location
const OUTPUT_DIR = path.join(__dirname, 'content', 'inspiration');
const IMAGE_DIR = path.join(__dirname, 'images');

// Ensure necessary output directories exist
[OUTPUT_DIR, IMAGE_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// --- CORE FUNCTIONS ---

// 1. Gemini AI Summarization (for card preview)
async function summarizeWithGemini(content) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `Reword the following article summary to sound like an original, curated description of a branding project. Limit to 75 words. Keep the tone professional, design-savvy, and avoid repeating the original language:\n\n${content}`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error(`❌ Error with Gemini API:`, error.message);
    // Fallback to truncated original text
    return content.slice(0, 300) + '...';
  }
}

// 2. Gemini AI Full Content Generation (for detail page)
async function generateFullContentWithGemini(content) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `Rewrite the following article about a branding project into a comprehensive, engaging narrative. Write in your own words with a professional, design-focused tone. Structure it into 3-4 paragraphs covering: the brand challenge, the creative solution, key design elements, and the impact. Aim for 300-400 words total. Make it feel like an original curated piece, not a summary:\n\n${content}`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error(`❌ Error with Gemini API (full content):`, error.message);
    // Fallback to truncated original text
    return content.slice(0, 1000) + '...';
  }
}

// 2. Image Optimization & Local Save
async function downloadImage(url, filenameBase) {
  const filename = `${filenameBase}-thumb.jpg`;
  const imagePath = path.join(IMAGE_DIR, filename);

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    await sharp(buffer)
      .resize({ width: 600, withoutEnlargement: true }) // Optimize size for web
      .jpeg({ quality: 80 }) // Optimize quality
      .toFile(imagePath);

    // Return the public-facing URL path, relative to your React app's public folder
    return `/images/${filename}`;
  } catch (error) {
    console.error(`❌ Error processing image for ${filename}:`, error.message);
    return url; // Fallback to original external URL if optimization fails
  }
}

// 3. Markdown Content Generation
function createMarkdownContent(data) {
  // YAML Frontmatter (for React content loaders like gray-matter)
  const frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
url: ${data.url}
image: ${data.image}
tags: ${JSON.stringify(data.tags)}
source_credit: "${data.source_credit || 'Work by [Agency Name] via The Brand Identity'}"
date: ${data.date}
slug: ${data.slug}
---

${data.summary}

---

## Full Content

${data.fullContent || data.summary}
`;
  return frontmatter;
}

// --- Main Execution Workflow ---
(async () => {
  console.log('🚀 Starting content generation workflow...\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }

  for (const url of inputURLs) {
    try {
      console.log(`📡 Scraping: ${url}`);
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(data);
      // Try multiple selectors for article title
      let title = $('meta[property="og:title"]').attr('content') ||
                  $('article h1').first().text().trim() ||
                  $('h1.article-title, h1.post-title, h1.entry-title').first().text().trim() ||
                  $('title').text();

      // Clean up title (remove site name if present)
      title = title.replace(/\s*\|\s*The Brand Identity.*$/i, '').trim();
      title = title.replace(/\s*-\s*The Brand Identity.*$/i, '').trim();
      title = title.replace(/^The Brand Identity\s*[:\-]\s*/i, '').trim();

      // If title is still generic, extract from URL slug
      if (!title || title.toLowerCase().includes('the brand identity') || title.length < 10) {
        const urlMatch = url.match(/\/project\/([^\/]+)/);
        if (urlMatch) {
          // Convert URL slug to readable title
          title = urlMatch[1]
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }

      const ogImage = $('meta[property="og:image"]').attr('content');
      const articleBody = $('article').html() || $('main').html() || $('body').html();

      if (!title) {
        console.warn(`⚠️  No title found for ${url}, skipping...`);
        continue;
      }

      const cleanText = htmlToText(articleBody || '', { wordwrap: 120 }).slice(0, 4000);

      // Extract additional content for detail page
      const paragraphs = $('article p, main p').map((i, el) => $(el).text().trim()).get().filter(p => p.length > 50);
      const fullContent = paragraphs.join('\n\n').slice(0, 8000); // More content for detail page

      // 1. Generate Summary (for card)
      console.log(`🤖 Generating summary with Gemini...`);
      const rewrittenSummary = await summarizeWithGemini(cleanText);

      // 2. Generate Full Content (for detail page)
      console.log(`🤖 Generating full content with Gemini...`);
      const fullRewrittenContent = await generateFullContentWithGemini(fullContent || cleanText);

      const filenameBase = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 100); // Limit filename length

      // 2. Process Image (Optimized to /images/...)
      let localImagePath = ogImage;
      if (ogImage && ogImage.startsWith('http')) {
        console.log(`🖼️  Processing image: ${ogImage}`);
        localImagePath = await downloadImage(ogImage, filenameBase);
      } else if (ogImage) {
        // Relative URL, keep as is
        localImagePath = ogImage;
      }

      // Extract agency name if available
      const agencyMatch = title.match(/by\s+([^,]+)/i) || title.match(/([A-Z][a-z]+\s+[A-Z][a-z]+)/);
      const agencyName = agencyMatch ? agencyMatch[1] : 'Design Agency';

      // 3. Build Data Object & Write Markdown
      const output = {
        title,
        url,
        image: localImagePath,
        summary: rewrittenSummary,
        fullContent: fullRewrittenContent || rewrittenSummary, // Full content for detail page
        tags: ['Design', 'Branding', 'Inspiration'],
        date: new Date().toISOString().split('T')[0],
        source_credit: `Work by ${agencyName} via The Brand Identity`,
        slug: filenameBase,
      };

      const markdownContent = createMarkdownContent(output);
      const outputPath = path.join(OUTPUT_DIR, `${filenameBase}.md`);
      fs.writeFileSync(outputPath, markdownContent);
      console.log(`✅ Saved Markdown: ${filenameBase}.md\n`);
    } catch (error) {
      console.error(`❌ Error scraping ${url}:`, error.message);
      console.error(error.stack);
    }
  }

  console.log('✨ Content generation complete!');
})();

