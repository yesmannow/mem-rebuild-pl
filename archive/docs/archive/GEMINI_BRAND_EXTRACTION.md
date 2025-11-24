# Gemini Brand Extraction Guide

## Overview

The Gemini Brand Extraction tool uses Google's Gemini API to automatically extract brand identity information from websites. It analyzes web content and extracts structured data including colors, typography, design principles, and more.

## Quick Start

### Extract a Single Brand

```bash
npm run extract:brand -- ibm-design
```

### Extract Multiple Brands

```bash
npm run extract:brand -- ibm-design nasa-manual indiana-university
```

### Extract All Brands

```bash
npm run extract:brand -- --all
```

### Extract with Custom URL

```bash
npm run extract:brand -- ibm-design https://www.ibm.com/design/language/color
```

## What Gets Extracted

The tool extracts the following information:

1. **Colors**
   - Primary colors (hex codes)
   - Secondary colors
   - Neutral colors
   - Semantic colors (success, warning, error, info)

2. **Typography**
   - Primary font family
   - Secondary font family
   - Type scale (display, h1-h4, body, caption)

3. **Design Principles**
   - 3-7 key design principles or values

4. **Visual Specifications**
   - Logo type/style description
   - Logo usage guidelines
   - Spacing system

5. **Educational Content**
   - Brief history
   - Design philosophy
   - Applications/use cases

6. **Additional Details**
   - Notable information about the brand identity

## How It Works

1. **Fetches Web Content**: Downloads HTML from the brand's website
2. **Extracts Text**: Removes HTML tags and extracts readable content
3. **Analyzes with Gemini**: Uses Gemini AI to analyze content and extract structured data
4. **Updates JSON**: Merges extracted data into `brand-identities.json`

## Requirements

- `GEMINI_API_KEY` in `.env` file
- Get your key at: https://aistudio.google.com/

## Rate Limiting

The script includes automatic delays between requests:
- 5 seconds between brands in batch mode
- Helps avoid hitting API rate limits

If you hit rate limits:
- Wait a few minutes and try again
- Reduce batch size (extract fewer brands at once)
- Check your Gemini API quota

## Examples

### Extract IBM Design Language

```bash
npm run extract:brand -- ibm-design
```

Output:
```
🔍 Extracting brand info for: IBM Design Language
   URL: https://www.ibm.com/design/language/
📡 Fetching content from https://www.ibm.com/design/language/...
   🤖 Analyzing with Gemini...
   ✅ Successfully extracted brand information
   💾 Updated brand data in brand-identities.json

✅ Successfully extracted and updated IBM Design Language
```

### Extract All Brands with URLs

```bash
npm run extract:brand -- --all
```

This will process all brands in `brand-identities.json` that have a `sourceUrl`.

## Troubleshooting

### Error: "GEMINI_API_KEY not found"
- Add `GEMINI_API_KEY=your_key_here` to your `.env` file
- Get your key at: https://aistudio.google.com/

### Error: "429 Too Many Requests"
- Wait a few minutes before trying again
- Reduce batch size
- Check your API quota

### Error: "Could not fetch content"
- Check if the URL is accessible
- Some websites may block automated requests
- Try using a custom URL if the default one doesn't work

### Error: "Could not parse JSON"
- Gemini sometimes returns markdown-wrapped JSON
- The script tries to extract JSON from code blocks automatically
- If this fails, the extraction will be skipped

## Tips

1. **Start Small**: Test with one brand first before running `--all`
2. **Check URLs**: Make sure brand URLs in `brand-identities.json` are correct
3. **Review Results**: Check the extracted data in `brand-identities.json` after extraction
4. **Merge Carefully**: The script merges new data with existing data, preserving what's already there

## Integration with Other Tools

After extracting brand data, you can:
- Generate quiz questions: `npm run generate:quiz`
- The extracted colors and typography will be used in the quiz generation
- Educational content will appear in the brand detail modal

## Model Used

- **Model**: `gemini-1.5-flash`
- **Temperature**: 0.3 (lower for more accurate extraction)
- **Response Format**: JSON
- **Features**: Fast, cost-effective, good at structured data extraction

