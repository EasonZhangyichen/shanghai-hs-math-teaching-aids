import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "./",
  server: {
    port: 5173,
  },
  build: {
    outDir: "../../dist/apps/web",
    emptyOutDir: true,
  },
});
