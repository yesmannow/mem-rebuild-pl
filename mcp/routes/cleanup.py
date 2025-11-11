"""
Cleanup and validation routes for MCP server
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import subprocess
import json
import os
from pathlib import Path

router = APIRouter(prefix="/cleanup", tags=["Cleanup & Validation"])

class CleanupRequest(BaseModel):
    dry_run: bool = True
    targets: Optional[List[str]] = None

class ValidationResult(BaseModel):
    valid: bool
    issues: List[str]
    broken_imports: List[dict]

class ComponentRequest(BaseModel):
    name: str
    folder: str = "components"
    with_css: bool = True

class PageRequest(BaseModel):
    name: str
    route: str
    with_css: bool = True

@router.post("/clean")
async def clean_repo(request: CleanupRequest):
    """
    Clean repository by deleting legacy/test files and empty folders
    """
    try:
        script_path = Path(__file__).parent.parent.parent / "scripts" / "cleanup-automation.ts"
        cmd = ["ts-node", str(script_path), "clean"]

        if request.dry_run:
            cmd.append("--dry-run")

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            cwd=Path(__file__).parent.parent.parent
        )

        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)

        return {
            "status": "success",
            "dry_run": request.dry_run,
            "output": result.stdout
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/validate-imports")
async def validate_imports():
    """
    Validate imports for broken references
    """
    try:
        script_path = Path(__file__).parent.parent.parent / "scripts" / "cleanup-automation.ts"
        result = subprocess.run(
            ["ts-node", str(script_path), "validate-imports"],
            capture_output=True,
            text=True,
            cwd=Path(__file__).parent.parent.parent
        )

        if result.returncode != 0:
            # Broken imports found
            return {
                "valid": False,
                "broken_imports": result.stdout.split("\n"),
                "output": result.stdout
            }

        return {
            "valid": True,
            "broken_imports": [],
            "output": result.stdout
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/validate-structure")
async def validate_structure():
    """
    Validate folder structure
    """
    try:
        script_path = Path(__file__).parent.parent.parent / "scripts" / "cleanup-automation.ts"
        result = subprocess.run(
            ["ts-node", str(script_path), "validate-structure"],
            capture_output=True,
            text=True,
            cwd=Path(__file__).parent.parent.parent
        )

        valid = result.returncode == 0

        return {
            "valid": valid,
            "issues": result.stdout.split("\n") if not valid else [],
            "output": result.stdout
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-component")
async def generate_component(request: ComponentRequest):
    """
    Generate a new component with proper structure
    """
    try:
        # Validate naming (PascalCase)
        if not request.name[0].isupper():
            raise HTTPException(
                status_code=400,
                detail="Component name must be PascalCase (start with uppercase)"
            )

        # Check for duplicates
        component_path = Path(__file__).parent.parent.parent / "src" / request.folder / f"{request.name}.tsx"
        if component_path.exists():
            raise HTTPException(
                status_code=400,
                detail=f"Component {request.name} already exists"
            )

        # Use plop generator if available, otherwise create manually
        plop_path = Path(__file__).parent.parent.parent / "plopfile.cjs"
        if plop_path.exists():
            result = subprocess.run(
                ["npx", "plop", "component", request.name],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent
            )

            if result.returncode != 0:
                raise HTTPException(status_code=500, detail=result.stderr)

            return {
                "status": "success",
                "component": request.name,
                "path": str(component_path),
                "output": result.stdout
            }
        else:
            # Manual generation would go here
            raise HTTPException(
                status_code=501,
                detail="Plop generator not configured. Please set up plopfile.cjs"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-page")
async def generate_page(request: PageRequest):
    """
    Generate a new page with route and lazy import
    """
    try:
        # Validate naming (PascalCase)
        if not request.name[0].isupper():
            raise HTTPException(
                status_code=400,
                detail="Page name must be PascalCase (start with uppercase)"
            )

        # Check route conflicts
        router_path = Path(__file__).parent.parent.parent / "src" / "router" / "AppRouter.tsx"
        if router_path.exists():
            router_content = router_path.read_text()
            if f"/{request.route}" in router_content or f'"{request.route}"' in router_content:
                raise HTTPException(
                    status_code=400,
                    detail=f"Route /{request.route} already exists"
                )

        # Check for duplicate page
        page_path = Path(__file__).parent.parent.parent / "src" / "pages" / f"{request.name}.tsx"
        if page_path.exists():
            raise HTTPException(
                status_code=400,
                detail=f"Page {request.name} already exists"
            )

        return {
            "status": "success",
            "page": request.name,
            "route": request.route,
            "path": str(page_path),
            "message": "Page generation would be implemented here. Use plop generator or manual creation."
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/report")
async def get_report():
    """
    Generate cleanup report
    """
    try:
        script_path = Path(__file__).parent.parent.parent / "scripts" / "cleanup-automation.ts"
        result = subprocess.run(
            ["ts-node", str(script_path), "report"],
            capture_output=True,
            text=True,
            cwd=Path(__file__).parent.parent.parent
        )

        return {
            "report": result.stdout,
            "timestamp": str(Path(__file__).stat().st_mtime)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

