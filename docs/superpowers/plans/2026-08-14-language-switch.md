# Language Switch (DE/EN) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the DE/EN language switch per `docs/superpowers/specs/2026-08-14-language-switch-design.md` — German at `/`, English at `/en`, per-locale data files, no i18n library.

**Architecture:** A `lang` param matcher plus an optional `[[lang=lang]]` route segment carry the locale in the URL. Every content module becomes `Record<Locale, T>`; a new `ui.ts` holds interface strings. Components derive the locale from `page.params` in one line. The server hook stamps `<html lang>`.

**Tech Stack:** SvelteKit 2 (Svelte 5 runes), Tailwind 4, Vitest, adapter-vercel. Branch: `redesign/datenblatt` (continue in place).

**Conventions used throughout:**

- All English copy in this plan is a draft for Laurent's review — flag anything that reads wrong before merge.
- Type errors from `npm run check` are EXPECTED between Task 4 and Task 12 (data shapes change before consumers). Vitest stays green throughout. The gate is Task 13.
- Run the Svelte MCP `svelte-autofixer` over every rewritten `.svelte` file before committing it (skip with a note if the MCP server is down).
- Anchor IDs (`a-profil`, …) never change. Only labels translate.

---

### Task 1: i18n core (TDD)

**Files:**

- Create: `src/lib/i18n.ts`, `src/params/lang.ts`
- Test: `src/lib/i18n.test.ts`, `src/params/lang.test.ts`

- [ ] **Step 1.1: Write the failing tests**

`src/lib/i18n.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { localeOf, prefix } from './i18n';

describe('localeOf', () => {
	it('defaults to de when no lang param exists', () => {
		expect(localeOf({})).toBe('de');
	});

	it('returns en for lang=en', () => {
		expect(localeOf({ lang: 'en' })).toBe('en');
	});

	it('falls back to de for unknown values', () => {
		expect(localeOf({ lang: 'fr' })).toBe('de');
	});
});

describe('prefix', () => {
	it('is empty for de and /en for en', () => {
		expect(prefix('de')).toBe('');
		expect(prefix('en')).toBe('/en');
	});
});
```

`src/params/lang.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { match } from './lang';

describe('lang param matcher', () => {
	it('accepts en', () => {
		expect(match('en')).toBe(true);
	});

	it('rejects everything else', () => {
		for (const value of ['de', 'datenschutz', 'EN', 'en/', '']) {
			expect(match(value)).toBe(false);
		}
	});
});
```

- [ ] **Step 1.2: Run tests to verify they fail**

Run: `npx vitest run --project server src/lib/i18n.test.ts src/params/lang.test.ts`
Expected: FAIL — cannot resolve `./i18n` / `./lang`.

- [ ] **Step 1.3: Implement**

`src/lib/i18n.ts`:

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

`src/params/lang.ts`:

```ts
import type { ParamMatcher } from '@sveltejs/kit';

/** Restricts [[lang=lang]] so /datenschutz keeps matching its own route. */
export const match: ParamMatcher = (param) => param === 'en';
```

- [ ] **Step 1.4: Run tests to verify they pass**

Run: `npx vitest run --project server`
Expected: PASS — 15 tests (10 existing hooks + 5 new).

- [ ] **Step 1.5: Commit**

```bash
git add src/lib/i18n.ts src/lib/i18n.test.ts src/params/lang.ts src/params/lang.test.ts
git commit -m "feat: locale core (localeOf/prefix) + en param matcher"
```

### Task 2: `<html lang>` stamping (TDD)

**Files:**

- Modify: `src/hooks.server.ts`, `src/app.html:2`
- Test: `src/hooks.server.test.ts`

- [ ] **Step 2.1: Add the failing test** — append inside the existing `describe('hooks.server handle', …)` block in `src/hooks.server.test.ts`:

```ts
it.each([
	['/', 'de'],
	['/danke', 'de'],
	['/en', 'en'],
	['/en/danke', 'en']
])('stamps <html lang> for %s as %s', async (path, lang) => {
	const event = { url: new URL(`http://localhost${path}`) } as unknown as RequestEvent;
	let transformed: string | undefined;
	const resolve = async (
		_event: unknown,
		opts?: { transformPageChunk?: (input: { html: string; done: boolean }) => string }
	) => {
		transformed = opts?.transformPageChunk?.({ html: '<html lang="%lang%">', done: true });
		return new Response('ok');
	};
	await handle({ event, resolve } as never);
	expect(transformed).toBe(`<html lang="${lang}">`);
});
```

- [ ] **Step 2.2: Run to verify it fails**

Run: `npx vitest run --project server src/hooks.server.test.ts`
Expected: FAIL — `transformed` is `undefined` (hook passes no options yet). The 10 existing tests still pass.

- [ ] **Step 2.3: Implement** — in `src/hooks.server.ts`, replace the `handle` export (redirect map stays untouched):

```ts
export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname.replace(/\/+$/, '') || '/';
	const target = retiredRoutes[pathname];
	if (target) redirect(301, target);

	const lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
```

In `src/app.html` change line 2: `<html lang="de">` → `<html lang="%lang%">`.

- [ ] **Step 2.4: Run tests to verify they pass**

Run: `npx vitest run --project server`
Expected: PASS — 19 tests.

- [ ] **Step 2.5: Commit**

```bash
git add src/hooks.server.ts src/hooks.server.test.ts src/app.html
git commit -m "feat: stamp <html lang> per locale in server hook"
```

### Task 3: `ui.ts` — interface strings (DE + EN)

**Files:**

- Create: `src/lib/data/ui.ts`

- [ ] **Step 3.1:** Create `src/lib/data/ui.ts`. The `de` object defines the shape; `en` must match it (`UiStrings = typeof de`):

```ts
import type { Locale } from '$lib/i18n';
import type { Project } from '$data/projects';
import type { Education } from '$data/education';
import type { LabExperiment } from '$data/lab';

