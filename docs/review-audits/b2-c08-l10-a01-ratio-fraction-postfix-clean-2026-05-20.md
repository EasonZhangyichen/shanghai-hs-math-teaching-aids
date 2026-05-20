# B2-C08-L10-A01 ratio/fraction postfix clean audit

- Branch: `codex/audit-b2-c08-l10-ratio-fraction-postfix-clean`
- Audited base commit: `21bea83`
- Date: 2026-05-20
- Scope: `SH-HS-MATH-HJ-B2-C08-L10-A01` ratio/fraction display, 864x560 equivalent iframe first viewport, slider/readout visibility, and status boundary. Resource code was not changed by this audit.
- Audit-authored files: this report only.

## Controller Intake Note

- Controller intake branch: `codex/integrate-b2-c08-audit-reports-20260520`.
- Controller intake base: current `develop` at `ec94106`, after B2-C08 source-boundary wording was tightened.
- Controller reran `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/platform-fit.self-check.test.mjs` on `ec94106`; the result remains 4/5 because the resource-local test still expects the older exact no-upgrade sentence in `review.md`.
- This is accepted as a follow-up test-wording repair item, not as evidence for any status upgrade. Keep `hold_for_platform_iframe_fit` and keep the resource at `draft` / `self_checked_draft`.

## Findings

No blocking ratio/fraction or 560px iframe first-viewport issue was found in the requested scope.

Non-blocking worktree note: during this audit, unrelated resource-review edits appeared in the shared worktree and were left untouched. With those edits present, the optional resource-local check `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/platform-fit.self-check.test.mjs` fails 1 of 5 tests because it expects the older exact `review.md` no-upgrade sentence. The edited review text still states no upgrade via `本轮不触发更高正式流转`, and the required project validations pass. This is a brittle self-check text assertion under the current dirty worktree, not a rendered math or iframe-fit failure.

## Required Confirmations

| Item | Result | Evidence |
| --- | --- | --- |
| Fractions are mathematical stacked forms, not horizontal text | Pass | Runtime DOM at 864x560 found visible `.frac` nodes for `AD` over `AB` and `AE` over `AC`; visible text scan found no `AD/AB`, `AE/AC`, `AB/AC`, `AB/BC`, or common numeric slash fraction forms in classroom-visible ratio/basis areas. The label `数量积/坐标法` is a method name, not a fraction. |
| 864x560 equivalent iframe first viewport is reasonable | Pass with scope note | Platform page at `1280x720` produced L10 iframe `864x560`. Direct applet at `864x560` reported `documentElement.scrollHeight = 560`; board bottom `329`, slider panel bottom `389`, readout grid bottom `239`, path equation bottom `370`, basis selector bottom `440`, and basis equation bottom `522`. |
| Slider and readout areas are visible | Pass | At `864x560`, `m/n` sliders are in the slider panel ending at `389px`; current readouts end at `239px`. After setting `m = 0.65`, `n = 0.65`, selecting `D -> B -> C -> E`, and switching to `AB,BC`, readouts and equations stayed visible and updated. |
| `hold_for_platform_iframe_fit` still needs retention | Retain | Internal 560px fit is acceptable for core controls, but the platform iframe itself is still below the platform page first viewport, and real projector/touch/Safari/low-spec classroom devices were not covered. Keep the hold as controller-review tracking, not as evidence for status upgrade. |
| Status must not upgrade | Pass | `metadata.yaml` remains `status: draft`; `compliance.review_status` remains `self_checked_draft`. This audit recommends no upgrade to `math_review`, `browser_review`, `classroom_trial`, `release_candidate`, or `published`. |

## Browser Review

- Browser target: `http://127.0.0.1:5176/`; `5174` was already occupied by another local process, so this audit used `5176`.
- Platform route: `/#lesson=SH-HS-MATH-HJ-B2-C08-L10`.
- Platform viewport: `1280x720`, confirming iframe `src = content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/index.html`, sandbox `allow-scripts allow-same-origin`, dimensions `864x560`.
- Direct equivalent viewport: `864x560`, used to inspect iframe-internal layout because the platform sandbox prevents direct child-document inspection through the parent page.
- Interaction proof: selected `D -> B -> C -> E`, selected basis `AB 与 BC`, filled `m` to `0.65` while `n = 0.65`; formula rendered `DE = AE - AD = 0.65r`, with no leading plus sign and no relevant console errors/warnings.
- Screenshot evidence was checked during browser review; the visible viewport showed the board, slider panel, readouts, path equation, basis selector, and basis equation without overlap.

## Validation

- `npm run validate:content`: passed. Output: `Content validation passed: 70 lessons, 14 applet(s), 4 Manim clip(s), 7 diagnosis package(s).`
- `npm run verify`: passed on the target branch. This included content validation, backlog generation, 36 node tests, and Vite build. Vite still reports the existing single chunk over 500 kB warning.
- Additional optional command: `node --test content/applets/SH-HS-MATH-HJ-B2-C08-L10-A01/src/platform-fit.self-check.test.mjs`: failed 1/5 under the current dirty worktree due to the exact `review.md` status-sentence assertion described above.

## Required Summary

- Branch name: `codex/audit-b2-c08-l10-ratio-fraction-postfix-clean`
- Audited base commit: `21bea83`
- Audit-authored changed files: `docs/review-audits/b2-c08-l10-a01-ratio-fraction-postfix-clean-2026-05-20.md`
- Validation commands run: `npm run validate:content`; `npm run verify`; browser checks on `http://127.0.0.1:5176/`; optional resource self-check noted separately
- Validation result: required validations passed
- Suggested status: keep `draft` / `self_checked_draft`; keep `hold_for_platform_iframe_fit`; do not upgrade
- Remaining risk: true classroom projector/touch/Safari/low-spec devices and platform-page scroll cost remain unverified
- Modified global generated files: no
- Modified curriculum map: no
- Needs controller attention: yes, if the optional resource-local self-check is expected to be part of future L10 gate runs
