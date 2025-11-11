from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mcp.routes import (
    logo, preview, export,
    analytics, images, seo,
    bundles, lighthouse, resource_hints,
    content, cache, cleanup, pr_validation
)

app = FastAPI(title="MCP Optimization Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Branding routes
app.include_router(logo.router, prefix="/generate-logo")
app.include_router(preview.router, prefix="/preview-layout")
app.include_router(export.router, prefix="/export-svg")

# Optimization routes
app.include_router(analytics.router, prefix="/analytics", tags=["Performance Analytics"])
app.include_router(images.router, prefix="/images", tags=["Image Optimization"])
app.include_router(seo.router, prefix="/seo", tags=["SEO"])
app.include_router(bundles.router, prefix="/bundles", tags=["Bundle Analysis"])
app.include_router(lighthouse.router, prefix="/lighthouse", tags=["Lighthouse"])
app.include_router(resource_hints.router, prefix="/resource-hints", tags=["Resource Hints"])
app.include_router(content.router, prefix="/content", tags=["Content Analysis"])
app.include_router(cache.router, prefix="/cache", tags=["Cache Optimization"])
app.include_router(cleanup.router, prefix="/cleanup", tags=["Cleanup & Validation"])
app.include_router(pr_validation.router, prefix="/pr", tags=["PR Validation"])

@app.get("/health")
def health_check():
    return {"status": "ok", "services": [
        "branding", "analytics", "images", "seo",
        "bundles", "lighthouse", "resource-hints", "content", "cache", "cleanup", "pr-validation"
    ]}

@app.get("/version")
def version():
    return {"version": "2.0.0", "features": [
        "Performance Analytics",
        "Image Optimization",
        "SEO Generation",
        "Bundle Analysis",
        "Lighthouse Integration",
        "Resource Hints",
        "Content Analysis",
        "Cache Optimization"
    ]}

@app.get("/")
def root():
    return {
        "message": "MCP Optimization Server",
        "version": "2.0.0",
        "endpoints": {
            "analytics": "/analytics/performance-report",
            "images": "/images/optimize-image",
            "seo": "/seo/generate-meta",
            "bundles": "/bundles/analyze-bundle",
            "lighthouse": "/lighthouse/audit",
            "resource-hints": "/resource-hints/generate-hints",
            "content": "/content/analyze-content",
            "cache": "/cache/generate-strategy"
        }
    }