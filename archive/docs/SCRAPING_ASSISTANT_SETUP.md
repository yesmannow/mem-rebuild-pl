# AI-Cursor-Scraping-Assistant Setup Guide

This guide explains how to use the AI-Cursor-Scraping-Assistant to extract images and design components from websites to improve your marketing portfolio.

## Overview

The AI-Cursor-Scraping-Assistant is an MCP (Model Context Protocol) server that provides tools for:
- Extracting images from websites
- Extracting design components (colors, fonts, spacing, layout patterns)
- Extracting CSS files
- Generating web scrapers using Scrapy or Camoufox

## Installation

### 1. Install Python Dependencies

```bash
npm run scraping:install
```

Or manually:
```bash
cd cli-workflow/scraping-assistant
pip install -r requirements.txt
python -m camoufox fetch
```

### 2. Verify Installation

Make sure you have Python 3.10+ installed:
```bash
python --version
```

## Usage

### Starting the MCP Server

The scraping assistant runs as an MCP server that Cursor can connect to. To start it:

```bash
npm run scraping:server
```

Or directly:
```bash
python cli-workflow/scraping-assistant/start_mcp_server.py
```

### Using with Cursor

The scraping assistant is configured in `mcp/config.json` and should be automatically available in Cursor when the MCP server is running.

### Available Tools

The following tools are available through the MCP server:

1. **fetch_page_content** - Fetch page HTML using Camoufox stealth browser
2. **generate_xpaths** - Generate XPath selectors for requested fields
3. **write_camoufox_scraper** - Create a Camoufox scraper from a template
4. **strip_css** - Remove CSS from HTML to simplify analysis
5. **extract_images** - Extract all images from a website
6. **extract_design_components** - Extract design components (colors, fonts, etc.)
7. **extract_css_files** - Extract all CSS files from a website

### Command Line Usage

You can also use the Node.js wrapper script to extract assets:

#### Extract Images
```bash
npm run scrape:images <url> [outputDir]
```

Example:
```bash
npm run scrape:images https://example.com public/images/scraped
```

#### Extract Design Components
```bash
npm run scrape:design <url> [outputDir]
```

Example:
```bash
npm run scrape:design https://example.com public/design-assets
```

#### Extract Everything
```bash
npm run scrape:all <url> [outputDir]
```

Example:
```bash
npm run scrape:all https://example.com
```

### Direct Python Usage

You can also use the Python tools directly:

```python
import asyncio
from cli_workflow.scraping_assistant.MCPfiles.xpath_server import extract_images, extract_design_components

async def main():
    # Extract images
    images = await extract_images("https://example.com", "output_dir")
    print(images)

    # Extract design components
    design = await extract_design_components("https://example.com", "output_dir")
    print(design)

asyncio.run(main())
```

## Output Format

### Images Extraction

The `extract_images` tool returns a JSON object with:
- `url`: The source URL
- `images`: Array of image objects with:
  - `src`: Image URL (absolute)
  - `alt`: Alt text
  - `title`: Title attribute
  - `width`, `height`: Dimensions
  - `class`, `id`: CSS identifiers
- `background_images`: Array of background images found in CSS
- `total_images`: Total count
- `output_file`: Path to saved JSON file (if output_dir provided)

### Design Components Extraction

The `extract_design_components` tool returns a JSON object with:
- `url`: The source URL
- `colors`: Array of extracted color values
- `fonts`: Array of extracted font families
- `components`: Object with counts of:
  - `buttons`: Number of buttons found
  - `cards`: Number of card components
  - `modals`: Number of modal/dialog components
  - `navigation`: Number of navigation elements
  - `forms`: Number of forms
  - `icons`: Number of icons
- `meta`: Meta tags related to design
- `total_colors`, `total_fonts`: Counts
- `output_file`: Path to saved JSON file (if output_dir provided)

## Integration with Portfolio

### Using Extracted Assets

1. **Images**: The extracted images can be saved to `public/images/scraped/` and referenced in your portfolio
2. **Design Components**: Use the extracted colors and fonts to create moodboards or design inspiration
3. **CSS Files**: Analyze CSS files to understand design patterns and styling approaches

### Example Workflow

1. Find a website with great design
2. Extract images and design components:
   ```bash
   npm run scrape:all https://inspirational-site.com
   ```
3. Review the generated JSON files in the output directory
4. Use the extracted data to:
   - Add images to your portfolio
   - Create design moodboards
   - Extract color palettes
   - Analyze typography choices

## Troubleshooting

### Python Not Found
Make sure Python 3.10+ is installed and in your PATH:
```bash
python --version
```

### Camoufox Binary Missing
If you get errors about Camoufox, fetch the binary:
```bash
python -m camoufox fetch
```

### MCP Server Not Connecting
1. Make sure the server is running: `npm run scraping:server`
2. Check `mcp/config.json` has the correct path to the server
3. Verify Python dependencies are installed

### Permission Errors
On Windows, you may need to run PowerShell as Administrator for some operations.

## Best Practices

1. **Respect robots.txt**: Always check a website's robots.txt before scraping
2. **Rate Limiting**: Don't overwhelm servers with too many requests
3. **Copyright**: Only use extracted assets if you have permission or they're in the public domain
4. **Attribution**: If using extracted design elements, consider attributing the source
5. **Legal Compliance**: Ensure your use complies with terms of service and copyright laws

## Advanced Usage

### Custom Scrapers

You can use the scraping assistant to generate custom Scrapy or Camoufox scrapers:

1. Ask Cursor to create a scraper for a specific website
2. The assistant will analyze the website structure
3. Generate a complete scraper with proper selectors

Example prompt in Cursor:
```
Create a scraper to extract product images from https://example-shop.com
```

## References

- [AI-Cursor-Scraping-Assistant GitHub](https://github.com/TheWebScrapingClub/AI-Cursor-Scraping-Assistant)
- [The Web Scraping Club](https://thewebscrapingclub.com)
- [Camoufox Documentation](https://github.com/kaliiiiiiiiii/Camoufox)
- [Scrapy Documentation](https://docs.scrapy.org/)

