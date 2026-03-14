#!/bin/bash

PORT=8001

# Kill existing Next.js dev server
PID=$(lsof -ti :$PORT 2>/dev/null)
if [ -n "$PID" ]; then
  echo "Stopping process on port $PORT (PID: $PID)..."
  kill "$PID" 2>/dev/null
  sleep 1
  # Force kill if still running
  kill -9 "$PID" 2>/dev/null
fi

echo "Starting dev server..."
cd "$(dirname "$0")"
npm run dev -- -p $PORT &

echo "Dev server restarting on http://localhost:$PORT"