const de = {
	jobTitle: 'Informatiker in Ausbildung',
	seo: {
		title: 'Laurent Scherrer · Informatiker in Ausbildung · CV',
		description:
			'Persönlicher CV & Tech Lab von Laurent Scherrer — Informatiker in Ausbildung mit Elektro-Background. Fokus auf IT-Security, Algorithmen und Schnittstellen.'
	},
	sidebar: {
		eyebrow: 'LEBENSLAUF / 2026',
		role1: 'Informatiker in Ausbildung',
		role2: 'Elektroinstallateur EFZ',
		index: 'INDEX',
		close: 'SCHLIESSEN',
		navLabel: 'Index',
		indexToggleLabel: 'Index umschalten',
		langLabel: 'Sprache wechseln'
	},
	theme: { dark: 'MODUS: DUNKEL', light: 'MODUS: HELL', label: 'Farbschema wechseln' },
	profil: {
		title: 'Profil',
		headline1: 'Strom verstanden.',
		headline2: 'Jetzt Code.',
		intro:
			'Vier Jahre Elektroinstallation, jetzt Zweitausbildung zum Informatiker bei der Komax AG. Mein besonderes Interesse gilt IT-Security, Algorithmen und der Kommunikation zwischen Systemen.',
		specName: 'NAME',
		specLocation: 'STANDORT',
		specBirthYear: 'JAHRGANG',
		specNationality: 'NATIONALITÄT',
		specLanguages: 'SPRACHEN',
		specStatus: 'STATUS',
		languagesValue: 'DE · IT · EN · FR',
		statusValue: 'Informatik-Lernender, 3. Lehrjahr · Komax AG',
		portraitAlt: 'Porträt von Laurent Scherrer',
		portraitCaption: 'ABB. 1 — SCHERRER, LAURENT LUCIEN',
		offWork: 'AUSSERHALB DES BÜROS'
	},
	werdegang: { title: 'Werdegang' },
	skills: {
		title: 'Skills',
		lead: 'Skills aus beiden Ausbildungen. Die Levels folgen der Skala aus meinem offiziellen Lebenslauf — L1 Grundkenntnisse bis L5 Experte.',
		languagesTitle: 'SPRACHEN',
		interestsTitle: 'INTERESSENSCHWERPUNKTE'
	},
	projekte: {
		title: 'Projekte',
		lead: 'Kein poliertes Portfolio-Grid, sondern die Werkbank: Dinge, an denen ich gerade arbeite.',
		status: {
			'in-progress': 'IN ARBEIT',
			live: 'LIVE',
			archived: 'ARCHIVIERT',
			concept: 'KONZEPT'
		} satisfies Record<Project['status'], string>,
		linkText: (label: string) => `${label} ansehen →`
	},
	ausbildung: {
		title: 'Ausbildung',
		type: {
			apprenticeship: 'LEHRE',
			school: 'SCHULE',
			certification: 'ZERTIFIKAT'
		} satisfies Record<Education['type'], string>
	},
	lab: {
		title: 'Lab',
		lead: 'Werkstatt für Halbfertiges — Prototypen, die noch nicht produktionsreif sind, aber etwas erzählen.',
		state: {
			geplant: 'GEPLANT',
			skizziert: 'SKIZZIERT',
			bald: 'BALD'
		} satisfies Record<LabExperiment['state'], string>,
		footnote: 'DIESE SEITE WÄCHST MIT — NEUE EXPERIMENTE, KEIN UI-REFACTORING.'
	},
	notes: {
		title: 'Notes',
		lead: 'Kurze Write-ups zu Themen, mit denen ich mich gerade beschäftige. Noch in Vorbereitung — Inhalte folgen.',
		draft: 'DRAFT',
		dateLocale: 'de-CH'
	},
	kontakt: {
		title: 'Kontakt',
		heading: 'Lass uns reden.',
		lead: 'Ob Praktikum, Security-Projekt oder ein Austausch über Schnittstellen — schreib mir.',
		formTitle: 'NACHRICHT SENDEN',
		nameLabel: 'NAME',
		emailLabel: 'E-MAIL',
		messageLabel: 'NACHRICHT',
		submit: 'Nachricht senden',
		submitting: 'Senden …',
		faqTitle: 'HÄUFIGE FRAGEN',
		privacy: 'DATENSCHUTZ'
	},
	formErrors: {
		name: 'Bitte gib deinen Namen an.',
		email: 'Bitte gib eine gültige E-Mail-Adresse an.',
		message: 'Die Nachricht ist zu kurz.',
		server: 'Der Server ist nicht korrekt konfiguriert.',
		send: 'Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.'
	},
	cookie: {
		label: 'Cookie-Hinweis',
		text: 'Ich würde gerne mit Google Analytics verstehen, wie diese Seite genutzt wird — aber nur mit deinem Einverständnis. Ohne Zustimmung wird nichts geladen.',
		more: 'Mehr dazu in der Datenschutzerklärung.',
		decline: 'Ablehnen',
		accept: 'Einverstanden'
	},
	danke: {
		seoTitle: 'Danke für deine Nachricht · Laurent Scherrer',
		seoDescription: 'Deine Nachricht ist angekommen — ich melde mich so schnell wie möglich.',
		eyebrow: 'STATUS — ZUGESTELLT ✓',
		heading: 'Danke — deine Nachricht ist angekommen.',
		body: 'So geht es weiter: Ich lese jede Nachricht persönlich und melde mich per E-Mail bei dir. Du musst nichts weiter tun.',
		home: 'Zur Startseite →',
		projects: 'Projekte ansehen →'
	},
	error: {
		notFoundTitle: 'Seite nicht gefunden · Laurent Scherrer',
		errorTitle: 'Fehler · Laurent Scherrer',
		seoDescription:
			'Diese Seite existiert nicht (mehr). Zurück zur Startseite oder direkt Kontakt aufnehmen.',
		eyebrow: 'FEHLER',
		notFoundBody:
			"Diese Seite gibt es nicht — vielleicht ein Tippfehler in der URL, vielleicht habe ich sie umgebaut. Kein Problem: Von hier aus geht's weiter.",
		otherBody:
			'Da ist etwas schiefgelaufen. Versuch es später noch einmal — oder sag mir kurz Bescheid.',
		home: 'Zur Startseite →',
		contact: 'Kontakt →'
	}
};

export type UiStrings = typeof de;

