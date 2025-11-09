from fastapi import APIRouter, HTTPException
from mcp.models.cache import CacheStrategyRequest, CacheStrategyResponse
from mcp.utils.cache_optimizer import generate_cache_strategy

router = APIRouter()

@router.post("/generate-strategy", response_model=CacheStrategyResponse)
async def generate_cache_strategy_endpoint(request: CacheStrategyRequest):
    """
    Generate optimal cache headers for different asset types
    """
    try:
        result = generate_cache_strategy(
            asset_types=request.asset_types,
            platform=request.platform
        )
        return CacheStrategyResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/platform-config/{platform}")
async def get_platform_config(platform: str):
    """
    Get cache configuration for a specific platform
    """
    try:
        from mcp.utils.cache_optimizer import get_platform_config
        config = get_platform_config(platform)
        return config
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

