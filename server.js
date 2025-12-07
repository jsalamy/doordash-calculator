// Simple static file server for Azure Linux App Service
// This file is only used if PM2 is not available
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;
const ROOT = process.env.WWWROOT || '/home/site/wwwroot';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function serveFile(filePath, res) {
  try {
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      return false;
    }
    const content = readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
    return true;
  } catch (error) {
    return false;
  }
}

const server = createServer((req, res) => {
  let filePath = join(ROOT, req.url === '/' ? '/index.html' : req.url);
  
  // Try to serve the file
  if (serveFile(filePath, res)) {
    return;
  }
  
  // If file doesn't exist and it's not a file request, serve index.html (SPA routing)
  if (!filePath.includes('.')) {
    filePath = join(ROOT, 'index.html');
    if (serveFile(filePath, res)) {
      return;
    }
  }
  
  // 404
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from ${ROOT}`);
});
