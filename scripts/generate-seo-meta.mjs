#!/usr/bin/env node
/**
 * SEO Meta Generator Wrapper
 * Generates optimized meta tags for pages using Python SEO generator
 * 
 * Usage: node scripts/generate-seo-meta.mjs [page-slug]
 * Example: node scripts/generate-seo-meta.mjs home
 */

import { spawn } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Page configurations
const PAGES = {
  home: {
    title: 'Jacob Darling | Fractional CMO & Marketing Technologist',
    description: '16+ years of experience blending creative strategy, marketing automation, and systems thinking to drive scalable growth. Explore full-funnel campaigns, CRM architecture, and performance marketing across SaaS, healthcare, and more.',
    url: 'https://mem-rebuild-pl.pages.dev/',
    type: 'website',
    image: 'https://mem-rebuild-pl.pages.dev/og/home.svg',
    keywords: ['fractional CMO', 'marketing technologist', 'marketing automation', 'CRM campaigns', 'systems architecture', 'growth marketing'],
  },
  about: {
    title: 'About Jacob Darling | Marketing Strategist & Systems Architect',
    description: 'Learn about Jacob Darling\'s 16+ years of experience in marketing technology, automation, and strategic growth across SaaS, healthcare, and enterprise sectors.',
    url: 'https://mem-rebuild-pl.pages.dev/about',
    type: 'website',
    image: 'https://mem-rebuild-pl.pages.dev/og/about.svg',
    keywords: ['marketing strategist', 'systems architect', 'professional background', 'marketing experience'],
  },
  studio: {
    title: 'Studio | Creative Work & Design Projects',
    description: 'Explore Jacob Darling\'s creative studio featuring brand identity, web design, and digital product work across healthcare, SaaS, and community sectors.',
    url: 'https://mem-rebuild-pl.pages.dev/studio',
    type: 'website',
    image: 'https://mem-rebuild-pl.pages.dev/og/studio.svg',
    keywords: ['creative studio', 'brand identity', 'web design', 'digital products', 'portfolio'],
  },
  'case-studies': {
    title: 'Case Studies | Marketing Campaigns & Growth Strategies',
    description: 'Dive into detailed case studies showcasing full-funnel marketing campaigns, CRM automation, and performance marketing strategies that drove measurable growth.',
    url: 'https://mem-rebuild-pl.pages.dev/case-studies',
    type: 'website',
    image: 'https://mem-rebuild-pl.pages.dev/og/case-studies.svg',
    keywords: ['case studies', 'marketing campaigns', 'growth strategies', 'performance marketing', 'CRM automation'],
  },
  'side-projects': {
    title: 'Side Projects | Independent Creative Work',
    description: 'Browse independent side projects including branding, web design, and community campaigns built with the same care as flagship launches.',
    url: 'https://mem-rebuild-pl.pages.dev/side-projects',
    type: 'website',
    image: 'https://mem-rebuild-pl.pages.dev/og/side-projects.svg',
    keywords: ['side projects', 'independent work', 'branding', 'web design', 'community campaigns'],
  },
  contact: {
    title: 'Contact Jacob Darling | Let\'s Build Something Together',
    description: 'Get in touch to discuss fractional CMO services, marketing automation, or strategic growth initiatives. Let\'s build something remarkable together.',
    url: 'https://mem-rebuild-pl.pages.dev/contact',
    type: 'website',
    image: 'https://mem-rebuild-pl.pages.dev/og/contact.svg',
    keywords: ['contact', 'fractional CMO', 'marketing consultation', 'strategic growth'],
  },
};

/**
 * Generate SEO meta tags for a page
 */
function generateSEOMeta(pageSlug) {
  const pageData = PAGES[pageSlug];
  
  if (!pageData) {
    console.error(`❌ Unknown page: ${pageSlug}`);
    console.log(`Available pages: ${Object.keys(PAGES).join(', ')}`);
    process.exit(1);
  }

  console.log(`🔍 Generating SEO meta for: ${pageSlug}`);
  
  // Generate meta tags
  const metaTags = {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords.join(', '),
    canonical: pageData.url,
    openGraph: {
      type: pageData.type,
      url: pageData.url,
      title: pageData.title,
      description: pageData.description,
      image: pageData.image,
      siteName: 'Jacob Darling Portfolio',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      url: pageData.url,
      title: pageData.title,
      description: pageData.description,
      image: pageData.image,
      site: '@jacobdarling',
      creator: '@jacobdarling',
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': pageData.type === 'article' ? 'Article' : 'WebPage',
      name: pageData.title,
      description: pageData.description,
      url: pageData.url,
      inLanguage: 'en-US',
    },
  };

  // Validation
  const validation = {
    titleLength: pageData.title.length,
    descriptionLength: pageData.description.length,
    warnings: [],
    errors: [],
  };

  if (pageData.title.length < 30) {
    validation.errors.push('Title is too short (should be 30-60 characters)');
  } else if (pageData.title.length > 60) {
    validation.warnings.push('Title may be truncated in search results (>60 characters)');
  }

  if (pageData.description.length < 120) {
    validation.errors.push('Description is too short (should be 120-160 characters)');
  } else if (pageData.description.length > 160) {
    validation.warnings.push('Description may be truncated in search results (>160 characters)');
  }

  // Output results
  console.log(`\n✅ SEO Meta Generated for: ${pageSlug}`);
  console.log(`   Title: ${pageData.title} (${validation.titleLength} chars)`);
  console.log(`   Description: ${pageData.description.substring(0, 80)}... (${validation.descriptionLength} chars)`);
  
  if (validation.errors.length > 0) {
    console.log(`\n⚠️  Errors:`);
    validation.errors.forEach(err => console.log(`   - ${err}`));
  }
  
  if (validation.warnings.length > 0) {
    console.log(`\n⚠️  Warnings:`);
    validation.warnings.forEach(warn => console.log(`   - ${warn}`));
  }

  // Save to file
  const outputPath = resolve(__dirname, '..', 'src', 'data', `seo-${pageSlug}.json`);
  writeFileSync(outputPath, JSON.stringify(metaTags, null, 2), 'utf-8');
  console.log(`\n💾 Saved to: src/data/seo-${pageSlug}.json`);

  return metaTags;
}

/**
 * Generate all pages
 */
function generateAll() {
  console.log('🚀 Generating SEO meta for all pages...\n');
  
  Object.keys(PAGES).forEach(pageSlug => {
    generateSEOMeta(pageSlug);
    console.log('');
  });

  console.log('✨ All SEO meta generated successfully!');
}

// CLI
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'all') {
  generateAll();
} else {
  generateSEOMeta(command);
}
