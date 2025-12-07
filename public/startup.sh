#!/bin/bash
# Startup script for Linux Azure App Service
# This serves the static files using a simple HTTP server

# Install serve if not already installed
if ! command -v serve &> /dev/null; then
  npm install -g serve
fi

# Serve the static files with SPA support
serve -s /home/site/wwwroot -l 8080 --single
