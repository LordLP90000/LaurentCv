# Language Switch (DE/EN) — Design

**Date:** 2026-08-14
**Status:** Approved by Laurent (brainstorming session), pending spec review
**Builds on:** `docs/superpowers/specs/2026-08-13-datenblatt-redesign-design.md` (implemented on `redesign/datenblatt`)

## Goal

Visitors can switch the Datenblatt one-pager between German and English. English gets its own
URL so it is shareable and indexable. German remains the primary language.

## Decisions (locked in with Laurent)

| Topic        | Decision                                                        |
| ------------ | --------------------------------------------------------------- |
| URL strategy | Separate URLs: `/` = German, `/en` = English                    |
| Scope        | Everything except the Datenschutz page (stays German-only)      |
| Mechanism    | Per-locale TypeScript data files, no i18n library               |
| Translations | Claude drafts all English content; Laurent reviews before merge |

## URL map

| German         | English             | Notes                                                                                                      |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `/`            | `/en`               | One-pager, both indexable with hreflang alternates                                                         |
| `/danke`       | `/en/danke`         | noindex (unchanged), no hreflang needed                                                                    |
| `/datenschutz` | —                   | German only; linked from both languages                                                                    |
| `/skills` etc. | —                   | Existing 301 redirects to `/#a-…` unchanged; no `/en/skills` legacy routes ever existed, so none are added |
| any 404        | any 404 under `/en` | One `+error.svelte`, copy switches on the `/en` path prefix                                                |

Anchor IDs (`a-profil`, `a-skills`, …) are identical in both languages. Scrollspy, the
redirect map, and shared links keep working; only visible labels translate.

## Architecture

### 1. Routing

- **`src/params/lang.ts`** — param matcher: `match = (v) => v === 'en'`. This is what keeps
  `/datenschutz` resolving to its own route instead of being swallowed by the optional param.
- **`src/routes/[[lang=lang]]/`** — the one-pager (`+page.svelte`, `+page.server.ts`) and
  `danke/+page.svelte` move here (git mv). `datenschutz/`, `sitemap.xml/`, `robots.txt/`
  and `+layout.svelte` stay at the top level.
- **`src/app.html`** — `<html lang="de">` becomes `<html lang="%lang%">`.
- **`src/hooks.server.ts`** — the existing `handle` additionally computes the locale from the
  pathname (`/en` or `/en/…` → `en`, else `de`) and replaces `%lang%` via `transformPageChunk`.
  The 301 redirect map is untouched; the existing 10 tests must keep passing unchanged.

### 2. Locale plumbing — `src/lib/i18n.ts`

```ts
export type Locale = 'de' | 'en';
export const locales: Locale[] = ['de', 'en'];

/** Resolve the locale from route params ({ lang?: string }). */
export function localeOf(params: { lang?: string }): Locale {
	return params.lang === 'en' ? 'en' : 'de';
}

/** Path prefix for locale-aware hrefs: '' for de, '/en' for en. */
export function prefix(locale: Locale): string {
	return locale === 'en' ? '/en' : '';
}
```

Components derive it in one line: `const locale = $derived(localeOf(page.params));`
No context, no prop drilling, no library.

### 3. Data layer — one uniform shape

Every content module exports `Record<Locale, T>` with its existing interfaces unchanged:

```ts
// pattern, e.g. src/lib/data/profile.ts
export const profile: Record<Locale, Profile> = { de: { … }, en: { … } };
```

Applies to: `profile`, `experience`, `skills` (`skillCategories` + `languages`), `interests`
(`interestAreas` + `hobbies`), `projects`, `faq`, `lab` (`experiments`), `notes`, `education`,
`navigation` (`sections`), and `site` (`responseTime`, `responseTimePromise`).
Locale-neutral values (skill levels, years, URLs, email) are duplicated across both objects —
explicit duplication beats a clever split shape. `publicPages`/`privatePaths` stay unkeyed.

