#!/bin/bash
# Startup script for Linux Azure App Service
# This serves the static files using PM2

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi

# Serve the static files with SPA support
pm2 serve /home/site/wwwroot --no-daemon --spa --port 8080
