"""
Performance Analyzer Utility
Analyzes Core Web Vitals and provides recommendations
"""

def analyze_performance(metrics):
    """
    Analyze performance metrics and provide recommendations
    """
    score = {}
    recommendations = []

    # LCP Analysis (Largest Contentful Paint)
    if metrics.lcp is not None:
        if metrics.lcp <= 2500:
            score['lcp'] = "good"
        elif metrics.lcp <= 4000:
            score['lcp'] = "needs-improvement"
            recommendations.append("LCP is above 2.5s. Optimize images, use CDN, enable text compression.")
        else:
            score['lcp'] = "poor"
            recommendations.append("LCP is critically high (>4s). Consider lazy loading, image optimization, and server-side rendering.")

    # FID Analysis (First Input Delay)
    if metrics.fid is not None:
        if metrics.fid <= 100:
            score['fid'] = "good"
        elif metrics.fid <= 300:
            score['fid'] = "needs-improvement"
            recommendations.append("FID is above 100ms. Reduce JavaScript execution time, code split, defer non-critical JS.")
        else:
            score['fid'] = "poor"
            recommendations.append("FID is critically high (>300ms). Minimize main thread work, optimize third-party scripts.")

    # CLS Analysis (Cumulative Layout Shift)
    if metrics.cls is not None:
        if metrics.cls <= 0.1:
            score['cls'] = "good"
        elif metrics.cls <= 0.25:
            score['cls'] = "needs-improvement"
            recommendations.append("CLS is above 0.1. Set size attributes on images/videos, avoid inserting content above existing content.")
        else:
            score['cls'] = "poor"
            recommendations.append("CLS is critically high (>0.25). Reserve space for dynamic content, use aspect ratio boxes.")

    # FCP Analysis (First Contentful Paint)
    if metrics.fcp is not None:
        if metrics.fcp <= 1800:
            score['fcp'] = "good"
        elif metrics.fcp <= 3000:
            score['fcp'] = "needs-improvement"
            recommendations.append("FCP is above 1.8s. Eliminate render-blocking resources, minify CSS, inline critical CSS.")
        else:
            score['fcp'] = "poor"
            recommendations.append("FCP is critically high (>3s). Optimize server response time, reduce resource sizes.")

    # TTFB Analysis (Time to First Byte)
    if metrics.ttfb is not None:
        if metrics.ttfb <= 800:
            score['ttfb'] = "good"
        elif metrics.ttfb <= 1800:
            score['ttfb'] = "needs-improvement"
            recommendations.append("TTFB is above 800ms. Use a CDN, optimize server response time, enable caching.")
        else:
            score['ttfb'] = "poor"
            recommendations.append("TTFB is critically high (>1.8s). Consider server optimization, database query optimization.")

    return {
        "score": score,
        "recommendations": recommendations
    }

def store_metrics(metrics):
    """
    Store metrics (placeholder - implement database storage)
    """
    # In production, store in database
    pass

def get_historical_trend(url):
    """
    Get historical performance trends for a URL
    """
    # In production, query database
    # For now, return empty trend
    return {
        "url": url,
        "trend": "stable",
        "improvements": [],
        "regressions": []
    }

