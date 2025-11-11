"""
SEO Generator Utility
Generates optimized meta tags, Open Graph, Twitter Cards, and structured data
"""

from typing import Dict, List, Any
import re
from datetime import datetime

def generate_seo_meta(page_data) -> Dict:
    """
    Generate optimized SEO meta tags
    """
    # Optimize title (50-60 characters)
    title = page_data.title
    if len(title) > 60:
        title = title[:57] + "..."

    # Optimize description (150-160 characters)
    description = page_data.description
    if len(description) > 160:
        description = description[:157] + "..."
    elif len(description) < 120:
        description = description + " | Learn more about our services and expertise."

    # Generate meta tags
    meta_tags = {
        "title": title,
        "description": description,
        "keywords": ", ".join(page_data.keywords) if page_data.keywords else "",
        "author": page_data.author or "Jacob Darling",
        "robots": "index, follow",
        "canonical": page_data.url
    }

    # Generate Open Graph tags
    open_graph = {
        "og:type": page_data.type,
        "og:url": page_data.url,
        "og:title": title,
        "og:description": description,
        "og:image": page_data.image or f"{page_data.url}/og-image.jpg",
        "og:site_name": "BearCave Marketing",
        "og:locale": "en_US"
    }

    if page_data.published_time:
        open_graph["article:published_time"] = page_data.published_time
    if page_data.modified_time:
        open_graph["article:modified_time"] = page_data.modified_time
    if page_data.section:
        open_graph["article:section"] = page_data.section
    if page_data.tags:
        for i, tag in enumerate(page_data.tags[:5]):  # Limit to 5 tags
            open_graph[f"article:tag:{i}"] = tag

    # Generate Twitter Card tags
    twitter_card = {
        "twitter:card": "summary_large_image",
        "twitter:url": page_data.url,
        "twitter:title": title,
        "twitter:description": description,
        "twitter:image": page_data.image or f"{page_data.url}/og-image.jpg",
        "twitter:site": "@bearcavemarketing",
        "twitter:creator": "@jacobdarling"
    }

    # Generate structured data (JSON-LD)
    structured_data = {
        "@context": "https://schema.org",
        "@type": "WebPage" if page_data.type == "website" else "Article",
        "name": title,
        "description": description,
        "url": page_data.url,
        "inLanguage": "en-US"
    }

    if page_data.type == "article":
        structured_data["@type"] = "Article"
        structured_data["headline"] = title
        if page_data.author:
            structured_data["author"] = {
                "@type": "Person",
                "name": page_data.author
            }
        if page_data.published_time:
            structured_data["datePublished"] = page_data.published_time
        if page_data.modified_time:
            structured_data["dateModified"] = page_data.modified_time

    # Validation
    validation_errors = []
    recommendations = []

    if len(title) < 30:
        validation_errors.append("Title is too short (should be 30-60 characters)")
    elif len(title) > 60:
        validation_errors.append("Title is too long (should be 30-60 characters)")

    if len(description) < 120:
        validation_errors.append("Description is too short (should be 120-160 characters)")
    elif len(description) > 160:
        validation_errors.append("Description is too long (should be 120-160 characters)")

    if not page_data.image:
        recommendations.append("Add an Open Graph image for better social sharing")

    if not page_data.keywords:
        recommendations.append("Add keywords for better SEO")

    return {
        "meta_tags": meta_tags,
        "open_graph": open_graph,
        "twitter_card": twitter_card,
        "structured_data": structured_data,
        "validation_errors": validation_errors,
        "recommendations": recommendations
    }

def validate_seo(page_data) -> Dict:
    """
    Validate SEO tags against best practices
    """
    errors = []
    warnings = []

    # Title validation
    if len(page_data.title) < 30:
        errors.append("Title too short")
    elif len(page_data.title) > 60:
        warnings.append("Title may be truncated in search results")

    # Description validation
    if len(page_data.description) < 120:
        errors.append("Description too short")
    elif len(page_data.description) > 160:
        warnings.append("Description may be truncated in search results")

    # URL validation
    if not page_data.url.startswith("http"):
        errors.append("URL should be absolute")

    return {
        "valid": len(errors) == 0,
        "errors": errors,
        "warnings": warnings
    }

def generate_sitemap_xml(pages: List) -> str:
    """
    Generate sitemap.xml from list of pages
    """
    xml_parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]

    for page in pages:
        lastmod = page.modified_time or datetime.now().isoformat()
        xml_parts.append("  <url>")
        xml_parts.append(f"    <loc>{page.url}</loc>")
        xml_parts.append(f"    <lastmod>{lastmod}</lastmod>")
        xml_parts.append(f"    <changefreq>weekly</changefreq>")
        xml_parts.append(f"    <priority>0.8</priority>")
        xml_parts.append("  </url>")

    xml_parts.append("</urlset>")
    return "\n".join(xml_parts)

