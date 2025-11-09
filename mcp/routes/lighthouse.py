from fastapi import APIRouter, HTTPException, BackgroundTasks
from mcp.models.lighthouse import LighthouseAuditRequest, LighthouseAuditResponse
from mcp.utils.lighthouse_runner import run_lighthouse_audit
import asyncio

router = APIRouter()

@router.post("/audit", response_model=LighthouseAuditResponse)
async def lighthouse_audit(request: LighthouseAuditRequest, background_tasks: BackgroundTasks):
    """
    Run Lighthouse audit and return scores + recommendations
    """
    try:
        result = await run_lighthouse_audit(
            url=request.url,
            device=request.device,
            categories=request.categories
        )
        return LighthouseAuditResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lighthouse audit failed: {str(e)}")

@router.post("/audit-batch")
async def lighthouse_audit_batch(urls: list[str], device: str = "desktop"):
    """
    Run Lighthouse audits for multiple URLs
    """
    results = []
    for url in urls:
        try:
            request = LighthouseAuditRequest(url=url, device=device)
            result = await lighthouse_audit(request, BackgroundTasks())
            results.append(result.dict())
        except Exception as e:
            results.append({"error": str(e), "url": url})
    return {"results": results}

@router.get("/compare")
async def compare_audits(url: str, days: int = 7):
    """
    Compare Lighthouse scores over time
    """
    # This would require storing historical audits
    # For now, return a placeholder
    return {"message": "Historical comparison not yet implemented", "url": url}