const en: UiStrings = {
	jobTitle: 'IT apprentice (software development)',
	seo: {
		title: 'Laurent Scherrer · IT Apprentice · CV',
		description:
			'Personal CV & tech lab of Laurent Scherrer — IT apprentice with an electrical background. Focused on IT security, algorithms and interfaces.'
	},
	sidebar: {
		eyebrow: 'CV / 2026',
		role1: 'IT apprentice',
		role2: 'Certified electrician EFZ',
		index: 'INDEX',
		close: 'CLOSE',
		navLabel: 'Index',
		indexToggleLabel: 'Toggle index',
		langLabel: 'Switch language'
	},
	theme: { dark: 'MODE: DARK', light: 'MODE: LIGHT', label: 'Switch color scheme' },
	profil: {
		title: 'Profile',
		headline1: 'Electricity understood.',
		headline2: 'Now code.',
		intro:
			'Four years of electrical installation, now retraining as a software developer at Komax AG. My main interests are IT security, algorithms and the communication between systems.',
		specName: 'NAME',
		specLocation: 'LOCATION',
		specBirthYear: 'BORN',
		specNationality: 'NATIONALITY',
		specLanguages: 'LANGUAGES',
		specStatus: 'STATUS',
		languagesValue: 'DE · IT · EN · FR',
		statusValue: 'IT apprentice, 3rd year · Komax AG',
		portraitAlt: 'Portrait of Laurent Scherrer',
		portraitCaption: 'FIG. 1 — SCHERRER, LAURENT LUCIEN',
		offWork: 'OUTSIDE THE OFFICE'
	},
	werdegang: { title: 'Career' },
	skills: {
		title: 'Skills',
		lead: 'Skills from both apprenticeships. Levels follow the scale from my official CV — L1 basic knowledge to L5 expert.',
		languagesTitle: 'LANGUAGES',
		interestsTitle: 'FOCUS AREAS'
	},
	projekte: {
		title: 'Projects',
		lead: 'Not a polished portfolio grid but the workbench: things I am working on right now.',
		status: {
			'in-progress': 'IN PROGRESS',
			live: 'LIVE',
			archived: 'ARCHIVED',
			concept: 'CONCEPT'
		},
		linkText: (label: string) => `View ${label} →`
	},
	ausbildung: {
		title: 'Education',
		type: {
			apprenticeship: 'APPRENTICESHIP',
			school: 'SCHOOL',
			certification: 'CERTIFICATE'
		}
	},
	lab: {
		title: 'Lab',
		lead: 'A workshop for half-finished things — prototypes that are not production-ready yet but tell a story.',
		state: {
			geplant: 'PLANNED',
			skizziert: 'SKETCHED',
			bald: 'SOON'
		},
		footnote: 'THIS PAGE GROWS OVER TIME — NEW EXPERIMENTS, NO UI REFACTORING.'
	},
	notes: {
		title: 'Notes',
		lead: 'Short write-ups on topics I am currently digging into. Still in preparation — content coming soon.',
		draft: 'DRAFT',
		dateLocale: 'en-GB'
	},
	kontakt: {
		title: 'Contact',
		heading: "Let's talk.",
		lead: 'Internship, security project or a chat about interfaces — drop me a line.',
		formTitle: 'SEND A MESSAGE',
		nameLabel: 'NAME',
		emailLabel: 'E-MAIL',
		messageLabel: 'MESSAGE',
		submit: 'Send message',
		submitting: 'Sending …',
		faqTitle: 'FREQUENTLY ASKED QUESTIONS',
		privacy: 'PRIVACY POLICY (GERMAN)'
	},
	formErrors: {
		name: 'Please enter your name.',
		email: 'Please enter a valid e-mail address.',
		message: 'The message is too short.',
		server: 'The server is not configured correctly.',
		send: 'The message could not be sent. Please try again later.'
	},
	cookie: {
		label: 'Cookie notice',
		text: 'I would like to use Google Analytics to understand how this site is used — but only with your consent. Nothing is loaded without it.',
		more: 'More in the privacy policy (German).',
		decline: 'Decline',
		accept: 'Accept'
	},
	danke: {
		seoTitle: 'Thanks for your message · Laurent Scherrer',
		seoDescription: 'Your message has arrived — I will get back to you as soon as possible.',
		eyebrow: 'STATUS — DELIVERED ✓',
		heading: 'Thanks — your message has arrived.',
		body: 'What happens next: I read every message personally and will get back to you by e-mail. Nothing else to do on your side.',
		home: 'Back to start →',
		projects: 'View projects →'
	},
	error: {
		notFoundTitle: 'Page not found · Laurent Scherrer',
		errorTitle: 'Error · Laurent Scherrer',
		seoDescription:
			'This page does not exist (anymore). Back to the start page or get in touch directly.',
		eyebrow: 'ERROR',
		notFoundBody:
			'This page does not exist — maybe a typo in the URL, maybe I rebuilt it. No problem: you can continue from here.',
		otherBody: 'Something went wrong. Please try again later — or drop me a quick line.',
		home: 'Back to start →',
		contact: 'Contact →'
	}
};

export const ui: Record<Locale, UiStrings> = { de, en };
```

- [ ] **Step 3.2:** `npx vitest run --project server` still passes (ui.ts has no consumers yet; note `npm run check` may already complain about `$data/projects` type imports — those stay valid since the interfaces don't change). Commit:

```bash
git add src/lib/data/ui.ts
git commit -m "feat: ui string dictionary (de/en)"
```

### Task 4: Data layer A — navigation, site, profile, faq

**Files:**

- Rewrite: `src/lib/data/navigation.ts`, `src/lib/data/site.ts`, `src/lib/data/profile.ts`, `src/lib/data/faq.ts`

- [ ] **Step 4.1:** `src/lib/data/navigation.ts`:

```ts
import type { Locale } from '$lib/i18n';

export interface SectionNav {
	id: string;
	num: string;
	label: string;
}

/** The one-pager's section index — single source for sidebar nav and section numbering. */
export const sections: Record<Locale, SectionNav[]> = {
	de: [
		{ id: 'a-profil', num: '01', label: 'PROFIL' },
		{ id: 'a-werdegang', num: '02', label: 'WERDEGANG' },
		{ id: 'a-skills', num: '03', label: 'SKILLS' },
		{ id: 'a-projekte', num: '04', label: 'PROJEKTE' },
		{ id: 'a-ausbildung', num: '05', label: 'AUSBILDUNG' },
		{ id: 'a-lab', num: '06', label: 'LAB' },
		{ id: 'a-notes', num: '07', label: 'NOTES' },
		{ id: 'a-kontakt', num: '08', label: 'KONTAKT' }
	],
	en: [
		{ id: 'a-profil', num: '01', label: 'PROFILE' },
		{ id: 'a-werdegang', num: '02', label: 'CAREER' },
		{ id: 'a-skills', num: '03', label: 'SKILLS' },
		{ id: 'a-projekte', num: '04', label: 'PROJECTS' },
		{ id: 'a-ausbildung', num: '05', label: 'EDUCATION' },
		{ id: 'a-lab', num: '06', label: 'LAB' },
		{ id: 'a-notes', num: '07', label: 'NOTES' },
		{ id: 'a-kontakt', num: '08', label: 'CONTACT' }
	]
};
```

- [ ] **Step 4.2:** `src/lib/data/site.ts` — keep the `PublicPage` interface and doc comments; replace the exports:

```ts
export const publicPages: PublicPage[] = [
	{ path: '/', priority: 1.0 },
	{ path: '/en', priority: 1.0 },
	{ path: '/datenschutz', priority: 0.3 }
];

/** Paths that exist but must not be crawled or indexed. */
export const privatePaths = ['/api/', '/danke', '/en/danke'];

/** Response-time window shown in the Kontakt section and FAQ. */
export const responseTime: Record<Locale, string> = { de: '48 Stunden', en: '48 hours' };
export const responseTimePromise: Record<Locale, string> = {
	de: 'Ich antworte innerhalb von 48 Stunden.',
	en: 'I reply within 48 hours.'
};
```

Add `import type { Locale } from '$lib/i18n';` at the top.

- [ ] **Step 4.3:** `src/lib/data/profile.ts` — keep both interfaces; replace the export:

```ts
import type { Locale } from '$lib/i18n';

// (Profile and SocialLink interfaces unchanged)

