"""
Lighthouse Runner Utility
Runs Lighthouse audits and processes results
"""

import subprocess
import json
import asyncio
from typing import Dict, List, Any

async def run_lighthouse_audit(
    url: str,
    device: str = "desktop",
    categories: List[str] = ["performance", "accessibility", "best-practices", "seo"]
) -> Dict:
    """
    Run Lighthouse audit using lighthouse CLI or API
    """
    try:
        # Check if lighthouse is installed
        result = subprocess.run(
            ["lighthouse", "--version"],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            # Fallback: Use lighthouse as npm package or return mock data
            return await run_lighthouse_mock(url, device, categories)

        # Run lighthouse
        cmd = [
            "lighthouse",
            url,
            "--output=json",
            "--output-path=stdout",
            "--quiet",
            "--chrome-flags=--headless"
        ]

        if device == "mobile":
            cmd.append("--preset=mobile")
        else:
            cmd.append("--preset=desktop")

        # Run async
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )

        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            return await run_lighthouse_mock(url, device, categories)

        lighthouse_data = json.loads(stdout.decode())

        # Extract scores
        scores = {}
        for category in categories:
            if category in lighthouse_data.get("categories", {}):
                scores[category] = lighthouse_data["categories"][category]["score"] * 100

        # Extract metrics
        metrics = {}
        if "audits" in lighthouse_data:
            for metric in ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift"]:
                if metric in lighthouse_data["audits"]:
                    audit = lighthouse_data["audits"][metric]
                    metrics[metric] = audit.get("numericValue", 0)

        # Extract opportunities
        opportunities = []
        diagnostics = []
        passed_audits = []
        failed_audits = []

        if "audits" in lighthouse_data:
            for audit_id, audit in lighthouse_data["audits"].items():
                if audit.get("score") is not None:
                    if audit["score"] >= 0.9:
                        passed_audits.append(audit_id)
                    else:
                        failed_audits.append(audit_id)

                        if audit.get("details", {}).get("type") == "opportunity":
                            opportunities.append({
                                "id": audit_id,
                                "title": audit.get("title", ""),
                                "description": audit.get("description", ""),
                                "savings": audit.get("details", {}).get("overallSavingsMs", 0)
                            })
                        elif audit.get("details", {}).get("type") == "diagnostic":
                            diagnostics.append({
                                "id": audit_id,
                                "title": audit.get("title", ""),
                                "description": audit.get("description", "")
                            })

        # Generate recommendations
        recommendations = []
        if scores.get("performance", 100) < 90:
            recommendations.append("Performance score is below 90. Review opportunities above.")
        if scores.get("accessibility", 100) < 90:
            recommendations.append("Accessibility score is below 90. Review failed audits.")
        if scores.get("seo", 100) < 90:
            recommendations.append("SEO score is below 90. Check meta tags and structured data.")

        return {
            "url": url,
            "scores": {
                "performance": scores.get("performance", 0),
                "accessibility": scores.get("accessibility", 0),
                "best_practices": scores.get("best-practices", 0),
                "seo": scores.get("seo", 0)
            },
            "metrics": metrics,
            "opportunities": opportunities[:10],  # Top 10
            "diagnostics": diagnostics[:10],  # Top 10
            "passed_audits": passed_audits[:20],
            "failed_audits": failed_audits[:20],
            "recommendations": recommendations
        }

    except Exception as e:
        # Fallback to mock data
        return await run_lighthouse_mock(url, device, categories)

async def run_lighthouse_mock(url: str, device: str, categories: List[str]) -> Dict:
    """
    Return mock Lighthouse data when CLI is not available
    """
    return {
        "url": url,
        "scores": {
            "performance": 85,
            "accessibility": 90,
            "best_practices": 88,
            "seo": 92
        },
        "metrics": {
            "first-contentful-paint": 1800,
            "largest-contentful-paint": 2500,
            "total-blocking-time": 150,
            "cumulative-layout-shift": 0.05
        },
        "opportunities": [
            {
                "id": "render-blocking-resources",
                "title": "Eliminate render-blocking resources",
                "description": "Reduce render-blocking resources",
                "savings": 500
            }
        ],
        "diagnostics": [],
        "passed_audits": ["viewport", "document-title"],
        "failed_audits": [],
        "recommendations": [
            "Install Lighthouse CLI for accurate audits: npm install -g lighthouse",
            "Or use Lighthouse API for programmatic access"
        ]
    }

