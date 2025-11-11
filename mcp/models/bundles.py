from pydantic import BaseModel
from typing import List, Dict, Optional

class BundleAnalysisRequest(BaseModel):
    build_output: str  # Path to build output or bundle stats JSON
    threshold_kb: int = 100  # Alert threshold in KB

class ChunkAnalysis(BaseModel):
    name: str
    size_kb: float
    gzipped_kb: float
    modules: List[str]
    can_split: bool
    split_recommendations: List[str]

class BundleAnalysisResponse(BaseModel):
    total_size_kb: float
    total_gzipped_kb: float
    chunks: List[ChunkAnalysis]
    large_chunks: List[ChunkAnalysis]
    recommendations: List[str]
    lazy_load_candidates: List[str]

