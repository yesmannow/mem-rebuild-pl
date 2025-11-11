from fastapi import APIRouter, HTTPException
from mcp.models.resource_hints import ResourceHintsRequest, ResourceHintsResponse
from mcp.utils.resource_hints import generate_resource_hints

router = APIRouter()

@router.post("/generate-hints", response_model=ResourceHintsResponse)
async def generate_resource_hints_endpoint(request: ResourceHintsRequest):
    """
    Analyze page and generate optimal resource hints
    """
    try:
        result = generate_resource_hints(request)
        return ResourceHintsResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-page")
async def analyze_page_for_hints(page_url: str):
    """
    Analyze a page URL and automatically detect resource hints
    """
    try:
        from mcp.utils.resource_hints import analyze_page_resources
        hints = analyze_page_resources(page_url)
        return hints
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

