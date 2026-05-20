# B2-C08 Platform Iframe Regression Audit

- Branch: `codex/audit-b2-c08-platform-iframe-regression`
- Audited base commit: `b69b6e97244be069d86248f6e33c9b49ff488938`
- Date: 2026-05-20
- Scope: platform entrance and B2-C08 implemented preview behavior only. Resource content was not changed.
- Browser target: `http://127.0.0.1:5175/` from an isolated clean worktree. `5174` was requested, but Vite selected `5175` because `5174` was already in use.

## Validation

- `npm ci`: completed for the isolated worktree; npm reported 1 high severity dependency audit item.
- `npm run validate:content`: passed, with 70 lessons, 14 applets, 4 Manim clips, and 7 diagnosis packages.
- `npm run verify`: passed. This included `validate:content`, `generate:backlog`, tests, and production build. Test result: 36 passed, 0 failed.
- `npm run dev -- --port 5174`: dev server started; served on `http://127.0.0.1:5175/`.

## Data Contract Check

| Lesson | Applet | Player | Src | Sandbox |
| --- | --- | --- | --- | --- |
| B2-C08 L01 | `SH-HS-MATH-HJ-B2-C08-L01-A01` | `iframe` | `content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/src/index.html` | `allow-scripts allow-same-origin` |
| B2-C08 L02 | `SH-HS-MATH-HJ-B2-C08-L02-A01` | `iframe` | `content/applets/SH-HS-MATH-HJ-B2-C08-L02-A01/src/index.html` | `allow-scripts allow-same-origin` |
| B2-C08 L03 | `SH-HS-MATH-HJ-B2-C08-L03-A01` | `iframe` | `content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/src/index.html` | `allow-scripts allow-same-origin` |
| B2-C08 L04 | `SH-HS-MATH-HJ-B2-C08-L04-A01` | `iframe` | `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/index.html` | `allow-scripts allow-same-origin` |
| B2-C08 L05 | `SH-HS-MATH-HJ-B2-C08-L05-A01` | `iframe` | `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html` | `allow-scripts allow-same-origin` |
| B2-C08 L10 | `SH-HS-MATH-HJ-B2-C08-L10-A01` | `iframe` | `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/index.html` | `allow-scripts allow-same-origin` |

## Browser Review

- Page identity: title resolved to `沪教版高中数学教师工作台`; URL hash routed correctly for target lessons.
- Blank page / overlay: meaningful platform content rendered; no Vite or framework error overlay observed.
- Console health: `tab.dev.logs({ levels: ["error", "warn"] })` returned `[]` after page load and after interaction checks.
- Iframe visibility: L01/L02/L03/L04/L05/L10 applet players were visible in the resource detail panel; each iframe reported height `560` and the expected `data-player-resource-id`.
- Selection state: selected resource cards used `resource-card is-selected`; search result selection used `search-result is-selected` plus `aria-pressed="true"`; selection status text showed `已选资源`.
- Resource switching scroll: after scrolling the search results from `0` to `520`, selecting L10 did not reset to top. The post-click state kept the result list at a nonzero position (`2737`) and focused the preview panel (`windowScrollY: 1558`, panel top `0`).
- Video scrubber: selecting `SH-HS-MATH-HJ-B2-C08-L04-M01` showed the WebM source `content/manim/SH-HS-MATH-HJ-B2-C08-L04-M01/dist/final/SH-HS-MATH-HJ-B2-C08-L04-M01.webm`; duration loaded as `36.8`, scrubber was enabled, and filling the range to `650` moved video time from `0:00 / 0:36` to `0:23 / 0:36`.

## Findings

No blocking platform shell or B2-C08 resource adaptation issues found in this scope.

Notes outside the audit scope:

- Vite build still reports the existing chunk-size warning for the generated app bundle.
- `npm ci` reports 1 high severity dependency audit item.
- Browser runtime emitted external Statsig network warnings during automation, but the inspected app tab console remained clean.

## Required Summary

- Branch name: `codex/audit-b2-c08-platform-iframe-regression`
- Audited base commit: `b69b6e97244be069d86248f6e33c9b49ff488938`
- Changed files: `docs/review-audits/b2-c08-platform-iframe-regression-2026-05-20.md`
- Validation commands run: `npm ci`; `npm run validate:content`; `npm run verify`; `npm run dev -- --port 5174`; browser checks on `http://127.0.0.1:5175/`
- Validation result: passed
- Suggested status: pass
- Remaining risk: only desktop in-app browser was manually exercised; dependency audit/chunk-size warnings were observed but not remediated in this audit.
- Modified global generated files: no
- Modified curriculum map: no
- Needs controller attention: no
