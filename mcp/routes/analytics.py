from fastapi import APIRouter, HTTPException
from mcp.models.analytics import PerformanceMetrics, PerformanceReport
from mcp.utils.performance_analyzer import analyze_performance, store_metrics, get_historical_trend
import json
from datetime import datetime

router = APIRouter()

# In-memory storage (replace with database in production)
metrics_store = []

@router.post("/performance-report", response_model=PerformanceReport)
async def generate_performance_report(metrics: PerformanceMetrics):
    """
    Analyze performance metrics and generate optimization recommendations
    """
    try:
        # Store metrics with timestamp
        metrics_dict = metrics.dict()
        metrics_dict['timestamp'] = datetime.now().isoformat()
        metrics_store.append(metrics_dict)

        # Keep only last 1000 entries
        if len(metrics_store) > 1000:
            metrics_store.pop(0)

        # Analyze performance
        analysis = analyze_performance(metrics)

        # Get historical trend
        historical = get_historical_trend(metrics.url)

        return PerformanceReport(
            metrics=metrics,
            score=analysis['score'],
            recommendations=analysis['recommendations'],
            historical_trend=historical
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/metrics/{url}")
async def get_metrics(url: str):
    """
    Get historical metrics for a URL
    """
    url_metrics = [m for m in metrics_store if m.get('url') == url]
    return {"metrics": url_metrics, "count": len(url_metrics)}

@router.get("/trends/{url}")
async def get_trends(url: str):
    """
    Get performance trends for a URL
    """
    trend = get_historical_trend(url)
    return trend

