from pydantic import BaseModel
from typing import Optional, Dict, List, Any

class LighthouseAuditRequest(BaseModel):
    url: str
    device: str = "desktop"  # desktop or mobile
    categories: List[str] = ["performance", "accessibility", "best-practices", "seo"]

class LighthouseScore(BaseModel):
    performance: float
    accessibility: float
    best_practices: float
    seo: float

class LighthouseAuditResponse(BaseModel):
    url: str
    scores: LighthouseScore
    metrics: Dict[str, float]
    opportunities: List[Dict[str, Any]]
    diagnostics: List[Dict[str, Any]]
    passed_audits: List[str]
    failed_audits: List[str]
    recommendations: List[str]

