"""
Image Optimizer Utility
Handles image optimization, format conversion, and responsive image generation
"""

import aiohttp
import aiofiles
from PIL import Image
import io
import os
from typing import Dict, List
import hashlib

async def optimize_image_multiformat(
    image_url: str,
    formats: List[str] = ["webp", "avif"],
    widths: List[int] = [400, 800, 1200, 1600],
    quality: int = 85,
    preserve_metadata: bool = False
) -> Dict:
    """
    Download, optimize, and convert images to multiple formats and sizes
    """
    # Download image
    async with aiohttp.ClientSession() as session:
        async with session.get(image_url) as response:
            if response.status != 200:
                raise Exception(f"Failed to download image: {response.status}")
            image_data = await response.read()

    # Open image
    image = Image.open(io.BytesIO(image_data))
    original_size = len(image_data)

    # Generate hash for cache key
    image_hash = hashlib.md5(image_data).hexdigest()

    optimized_urls = {}
    file_sizes = {}
    srcset_parts = []

    # Process each format
    for format_name in formats:
        format_urls = []

        for width in widths:
            # Resize image maintaining aspect ratio
            resized = image.copy()
            if resized.width > width:
                ratio = width / resized.width
                new_height = int(resized.height * ratio)
                resized = resized.resize((width, new_height), Image.Resampling.LANCZOS)

            # Convert to format
            output = io.BytesIO()

            if format_name == "webp":
                resized.save(output, format="WEBP", quality=quality, method=6)
            elif format_name == "avif":
                try:
                    resized.save(output, format="AVIF", quality=quality)
                except Exception:
                    # Fallback to WebP if AVIF not supported
                    resized.save(output, format="WEBP", quality=quality, method=6)
            else:
                resized.save(output, format=image.format or "JPEG", quality=quality)

            output.seek(0)
            optimized_data = output.read()

            # In production, upload to CDN/storage
            # For now, return placeholder URLs
            cache_key = f"{image_hash}_{width}w.{format_name}"
            optimized_url = f"/optimized/{cache_key}"

            format_urls.append(f"{optimized_url} {width}w")
            file_sizes[f"{format_name}_{width}w"] = len(optimized_data)

        # Create srcset string
        srcset = ", ".join(format_urls)
        optimized_urls[format_name] = srcset

        # Add to main srcset
        srcset_parts.append(srcset)

    # Calculate savings
    min_size = min(file_sizes.values())
    savings_percentage = ((original_size - min_size) / original_size) * 100

    # Generate sizes attribute
    sizes = "(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px"

    return {
        "original_url": image_url,
        "optimized_urls": optimized_urls,
        "srcset": " | ".join(srcset_parts),
        "sizes": sizes,
        "savings_percentage": round(savings_percentage, 2),
        "file_sizes": file_sizes
    }