**New: `src/lib/data/ui.ts`** — interface strings as one typed dictionary keyed by locale:
sidebar eyebrow ("LEBENSLAUF / 2026" / "CV / 2026"), sidebar subtitle, INDEX/SCHLIESSEN,
theme-toggle labels ("MODUS: HELL" / "MODE: LIGHT"), form labels + button + validation messages,
`statusLabel` (Projects) and `typeLabel` (Education) maps, section lead paragraphs' fixed
strings where they live in components (hero headline + intro, Kontakt heading + lead), footer
line, cookie-banner text, error/danke page copy, a11y `aria-label`s.

**Notable translation decisions (Laurent reviews these in the plan):**

- Hero headline: "Strom verstanden. Jetzt Code." → "Electricity understood. Now code."
- Section labels EN: PROFILE, CAREER, SKILLS, PROJECTS, EDUCATION, LAB, NOTES, CONTACT.
- Datenschutz link from `/en`: label "Privacy policy (German)".

### 4. Switcher UI (Sidebar)

A mono-font `DE | EN` control, active locale in copper, placed next to `ThemeToggle` in both
the desktop rail's bottom block and the mobile top bar. Each side is a plain `<a>` linking to
the equivalent location in the other language, preserving the active section:
`{prefix(other)}/#{activeSectionId}`. On `/danke`, it links to the other language's danke page.
No JS state — the URL is the state.

### 5. SEO

- **`Seo.svelte`** gains an optional `alternates?: { de: string; en: string }` prop. When set
  (only on the one-pager), it renders `hreflang="de"`, `hreflang="en"`, and
  `hreflang="x-default"` (→ German) link tags. `og:locale` becomes `de_CH` / `en_GB` from the
  current locale. The `profile` import switches to locale-keyed access.
- **Titles/descriptions:** the one-pager, danke, error, and datenschutz pages pass
  locale-appropriate strings (datenschutz stays German).
- **Sitemap:** `publicPages` gains `{ path: '/en', priority: 1.0 }`. Endpoint code unchanged.
- **JSON-LD:** `jobTitle` localized ("Informatiker in Ausbildung" / "IT apprentice (software
  development)"); rest is language-neutral.

### 6. Contact form

The action moves with the route to `src/routes/[[lang=lang]]/+page.server.ts`. It reads
`params.lang`, returns validation errors from `ui.ts` in the right language, and redirects to
`/danke` or `/en/danke`. Email subject/body to Laurent stays German (he is the only reader).

### 7. Error page

`src/routes/+error.svelte` derives the locale from `page.url.pathname.startsWith('/en')`
(no params available in error pages for unmatched routes) and renders EN/DE copy from `ui.ts`.

## Consumers to update (all touched this session, shapes known)

`Hero`, `Timeline`, `Skills`, `Projects`, `Education`, `Lab`, `Notes`, `Contact`, `Faq`,
`Sidebar`, `ThemeToggle` (label), `CookieConsent`, `Seo`, `+page.svelte` (person schema),
`danke/+page.svelte`, `datenschutz/+page.svelte` (locale-keyed `profile` access only),
`+error.svelte`.

## Testing

- **Unit (vitest, server project):** `params/lang` matcher (accepts `en`, rejects `de`,
  `datenschutz`, empty); `localeOf` + `prefix`; existing 10 hooks tests unchanged; a new hooks
  test asserting `%lang%` is replaced (`de` on `/`, `en` on `/en`).
- **Gates:** `npm run check`, `npm run lint`, `npm run build` — all clean.
- **Visual pass:** `/` and `/en` at 1280px + 390px, both themes; switcher round-trip keeps the
  active anchor; `/en/danke`; EN 404; `/datenschutz` reachable from both languages.

## Out of scope

- No English Datenschutz page.
- No browser-language auto-detection or locale cookie (the URL is the only source of truth;
  can be added later without breaking anything).
- No third locale (IT/FR); the `Record<Locale, T>` shape makes adding one mechanical.
