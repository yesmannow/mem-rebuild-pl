from fastapi import APIRouter
from mcp.utils.asset_exporter import export_svg_assets

router = APIRouter()

@router.post("/")
def export_svg():
    count = export_svg_assets()
    return {"exported": count}