from fastapi import APIRouter, HTTPException
from mcp.models.images import ImageOptimizationRequest, OptimizedImageResponse
from mcp.utils.image_optimizer import optimize_image_multiformat
import asyncio

router = APIRouter()

@router.post("/optimize-image", response_model=OptimizedImageResponse)
async def optimize_image(request: ImageOptimizationRequest):
    """
    Download, optimize, and convert images to modern formats
    Returns optimized URLs for srcset generation
    """
    try:
        result = await optimize_image_multiformat(
            image_url=request.image_url,
            formats=request.formats,
            widths=request.widths,
            quality=request.quality,
            preserve_metadata=request.preserve_metadata
        )
        return OptimizedImageResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image optimization failed: {str(e)}")

@router.post("/optimize-batch")
async def optimize_batch(requests: list[ImageOptimizationRequest]):
    """
    Optimize multiple images in batch
    """
    results = []
    for request in requests:
        try:
            result = await optimize_image(request)
            results.append(result.dict())
        except Exception as e:
            results.append({"error": str(e), "url": request.image_url})
    return {"results": results}

