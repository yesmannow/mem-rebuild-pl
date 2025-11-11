from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class PerformanceMetrics(BaseModel):
    lcp: Optional[float] = None  # Largest Contentful Paint
    fid: Optional[float] = None  # First Input Delay
    cls: Optional[float] = None  # Cumulative Layout Shift
    fcp: Optional[float] = None  # First Contentful Paint
    ttfb: Optional[float] = None  # Time to First Byte
    url: str
    timestamp: Optional[str] = None
    user_agent: Optional[str] = None
    connection_type: Optional[str] = None

class PerformanceReport(BaseModel):
    metrics: PerformanceMetrics
    score: Dict[str, str]  # "good", "needs-improvement", "poor"
    recommendations: List[str]
    historical_trend: Optional[Dict[str, Any]] = None

