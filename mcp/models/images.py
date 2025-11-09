from pydantic import BaseModel
from typing import List, Optional, Dict

class ImageOptimizationRequest(BaseModel):
    image_url: str
    formats: List[str] = ["webp", "avif"]
    widths: List[int] = [400, 800, 1200, 1600]
    quality: int = 85
    preserve_metadata: bool = False

class OptimizedImageResponse(BaseModel):
    original_url: str
    optimized_urls: Dict[str, str]  # format -> url
    srcset: str
    sizes: str
    savings_percentage: float
    file_sizes: Dict[str, int]  # format -> bytes

