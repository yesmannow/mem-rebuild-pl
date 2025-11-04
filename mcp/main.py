from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mcp.routes import logo, preview, export

app = FastAPI(title="MCP Branding Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(logo.router, prefix="/generate-logo")
app.include_router(preview.router, prefix="/preview-layout")
app.include_router(export.router, prefix="/export-svg")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/version")
def version():
    return {"version": "1.0.0"}