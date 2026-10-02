#!/usr/bin/env bash
# Start the local reconstruction. Usage:  ./start.sh [port]
cd "$(dirname "$0")"
PORT="${1:-8080}"
echo "==> http://localhost:${PORT}/"
if command -v node >/dev/null 2>&1; then
  exec node server.js "$PORT"
elif command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT"
else
  echo "Neither node nor python3 found. Open index.html directly instead."
  exit 1
fi