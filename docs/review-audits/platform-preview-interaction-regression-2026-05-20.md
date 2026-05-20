# Platform Preview Interaction Regression Audit

- Branch: `codex/audit-platform-preview-interaction-regression`
- Audited base commit: `21bea8308fbcb4cb479ae08dac72d7840dc465d6`
- Date: 2026-05-20
- Scope: platform resource selection, search-result scroll preservation, selected-resource feedback, Manim video scrubber, and B2-C08 iframe visibility/contracts. Platform code and resource packages were not changed.
- Browser target: `http://127.0.0.1:5174/`

## Controller Intake Note

- Controller intake branch: `codex/integrate-b2-c08-audit-reports-20260520`.
- Controller intake base: current `develop` at `ec94106`, after platform math rendering, source-boundary wording, and rule-document updates.
- The worker browser audit was performed on base `21bea83`; the later accepted changes do not alter the platform resource-selection, preview-focus, iframe-contract, or video-scrubber implementation paths covered here.
- This report remains docs-only and does not change resource state.

## Validation

- `npm run validate:content`: passed, with 70 lessons, 14 applets, 4 Manim clips, and 7 diagnosis packages.
- `npm run verify`: passed. This included `validate:content`, `generate:backlog`, Node tests, and Vite production build. Test result: 36 passed, 0 failed.
- `npm run dev -- --port 5174`: dev server started on `http://127.0.0.1:5174/`.
- Vite build retained the existing chunk-size warning for the generated app bundle.
- Working tree stayed clean after validation; no generated files are included in this audit.

## Browser Review

- In-app Browser at `1280x720`: page title resolved to `沪教版高中数学教师工作台`; page content was meaningful; no Vite/framework error overlay; app tab console returned `[]` for warn/error on initial load.
- Resource search selection path: from the global search results, clicking `SH-HS-MATH-HJ-B2-C08-L10-A01` routed to `#lesson=SH-HS-MATH-HJ-B2-C08-L10`, kept the search-results scroll at a nonzero position (`2737`), applied `search-result is-selected` and `aria-pressed="true"`, and focused the resource-detail panel at the top of the viewport (`detailPanelTop ~= 0`).
- Selected-resource feedback: the selected detail panel showed `资源详情`, `SH-HS-MATH-HJ-B2-C08-L10-A01@0.1.0`, the selected resource title, status chips, and the live iframe preview in the first visible area after click. The resource card also held `resource-card is-selected`.
- Manim scrubber: selecting `SH-HS-MATH-HJ-B2-C08-L04-M01` exposed WebM and MP4 sources, loaded duration `36.8`, enabled the custom range scrubber, and displayed `0:00 / 0:36`.
- Native drag confirmation: in system Chrome driven by Playwright, dragging the scrubber thumb moved `currentTime` from `0` to `23.956799`, range value from `0` to `651`, and the label to `0:23 / 0:36`.
- Automation note: the in-app Browser CUA coordinate drag/click did not move the native `<input type="range">`; because system Chrome native mouse drag passed, this is treated as an automation limitation, not a platform blocker.

## Iframe Contract Check

All target iframe resources rendered real applet content inside the frame. At `1280x720`, each iframe measured about `864 x 560`; iframe document metrics were `clientHeight = scrollHeight = 560` and `clientWidth = scrollWidth = 864`, so no internal iframe scrolling was required.

| Lesson | Resource | Frame title | Src | Sandbox | Allow |
| --- | --- | --- | --- | --- | --- |
| B2-C08 L01 | `SH-HS-MATH-HJ-B2-C08-L01-A01` | 向量表示与等价拖拽板 | `content/applets/SH-HS-MATH-HJ-B2-C08-L01-A01/src/index.html` | `allow-scripts allow-same-origin` | `fullscreen` |
| B2-C08 L02 | `SH-HS-MATH-HJ-B2-C08-L02-A01` | 向量加减法构造器 | `content/applets/SH-HS-MATH-HJ-B2-C08-L02-A01/src/index.html` | `allow-scripts allow-same-origin` | `fullscreen` |
| B2-C08 L03 | `SH-HS-MATH-HJ-B2-C08-L03-A01` | 数乘伸缩实验室 | `content/applets/SH-HS-MATH-HJ-B2-C08-L03-A01/src/index.html` | `allow-scripts allow-same-origin` | `fullscreen` |
| B2-C08 L04 | `SH-HS-MATH-HJ-B2-C08-L04-A01` | 投影长度与夹角实验室 | `content/applets/SH-HS-MATH-HJ-B2-C08-L04-A01/src/index.html` | `allow-scripts allow-same-origin` | `fullscreen` |
| B2-C08 L05 | `SH-HS-MATH-HJ-B2-C08-L05-A01` | 数量积动态解释器 | `content/applets/SH-HS-MATH-HJ-B2-C08-L05-A01/src/index.html` | `allow-scripts allow-same-origin` | `fullscreen` |
| B2-C08 L10 | `SH-HS-MATH-HJ-B2-C08-L10-A01` | 向量法路径比较板 | `content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/index.html` | `allow-scripts allow-same-origin` | `fullscreen` |

## Findings

No blocking regression found in this audit scope.

Notes outside blocker scope:

- Chrome reports the expected sandbox warning for iframes that combine `allow-scripts` and `allow-same-origin`; this matches the current project contract and was not changed here.
- Direct lesson-hash loads place the preview section below the first viewport as part of the platform layout; user selection paths call `focusResourceDetail()` and make the selected preview prominent after click.
- Browser runtime emitted external Statsig network warnings during automation; app-tab console checks and system Chrome page checks did not show platform runtime errors beyond the sandbox warning above.

## Required Summary

- Branch name: `codex/audit-platform-preview-interaction-regression`
- Audited base commit: `21bea8308fbcb4cb479ae08dac72d7840dc465d6`
- Changed files: `docs/review-audits/platform-preview-interaction-regression-2026-05-20.md`
- Validation commands run: `npm run validate:content`; `npm run verify`; `npm run dev -- --port 5174`; in-app Browser checks on `http://127.0.0.1:5174/`; system Chrome Playwright checks for native scrubber drag and iframe contracts
- Validation result: passed
- Suggested status: pass
- Remaining risk: desktop browser automation only; no physical touch screen, projector, Safari, or low-end Windows teacher machine was exercised.
- Modified global generated files: no
- Modified curriculum map: no
- Needs controller attention: no