const de: Profile = {
	name: 'Laurent Lucien Scherrer',
	title: 'Informatiker in Ausbildung · Elektroinstallateur EFZ',
	tagline: [
		'From circuits to code.',
		'Elektriker EFZ, jetzt auf dem Weg zum Informatiker.',
		'Security · Algorithmen · Schnittstellen.'
	],
	location: 'Meggen, Schweiz',
	email: 'laurent.scherrer@gmx.ch',
	phone: '+41 76 511 98 45',
	birthDate: '09.04.2005',
	citizenship: 'CH / IT',
	bio: `Nach meiner vierjährigen Erstausbildung zum Elektroinstallateur EFZ bringe ich ein fundiertes Verständnis für technische Anlagen, elektrische Systeme und industrielle Abläufe mit. Die Arbeit mit Siemens Logo Steuerungen hat mein Interesse an der Informatik geweckt — aktuell bin ich im dritten Lehrjahr meiner Zweitausbildung als Informatiker bei der Komax AG. Mein besonderes Interesse gilt IT-Security, Algorithmen und der Kommunikation zwischen Systemen.`,
	social: [
		{ label: 'GitHub', href: 'https://github.com/LordLP90000', icon: 'github' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/laurent-lucien-scherrer-43a918237',
			icon: 'linkedin'
		},
		{ label: 'E-Mail', href: 'mailto:laurent.scherrer@gmx.ch', icon: 'mail' },
		{ label: 'Telefon', href: 'tel:+41765119845', icon: 'phone' }
	]
};

const en: Profile = {
	name: 'Laurent Lucien Scherrer',
	title: 'IT apprentice · Certified electrician EFZ',
	tagline: [
		'From circuits to code.',
		'Certified electrician, now becoming a software developer.',
		'Security · algorithms · interfaces.'
	],
	location: 'Meggen, Switzerland',
	email: 'laurent.scherrer@gmx.ch',
	phone: '+41 76 511 98 45',
	birthDate: '09.04.2005',
	citizenship: 'CH / IT',
	bio: `After my four-year first apprenticeship as a certified electrician (EFZ) I bring a solid understanding of technical installations, electrical systems and industrial processes. Working with Siemens Logo controls sparked my interest in software — I am currently in the third year of my second apprenticeship as a software developer at Komax AG. My main interests are IT security, algorithms and the communication between systems.`,
	social: [
		{ label: 'GitHub', href: 'https://github.com/LordLP90000', icon: 'github' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/laurent-lucien-scherrer-43a918237',
			icon: 'linkedin'
		},
		{ label: 'E-mail', href: 'mailto:laurent.scherrer@gmx.ch', icon: 'mail' },
		{ label: 'Phone', href: 'tel:+41765119845', icon: 'phone' }
	]
};

export const profile: Record<Locale, Profile> = { de, en };
```

- [ ] **Step 4.4:** `src/lib/data/faq.ts` — keep the interface; replace the export:

```ts
import type { Locale } from '$lib/i18n';

// (FaqEntry interface unchanged)

const de: FaqEntry[] = [
	// the five existing German entries, unchanged (third Lehrjahr wording)
];

const en: FaqEntry[] = [
	{
		question: 'Where are you in your training right now?',
		answer:
			'I am in the third year of my second apprenticeship as a software developer (Applikationsentwickler EFZ) at Komax AG. Before that I completed a four-year apprenticeship as a certified electrician (EFZ).'
	},
	{
		question: 'What kind of requests are you open to?',
		answer:
			'Security projects, tech exchanges, side projects and anything related to interfaces between systems. Just write me via the contact form — even if you only have a question about one of my projects.'
	},
	{
		question: 'Which technologies do you mainly work with?',
		answer:
			'In my apprenticeship mainly C#, .NET, TypeScript, Git and Azure DevOps. Privately I build with SvelteKit and Tailwind CSS — this website is itself one of those projects. On top of that comes my electrical background with Siemens Logo and control technology.'
	},
	{
		question: 'What sets you apart from other developers at the start of their career?',
		answer:
			'The combination of two apprenticeships: four years of electrical installation gave me a practical understanding of plants, hardware and industrial processes — that helps wherever software talks to machines and real-world systems.'
	},
	{
		question: 'What is the best way to reach you?',
		answer: 'Easiest via the contact form or by e-mail. I reply within 48 hours.'
	}
];

export const faq: Record<Locale, FaqEntry[]> = { de, en };
```

(Copy the current German entries verbatim into `de` — do not retype them.)

- [ ] **Step 4.5:** Commit (check errors expected from consumers — that is fine):

```bash
git add src/lib/data/navigation.ts src/lib/data/site.ts src/lib/data/profile.ts src/lib/data/faq.ts
git commit -m "feat: locale-keyed navigation/site/profile/faq data"
```

### Task 5: Data layer B — experience, education, skills, interests

**Files:**

- Rewrite: `src/lib/data/experience.ts`, `src/lib/data/education.ts`, `src/lib/data/skills.ts`, `src/lib/data/interests.ts`

- [ ] **Step 5.1:** `src/lib/data/experience.ts` — keep the interface; `de` = current array verbatim; add:

```ts
const en: Experience[] = [
	{
		id: 'komax-applikationsentwickler',
		role: 'Software developer apprentice (second apprenticeship)',
		company: 'Komax AG',
		period: '2025 – today',
		start: '2025',
		end: 'today',
		location: 'Dierikon, Switzerland',
		summary:
			'Second apprenticeship as a software developer (EFZ) after completing my electrician apprenticeship. Currently in the third year.',
		highlights: [
			'Working across a range of programming languages and technologies',
			'Exposure to interfaces, frontend development and security',
			'Combining an electrical background with software engineering'
		],
		tags: ['C#', '.NET', 'TypeScript', 'Git', 'Azure DevOps']
	},
	{
		id: 'frey-cie-elektriker',
		role: 'Certified electrician EFZ',
		company: 'Frey & Cie',
		period: '2021 – 2025',
		start: '2021',
		end: '2025',
		location: 'Kriens, Switzerland',
		summary:
			'Four-year apprenticeship as a certified electrician with a focus on control and plant technology.',
		highlights: [
			'Programming Siemens Logo controls',
			'Installing and commissioning electrical systems',
			'Maintenance and troubleshooting of technical systems',
			'Reading and drawing electrical schematics',
			'Working to standards and safety regulations (NIV)'
		],
		tags: ['Siemens Logo', 'PLC', 'Schematics', 'NIV']
	}
];

export const experience: Record<Locale, Experience[]> = { de, en };
```

- [ ] **Step 5.2:** `src/lib/data/education.ts` — same pattern; `en`:

```ts
const en: Education[] = [
	{
		id: 'komax-applikationsentwickler',
		title: 'Software developer EFZ (second apprenticeship)',
		institution: 'Komax AG · Vocational school',
		period: '2025 – ongoing',
		description: 'Second apprenticeship, currently in the third year.',
		type: 'apprenticeship'
	},
	{
		id: 'frey-cie-elektriker',
		title: 'Certified electrician EFZ',
		institution: 'Frey & Cie · Kriens',
		period: '2021 – 2025',
		description: 'Four-year apprenticeship as a certified electrician, completed 2025.',
		type: 'apprenticeship'
	},
	{
		id: 'wirtschaftsmittelschule',
		title: 'Business middle school',
		institution: 'Lucerne',
		period: '2020 – 2021',
		type: 'school'
	},
	{
		id: 'sekundarschule',
		title: 'Secondary school',
		institution: 'Meggen',
		period: '2017 – 2020',
		type: 'school'
	},
	{
		id: 'b2-first',
		title: 'B2 First (English)',
		institution: 'Cambridge English',
		period: 'Certificate',
		type: 'certification'
	}
];

