import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import test from "node:test";
import { applySecurityHeaders, securityHeaders } from "../server/headers.mjs";

const expected = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Content-Security-Policy": "frame-ancestors 'self'",
};

test("de beveiligingsheaders hebben de afgesproken waarden", () => {
  for (const [name, value] of Object.entries(expected)) {
    assert.equal(securityHeaders[name], value);
  }
  const policy = securityHeaders["Content-Security-Policy-Report-Only"];
  assert.match(policy, /^default-src 'self';/);
  assert.match(policy, /script-src 'self' 'unsafe-inline'/);
  assert.match(policy, /https:\/\/assets\.calendly\.com/);
  assert.match(policy, /https:\/\/www\.googletagmanager\.com/);
  assert.match(policy, /https:\/\/www\.google-analytics\.com/);
  assert.match(policy, /font-src 'self'/);
  assert.match(policy, /img-src 'self'/);
  assert.match(policy, /https:\/\/www\.openstreetmap\.org/);
  assert.match(policy, /frame-ancestors 'self'/);
  assert.match(policy, /https:\/\/wa\.me/);
});

test("writeHead houdt de beveiligingsheaders op een pagina en een redirect", async () => {
  const server = createServer((req, res) => {
    applySecurityHeaders(res);
    if (req.url === "/weg") {
      res.writeHead(301, { location: "/", "cache-control": "public, max-age=86400" });
      res.end();
      return;
    }
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=300" });
    res.end("ok");
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const port = (server.address() as { port: number }).port;
  try {
    const home = await fetch(`http://127.0.0.1:${port}/`);
    const redirect = await fetch(`http://127.0.0.1:${port}/weg`, { redirect: "manual" });
    assert.equal(home.status, 200);
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.get("location"), "/");
    for (const response of [home, redirect]) {
      for (const [name, value] of Object.entries(securityHeaders)) {
        assert.equal(response.headers.get(name), value, name);
      }
    }
  } finally {
    server.close();
  }
});
