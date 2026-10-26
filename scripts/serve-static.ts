// Serves a static export (the docs' `out` folder) for the end-to-end tests.
// Usage: node scripts/serve-static.ts <dir> <port>
import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const [dir = "apps/docs/out", port = "4300"] = process.argv.slice(2);
const root = resolve(dir);

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

const find = (url: string): string | undefined => {
  const path = join(root, normalize(decodeURIComponent(url.split("?")[0]!)));
  if (!path.startsWith(root)) return undefined;
  for (const candidate of [path, join(path, "index.html"), `${path}.html`]) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // Try the next candidate.
    }
  }
  return undefined;
};

createServer((req, res) => {
  const file = find(req.url ?? "/") ?? join(root, "404.html");
  res.writeHead(file.endsWith("404.html") && !req.url?.startsWith("/404") ? 404 : 200, {
    "content-type": types[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(res);
}).listen(Number(port), () => console.log(`Serving ${root} on http://localhost:${port}`));