export const education: Record<Locale, Education[]> = { de, en };
```

- [ ] **Step 5.3:** `src/lib/data/skills.ts` — keep both interfaces; `de` arrays verbatim from current file; key all three exports:

```ts
export const skillLegend: Record<Locale, Record<number, string>> = {
	de: {
		1: 'Grundkenntnisse',
		2: 'Zusammenhänge verstanden',
		3: 'Theoretisch + praktisch',
		4: 'Gute Kenntnisse',
		5: 'Experte'
	},
	en: {
		1: 'Basic knowledge',
		2: 'Understands the concepts',
		3: 'Theory + practice',
		4: 'Good working knowledge',
		5: 'Expert'
	}
};
```

`en` categories: same ids/skills/levels as `de` (skill names are language-neutral); translate `title`/`description`:

| id               | title (en)             | description (en)                                                       |
| ---------------- | ---------------------- | ---------------------------------------------------------------------- |
| languages        | Languages & Markup     | Programming and markup languages I work with.                          |
| frameworks       | Frameworks             | Stacks and frameworks from my apprenticeship and projects.             |
| tools            | Tools & Platforms      | Operating systems, databases, cloud and dev tooling.                   |
| network-security | Network & Security     | My main focus area — security and infrastructure.                      |
| electrical       | Electrical Engineering | Knowledge from my first apprenticeship that helps me in industrial IT. |
| workplace        | Workplace Skills       | Ways of working and collaboration.                                     |

```ts
export const skillCategories: Record<Locale, SkillCategory[]> = { de, en };

export const languages: Record<Locale, { name: string; level: string }[]> = {
	de: [
		{ name: 'Deutsch', level: 'Muttersprache' },
		{ name: 'Italienisch', level: 'Muttersprache' },
		{ name: 'Englisch', level: 'B2 First' },
		{ name: 'Französisch', level: 'Schulisch (2015 – 2021)' }
	],
	en: [
		{ name: 'German', level: 'Native' },
		{ name: 'Italian', level: 'Native' },
		{ name: 'English', level: 'B2 First' },
		{ name: 'French', level: 'School level (2015 – 2021)' }
	]
};
```

- [ ] **Step 5.4:** `src/lib/data/interests.ts` — keep interface; `de` verbatim; add:

```ts
const en: InterestArea[] = [
	{
		priority: 1,
		title: 'Security',
		description:
			'Cloud security, data protection, vulnerability scanning & management, compliance with standards. The area I see myself in long-term — hardening systems and uncovering weaknesses.',
		tags: ['Cloud Security', 'Vulnerability Management', 'Compliance', 'Data protection']
	},
	{
		priority: 2,
		title: 'Interfaces',
		description:
			'OPC UA, REST — how systems and machines communicate. My background as an electrician gives me the hardware side; I want to deepen the software side.',
		tags: ['OPC UA', 'REST', 'Integration']
	},
	{
		priority: 3,
		title: 'Angular frontend',
		description:
			'Frontends for industrial machines (Delta). Interfaces that talk directly to the plant — the immediate feedback is what makes this work appealing.',
		tags: ['Angular', 'TypeScript', 'Industrial UI']
	}
];

export const interestAreas: Record<Locale, InterestArea[]> = { de, en };

export const hobbies: Record<Locale, string[]> = {
	de: ['American Football', 'Snowboarden', 'Gym', 'Gaming', 'Kochen'],
	en: ['American football', 'Snowboarding', 'Gym', 'Gaming', 'Cooking']
};
```

- [ ] **Step 5.5:** Commit:

```bash
git add src/lib/data/experience.ts src/lib/data/education.ts src/lib/data/skills.ts src/lib/data/interests.ts
git commit -m "feat: locale-keyed experience/education/skills/interests data"
```

### Task 6: Data layer C — projects, lab, notes

**Files:**

- Rewrite: `src/lib/data/projects.ts`, `src/lib/data/lab.ts`, `src/lib/data/notes.ts`

- [ ] **Step 6.1:** `src/lib/data/projects.ts` — keep interface; `de` verbatim; add `en` (ids/stack/links/status/year identical):

```ts
const en: Project[] = [
	{
		id: 'laurent-cv',
		title: 'Living CV',
		summary: 'This portfolio. A modular, evolving CV built with SvelteKit.',
		description:
			'Personal portfolio site built as a SvelteKit application with a Node backend. Content is structured in TypeScript data files, so new sections, projects and skills can be added without UI changes.',
		stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Node.js'],
		links: [{ label: 'Repository', href: 'https://github.com/LordLP90000/LaurentCv' }],
		status: 'in-progress',
		year: '2026'
	},
	{
		id: 'easyask',
		title: 'EasyAsk',
		summary:
			'AI answers without prompt engineering: a few short, simple questions instead of an empty chat box.',
		description:
			'Instead of an empty chat box, EasyAsk asks a few simple questions, builds a precise prompt in the background and returns directly usable answers — with refine chips for fine-tuning. One codebase, three platforms: web, desktop (Electron) and mobile (Capacitor). The Hono server is the only place with access to the API key.',
		stack: ['React', 'TypeScript', 'Hono', 'Node.js', 'Electron', 'Anthropic API'],
		links: [
			{ label: 'Live app', href: 'https://easyask.vercel.app' },
			{ label: 'Repository', href: 'https://github.com/LordLP90000/easyask' }
		],
		status: 'in-progress',
		year: '2026'
	},
	{
		id: 'hudlscan',
		title: 'HudlScan',
		summary: 'Analysis tool for Hudl playbooks that automatically detects and categorises plays.',
		description:
			'Analysis tool for Hudl playbooks, built as a SvelteKit application with a Node backend. Content is structured in TypeScript data files, so new features and analyses can be added without UI changes.',
		stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Node.js'],
		links: [{ label: 'Repository', href: 'https://github.com/LordLP90000/HudlScan' }],
		status: 'in-progress',
		year: '2026'
	}
];

export const projects: Record<Locale, Project[]> = { de, en };
```

- [ ] **Step 6.2:** `src/lib/data/lab.ts` — keep interface (`state` union unchanged; display labels live in `ui.lab.state`); `de` verbatim; add:

```ts
const en: LabExperiment[] = [
	{
		title: 'Security Sandbox',
		description:
			'This is where experiments on vulnerability scanning, logging pipelines and zero-trust concepts will land.',
		state: 'geplant'
	},
	{
		title: 'OPC UA Playground',
		description:
			'Small demos on communication between industrial devices and modern web frontends.',
		state: 'skizziert'
	},
	{
		title: 'Svelte + industrial UI',
		description:
			'Prototypes for interfaces that talk directly to machines — inspired by Angular frontends at Delta.',
		state: 'bald'
	}
];

