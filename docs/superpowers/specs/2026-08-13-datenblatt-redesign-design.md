# Datenblatt Redesign — Design Spec

**Date:** 2026-08-13
**Status:** Approved (structure, mobile, effects, email, response time, approach A confirmed by Laurent; remainder delegated)
**Reference:** `Neue Website.dc.html` mockup (visual spec — its rendering is authoritative, its code is not)

## 1. Goal

Replace the current purple-gradient, multi-page portfolio with the "Datenblatt" (spec-sheet)
aesthetic from the mockup: flat paper surfaces, hairline rules, one copper accent,
Archivo + IBM Plex Mono, a fixed sidebar index with scrollspy, and all content as a
single numbered one-pager (sections 01–08).

## 2. Decisions made with the user

| Topic | Decision |
|---|---|
| Structure | **Pure one-pager** at `/`. Sub-routes retired. `/datenschutz` + `/danke` kept. |
| Contact form | **Kept** — moved into section 08; server action moves to root route. |
| Redirects | 301s for all 8 retired routes via `src/hooks.server.ts`. |
| Mobile (<900px) | Compact fixed top bar (name · current section number · theme toggle · hamburger) with full-screen 01–08 overlay. All grids stack to one column; headline scales with `clamp()`. |
| Old effects | All removed: bg-drift gradients, scroll-progress bar, tilt-card glow, rotating terminal tagline, StickyCta. Kept: reveal-on-scroll, smooth scroll, theme transition. |
| Contact email | `laurent.scherrer@gmx.ch` (mockup's komaxgroup.com address is a slip — private/work separation). |
| Response time | "Ich antworte innerhalb von **48 Stunden**." (replaces `[X]` everywhere). |
| Approach | **A** — in-place rewrite on branch `redesign/datenblatt`, single coherent merge. |
| Fonts | Self-hosted `@fontsource/archivo` + `@fontsource/ibm-plex-mono` (GDPR: no Google CDN). |

## 3. Routing & architecture

```
src/routes/
  +layout.svelte        Sidebar shell + <main> offset, reveal action, CookieConsent, Analytics
  +page.svelte          Datenblatt one-pager, renders sections 01–08
  +page.server.ts       contact action (moved verbatim from contact/+page.server.ts, name `contact`)
  +error.svelte         restyled to Datenblatt look
  danke/+page.svelte    kept, restyled
  datenschutz/          kept, restyled
  api/health/           kept
  robots.txt/           kept
  sitemap.xml/          kept — now emits / and /datenschutz only
src/hooks.server.ts     NEW — 301 redirect map
```

Redirect map (301): `/about→/#a-profil`, `/experience→/#a-werdegang`, `/skills→/#a-skills`,
`/projects→/#a-projekte`, `/education→/#a-ausbildung`, `/lab→/#a-lab`, `/notes→/#a-notes`,
`/contact→/#a-kontakt`.

Section IDs (from mockup): `a-profil, a-werdegang, a-skills, a-projekte, a-ausbildung, a-lab, a-notes, a-kontakt`.

## 4. Design system (`src/routes/layout.css`)

Replace the ink/purple `@theme` tokens with:

| Token | Light | Dark (`.dark`) |
|---|---|---|
| `--paper` | `#FAFAF7` | `#151412` |
| `--ink` | `#171614` | `#EDEBE6` |
| `--muted` | `#6E6B64` | `#8F8B82` |
| `--line` | `#E2DFD7` | `#2C2A26` |
| `--line-strong` | `#C9C5BA` | `#403D37` |
| `--copper` | `#B45309` | `#D9803E` |
| `--copper-soft` | `rgba(180,83,9,.09)` | `rgba(217,128,62,.12)` |
| `--card` | `#FFFFFF` | `#1B1A17` |

- `--font-sans`: Archivo; `--font-mono`: IBM Plex Mono. Remove Inter reference and `@fontsource/fira-mono`.
- **No border-radius** anywhere. Square corners, 1px hairlines.
- Keep: `.reveal`/`.is-visible` animation, `:focus-visible` outline (copper), `::selection`
  (copper), smooth scroll + `scroll-padding-top`, `prefers-reduced-motion` block.
- Delete: `body::before` gradients, `bg-drift`, `.scroll-progress`, `.tilt-card`.
- Add: `.spec-row:hover { background: var(--copper-soft) }`, `pulseflow` keyframes
  (circuit-trace SVG dash animation).
- Theme mechanism unchanged: `.dark` class on `<html>`, existing `theme.svelte.ts` store,
  existing localStorage key `theme`, default dark, `app.html` inline script unchanged
  (only `theme-color` meta updated to `#151412`).

## 5. Components

| Component | Fate | Notes |
|---|---|---|
| `Sidebar.svelte` | NEW | Desktop ≥900px: fixed 264px left rail — "LEBENSLAUF / 2026", name, subtitle, nav 01–08 (scrollspy: copper text + copper-soft bg for active), theme toggle "MODUS: DUNKEL/HELL", location/nationality/birth line. Mobile: fixed top bar (name, active section number, theme toggle, hamburger) + full-screen overlay with the numbered index; overlay closes on selection/Escape, locks body scroll, `aria-expanded` on trigger. Scrollspy via IntersectionObserver (`rootMargin: '-30% 0px -60% 0px'`), disabled on non-root routes where nav items link to `/#hash`. |
| `Section.svelte` | rewrite | Props: `id`, `num`, `title`, optional `lead`. Renders top hairline (`--line-strong`), mono eyebrow `NN — TITEL` in copper, optional lead paragraph. First section (01) has no top hairline. |
| `Hero.svelte` | rewrite | **01 Profil.** Headline "Strom verstanden. / Jetzt Code." (`clamp(2.5rem, 8vw, 5.5rem)`, "Jetzt Code." copper). Circuit-trace SVG (aria-hidden, `pulseflow`). Spec `<dl>`: NAME, STANDORT, JAHRGANG, NATIONALITÄT, SPRACHEN, STATUS, ANTWORTZEIT — from `profile.ts` + `site.ts`. Portrait with copper corner brackets + caption "ABB. 1 — SCHERRER, LAURENT LUCIEN". Bio paragraph from `profile.ts`. Hobbies line "AUSSERHALB DES BÜROS" from `interests.ts`. Rotating tagline removed. |
| `Timeline.svelte` | rewrite | **02 Werdegang.** Per `experience.ts` entry: `grid-cols-[200px_1fr]` (stacked <900px): period + location mono left; role (26px), company mono copper, summary, `→` highlight list, tags as mono tagline (`tags.join(' · ').toUpperCase()`). |
| `Skills.svelte` | rewrite | **03 Skills.** Lead sentence re L1–L5 scale. Two-column grid (1 col mobile) of `skills.ts` groups: mono group title + zero-padded count, rows with name, dotted leader, 5-tick meter (filled = copper, empty = line-strong), `L{n}` label. Below: SPRACHEN list (`languages`) + INTERESSENSCHWERPUNKTE ordered list (`interestAreas`, short description). |
| `Projects.svelte` | rewrite | **04 Projekte.** Same 200px+1fr pattern from `projects.ts` (all 3 projects — data beats mockup's 2): year, status mono copper (map: in-progress→IN ARBEIT, live→LIVE, concept→KONZEPT, archived→ARCHIVIERT), title, description, stack mono uppercase, links as "Label →" copper underline. |
| `Education.svelte` | rewrite | **05 Ausbildung.** Spec-row table from `education.ts`: period · title + institution · type mono right (map: apprenticeship→LEHRE, school→SCHULE, certification→ZERTIFIKAT). |
| `Lab.svelte` | NEW | **06 Lab.** Rows from new `src/lib/data/lab.ts` (state mono copper uppercase, title, description). Footer line "DIESE SEITE WÄCHST MIT — NEUE EXPERIMENTE, KEIN UI-REFACTORING." |
| `Notes.svelte` | NEW | **07 Notes.** Rows from new `src/lib/data/notes.ts`: date (de-CH formatted) + DRAFT mono copper, title, excerpt. |
| `Contact.svelte` | rewrite | **08 Kontakt.** "Lass uns reden." (52px), lead with 48h promise, large mono mailto (gmx.ch) + tel links, GitHub/LinkedIn underline links, **existing form** (fields/enhance/error/submitting logic preserved, restyled square), FAQ block, footer line "© 2026 LAURENT SCHERRER · MEGGEN CH · DATENSCHUTZ (link) · BUILT WITH SVELTEKIT". |
| `Faq.svelte` | restyle | `<details>` rows, mono `+` marker, keeps FAQPage JSON-LD. |
| `ThemeToggle.svelte` | restyle | Bordered mono text button "MODUS: DUNKEL"/"MODUS: HELL" (used inside Sidebar). |
| `Seo.svelte`, `JsonLd.svelte`, `Analytics.svelte`, `CookieConsent.svelte` (restyle only), `reveal.ts` | keep | CookieConsent gets square corners/tokens. |
| `Header`, `StickyCta`, `Breadcrumbs`, `RelatedLinks`, `ResponsePromise` | DELETE | ResponsePromise text superseded by `site.ts` value. |

## 6. Data layer

- `site.ts`: `responseTimePromise = 'Ich antworte innerhalb von 48 Stunden.'`;
  `publicPages` → `/` (1.0) + `/datenschutz` (0.3).
- `faq.ts`: drop "[PLACEHOLDER — Jahr]" sentence from Q1 (adopt mockup wording);
  Q5 answer gets "48 Stunden"; keep Kontaktformular mentions (form exists).
- `navigation.ts`: rewrite — `sections: { id, num, label }[]` for the 8 sections
  (single source for Sidebar + one-pager order). Old `NavItem`/`primaryNav` removed.
- NEW `lab.ts`: experiments array moved from `routes/lab/+page.svelte` (3 items).
- NEW `notes.ts`: notes array moved from `routes/notes/+page.svelte` (2 items).
- DELETE `testimonials.ts`, `caseStudies.ts` (imported by nothing).
- `profile.ts`: unchanged (email stays gmx.ch). `experience.ts`, `projects.ts`,
  `education.ts`, `interests.ts`, `skills.ts`: unchanged — data files remain the
  single source of truth; mockup content matches them already.

## 7. SEO / meta

- `/` keeps `Seo` + Person JSON-LD (from current `+page.svelte`) and gains the
  FAQPage JSON-LD (lives in Faq component, now rendered on `/`).
- Sitemap: 2 entries. `robots.txt` unchanged. Retired URLs 301 → anchors (SvelteKit
  `redirect(301, …)` in `handle` hook before router).
- OG image kept as-is (out of scope).

## 8. Verification

- `npm run check` (svelte-check), `npm run lint`, `npm run build` all green.
- Unit: hooks redirect map (all 8 paths → 301 + correct Location) as a plain vitest
  server test. No e2e files exist today; none added (out of scope).
- Visual: dev server + Playwright browser — desktop (1280px) and mobile (390px)
  screenshots of `/`, both themes; verify sidebar scrollspy, mobile overlay, form render.
- Accessibility: nav `aria-label`, hamburger `aria-expanded`, overlay Escape-to-close,
  `details/summary` native semantics, focus-visible, reduced-motion honored.
  Copper on paper (#B45309 on #FAFAF7 ≈ 4.9:1) passes AA for the small mono text.

## 9. Out of scope

- No new content (notes remain drafts, lab items remain placeholders).
- No OG-image redesign.
- No e2e suite build-out.
- `/datenschutz` + `/danke` get token/typography restyle only, no content changes.
