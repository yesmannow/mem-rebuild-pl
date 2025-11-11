from fastapi import APIRouter, HTTPException
from mcp.models.content import ContentAnalysisRequest, ContentAnalysisResponse
from mcp.utils.content_analyzer import analyze_content

router = APIRouter()

@router.post("/analyze-content", response_model=ContentAnalysisResponse)
async def analyze_content_endpoint(request: ContentAnalysisRequest):
    """
    Analyze content for readability, SEO, and engagement
    """
    try:
        result = analyze_content(
            content=request.content,
            page_type=request.page_type,
            target_keywords=request.target_keywords or []
        )
        return ContentAnalysisResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/suggest-improvements")
async def suggest_content_improvements(request: ContentAnalysisRequest):
    """
    Get specific suggestions for improving content
    """
    try:
        analysis = await analyze_content_endpoint(request)
        # Extract and format suggestions
        suggestions = {
            "seo": analysis.seo_suggestions,
            "engagement": analysis.engagement_suggestions,
            "general": analysis.recommendations,
            "score": analysis.score
        }
        return suggestions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