export const experiments: Record<Locale, LabExperiment[]> = { de, en };
```

- [ ] **Step 6.3:** `src/lib/data/notes.ts` — keep interface; `de` verbatim; add (slugs/dates identical):

```ts
const en: Note[] = [
	{
		slug: 'vom-schaltschrank-zur-shell',
		title: 'From switch cabinet to shell',
		date: '2026-03-01',
		excerpt:
			'What my electrician apprenticeship taught me about software — and why Siemens Logo was a surprisingly good introduction to logic.'
	},
	{
		slug: 'security-als-einsteiger',
		title: 'Security as a beginner: expectation vs. reality',
		date: '2026-02-12',
		excerpt:
			'Notes on why security genuinely interests me — beyond the Hollywood image of the hacker.'
	}
];

export const notes: Record<Locale, Note[]> = { de, en };
```

- [ ] **Step 6.4:** Commit:

```bash
git add src/lib/data/projects.ts src/lib/data/lab.ts src/lib/data/notes.ts
git commit -m "feat: locale-keyed projects/lab/notes data"
```

### Task 7: Route move + locale-aware contact action

**Files:**

- Move: `src/routes/+page.svelte`, `src/routes/+page.server.ts`, `src/routes/danke/` → `src/routes/[[lang=lang]]/`
- Modify: `src/routes/[[lang=lang]]/+page.server.ts`

- [ ] **Step 7.1:** Move (bash — quote the brackets):

```bash
mkdir -p 'src/routes/[[lang=lang]]'
git mv src/routes/+page.svelte 'src/routes/[[lang=lang]]/+page.svelte'
git mv src/routes/+page.server.ts 'src/routes/[[lang=lang]]/+page.server.ts'
git mv src/routes/danke 'src/routes/[[lang=lang]]/danke'
```

- [ ] **Step 7.2:** In `src/routes/[[lang=lang]]/+page.server.ts`, make the action locale-aware. Add imports and destructure `params`:

```ts
import { ui } from '$data/ui';
import { localeOf } from '$lib/i18n';
```

```ts
	contact: async ({ request, params }) => {
		const t = ui[localeOf(params)].formErrors;
		// … formData parsing unchanged …
```

Replace the five hardcoded German strings: `'Bitte gib deinen Namen an.'` → `t.name`, e-mail error → `t.email`, message error → `t.message`, server config error → `t.server`, send error → `t.send`. Replace the final redirect:

```ts
redirect(303, localeOf(params) === 'en' ? '/en/danke' : '/danke');
```

(Email subject/body to Laurent stays German.)

- [ ] **Step 7.3:** `npx vitest run --project server` — 19 tests still pass. Commit:

```bash
git add -A
git commit -m "feat: one-pager + danke under [[lang=lang]]; locale-aware contact action"
```

### Task 8: Sections A — Hero, Timeline, Skills

**Files:**

- Rewrite: `src/lib/components/Hero.svelte`, `src/lib/components/Timeline.svelte`, `src/lib/components/Skills.svelte`

- [ ] **Step 8.1:** `Hero.svelte` — script block becomes:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { profile } from '$data/profile';
	import { hobbies } from '$data/interests';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].profil);
	const p = $derived(profile[locale]);

	const specs = $derived([
		{ k: t.specName, v: p.name },
		{ k: t.specLocation, v: p.location },
		{ k: t.specBirthYear, v: `${p.birthDate.slice(-4)} (* ${p.birthDate.slice(0, 6)})` },
		{ k: t.specNationality, v: p.citizenship },
		{ k: t.specLanguages, v: t.languagesValue },
		{ k: t.specStatus, v: t.statusValue }
	]);

	const tracePath = 'M0 20 H180 L200 8 H320 L340 20 H480 V32 H620 L640 20 H800';
</script>
```

Markup changes (layout/classes untouched): `<Section id="a-profil" num="01" title={t.title} first>`; `<h1>` content `{t.headline1}<br /><span class="text-copper">{t.headline2}</span>`; intro `<p>` content `{t.intro}`; `<img … alt={t.portraitAlt} …>`; figcaption `{t.portraitCaption}`; bio `<p>` content `{p.bio}`; final line `<span …>{t.offWork}&nbsp;&nbsp;</span>{hobbies[locale].join(' · ')}`.

- [ ] **Step 8.2:** `Timeline.svelte` — script becomes:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { experience } from '$data/experience';

	const locale = $derived(localeOf(page.params));
	const jobs = $derived(experience[locale]);
</script>
```

Markup: `<Section id="a-werdegang" num="02" title={ui[locale].werdegang.title}>` and `{#each jobs as job (job.id)}` — rest verbatim.

- [ ] **Step 8.3:** `Skills.svelte` — script becomes:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { skillCategories, languages } from '$data/skills';
	import { interestAreas } from '$data/interests';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].skills);
	const cats = $derived(skillCategories[locale]);
	const langs = $derived(languages[locale]);
	const areas = $derived(interestAreas[locale]);

	const ticks = [1, 2, 3, 4, 5] as const;
</script>
```

Markup: `<Section id="a-skills" num="03" title={t.title} lead={t.lead}>`; iterate `cats`, `langs`, `areas`; the two block headings become `{t.languagesTitle}` and `{t.interestsTitle}` — rest verbatim.

- [ ] **Step 8.4:** Autofixer over all three; commit:

```bash
git add src/lib/components/Hero.svelte src/lib/components/Timeline.svelte src/lib/components/Skills.svelte
git commit -m "feat: locale-aware Profil/Werdegang/Skills sections"
```

### Task 9: Sections B — Projects, Education, Lab, Notes

**Files:**

- Rewrite: `src/lib/components/Projects.svelte`, `src/lib/components/Education.svelte`, `src/lib/components/Lab.svelte`, `src/lib/components/Notes.svelte`

- [ ] **Step 9.1:** `Projects.svelte` script:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { projects } from '$data/projects';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].projekte);
	const items = $derived(projects[locale]);
</script>
```

Markup: `<Section id="a-projekte" num="04" title={t.title} lead={t.lead}>`; `{#each items as p (p.id)}`; status line `{t.status[p.status]}`; link text `{t.linkText(link.label)}` (replaces `{link.label} ansehen →`) — rest verbatim. The local `statusLabel` const is deleted.

- [ ] **Step 9.2:** `Education.svelte` script:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { education } from '$data/education';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].ausbildung);
	const entries = $derived(education[locale]);
</script>
```

Markup: `<Section id="a-ausbildung" num="05" title={t.title}>`; `{#each entries as e (e.id)}`; type label `{t.type[e.type]}`. Local `typeLabel` const deleted.

- [ ] **Step 9.3:** `Lab.svelte` script:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { experiments } from '$data/lab';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].lab);
	const items = $derived(experiments[locale]);
