# RBE Law Image Assets

This directory contains organized image assets for the RBE Law case study demonstration.

## Folder Structure

```
/public/images/rbe-law/
├── bio-images/          # Attorney headshots and bio images
│   └── [attorney-name]/ # One folder per attorney from attorneys.ts
├── practice-areas/      # Practice area imagery
│   ├── business-corporate-law/
│   ├── workers-compensation/
│   └── litigation/
├── logos/               # Brand and recognition logos
│   ├── main-logo/
│   ├── super-lawyers/
│   ├── best-lawyers/
│   └── martindale-hubbell/
├── newsroom/            # Article and news imagery
│   └── [article-slug]/  # One folder per article from newsArticles.ts
└── page-images/         # General page assets and backgrounds
```

## Usage

- **bio-images**: Attorney profile photos for bio pages and directory listings
- **practice-areas**: Hero images, icons, and supporting visuals for practice area pages
- **logos**: Law firm branding and legal recognition badges
- **newsroom**: Featured images for blog posts and news articles
- **page-images**: General website imagery not tied to specific content

## Image Specifications

- **Format**: WebP preferred, with JPEG/PNG fallbacks
- **Optimization**: All images should be compressed and optimized
- **Naming**: Use kebab-case for filenames (e.g., `attorney-name.webp`)
- **Alt Text**: All images must have descriptive alt text for accessibility
