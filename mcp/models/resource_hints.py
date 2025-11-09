from pydantic import BaseModel
from typing import List, Dict, Optional

class ResourceHint(BaseModel):
    rel: str  # preload, prefetch, preconnect, dns-prefetch
    href: str
    as_: Optional[str] = None  # script, style, image, font, etc.
    crossorigin: Optional[str] = None
    type_: Optional[str] = None  # MIME type

class ResourceHintsRequest(BaseModel):
    page_url: str
    critical_resources: List[str]  # URLs of critical resources
    next_pages: Optional[List[str]] = None  # URLs of likely next pages
    external_domains: Optional[List[str]] = None  # External domains to preconnect

class ResourceHintsResponse(BaseModel):
    hints: List[ResourceHint]
    html_tags: List[str]  # Ready-to-use HTML tags
    priority_order: List[str]  # Order of importance

