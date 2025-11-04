#!/bin/bash
# launch_mcp.sh

echo "🚀 Launching MCP FastAPI server..."

# Set PYTHONPATH and run Uvicorn
PYTHONPATH=. uvicorn mcp.main:app --reload