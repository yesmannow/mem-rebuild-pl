# CLI Inspiration Workflow

A standalone CLI tool for scraping design inspiration websites, using Gemini AI for summarization, optimizing images, and generating Markdown content for your React portfolio.

## Setup

### 1. Install Dependencies

Navigate to the `cli-workflow` directory and install dependencies:

```bash
cd cli-workflow
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env` and add your Gemini API key:

```bash
cp .env.example .env
```

Then edit `.env` and add your API key:

```
GEMINI_API_KEY=your_actual_api_key_here
```

You can get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### 3. Add URLs to Scrape

Edit `scrapeAndGenerate.js` and add URLs to the `inputURLs` array:

```javascript
const inputURLs = [
  'https://the-brandidentity.com/project/example-project',
  'https://another-design-site.com/article',
  // Add more URLs here
];
```

## Usage

### Run the Scraper

From the `cli-workflow` directory:

```bash
npm run scrape
```

Or directly:

```bash
node scrapeAndGenerate.js
```

### What It Does

1. **Scrapes** each URL in the `inputURLs` array
2. **Extracts** title, image, and article content
3. **Summarizes** content using Gemini AI (75-word professional descriptions)
4. **Optimizes** images (resizes to 600px width, converts to JPEG at 80% quality)
5. **Generates** Markdown files in `content/inspiration/` with YAML frontmatter

### Output Structure

- **Markdown files**: `content/inspiration/{slug}.md`
- **Optimized images**: `images/{slug}-thumb.jpg`

## Integration with Main Project

The CLI workflow integrates with the main React project through build hooks:

### Build Process

When you run `npm run build` in the main project, it automatically:

1. Runs `generate:content` (scrapes and generates Markdown)
2. Runs `copy:assets` (copies optimized images to `public/images/`)
3. Cleans TypeScript types
4. Builds the React app

### Manual Steps

You can also run these steps manually:

```bash
# Generate content
npm run generate:content

# Copy images to public directory
npm run copy:assets
```

## Content Format

Each generated Markdown file contains:

```yaml
---
title: "Project Title"
url: https://source-url.com
image: /images/project-slug-thumb.jpg
tags: ["Design", "Branding", "Inspiration"]
source_credit: "Work by [Agency Name] via The Brand Identity"
date: 2025-01-09
---

[Gemini-generated summary text]
```

## Troubleshooting

### API Key Issues

- Ensure `.env` file exists in `cli-workflow/` directory
- Verify your API key is correct
- Check that the API key has access to Gemini models

### Image Download Failures

- Some images may fail to download (CORS, authentication, etc.)
- The script will fallback to the original image URL
- Check console output for specific error messages

### Missing Content

- Ensure URLs are accessible and contain article content
- Check that the HTML structure matches expected selectors (`<article>`, `<main>`, or `<body>`)
- Verify og:title and og:image meta tags exist

## Dependencies

- `axios` - HTTP requests
- `cheerio` - HTML parsing
- `html-to-text` - Text extraction
- `dotenv` - Environment variables
- `@google/generative-ai` - Gemini AI integration
- `sharp` - Image optimization

## Notes

- The scraper uses `gemini-2.5-flash` model for fast summarization
- Images are optimized to 600px width (maintains aspect ratio)
- Markdown files are compatible with `gray-matter` parser
- Content is automatically loaded by the React app using Vite's `import.meta.glob`

