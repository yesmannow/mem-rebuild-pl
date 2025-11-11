from fastapi import APIRouter
from mcp.models.branding import LogoRequest
from mcp.utils.svg_factory import create_svg_logo

router = APIRouter()

@router.post("/generate-logo")
async def generate_logo(request: LogoRequest):
    return {"svg": create_svg_logo(request.dict())}