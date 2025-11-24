#!/usr/bin/env python3
"""
Extract colors from CSS files to complete the design inventory.
"""
import re
import requests
import json
from pathlib import Path
from urllib.parse import urljoin

# Fix Windows console encoding
import sys
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

def extract_colors_from_css(css_content):
    """Extract all color values from CSS content."""
    colors = set()

    # Hex colors (#rgb, #rrggbb)
    hex_pattern = r'#([0-9a-fA-F]{3,6})\b'
    colors.update(re.findall(hex_pattern, css_content))

    # RGB/RGBA colors
    rgb_pattern = r'rgba?\([^)]+\)'
    colors.update(re.findall(rgb_pattern, css_content))

    # HSL/HSLA colors
    hsl_pattern = r'hsla?\([^)]+\)'
    colors.update(re.findall(hsl_pattern, css_content))

    # Named colors (basic set)
    named_colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'orange',
                   'purple', 'pink', 'gray', 'grey', 'transparent']
    for color in named_colors:
        if re.search(rf'\b{color}\b', css_content, re.IGNORECASE):
            colors.add(color)

    return sorted(list(colors))

def fetch_css_file(url):
    """Fetch CSS content from URL."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"   ⚠️  Error fetching {url}: {e}")
        return None

def main():
    base_url = "https://mem-rebuild-pl.vercel.app/"
    css_files_path = Path("reports/design-analysis/css_files.json")
    output_path = Path("reports/design-analysis/css_colors.json")

    if not css_files_path.exists():
        print("❌ CSS files inventory not found. Run design analysis first.")
        return

    with open(css_files_path, 'r', encoding='utf-8') as f:
        css_data = json.load(f)

    print("🎨 Extracting colors from CSS files...\n")

    all_colors = set()
    css_results = []

    for css_file in css_data.get('linked_css', []):
        url = css_file['url']
        print(f"📄 Analyzing: {url}")

        # Skip Google Fonts (external)
        if 'fonts.googleapis.com' in url:
            print("   ⏭️  Skipping Google Fonts (external)")
            continue

        css_content = fetch_css_file(url)
        if css_content:
            colors = extract_colors_from_css(css_content)
            all_colors.update(colors)
            css_results.append({
                "url": url,
                "colors_found": len(colors),
                "colors": colors
            })
            print(f"   ✅ Found {len(colors)} unique colors")
        print()

    # Also check for CSS custom properties
    html_path = Path("reports/design-analysis/portfolio_page.html")
    if html_path.exists():
        print("📄 Analyzing HTML for CSS custom properties...")
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Extract CSS custom properties (--variable-name: value)
        custom_props = re.findall(r'--[a-zA-Z0-9-]+:\s*([^;]+)', html_content)
        css_vars = []
        for prop in custom_props:
            prop = prop.strip()
            # Check if it's a color value
            if re.search(r'#|rgb|rgba|hsl|hsla', prop, re.IGNORECASE):
                css_vars.append(prop)
                all_colors.add(prop)

        if css_vars:
            print(f"   ✅ Found {len(css_vars)} color custom properties")
            css_results.append({
                "source": "CSS Custom Properties",
                "colors_found": len(css_vars),
                "colors": css_vars
            })
        print()

    # Organize colors by type
    hex_colors = [c for c in all_colors if re.match(r'^[0-9a-fA-F]{3,6}$', c)]
    rgb_colors = [c for c in all_colors if 'rgb' in c.lower()]
    hsl_colors = [c for c in all_colors if 'hsl' in c.lower()]
    named_colors = [c for c in all_colors if c.lower() in ['black', 'white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'gray', 'grey', 'transparent']]
    other_colors = [c for c in all_colors if c not in hex_colors + rgb_colors + hsl_colors + named_colors]

    result = {
        "total_unique_colors": len(all_colors),
        "colors_by_type": {
            "hex": sorted(hex_colors),
            "rgb_rgba": sorted(rgb_colors),
            "hsl_hsla": sorted(hsl_colors),
            "named": sorted(named_colors),
            "other": sorted(other_colors)
        },
        "css_files_analyzed": css_results,
        "all_colors": sorted(list(all_colors))
    }

    # Save results
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print("=" * 60)
    print("📊 CSS COLOR EXTRACTION SUMMARY")
    print("=" * 60)
    print(f"\n🎨 Total Unique Colors: {len(all_colors)}")
    print(f"   • Hex colors: {len(hex_colors)}")
    print(f"   • RGB/RGBA: {len(rgb_colors)}")
    print(f"   • HSL/HSLA: {len(hsl_colors)}")
    print(f"   • Named colors: {len(named_colors)}")
    print(f"   • Other: {len(other_colors)}")

    if hex_colors:
        print(f"\n🔷 Hex Colors (first 10):")
        for color in hex_colors[:10]:
            print(f"   • #{color}")
        if len(hex_colors) > 10:
            print(f"   ... and {len(hex_colors) - 10} more")

    print(f"\n✅ Results saved to: {output_path}")
    print("=" * 60)

if __name__ == "__main__":
    main()

