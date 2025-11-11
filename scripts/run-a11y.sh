#!/usr/bin/env bash
set -euo pipefail

# scripts/run-a11y.sh
# Builds storybook (if present), serves it locally, and runs pa11y-ci or pa11y.
# Usage: ./scripts/run-a11y.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT_DIR"

# Build storybook if script exists
if npm run -s build-storybook >/dev/null 2>&1; then
  echo "Building Storybook..."
  npm run build-storybook --silent
else
  echo "No build-storybook script found; attempting to use existing storybook-static if present"
fi

# Prefer storybook-static
if [ -d ./storybook-static ]; then
  SERVE_DIR="./storybook-static"
else
  echo "storybook-static not found. Exiting."
  exit 1
fi

# Serve static files
npx http-server "$SERVE_DIR" -p 9001 --silent &
SERVER_PID=$!
echo "Serving $SERVE_DIR on http://localhost:9001 (pid $SERVER_PID)"
sleep 2

# Run pa11y-ci if .pa11yci exists
if [ -f .pa11yci ]; then
  echo "Running pa11y-ci with .pa11yci config..."
  if ! npx pa11y-ci --config .pa11yci --reporter json > pa11y-report.json; then
    echo "pa11y-ci reported issues. See pa11y-report.json"
    kill $SERVER_PID || true
    exit 1
  fi
  echo "pa11y-ci completed. No blocking issues found."
else
  echo "Running pa11y against http://localhost:9001"
  if ! npx pa11y http://localhost:9001; then
    echo "pa11y reported issues"
    kill $SERVER_PID || true
    exit 1
  fi
fi

kill $SERVER_PID || true
exit 0

