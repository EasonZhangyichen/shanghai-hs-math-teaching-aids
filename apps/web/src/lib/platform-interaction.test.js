import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, test } from "node:test";

const mainSource = await readFile(new URL("../main.js", import.meta.url), "utf8");
const styleSource = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const viteConfigSource = await readFile(new URL("../../vite.config.js", import.meta.url), "utf8");
const packageSource = await readFile(new URL("../../../../package.json", import.meta.url), "utf8");

describe("platform resource interaction affordances", () => {
  test("resource selection preserves search scroll and reveals the selected preview", () => {
    assert.match(mainSource, /function render\(options = \{\}\)/);
    assert.match(mainSource, /getSearchResultsScrollTop/);
    assert.match(mainSource, /restoreSearchResultsScrollTop/);
    assert.match(mainSource, /focusResourceDetail/);
    assert.match(mainSource, /data-resource-detail-panel/);
    assert.match(mainSource, /selection-status/);
    assert.match(styleSource, /\.selection-status/);
    assert.match(styleSource, /\.search-results[\s\S]*max-height:\s*clamp\(/);
  });

  test("video previews expose a platform scrubber in addition to native controls", () => {
    assert.match(mainSource, /data-video-player/);
    assert.match(mainSource, /data-video-scrubber/);
    assert.match(mainSource, /syncVideoScrubber/);
    assert.match(mainSource, /seekVideoFromScrubber/);
    assert.match(styleSource, /\.video-scrubber/);
    assert.match(styleSource, /\.video-scrubber input\[type="range"\]/);
  });

  test("local content middleware serves video files with byte range support", () => {
    assert.match(viteConfigSource, /Accept-Ranges/);
    assert.match(viteConfigSource, /Content-Range/);
    assert.match(viteConfigSource, /statusCode = 206/);
    assert.match(viteConfigSource, /createReadStream\(filePath, \{ start, end \}\)/);
  });

  test("the platform interaction regression test is part of the npm test suite", () => {
    const packageJson = JSON.parse(packageSource);
    assert.match(packageJson.scripts.test, /platform-interaction\.test\.js/);
  });
});
