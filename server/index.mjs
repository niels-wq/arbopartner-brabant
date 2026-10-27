import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { handleChatMessage } from "./chat-ai.mjs";
import { handleApi } from "./forms.mjs";
import { applySecurityHeaders } from "./headers.mjs";
import { wwwRedirectLocation } from "./redirect.mjs";

const root = path.resolve(process.cwd(), "dist");
const port = Number(process.env.PORT || 4327);
const host = process.env.HOST || "0.0.0.0";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const clean = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const target = path.join(root, clean);
  if (!target.startsWith(root)) return null;
  return target;
}

async function fileFor(urlPath) {
  const candidates = [];
  const base = safePath(urlPath);
  if (!base) return null;
  if (path.extname(base)) candidates.push(base);
  else {
    candidates.push(path.join(base, "index.html"));
    candidates.push(`${base}.html`);
  }
  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      /* next */
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  applySecurityHeaders(res);
  try {
    const apiUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (apiUrl.pathname === "/api/chat/message") {
      await handleChatMessage(req, res);
      return;
    }
    if (await handleApi(req, res)) return;
    const url = new URL(req.url || "/", "http://localhost");
    const canonical = wwwRedirectLocation(url.pathname, url.search, req.headers.host, req.headers["x-forwarded-host"]);
    if (canonical) {
      res.writeHead(301, {
        location: canonical,
        "cache-control": "public, max-age=86400",
      });
      res.end();
      return;
    }
    if (url.pathname === "/detacheren-of-in-dienst") {
      res.writeHead(301, { location: "/casemanager-inhuren-of-in-dienst" + url.search });
      res.end();
      return;
    }
    if (url.pathname === "/sitemap.xml") {
      res.writeHead(301, { location: "/sitemap-index.xml" });
      res.end();
      return;
    }
    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      res.writeHead(308, { location: url.pathname.slice(0, -1) + url.search });
      res.end();
      return;
    }
    const file = await fileFor(url.pathname);
    if (!file) {
      const missing = path.join(root, "404.html");
      const html = await readFile(missing).catch(() => Buffer.from("Pagina niet gevonden"));
      res.writeHead(404, {
        "content-type": "text/html; charset=utf-8",
      });
      res.end(html);
      return;
    }
    const body = await readFile(file);
    const ext = path.extname(file);
    const cache = file.includes(`${path.sep}_astro${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : ext === ".html"
        ? "public, max-age=300"
        : "public, max-age=86400";
    res.writeHead(200, {
      "content-type": types[ext] || "application/octet-stream",
      "cache-control": cache,
    });
    res.end(body);
  } catch {
    if (res.headersSent) return;
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Er ging iets mis.");
  }
});

server.listen(port, host, () => {
  console.log(`Arbopartner Brabant luistert op http://${host}:${port}`);
});
