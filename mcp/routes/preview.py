from fastapi import APIRouter
from mcp.utils.layout_builder import build_preview_html

router = APIRouter()

@router.post("/")
def preview_layout():
    html = build_preview_html()
    return {"html": html}