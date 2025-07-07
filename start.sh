#!/bin/sh
# Start nginx in background
nginx &
# Start node backend (foreground)
node /app/backend/server.js
