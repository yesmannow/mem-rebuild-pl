# launch_mcp.ps1
Write-Host "🚀 Launching MCP FastAPI server..."

# Set PYTHONPATH to current directory
$env:PYTHONPATH = "."

# Run Uvicorn with reload
python -m uvicorn mcp.main:app --reload