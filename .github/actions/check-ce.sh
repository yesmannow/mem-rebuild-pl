#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR=${1:-dist}

# Fail if any customElements.define appears in production bundles
if grep -RIn --line-number "customElements.define" "$BUILD_DIR" >/dev/null 2>&1; then
  echo "ERROR: found customElements.define in production build files."
  grep -RIn --line-number "customElements.define" "$BUILD_DIR" || true
  exit 1
fi

echo "OK: no customElements.define found in $BUILD_DIR"

