# Unit Circle Sine Applet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the first runnable HTML Applet for `SH-HS-MATH-HJ-B2-C07-L01-A01`, showing how a unit-circle point generates the sine graph.

**Architecture:** Keep the applet self-contained under its resource package so it can be opened directly or embedded later by the platform player. Use one `src/index.html` file with native SVG, CSS, and JavaScript; communicate with the future iframe player through the Applet SDK `postMessage` envelope.

**Tech Stack:** Native HTML/CSS/SVG/JavaScript, Node test runner, existing YAML metadata loader, Vite build.

---

### Task 1: Resource Package Contract

**Files:**
- Modify: `apps/web/src/lib/content.test.js`
- Modify: `content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/metadata.yaml`
- Create: `content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/src/index.html`

- [ ] **Step 1: Write failing tests**

Add assertions that the sample applet has a runnable implementation phase, declares `src/index.html`, and that the HTML entry contains the SDK identifiers required by the player contract.

- [ ] **Step 2: Run test to verify failure**

Run: `npm test`

Expected: FAIL because `src/index.html` does not exist and metadata still says `content_spec_only`.

- [ ] **Step 3: Implement minimal package entry**

Create `src/index.html` and update metadata implementation fields:

```yaml
implementation:
  phase: "runnable_prototype"
  html_src_status: "runnable"
  planned_engine: "native-svg"
  src_entry: "src/index.html"
```

- [ ] **Step 4: Run test to verify pass**

Run: `npm test`

Expected: PASS.

### Task 2: Interactive Math Prototype

**Files:**
- Modify: `content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/src/index.html`

- [ ] **Step 1: Build the applet controls**

Add a classroom-oriented interface with theta slider, play/pause, reset, projection toggle, trace toggle, key-point toggle, and period-extension toggle.

- [ ] **Step 2: Build the SVG visualization**

Render the unit circle, moving point `P`, projection line, graph point `Q = (theta, sin theta)`, generated trace, key angle markers, and a compact state readout.

- [ ] **Step 3: Implement interaction**

Support slider changes, pointer dragging on the unit circle, play loop, reset, and stable redraw on window resize.

- [ ] **Step 4: Implement SDK events**

Send `applet:ready` after initialization and `applet:stateChanged` whenever theta or display toggles change. Respond to `player:init`, `player:setState`, `player:command`, `player:setMode`, `player:resize`, and `player:requestState`.

### Task 3: Documentation And Verification

**Files:**
- Modify: `content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/README.md`
- Modify: `content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/review.md`
- Modify: `docs/01-current-state.md`
- Modify: `docs/02-next-actions.md`

- [ ] **Step 1: Update resource docs**

Record that the resource now has a runnable native SVG prototype and list what remains before math review.

- [ ] **Step 2: Update project state docs**

Mark the first HTML Applet as created and leave player iframe integration as the next platform task.

- [ ] **Step 3: Run full verification**

Run: `npm run verify`

Expected: all Node tests pass and the Vite build succeeds.

- [ ] **Step 4: Browser verification**

Open `content/applets/SH-HS-MATH-HJ-B2-C07-L01-A01/src/index.html` through a local static server or file URL. Check desktop and mobile screenshots for nonblank SVG, visible controls, drag/slider interaction, and no overlapping text.
