from fastapi import APIRouter, HTTPException
from mcp.models.bundles import BundleAnalysisRequest, BundleAnalysisResponse
from mcp.utils.bundle_analyzer import analyze_bundle
import json
import os

router = APIRouter()

@router.post("/analyze-bundle", response_model=BundleAnalysisResponse)
async def analyze_bundle_endpoint(request: BundleAnalysisRequest):
    """
    Analyze bundle sizes, identify code splitting opportunities
    Suggest lazy loading candidates
    """
    try:
        # Check if build_output is a file path or JSON string
        if os.path.exists(request.build_output):
            with open(request.build_output, 'r') as f:
                bundle_data = json.load(f)
        else:
            bundle_data = json.loads(request.build_output)

        analysis = analyze_bundle(bundle_data, request.threshold_kb)
        return BundleAnalysisResponse(**analysis)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Bundle analysis failed: {str(e)}")

@router.get("/analyze-build")
async def analyze_build_output(build_dir: str = "dist"):
    """
    Analyze actual build output directory
    """
    try:
        from mcp.utils.bundle_analyzer import analyze_build_directory
        analysis = analyze_build_directory(build_dir)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

