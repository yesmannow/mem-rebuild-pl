#!/usr/bin/env bash
set -euo pipefail

# scripts/run-lighthouse.sh
# Run Lighthouse CI locally (requires LHCI URL or service). Example usage:
# LHCI_URL="http://localhost:9001" ./scripts/run-lighthouse.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

LHCI_URL="${LHCI_URL:-http://localhost:9001}"

# Ensure lhci is available
if ! command -v npx >/dev/null 2>&1; then
  echo "npx not found in PATH"
  exit 1
fi

echo "Running LHCI autorun against $LHCI_URL"
# Use a simple temporary storage upload if no server available
npx @lhci/cli autorun --upload.target=temporary-public-storage --url="$LHCI_URL" || {
  echo "LHCI autorun failed"
  exit 1
}

echo "LHCI autorun completed"
exit 0

