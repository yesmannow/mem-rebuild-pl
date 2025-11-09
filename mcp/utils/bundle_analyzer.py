"""
Bundle Analyzer Utility
Analyzes JavaScript bundles and suggests optimizations
"""

from typing import Dict, List, Any
import os
import json

def analyze_bundle(bundle_data: Dict, threshold_kb: int = 100) -> Dict:
    """
    Analyze bundle data and provide recommendations
    """
    chunks = []
    large_chunks = []
    total_size = 0
    total_gzipped = 0
    recommendations = []
    lazy_load_candidates = []

    # Parse bundle data (assuming Rollup/Vite format)
    if isinstance(bundle_data, dict):
        if "chunks" in bundle_data:
            chunks_data = bundle_data["chunks"]
        elif "assets" in bundle_data:
            chunks_data = bundle_data["assets"]
        else:
            chunks_data = bundle_data
    else:
        chunks_data = []

    for chunk_info in chunks_data:
        name = chunk_info.get("name", chunk_info.get("fileName", "unknown"))
        size = chunk_info.get("size", 0) / 1024  # Convert to KB
        gzipped = chunk_info.get("gzippedSize", size * 0.3) / 1024  # Estimate if not provided

        total_size += size
        total_gzipped += gzipped

        modules = chunk_info.get("modules", [])
        can_split = size > threshold_kb and len(modules) > 1

        split_recommendations = []
        if can_split:
            # Identify large dependencies
            large_deps = [m for m in modules if isinstance(m, dict) and m.get("size", 0) > threshold_kb * 1024]
            if large_deps:
                split_recommendations.append(f"Consider code splitting for: {', '.join([m.get('name', 'unknown') for m in large_deps[:3]])}")

        chunk_analysis = {
            "name": name,
            "size_kb": round(size, 2),
            "gzipped_kb": round(gzipped, 2),
            "modules": [m.get("name", str(m)) if isinstance(m, dict) else str(m) for m in modules[:10]],
            "can_split": can_split,
            "split_recommendations": split_recommendations
        }

        chunks.append(chunk_analysis)

        if size > threshold_kb:
            large_chunks.append(chunk_analysis)

        # Identify lazy load candidates
        if any(keyword in name.lower() for keyword in ["modal", "dialog", "popup", "chart", "analytics", "admin"]):
            lazy_load_candidates.append(name)

    # Generate recommendations
    if total_gzipped > 500:
        recommendations.append(f"Total bundle size is {total_gzipped:.2f}KB. Consider code splitting and lazy loading.")

    if len(large_chunks) > 0:
        recommendations.append(f"{len(large_chunks)} chunks exceed {threshold_kb}KB threshold. Consider splitting.")

    if len(lazy_load_candidates) > 0:
        recommendations.append(f"Consider lazy loading these components: {', '.join(lazy_load_candidates[:5])}")

    # Check for duplicate dependencies
    all_modules = []
    for chunk in chunks:
        all_modules.extend(chunk["modules"])

    duplicates = [m for m in all_modules if all_modules.count(m) > 1]
    if duplicates:
        recommendations.append(f"Potential duplicate dependencies detected: {', '.join(set(duplicates)[:5])}")

    return {
        "total_size_kb": round(total_size, 2),
        "total_gzipped_kb": round(total_gzipped, 2),
        "chunks": chunks,
        "large_chunks": large_chunks,
        "recommendations": recommendations,
        "lazy_load_candidates": lazy_load_candidates
    }

def analyze_build_directory(build_dir: str) -> Dict:
    """
    Analyze actual build output directory
    """
    if not os.path.exists(build_dir):
        return {"error": f"Build directory {build_dir} not found"}

    chunks = []
    total_size = 0

    for root, dirs, files in os.walk(build_dir):
        for file in files:
            if file.endswith(('.js', '.css')):
                file_path = os.path.join(root, file)
                size = os.path.getsize(file_path) / 1024  # KB
                total_size += size

                chunks.append({
                    "name": file,
                    "path": file_path,
                    "size_kb": round(size, 2)
                })

    # Sort by size
    chunks.sort(key=lambda x: x["size_kb"], reverse=True)

    return {
        "total_size_kb": round(total_size, 2),
        "chunks": chunks[:20],  # Top 20 largest files
        "recommendations": [
            "Consider code splitting for large JavaScript files",
            "Enable gzip/brotli compression",
            "Use tree-shaking to remove unused code"
        ]
    }