</script>
```

Markup: `<Section id="a-lab" num="06" title={t.title} lead={t.lead}>`; `{#each items as x (x.title)}`; state label `{t.state[x.state]}` (replaces `x.state.toUpperCase()`); footnote `{t.footnote}`.

- [ ] **Step 9.4:** `Notes.svelte` script:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Section from './Section.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { notes } from '$data/notes';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].notes);
	const items = $derived(notes[locale]);
	const formatter = $derived(
		new Intl.DateTimeFormat(t.dateLocale, { day: '2-digit', month: '2-digit', year: 'numeric' })
	);
</script>
```

Markup: `<Section id="a-notes" num="07" title={t.title} lead={t.lead}>`; `{#each items as n (n.slug)}`; DRAFT badge `{t.draft}`.

- [ ] **Step 9.5:** Autofixer over all four; commit:

```bash
git add src/lib/components/Projects.svelte src/lib/components/Education.svelte src/lib/components/Lab.svelte src/lib/components/Notes.svelte
git commit -m "feat: locale-aware Projekte/Ausbildung/Lab/Notes sections"
```

### Task 10: Contact + Faq

**Files:**

- Rewrite: `src/lib/components/Contact.svelte`, `src/lib/components/Faq.svelte`

- [ ] **Step 10.1:** `Faq.svelte` — script becomes (schema must be `$derived` now):

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { faq } from '$data/faq';
	import JsonLd from './JsonLd.svelte';

	const locale = $derived(localeOf(page.params));
	const entries = $derived(faq[locale]);

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: entries.map((entry) => ({
			'@type': 'Question',
			name: entry.question,
			acceptedAnswer: { '@type': 'Answer', text: entry.answer }
		}))
	});
</script>
```

Markup: heading `{ui[locale].kontakt.faqTitle}`; `{#each entries as entry (entry.question)}` — rest verbatim.

- [ ] **Step 10.2:** `Contact.svelte` — script gains:

```svelte
import {page} from '$app/state'; import {localeOf} from '$lib/i18n'; import {ui} from '$data/ui'; import
{responseTimePromise} from '$data/site'; const locale = $derived(localeOf(page.params)); const t = $derived(ui[locale].kontakt);
const p = $derived(profile[locale]); const socials = $derived(p.social.filter((s) => s.icon === 'github'
|| s.icon === 'linkedin'));
```

(`profile` import stays; drop the old `responseTime` import; `socials` becomes `$derived` off `p`.)

Markup changes: `<Section id="a-kontakt" num="08" title={t.title}>`; heading `{t.heading}`; lead paragraph content `{t.lead} {responseTimePromise[locale]}`; mailto/tel use `p.email` / `p.phone`; form heading `{t.formTitle}`; the three label spans `{t.nameLabel}` / `{t.emailLabel}` / `{t.messageLabel}`; submit button `{submitting ? t.submitting : t.submit}`; footer line privacy link label `{t.privacy}` (link target stays `resolve('/datenschutz')`). Everything else (enhance handler, inputClass, error box, © line text) verbatim.

- [ ] **Step 10.3:** Autofixer; commit:

```bash
git add src/lib/components/Contact.svelte src/lib/components/Faq.svelte
git commit -m "feat: locale-aware Kontakt section + FAQ"
```

### Task 11: Sidebar (switcher), ThemeToggle, CookieConsent

**Files:**

- Rewrite: `src/lib/components/Sidebar.svelte`, `src/lib/components/ThemeToggle.svelte`, `src/lib/components/CookieConsent.svelte`

- [ ] **Step 11.1:** `ThemeToggle.svelte`:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';

	const t = $derived(ui[localeOf(page.params)].theme);
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	aria-label={t.label}
	class="self-start border border-line-strong px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink transition-colors hover:border-copper hover:text-copper"
>
	{theme.value === 'dark' ? t.dark : t.light}
</button>
```

- [ ] **Step 11.2:** `Sidebar.svelte` — script becomes:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { localeOf, type Locale } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { sections } from '$data/navigation';
	import { profile } from '$data/profile';
	import ThemeToggle from './ThemeToggle.svelte';

	let active = $state('a-profil');
	let open = $state(false);

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].sidebar);
	const nav = $derived(sections[locale]);
	const p = $derived(profile[locale]);
	const onHome = $derived(page.url.pathname === '/' || page.url.pathname === '/en');
	const activeNum = $derived(nav.find((s) => s.id === active)?.num ?? '01');
	const firstName = profile.de.name.split(' ')[0];
	const homePath = $derived(locale === 'en' ? '/en' : '/');

	$effect(() => {
		if (!onHome) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) active = entry.target.id;
				}
			},
			{ rootMargin: '-30% 0px -60% 0px' }
		);
		for (const s of nav) {
			const el = document.getElementById(s.id);
			if (el) io.observe(el);
		}
		return () => io.disconnect();
	});

	$effect(() => {
		document.body.classList.toggle('overflow-hidden', open);
		return () => document.body.classList.remove('overflow-hidden');
	});

	function href(id: string) {
		return onHome ? `#${id}` : `${locale === 'en' ? '/en' : '/'}#${id}`;
	}

	function langHref(target: Locale) {
		const home = target === 'en' ? '/en' : '/';
		const path = page.url.pathname;
		if (path === '/danke' || path === '/en/danke') {
			return target === 'en' ? '/en/danke' : '/danke';
		}
		if (onHome) return `${home}#${active}`;
		return home;
	}
</script>
```

Markup changes:

- Rail eyebrow `{t.eyebrow}`; home link `href={homePath}`; subtitle `{t.role1}<br />{t.role2}`.
- Both navs: `aria-label={t.navLabel}`, iterate `nav` instead of `sections`.
- Rail bottom block and mobile top bar each gain the switcher next to `<ThemeToggle />`:

```svelte
<div
	class="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em]"
	aria-label={t.langLabel}
>
	<a
		href={langHref('de')}
		aria-current={locale === 'de' ? 'true' : undefined}
		class={locale === 'de' ? 'text-copper' : 'text-muted transition-colors hover:text-copper'}>DE</a
	>
	<span class="text-line-strong" aria-hidden="true">|</span>
	<a
		href={langHref('en')}
		aria-current={locale === 'en' ? 'true' : undefined}
		class={locale === 'en' ? 'text-copper' : 'text-muted transition-colors hover:text-copper'}>EN</a
	>
