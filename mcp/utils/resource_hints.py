"""
Resource Hints Generator Utility
Generates optimal preload, prefetch, and preconnect hints
"""

from typing import Dict, List
from urllib.parse import urlparse
import re

def generate_resource_hints(request) -> Dict:
    """
    Generate optimal resource hints based on page analysis
    """
    hints = []
    html_tags = []

    # Preconnect to external domains
    if request.external_domains:
        for domain in request.external_domains[:5]:  # Limit to 5
            parsed = urlparse(domain if domain.startswith("http") else f"https://{domain}")
            domain_only = parsed.netloc or domain

            hints.append({
                "rel": "preconnect",
                "href": f"https://{domain_only}",
                "crossorigin": "anonymous"
            })

            html_tags.append(f'<link rel="preconnect" href="https://{domain_only}" crossorigin="anonymous">')

    # Preload critical resources
    priority_order = []
    for i, resource in enumerate(request.critical_resources[:10]):  # Limit to 10
        resource_type = detect_resource_type(resource)

        hint = {
            "rel": "preload",
            "href": resource,
            "as_": resource_type
        }

        if resource_type in ["font", "style"]:
            hint["crossorigin"] = "anonymous"

        if resource_type == "font":
            hint["type_"] = "font/woff2"

        hints.append(hint)
        priority_order.append(resource)

        # Generate HTML tag
        tag_parts = [f'<link rel="preload" href="{resource}" as="{resource_type}"']
        if hint.get("crossorigin"):
            tag_parts.append('crossorigin="anonymous"')
        if hint.get("type_"):
            tag_parts.append(f'type="{hint["type_"]}"')
        tag_parts.append(">")
        html_tags.append(" ".join(tag_parts))

    # Prefetch next pages
    if request.next_pages:
        for page in request.next_pages[:3]:  # Limit to 3
            hints.append({
                "rel": "prefetch",
                "href": page
            })
            html_tags.append(f'<link rel="prefetch" href="{page}">')

    return {
        "hints": hints,
        "html_tags": html_tags,
        "priority_order": priority_order
    }

def detect_resource_type(url: str) -> str:
    """
    Detect resource type from URL
    """
    url_lower = url.lower()

    if url_lower.endswith(('.js', '.mjs')):
        return "script"
    elif url_lower.endswith(('.css')):
        return "style"
    elif url_lower.endswith(('.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg')):
        return "image"
    elif url_lower.endswith(('.woff', '.woff2', '.ttf', '.otf', '.eot')):
        return "font"
    elif url_lower.endswith(('.mp4', '.webm', '.ogg')):
        return "video"
    elif url_lower.endswith(('.mp3', '.wav', '.ogg')):
        return "audio"
    else:
        return "fetch"

def analyze_page_resources(page_url: str) -> Dict:
    """
    Analyze a page URL and automatically detect resource hints
    Note: This is a placeholder - in production, you'd fetch and parse the HTML
    """
    # In production, fetch the page and parse HTML
    # Extract CSS, JS, fonts, images
    # Return suggested hints

    return {
        "message": "Page analysis requires fetching the page HTML",
        "suggestions": [
            "Use browser DevTools Network tab to identify critical resources",
            "Consider using Puppeteer or Playwright for automated analysis"
        ]
    }

