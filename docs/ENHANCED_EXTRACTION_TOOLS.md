# Enhanced Brand Extraction & Learning Tools

## Overview

This document outlines the enhanced tools and features available for extracting brand information and creating educational experiences on the inspiration page.

## Available Tools

### 1. **AI-Powered Content Enrichment**
- Uses OpenAI GPT-4 to generate educational content
- Provides history, lessons, use cases, and unique aspects
- Automatically enriches brand data with educational insights

**Usage:**
```javascript
import { enrichBrandWithAI } from './scripts/enhanced-brand-extraction.js';

const enrichedBrand = await enrichBrandWithAI(brandData);
```

### 2. **Image Color Extraction**
- Extracts dominant colors from brand logos/images
- Uses Vibrant.js for color palette analysis
- Identifies vibrant, muted, and light/dark variations

**Usage:**
```javascript
import { extractColorsFromImage } from './scripts/enhanced-brand-extraction.js';

const colors = await extractColorsFromImage('/path/to/image.png');
```

### 3. **Design Token Extraction**
- Extracts CSS custom properties and design tokens
- Categorizes tokens (colors, typography, spacing, shadows)
- Parses design system documentation

**Usage:**
```javascript
import { extractDesignTokens } from './scripts/enhanced-brand-extraction.js';

const tokens = await extractDesignTokens('https://example.com');
```

### 4. **Comprehensive Brand Extraction**
- Combines multiple extraction methods
- Extracts colors, fonts, typography scales, design principles
- Includes meta descriptions and page titles

**Usage:**
```javascript
import { extractComprehensiveBrandData } from './scripts/enhanced-brand-extraction.js';

const data = await extractComprehensiveBrandData('https://example.com', 'brand-id');
```

### 5. **Brand Quiz Generation**
- AI-generated quiz questions about brand identity
- Multiple-choice format with explanations
- Tests understanding of design concepts

**Usage:**
```javascript
import { generateBrandQuiz } from './scripts/enhanced-brand-extraction.js';

const quiz = await generateBrandQuiz(brandData);
```

### 6. **Brand Comparison**
- AI-powered comparison between two brands
- Identifies similarities, differences, and lessons
- Provides actionable insights

**Usage:**
```javascript
import { compareBrands } from './scripts/enhanced-brand-extraction.js';

const comparison = await compareBrands(brand1, brand2);
```

### 7. **Data Export**
- Export brand data in multiple formats
- JSON, Markdown formats available
- PDF export coming soon

**Usage:**
```javascript
import { exportBrandData } from './scripts/enhanced-brand-extraction.js';

const markdown = exportBrandData(brandData, 'markdown');
```

## Interactive Learning Components

### BrandQuiz Component
Interactive quiz component that tests knowledge about brand identities.

**Features:**
- Multiple-choice questions
- Real-time feedback
- Explanations for each answer
- Score tracking
- Progress indicators

### BrandComparisonInsights Component
Displays AI-generated comparison insights between brands.

**Features:**
- Similarities and differences
- Design lessons
- Visual comparison charts

### LearningPath Component
Guides users through a structured learning path.

**Features:**
- Step-by-step progression
- Completion tracking
- Achievement badges

## Setup Instructions

### 1. Install Additional Dependencies

```bash
npm install node-vibrant @types/node-vibrant
```

### 2. Configure OpenAI API Key

Add to your `.env` file:
```
OPENAI_API_KEY=your_api_key_here
```

### 3. Use Enhanced Extraction

```bash
# Run comprehensive extraction
node scripts/enhanced-brand-extraction.js
```

## Recommended Third-Party Tools

### 1. **BrandToolz** (API Integration)
- AI-powered brand intelligence
- Extracts colors, fonts, messaging
- Generates comprehensive brand documents

### 2. **Brand Extractor by Genysys Engine**
- Extracts brand colors, fonts, icons
- Provides hex codes and names
- Includes webpage screenshots

### 3. **Relevance AI Brand Identity Extractor**
- Analyzes company websites
- Extracts voice, tone, messaging
- Provides actionable brand guidelines

## Integration Examples

### Example 1: Enrich Existing Brand Data

```javascript
import { enrichBrandWithAI, extractComprehensiveBrandData } from './scripts/enhanced-brand-extraction.js';

// Extract comprehensive data
const extractedData = await extractComprehensiveBrandData(
  'https://www.ibm.com/design/language/',
  'ibm-design'
);

// Enrich with AI
const enrichedData = await enrichBrandWithAI(extractedData);

// Save to brand-identities.json
updateBrandData('ibm-design', enrichedData);
```

### Example 2: Generate Quiz for Brand

```javascript
import { generateBrandQuiz } from './scripts/enhanced-brand-extraction.js';
import brandData from './src/data/brand-identities.json';

const brand = brandData.brands.find(b => b.id === 'nasa-manual');
const quiz = await generateBrandQuiz(brand);

// Use quiz in BrandQuiz component
<BrandQuiz brandId="nasa-manual" quizData={quiz} />
```

### Example 3: Compare Two Brands

```javascript
import { compareBrands } from './scripts/enhanced-brand-extraction.js';

const comparison = await compareBrands(brand1, brand2);

// Display in BrandComparisonInsights component
<BrandComparisonInsights comparison={comparison} />
```

## Benefits

1. **More Accurate Data**: Multiple extraction methods ensure comprehensive data
2. **Educational Content**: AI-generated insights make learning easier
3. **Interactive Learning**: Quizzes and comparisons engage users
4. **Better UX**: Structured learning paths guide users
5. **Export Options**: Users can export data for their own use

## Future Enhancements

1. **Real-time Extraction**: Live data fetching from brand websites
2. **Video Analysis**: Extract colors/styles from brand videos
3. **Social Media Analysis**: Analyze brand presence on social platforms
4. **Design System Parsers**: Parse Figma, Sketch, or Adobe XD files
5. **Community Contributions**: Allow users to submit brand data
6. **API Endpoints**: RESTful API for programmatic access

## Notes

- OpenAI API key is required for AI features (optional)
- Image extraction requires image files to be accessible
- Some websites may block automated extraction
- Rate limiting should be respected when scraping

