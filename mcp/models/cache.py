from pydantic import BaseModel
from typing import List, Dict, Optional

class CacheStrategyRequest(BaseModel):
    asset_types: List[str]  # static, html, api, images, fonts, css, js
    platform: str = "vercel"  # vercel, netlify, cloudflare, custom

class CacheRule(BaseModel):
    pattern: str  # URL pattern or file extension
    cache_control: str  # Cache-Control header value
    etag: bool = True
    last_modified: bool = True

class CacheStrategyResponse(BaseModel):
    rules: List[CacheRule]
    config: Dict[str, Any]  # Platform-specific config (vercel.json, netlify.toml, etc.)
    recommendations: List[str]

