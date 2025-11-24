# Using MCP Browser Tools to Fetch Brand Data

## Overview

MCP (Model Context Protocol) browser tools allow you to interact with websites directly from Cursor to extract brand identity information. This guide shows you how to use them.

## Quick Start

### Step 1: Navigate to Brand Website

```javascript
// In Cursor, use MCP browser tools:
mcp_cursor-browser-extension_browser_navigate({
  url: "https://www.ibm.com/design/language/color"
})
```

### Step 2: Wait for Page to Load

```javascript
mcp_cursor-browser-extension_browser_wait_for({
  text: "Color",
  time: 3
})
```

### Step 3: Extract Data Using JavaScript

```javascript
mcp_cursor-browser-extension_browser_evaluate({
  function: `
    (() => {
      const foundColors = new Set();
      const colorElements = document.querySelectorAll('[class*="color"]');
      colorElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        if (bgColor) {
          const rgb = bgColor.match(/\\d+/g);
          if (rgb && rgb.length >= 3) {
            const hex = '#' + rgb.map(x => {
              const val = parseInt(x).toString(16);
              return val.length === 1 ? '0' + val : val;
            }).join('');
            foundColors.add(hex.toUpperCase());
          }
        }
      });
      return {
        colors: Array.from(foundColors),
        url: window.location.href,
        extractedAt: new Date().toISOString()
      };
    })();
  `
})
```

### Step 4: Save Extracted Data

Use the helper function from `scripts/mcp-extraction-helpers.js`:

```javascript
import { updateBrandData } from './scripts/mcp-extraction-helpers.js';

updateBrandData("ibm-design", {
  colors: ["#0F62FE", "#002D9C", ...],
  extractedAt: "2025-11-09T10:48:41.951Z"
});
```

## Available MCP Browser Tools

| Tool | Purpose | Example |
|------|---------|---------|
| `browser_navigate` | Navigate to URL | `browser_navigate({ url: "https://..." })` |
| `browser_snapshot` | Get page structure | `browser_snapshot()` |
| `browser_evaluate` | Run JavaScript | `browser_evaluate({ function: "() => {...}" })` |
| `browser_click` | Click elements | `browser_click({ element: "Button", ref: "e123" })` |
| `browser_wait_for` | Wait for content | `browser_wait_for({ text: "Color", time: 3 })` |
| `browser_type` | Type into fields | `browser_type({ element: "Search", text: "colors" })` |

## Extraction Scripts

Pre-built extraction scripts are available in `scripts/mcp-extraction-helpers.js`:

- **extractColors**: Extracts color values from page
- **extractTypography**: Extracts font families and sizes
- **extractPrinciples**: Extracts design principles/text

## Example: Complete Workflow for IBM

```javascript
// 1. Navigate
browser_navigate({ url: "https://www.ibm.com/design/language/color" })

// 2. Wait
browser_wait_for({ text: "Color", time: 3 })

// 3. Extract colors
const colorData = browser_evaluate({
  function: extractionScripts.extractColors
})

// 4. Navigate to typography page
browser_navigate({ url: "https://www.ibm.com/design/language/typography/typeface" })
browser_wait_for({ text: "Typeface", time: 3 })

// 5. Extract typography
const typographyData = browser_evaluate({
  function: extractionScripts.extractTypography
})

// 6. Save everything
updateBrandData("ibm-design", {
  colors: colorData.colors,
  fonts: typographyData.fonts,
  scales: typographyData.scales,
  extractedAt: new Date().toISOString()
})
```

## Tips

1. **Use browser_snapshot** first to understand page structure
2. **Wait for dynamic content** to load before extracting
3. **Handle errors gracefully** - some sites block automation
4. **Respect rate limits** - add delays between requests
5. **Save incrementally** - don't lose extracted data

## Limitations

- MCP browser tools work best in Cursor's AI context
- Some sites may block automated access
- Complex SPAs may need multiple waits/clicks
- For production, consider Puppeteer-based script

## Next Steps

1. Try extracting from IBM Design Language (already demonstrated)
2. Extract from NASA Graphics Standards Manual
3. Extract from Indiana University brand site
4. Update `brand-identities.json` with real data

See `scripts/fetch-brand-data.js` for Puppeteer-based alternative.

