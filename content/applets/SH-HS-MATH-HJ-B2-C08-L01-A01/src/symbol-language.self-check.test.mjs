import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("./index.html", import.meta.url), "utf8");
const studentTask = await readFile(new URL("../student-task.md", import.meta.url), "utf8");
const teacherScript = await readFile(new URL("../teacher-script.md", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const metadata = await readFile(new URL("../metadata.yaml", import.meta.url), "utf8");
const classroomText = [source, studentTask, teacherScript, readme].join("\n");

test("visible equality language names vectors instead of bare endpoint pairs", () => {
  assert.doesNotMatch(classroomText, /AB\s*=\s*CD\s*=\s*0/);
  assert.doesNotMatch(classroomText, /AB\s*(与|和)\s*CD/);
  assert.doesNotMatch(classroomText, /CD\s*(与|和)\s*AB/);
  assert.match(source, /向量 AB 与向量 CD 表示同一向量/);
  assert.match(source, /向量 AB 和向量 CD 都是零向量/);
  assert.match(studentTask, /向量 AB 与向量 CD 是否相等/);
  assert.match(teacherScript, /向量 AB 与向量 CD 的等价证据/);
});

test("resource status remains a draft self-check without coordinate wording", () => {
  assert.match(metadata, /^status:\s*draft$/m);
  assert.match(metadata, /review_status:\s*self_checked_draft/);
  assert.doesNotMatch(classroomText, /坐标|coordinate|component/i);
});
