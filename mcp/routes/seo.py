from fastapi import APIRouter, HTTPException
from mcp.models.seo import PageData, SEOMetaResponse
from mcp.utils.seo_generator import generate_seo_meta, validate_seo

router = APIRouter()

@router.post("/generate-meta", response_model=SEOMetaResponse)
async def generate_seo_meta_tags(page_data: PageData):
    """
    Generate optimized meta tags, Open Graph, Twitter Cards, and structured data
    """
    try:
        result = generate_seo_meta(page_data)
        return SEOMetaResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/validate")
async def validate_seo_tags(page_data: PageData):
    """
    Validate SEO tags against best practices
    """
    try:
        validation = validate_seo(page_data)
        return validation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-sitemap")
async def generate_sitemap(pages: list[PageData]):
    """
    Generate sitemap.xml from list of pages
    """
    try:
        from mcp.utils.seo_generator import generate_sitemap_xml
        sitemap = generate_sitemap_xml(pages)
        return {"sitemap": sitemap}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

