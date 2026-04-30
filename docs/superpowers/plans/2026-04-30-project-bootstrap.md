# Project Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the repository and create durable project context anchors for the Shanghai Education Press high school mathematics digital teaching-aid platform.

**Architecture:** This bootstrap creates a documentation-first monorepo skeleton. It separates platform apps, shared packages, curriculum data, Applet resources, Manim resources, scripts, and project governance docs so future Codex sessions can resume from stable context files.

**Tech Stack:** Git, Markdown, YAML, future TypeScript/React, future Python/Manim.

---

### Task 1: Repository Initialization

**Files:**
- Create: `.gitignore`
- Create: `README.md`

- [x] **Step 1: Initialize Git**

Run:

```bash
git init -b main
```

Expected: repository initialized with `main` as the default branch.

- [x] **Step 2: Add ignore rules**

Create `.gitignore` with local scratch, build, dependency, environment, and Manim output ignores.

- [x] **Step 3: Add root README**

Create `README.md` with platform positioning, key docs, and initial directory map.

### Task 2: Context Anchor Documents

**Files:**
- Create: `docs/00-project-brief.md`
- Create: `docs/01-current-state.md`
- Create: `docs/02-next-actions.md`

- [x] **Step 1: Capture project brief**

Document the route-2 platform positioning, resource package model, MVP scope, and exclusions.

- [x] **Step 2: Capture current state**

Document the two input research documents, adopted strategy, initialized skeleton, unfinished items, and files to read first in future sessions.

- [x] **Step 3: Capture next actions**

Document P0 through P4 work queues: governance, curriculum graph, resource standards, trig sample pack, and platform shell.

### Task 3: Governance Documents

**Files:**
- Create: `docs/git-workflow.md`
- Create: `docs/content-standards.md`
- Create: `docs/adr/0001-route-2-platform-architecture.md`

- [x] **Step 1: Define Git workflow**

Document `main`, `develop`, `release/*`, `track/*`, short branch naming, commit conventions, resource versioning, and resource status flow.

- [x] **Step 2: Define content standards**

Document when to use Applet, when to use Manim, how to combine them, Applet design rules, required resource files, and review dimensions.

- [x] **Step 3: Record architecture decision**

Document why route 2 was selected over a static tool library or all-in AI/UGC platform.

### Task 4: Content Data Entrypoints

**Files:**
- Create: `content/curriculum/index.yaml`
- Create: `content/applets/README.md`
- Create: `content/manim/README.md`

- [x] **Step 1: Create curriculum index**

Create the root curriculum YAML with project metadata, volume list, theme strands, resource type definitions, and MVP focus.

- [x] **Step 2: Create Applet content guide**

Create a guide explaining where interactive Applet resources live and the required file set.

- [x] **Step 3: Create Manim content guide**

Create a guide explaining where Manim resources live and the required file set.

### Task 5: Workspace Verification and First Commit

**Files:**
- Verify all created files.
- Commit all bootstrap files and existing research documents.

- [x] **Step 1: Inspect status**

Run:

```bash
git status --short
```

Expected: new docs, content files, root README, `.gitignore`, and existing research documents are listed.

- [x] **Step 2: Verify required files exist**

Run:

```bash
test -f docs/00-project-brief.md && test -f docs/git-workflow.md && test -f content/curriculum/index.yaml
```

Expected: exit code 0.

- [x] **Step 3: Commit bootstrap**

Run:

```bash
git add .
git commit -m "docs: bootstrap digital teaching-aid platform"
```

Expected: initial commit created on `main`.
