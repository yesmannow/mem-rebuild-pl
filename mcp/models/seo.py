from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class PageData(BaseModel):
    title: str
    description: str
    url: str
    image: Optional[str] = None
    type: str = "website"  # website, article, etc.
    author: Optional[str] = None
    published_time: Optional[str] = None
    modified_time: Optional[str] = None
    section: Optional[str] = None
    tags: Optional[List[str]] = None
    keywords: Optional[List[str]] = None

class SEOMetaResponse(BaseModel):
    meta_tags: Dict[str, str]
    open_graph: Dict[str, str]
    twitter_card: Dict[str, str]
    structured_data: Dict[str, Any]
    validation_errors: List[str]
    recommendations: List[str]

