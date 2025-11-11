"""
Cache Optimizer Utility
Generates optimal cache headers and platform-specific configurations
"""

from typing import Dict, List, Any

def generate_cache_strategy(asset_types: List[str], platform: str = "vercel") -> Dict:
    """
    Generate optimal cache headers for different asset types
    """
    rules = []

    # Define cache rules for each asset type
    cache_rules = {
        "static": {
            "pattern": "/assets/**",
            "cache_control": "public, max-age=31536000, immutable",
            "etag": True,
            "last_modified": True
        },
        "html": {
            "pattern": "/*.html",
            "cache_control": "public, max-age=0, must-revalidate",
            "etag": True,
            "last_modified": True
        },
        "images": {
            "pattern": "/images/**",
            "cache_control": "public, max-age=31536000, immutable",
            "etag": True,
            "last_modified": True
        },
        "fonts": {
            "pattern": "/fonts/**",
            "cache_control": "public, max-age=31536000, immutable",
            "etag": True,
            "last_modified": True
        },
        "css": {
            "pattern": "/*.css",
            "cache_control": "public, max-age=31536000, immutable",
            "etag": True,
            "last_modified": True
        },
        "js": {
            "pattern": "/*.js",
            "cache_control": "public, max-age=31536000, immutable",
            "etag": True,
            "last_modified": True
        },
        "api": {
            "pattern": "/api/**",
            "cache_control": "public, max-age=300, s-maxage=600",
            "etag": True,
            "last_modified": True
        }
    }

    # Generate rules for requested asset types
    for asset_type in asset_types:
        if asset_type in cache_rules:
            rule = cache_rules[asset_type]
            rules.append({
                "pattern": rule["pattern"],
                "cache_control": rule["cache_control"],
                "etag": rule["etag"],
                "last_modified": rule["last_modified"]
            })

    # Generate platform-specific config
    config = get_platform_config(platform)

    # Generate recommendations
    recommendations = [
        "Use immutable cache for static assets with content hashes",
        "Enable ETag and Last-Modified headers for cache validation",
        "Set short cache times for HTML to ensure fresh content",
        "Use CDN caching for better performance",
        "Consider implementing service worker for offline caching"
    ]

    return {
        "rules": rules,
        "config": config,
        "recommendations": recommendations
    }

def get_platform_config(platform: str) -> Dict[str, Any]:
    """
    Get platform-specific cache configuration
    """
    if platform == "vercel":
        return {
            "headers": [
                {
                    "source": "/assets/(.*)",
                    "headers": [
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=31536000, immutable"
                        }
                    ]
                },
                {
                    "source": "/(.*\\.(js|css|jpg|jpeg|png|webp|avif|svg|woff|woff2))",
                    "headers": [
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=31536000, immutable"
                        }
                    ]
                },
                {
                    "source": "/(.*\\.html)",
                    "headers": [
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=0, must-revalidate"
                        }
                    ]
                }
            ]
        }
    elif platform == "netlify":
        return {
            "headers": [
                {
                    "for": "/assets/*",
                    "values": {
                        "Cache-Control": "public, max-age=31536000, immutable"
                    }
                },
                {
                    "for": "/*.js",
                    "values": {
                        "Cache-Control": "public, max-age=31536000, immutable"
                    }
                },
                {
                    "for": "/*.css",
                    "values": {
                        "Cache-Control": "public, max-age=31536000, immutable"
                    }
                },
                {
                    "for": "/*.html",
                    "values": {
                        "Cache-Control": "public, max-age=0, must-revalidate"
                    }
                }
            ]
        }
    elif platform == "cloudflare":
        return {
            "cache_rules": [
                {
                    "expression": 'ends_with(http.request.uri.path, ".js") or ends_with(http.request.uri.path, ".css")',
                    "cache_ttl": 31536000
                },
                {
                    "expression": 'ends_with(http.request.uri.path, ".html")',
                    "cache_ttl": 0
                }
            ]
        }
    else:
        return {
            "message": f"Platform-specific config for {platform} not available",
            "generic_headers": {
                "Cache-Control": "public, max-age=31536000, immutable"
            }
        }

