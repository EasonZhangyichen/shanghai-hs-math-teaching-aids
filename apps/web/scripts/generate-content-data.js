import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadTeacherWorkspace } from "../src/lib/content.js";

const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const outputPath = path.join(repoRoot, "apps/web/src/data/workspace-data.json");

const workspace = await loadTeacherWorkspace({ rootDir: repoRoot });

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(workspace, null, 2)}\n`, "utf8");

console.log(`Generated ${path.relative(repoRoot, outputPath)} from ${workspace.sources.curriculum}`);
