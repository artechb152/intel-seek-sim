import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const basePort = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const safePath = (urlPath) => {
  const path = normalize(decodeURIComponent(urlPath).replace(/^\/+/, ''));
  if (path.startsWith('..')) return null;
  return join(root, path || 'index.html');
};

const serveFile = async (req, res, filePath) => {
  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      return serveFile(req, res, join(filePath, 'index.html'));
    }

    const type = mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': fileStat.size,
      'Cache-Control': 'no-cache',
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    createReadStream(filePath).pipe(res);
  } catch {
    if (!filePath.endsWith('index.html')) {
      return serveFile(req, res, join(root, 'index.html'));
    }

    const html = await readFile(join(root, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }
};

const server = createServer((req, res) => {
  const reqPath = req.url?.split('?')[0] || '/';
  const filePath = safePath(reqPath);

  if (!filePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }

  serveFile(req, res, filePath);
});

const start = (port) => {
  server.listen(port, '0.0.0.0', () => {
    console.log(`Yesterday dev server running at http://0.0.0.0:${port}`);
  });
};

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && !process.env.PORT) {
    const fallbackPort = basePort + 1;
    console.log(`Port ${basePort} is busy, retrying on ${fallbackPort}...`);
    server.listen(fallbackPort, '0.0.0.0');
    return;
  }

  console.error(error.message);
  process.exit(1);
});

start(basePort);
