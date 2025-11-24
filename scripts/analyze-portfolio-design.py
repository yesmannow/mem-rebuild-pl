#!/usr/bin/env python3
"""
Analyze the portfolio design by extracting images, colors, fonts, and design components.
"""
import asyncio
import sys
import os
import json
from pathlib import Path

# Fix Windows console encoding for emojis
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# Add the scraping assistant to the path
script_dir = Path(__file__).parent
root_dir = script_dir.parent
scraping_dir = root_dir / "cli-workflow" / "scraping-assistant" / "MCPfiles"
sys.path.insert(0, str(scraping_dir))

from xpath_server import extract_images, extract_design_components, extract_css_files, fetch_page_content

async def analyze_portfolio(url, output_dir=None):
    """Analyze the portfolio design comprehensively."""
    if output_dir is None:
        output_dir = root_dir / "reports" / "design-analysis"

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"🔍 Analyzing portfolio: {url}")
    print(f"📁 Output directory: {output_dir}\n")

    # Step 1: Fetch the page
    html_file = output_dir / "portfolio_page.html"
    cookies_file = output_dir / "portfolio_cookies.json"

    print("1️⃣ Fetching page content...")
    try:
        await fetch_page_content(str(url), str(html_file), str(cookies_file))
        print("   ✅ Page fetched successfully\n")
    except Exception as e:
        print(f"   ⚠️  Warning: {e}\n")

    # Step 2: Extract images
    print("2️⃣ Extracting images...")
    try:
        images_result = await extract_images(str(url), str(output_dir))
        print(f"   ✅ Found {images_result.get('total_images', 0)} images")
        print(f"   📄 Saved to: {images_result.get('output_file', 'N/A')}\n")
    except Exception as e:
        print(f"   ❌ Error extracting images: {e}\n")
        images_result = None

    # Step 3: Extract design components
    print("3️⃣ Extracting design components...")
    try:
        design_result = await extract_design_components(str(url), str(output_dir))
        print(f"   ✅ Found {design_result.get('total_colors', 0)} colors")
        print(f"   ✅ Found {design_result.get('total_fonts', 0)} fonts")
        print(f"   📄 Saved to: {design_result.get('output_file', 'N/A')}\n")
    except Exception as e:
        print(f"   ❌ Error extracting design components: {e}\n")
        design_result = None

    # Step 4: Extract CSS files
    print("4️⃣ Extracting CSS files...")
    try:
        css_result = await extract_css_files(str(url), str(output_dir))
        print(f"   ✅ Found {css_result.get('total_linked', 0)} linked CSS files")
        print(f"   ✅ Found {css_result.get('total_inline', 0)} inline styles")
        print(f"   📄 Saved to: {css_result.get('output_file', 'N/A')}\n")
    except Exception as e:
        print(f"   ❌ Error extracting CSS: {e}\n")
        css_result = None

    # Step 5: Generate summary report
    print("5️⃣ Generating summary report...")
    summary = {
        "url": url,
        "analysis_date": str(Path(__file__).stat().st_mtime),
        "images": {
            "total": images_result.get('total_images', 0) if images_result else 0,
            "regular_images": len(images_result.get('images', [])) if images_result else 0,
            "background_images": len(images_result.get('background_images', [])) if images_result else 0
        } if images_result else None,
        "design": {
            "colors": design_result.get('colors', []) if design_result else [],
            "total_colors": design_result.get('total_colors', 0) if design_result else 0,
            "fonts": design_result.get('fonts', []) if design_result else [],
            "total_fonts": design_result.get('total_fonts', 0) if design_result else 0,
            "components": design_result.get('components', {}) if design_result else {}
        } if design_result else None,
        "css": {
            "linked_files": css_result.get('total_linked', 0) if css_result else 0,
            "inline_styles": css_result.get('total_inline', 0) if css_result else 0
        } if css_result else None
    }

    summary_file = output_dir / "design_summary.json"
    with open(summary_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)

    print(f"   ✅ Summary saved to: {summary_file}\n")

    # Print key findings
    print("=" * 60)
    print("📊 DESIGN ANALYSIS SUMMARY")
    print("=" * 60)

    if images_result:
        print(f"\n🖼️  IMAGES:")
        print(f"   Total: {images_result.get('total_images', 0)}")
        print(f"   Regular images: {len(images_result.get('images', []))}")
        print(f"   Background images: {len(images_result.get('background_images', []))}")

    if design_result:
        print(f"\n🎨 COLORS ({design_result.get('total_colors', 0)} found):")
        colors = design_result.get('colors', [])
        if colors:
            # Show first 10 colors
            for color in colors[:10]:
                print(f"   • {color}")
            if len(colors) > 10:
                print(f"   ... and {len(colors) - 10} more")

        print(f"\n🔤 FONTS ({design_result.get('total_fonts', 0)} found):")
        fonts = design_result.get('fonts', [])
        if fonts:
            for font in fonts[:10]:
                print(f"   • {font}")
            if len(fonts) > 10:
                print(f"   ... and {len(fonts) - 10} more")

        components = design_result.get('components', {})
        if components:
            print(f"\n🧩 COMPONENTS:")
            for comp_name, count in components.items():
                if count > 0:
                    print(f"   • {comp_name}: {count}")

    if css_result:
        print(f"\n📄 CSS FILES:")
        print(f"   Linked CSS: {css_result.get('total_linked', 0)}")
        print(f"   Inline styles: {css_result.get('total_inline', 0)}")

    print("\n" + "=" * 60)
    print(f"✅ Analysis complete! Check {output_dir} for detailed results.")
    print("=" * 60)

    return summary

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "https://mem-rebuild-pl.vercel.app/"
    output_dir = sys.argv[2] if len(sys.argv) > 2 else None

    asyncio.run(analyze_portfolio(url, output_dir))

