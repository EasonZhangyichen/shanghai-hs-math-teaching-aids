import { createReadStream } from "node:fs";
import { cp, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const webRoot = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = path.resolve(webRoot, "../..");
const appletsRoot = path.join(repoRoot, "content/applets");
const manimRoot = path.join(repoRoot, "content/manim");
const sharedContentRoot = path.join(repoRoot, "content/shared");
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

        let fileStat;

        try {
          fileStat = await stat(filePath);
          if (!fileStat.isFile()) {
            next();
            return;
          }
        } catch {
          next();
          return;
        }

        serveContentFile(request, response, filePath, fileStat);
      });
    },
    async closeBundle() {
      await cp(appletsRoot, path.join(webOutDir, "content/applets"), { recursive: true });
      await cp(sharedContentRoot, path.join(webOutDir, "content/shared"), { recursive: true });
      await cp(manimRoot, path.join(webOutDir, "content/manim"), {
        recursive: true,
        filter: (source) => shouldCopyManimPath(source),
      });
    },
  };
}

function serveContentFile(request, response, filePath, fileStat) {
  const range = parseByteRange(request.headers.range, fileStat.size);

  response.setHeader("Content-Type", contentType(filePath));
  response.setHeader("Accept-Ranges", "bytes");

  if (range === "invalid") {
    response.statusCode = 416;
    response.setHeader("Content-Range", `bytes */${fileStat.size}`);
    response.end();
    return;
  }

  if (range) {
    const { start, end } = range;
    response.statusCode = 206;
    response.setHeader("Content-Range", `bytes ${start}-${end}/${fileStat.size}`);
    response.setHeader("Content-Length", String(end - start + 1));

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath, { start, end }).pipe(response);
    return;
  }

  response.setHeader("Content-Length", String(fileStat.size));

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

function parseByteRange(rangeHeader, size) {
  if (!rangeHeader) {
    return null;
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
  if (!match || size <= 0) {
    return "invalid";
  }

  const [, rawStart, rawEnd] = match;
  if (!rawStart && !rawEnd) {
    return "invalid";
  }

  if (!rawStart) {
    const suffixLength = Number(rawEnd);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) {
      return "invalid";
    }

    return {
      start: Math.max(size - suffixLength, 0),
      end: size - 1,
    };
  }

  const start = Number(rawStart);
  const end = rawEnd ? Number(rawEnd) : size - 1;

  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    start < 0 ||
    end < start ||
    start >= size
  ) {
    return "invalid";
  }

  return {
    start,
    end: Math.min(end, size - 1),
  };
}

function getServedContentRoot(requestPath) {
  if (requestPath.startsWith("/content/applets/")) {
    return { urlPrefix: "/content/applets/", fileRoot: appletsRoot };
  }

  if (requestPath.startsWith("/content/manim/")) {
    return { urlPrefix: "/content/manim/", fileRoot: manimRoot };
  }

  if (requestPath.startsWith("/content/shared/")) {
    return { urlPrefix: "/content/shared/", fileRoot: sharedContentRoot };
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
