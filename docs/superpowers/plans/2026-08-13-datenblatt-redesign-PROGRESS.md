# Datenblatt Redesign — Progress Report

**Last updated:** 2026-08-13
**Branch:** `redesign/datenblatt` (branched from `main` @ `d1cdbf3`)
**Plan:** [`2026-08-13-datenblatt-redesign.md`](./2026-08-13-datenblatt-redesign.md)
**Spec:** [`../specs/2026-08-13-datenblatt-redesign-design.md`](../specs/2026-08-13-datenblatt-redesign-design.md)

## Status: 3 of 17 tasks done (Tasks 0–1 complete)

⚠️ **The branch is mid-migration and must not be deployed yet.** `hooks.server.ts` now
301-redirects `/about`, `/skills`, … but those route folders still exist (they are deleted in
Task 14). Until then those pages are unreachable on this branch. `main` is untouched and healthy.

## Commits on the branch

| SHA       | Task | What                                                                                                   |
| --------- | ---- | ------------------------------------------------------------------------------------------------------ |
| `d8f71a3` | 0    | Removed `@fontsource/fira-mono`; added `@fontsource/archivo@5.3.0` + `@fontsource/ibm-plex-mono@5.3.0` |
| `6b9054b` | 1    | `src/hooks.server.ts` + `src/hooks.server.test.ts` — 301 redirect map, **10/10 tests passing**         |

On `main` (already merged, docs only): `65e4a0f` design spec, `d1cdbf3` implementation plan.

## Decisions locked in (from brainstorming)

| Topic           | Decision                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| Structure       | Pure one-pager at `/` with sections 01–08; `/datenschutz` + `/danke` kept                              |
| Contact form    | **Kept** — moves into section 08, action moves to `src/routes/+page.server.ts`                         |
| Retired routes  | 301 → anchors via `hooks.server.ts` ✅ done                                                            |
| Mobile (<900px) | Fixed top bar (name · section num · theme toggle · INDEX) + full-screen 01–08 overlay                  |
| Old effects     | All removed (bg-drift, scroll-progress, tilt-card, rotating tagline, StickyCta); reveal-on-scroll kept |
| Contact email   | `laurent.scherrer@gmx.ch` — the mockup's komaxgroup.com address is deliberately **not** used           |
| Response time   | "48 Stunden" replaces every `[X]` placeholder                                                          |
| Approach        | A — in-place rewrite, one coherent merge                                                               |
| Fonts           | Self-hosted (no Google CDN — GDPR, since the site runs consent-gated GA4)                              |

## Remaining work — pick up at Task 2

Every remaining task has complete, copy-pasteable code in the plan document. Resume with:

> Execute `docs/superpowers/plans/2026-08-13-datenblatt-redesign.md` starting at Task 2.

- **Task 2 — Data layer.** Rewrite `navigation.ts` → `sections[]`; `site.ts` → `responseTime`/
  `responseTimePromise` + 2-entry `publicPages`; `faq.ts` placeholder removal + 48h; `skills.ts`
  category rename `Sprachen` → `Sprachen & Markup`; create `lab.ts` + `notes.ts`; delete
  `testimonials.ts` + `caseStudies.ts`. _(Type errors are expected after this task and resolve by Task 14.)_
- **Task 3 — `layout.css` full rewrite** (paper/ink/copper tokens, Archivo + IBM Plex Mono
  `@import`s, `.spec-row`, `pulseflow`, simplified `.reveal`) + `app.html` `theme-color` → `#151412`.
- **Task 4 — `ThemeToggle` (text button) + `Section` (numbered eyebrow wrapper).**
- **Task 5 — `Sidebar.svelte`** — desktop 264px rail, mobile top bar + overlay, IntersectionObserver scrollspy.
- **Task 6 — `+layout.svelte`** — sidebar shell, `min-[900px]:ml-[264px]` main offset.
- **Tasks 7–13 — Sections 01–08:** Hero/Profil, Timeline/Werdegang, Skills, Projects, Education,
  Lab, Notes, Faq restyle, Contact/Kontakt.
- **Task 14 — One-pager route** + `git mv` contact action to root + delete 8 route dirs and 6 dead components.
- **Task 15 — Restyle sweep:** `+error.svelte`, `danke`, `datenschutz`, `CookieConsent`.
  Ends with a grep gate: `grep -rn "var(--surface\|var(--text\|var(--accent\|var(--highlight\|var(--ring\|var(--border" src/` must return nothing.
- **Task 16 — Verification:** `npm run check`, `npx vitest run --project server`, `npm run lint`,
  `npm run build`, then a visual pass at 1280px + 390px in both themes.

## Notes for whoever resumes

- The Svelte MCP server (`svelte-autofixer`) should be run over each new/rewritten `.svelte`
  file before committing it — it was not available for Tasks 0–1 (no Svelte code written yet).
- `npm run check` will report errors between Task 2 and Task 14 because data exports are removed
  before their consumers are rewritten. That is expected; the gate is Task 16, not each task.
- Playwright MCP was intermittently disconnected this session. If it is unavailable at Task 16,
  fall back to `npm run build && npm run preview` plus manual inspection, and say so in the report
  rather than claiming a visual pass that did not happen.
- The token rename map for kept files lives in the plan's "Conventions" block — use it verbatim
  so no stale `var(--accent)` survives.
