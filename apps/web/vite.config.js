import { createReadStream } from "node:fs";
import { cp, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const webRoot = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = path.resolve(webRoot, "../..");
const appletsRoot = path.join(repoRoot, "content/applets");
const webOutDir = path.join(repoRoot, "dist/apps/web");

export default defineConfig({
  root: webRoot,
  base: "./",
  plugins: [appletContentPlugin()],
  server: {
    port: 5173,
  },
  build: {
    outDir: webOutDir,
    emptyOutDir: true,
  },
});

function appletContentPlugin() {
  return {
    name: "teacher-workspace-applet-content",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestPath = decodeURIComponent((request.url ?? "").split("?")[0]);

        if (!requestPath.startsWith("/content/applets/")) {
          next();
          return;
        }

        const relativePath = requestPath.slice("/content/applets/".length);
        const filePath = path.resolve(appletsRoot, relativePath);

        if (!filePath.startsWith(`${appletsRoot}${path.sep}`)) {
          response.statusCode = 403;
          response.end("Forbidden");
          return;
        }

        try {
          const fileStat = await stat(filePath);
          if (!fileStat.isFile()) {
            next();
            return;
          }
        } catch {
          next();
          return;
        }

        response.setHeader("Content-Type", contentType(filePath));
        createReadStream(filePath).pipe(response);
      });
    },
    async closeBundle() {
      await cp(appletsRoot, path.join(webOutDir, "content/applets"), { recursive: true });
    },
  };
}

function contentType(filePath) {
  const extension = path.extname(filePath);

  return (
    {
      ".css": "text/css; charset=utf-8",
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml",
    }[extension] ?? "application/octet-stream"
  );
}