</div>
```

- Rail footer lines use `p.location` / `p.citizenship` / `p.birthDate`; overlay footer likewise.
- Mobile: INDEX button `aria-label={t.indexToggleLabel}`, label `{open ? t.close : t.index}`.
- `<svelte:window>` handler unchanged.

- [ ] **Step 11.3:** `CookieConsent.svelte` — script gains `page`/`localeOf`/`ui` imports and `const t = $derived(ui[localeOf(page.params)].cookie);`. Markup: `aria-label={t.label}`, paragraph `{t.text}` + link text `{t.more}`, buttons `{t.decline}` / `{t.accept}`. Logic (gaId, visible, consent.set) unchanged.

- [ ] **Step 11.4:** Autofixer; commit:

```bash
git add src/lib/components/Sidebar.svelte src/lib/components/ThemeToggle.svelte src/lib/components/CookieConsent.svelte
git commit -m "feat: DE|EN switcher in sidebar; locale-aware chrome strings"
```

### Task 12: Seo, one-pager, danke, error, datenschutz

**Files:**

- Modify: `src/lib/components/Seo.svelte`, `src/routes/[[lang=lang]]/+page.svelte`, `src/routes/[[lang=lang]]/danke/+page.svelte`, `src/routes/+error.svelte`, `src/routes/datenschutz/+page.svelte`

- [ ] **Step 12.1:** `Seo.svelte` — add to Props: `alternates?: { de: string; en: string };` and destructure it. Script gains:

```ts
import { localeOf } from '$lib/i18n';
const locale = $derived(localeOf(page.params));
```

Markup: `og:site_name` content `{profile[locale].name}`; `og:locale` content `{locale === 'en' ? 'en_GB' : 'de_CH'}`; after the canonical block add:

```svelte
{#if alternates}
	<link rel="alternate" hreflang="de" href={`${page.url.origin}${alternates.de}`} />
	<link rel="alternate" hreflang="en" href={`${page.url.origin}${alternates.en}`} />
	<link rel="alternate" hreflang="x-default" href={`${page.url.origin}${alternates.de}`} />
{/if}
```

- [ ] **Step 12.2:** `src/routes/[[lang=lang]]/+page.svelte` — script gains `localeOf`/`ui` imports and:

```ts
const locale = $derived(localeOf(page.params));
const t = $derived(ui[locale]);
const p = $derived(profile[locale]);
```

`personSchema` uses `p.name`, `jobTitle: t.jobTitle`, `url: \`${page.url.origin}${locale === 'en' ? '/en' : '/'}\``, `sameAs: p.social.filter(…)`. Seo call becomes:

```svelte
<Seo
	title={t.seo.title}
	description={t.seo.description}
	type="profile"
	alternates={{ de: '/', en: '/en' }}
/>
```

- [ ] **Step 12.3:** `src/routes/[[lang=lang]]/danke/+page.svelte`:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$components/Seo.svelte';
	import { localeOf } from '$lib/i18n';
	import { ui } from '$data/ui';
	import { responseTimePromise } from '$data/site';

	const locale = $derived(localeOf(page.params));
	const t = $derived(ui[locale].danke);
	const home = $derived(locale === 'en' ? '/en' : '/');
</script>

<Seo title={t.seoTitle} description={t.seoDescription} noindex />

<section class="flex min-h-[70svh] flex-col justify-center py-16">
	<p class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">{t.eyebrow}</p>
	<h1 class="text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.025em]">
		{t.heading}
	</h1>
	<p class="mt-6 max-w-[560px] leading-[1.65] text-muted">
		{t.body}
		{responseTimePromise[locale]}
	</p>
	<div class="mt-10 flex flex-wrap gap-6 text-sm font-medium">
		<a href={home} class="border-b border-copper pb-0.5 text-copper">{t.home}</a>
		<a
			href={`${home}#a-projekte`}
			class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
		>
			{t.projects}
		</a>
	</div>
</section>
```

- [ ] **Step 12.4:** `src/routes/+error.svelte` — locale from pathname (error routes have no `lang` param):

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$components/Seo.svelte';
	import { ui } from '$data/ui';

	const locale = $derived(
		page.url.pathname === '/en' || page.url.pathname.startsWith('/en/') ? 'en' : 'de'
	);
	const t = $derived(ui[locale].error);
	const home = $derived(locale === 'en' ? '/en' : '/');
	const isNotFound = $derived(page.status === 404);
	const title = $derived(isNotFound ? t.notFoundTitle : t.errorTitle);
</script>

<Seo {title} description={t.seoDescription} noindex />

<section class="flex min-h-[70svh] flex-col justify-center py-16">
	<p class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">{t.eyebrow} — {page.status}</p>
	<h1 class="text-[clamp(3rem,10vw,5.5rem)] leading-none font-bold tracking-[-0.035em]">
		{page.status}
	</h1>
	<p class="mt-6 max-w-[560px] leading-[1.65] text-muted">
		{isNotFound ? t.notFoundBody : t.otherBody}
	</p>
	<div class="mt-10 flex flex-wrap gap-6 text-sm font-medium">
		<a href={home} class="border-b border-copper pb-0.5 text-copper">{t.home}</a>
		<a
			href={`${home}#a-kontakt`}
			class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
		>
			{t.contact}
		</a>
	</div>
</section>
```

(`resolve` import dropped; literal hrefs are fine — the navigation lint rule is off.)

- [ ] **Step 12.5:** `src/routes/datenschutz/+page.svelte` — only the two data references change: `{profile.name}` → `{profile.de.name}`, `{profile.email}` → `{profile.de.email}`. All German text unchanged.

- [ ] **Step 12.6:** Autofixer over all five; commit:

```bash
git add -A
git commit -m "feat: hreflang + localized SEO, danke/error/datenschutz locale wiring"
```

### Task 13: Verification

- [ ] **Step 13.1:** `npm run check` — expect 0 errors (first time since Task 4).
- [ ] **Step 13.2:** `npx vitest run --project server` — expect 19 tests passing.
- [ ] **Step 13.3:** `npm run format`, then `npm run lint` — clean.
- [ ] **Step 13.4:** `npm run build` — succeeds.
- [ ] **Step 13.5:** Visual pass (dev server + Playwright): `/` and `/en` at 1280px and 390px, light + dark. Check: EN section labels in sidebar; DE|EN switcher round-trip keeps the active anchor (`/#a-skills` ↔ `/en#a-skills`); `/en/danke`; EN 404 (e.g. `/en/nope`); `/datenschutz` still German from both languages; `/skills` still 301s to `/#a-skills`; view-source on both pages shows correct `<html lang>` and the three hreflang tags.
- [ ] **Step 13.6:** Fix anything found; final commit.

## Self-review notes

- Spec coverage: routing/matcher (T1, T7), `<html lang>` (T2), ui strings (T3), data layer (T4–T6), contact action (T7), all 8 sections (T8–T10), switcher + chrome (T11), SEO/hreflang/sitemap (T4 site.ts + T12), error/danke/datenschutz (T12), tests + gates + visual (T1, T2, T13). No gaps found.
- Type consistency: `localeOf`/`prefix` (T1) match all later usage; `ui` keys referenced in T7–T12 all exist in T3 (`formErrors.{name,email,message,server,send}`, `projekte.{status,linkText}`, `ausbildung.type`, `lab.state`, `notes.dateLocale`, `sidebar.*`, `theme.*`, `cookie.*`, `danke.*`, `error.*`, `kontakt.*`, `profil.*`, `seo.*`, `jobTitle`). Data exports `Record<Locale, T>` match component access `x[locale]`.
- Placeholder scan: `de` arrays marked "verbatim from current file" are a copy instruction with the source named, not a gap; all EN content is written out in full.
- English copy is a draft — Laurent reviews wording during/after implementation (headline, "Career", "FOCUS AREAS", jobTitle, EFZ phrasing).
