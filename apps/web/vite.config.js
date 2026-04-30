import { createReadStream } from "node:fs";
import { cp, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const webRoot = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = path.resolve(webRoot, "../..");
const appletsRoot = path.join(repoRoot, "content/applets");
const manimRoot = path.join(repoRoot, "content/manim");
const webOutDir = path.join(repoRoot, "dist/apps/web");

export default defineConfig({
  root: webRoot,
  base: "./",
  plugins: [contentPackagesPlugin()],
  server: {
    port: 5173,
  },
  build: {
    outDir: webOutDir,
    emptyOutDir: true,
  },
});

function contentPackagesPlugin() {
  return {
    name: "teacher-workspace-content-packages",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestPath = decodeURIComponent((request.url ?? "").split("?")[0]);
        const contentRoot = getServedContentRoot(requestPath);

        if (!contentRoot) {
          next();
          return;
        }

        const relativePath = requestPath.slice(contentRoot.urlPrefix.length);
        const filePath = path.resolve(contentRoot.fileRoot, relativePath);

        if (!filePath.startsWith(`${contentRoot.fileRoot}${path.sep}`)) {
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
      await cp(manimRoot, path.join(webOutDir, "content/manim"), {
        recursive: true,
        filter: (source) => shouldCopyManimPath(source),
      });
    },
  };
}

function getServedContentRoot(requestPath) {
  if (requestPath.startsWith("/content/applets/")) {
    return { urlPrefix: "/content/applets/", fileRoot: appletsRoot };
  }

  if (requestPath.startsWith("/content/manim/")) {
    return { urlPrefix: "/content/manim/", fileRoot: manimRoot };
  }

  return null;
}

function shouldCopyManimPath(source) {
  const relativePath = path.relative(manimRoot, source).split(path.sep).join("/");

  if (!relativePath) {
    return true;
  }

  return !/(^|\/)dist\/(Tex|texts|videos)(\/|$)/.test(relativePath);
}

function contentType(filePath) {
  const extension = path.extname(filePath);

  return (
    {
      ".css": "text/css; charset=utf-8",
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".mp4": "video/mp4",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".webm": "video/webm",
    }[extension] ?? "application/octet-stream"
  );
}
