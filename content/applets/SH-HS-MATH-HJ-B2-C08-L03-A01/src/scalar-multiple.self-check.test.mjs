import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = await readFile(join(__dirname, "index.html"), "utf8");

test("scalar multiple applet exposes the required exploration controls and states", () => {
  assert.match(html, /data-testid="lambda-slider"/);
  assert.match(html, /data-testid="vector-board"/);
  assert.match(html, /data-testid="drag-base-vector"/);
  assert.match(html, /lambda-sign-positive/);
  assert.match(html, /lambda-sign-zero/);
  assert.match(html, /lambda-sign-negative/);
  assert.match(html, /零向量/);
  assert.match(html, /方向相反/);
  assert.match(html, /applet:state_changed/);
});
