from pydantic import BaseModel
from typing import List, Dict, Optional

class ContentAnalysisRequest(BaseModel):
    content: str
    page_type: str  # homepage, about, case-study, blog-post, etc.
    target_keywords: Optional[List[str]] = None

class ContentMetrics(BaseModel):
    word_count: int
    reading_time_minutes: float
    readability_score: float  # Flesch Reading Ease
    keyword_density: Dict[str, float]
    heading_structure: Dict[str, int]  # h1, h2, h3 counts
    image_count: int
    link_count: int

class ContentAnalysisResponse(BaseModel):
    metrics: ContentMetrics
    score: float  # Overall content quality score (0-100)
    recommendations: List[str]
    seo_suggestions: List[str]
    engagement_suggestions: List[str]

