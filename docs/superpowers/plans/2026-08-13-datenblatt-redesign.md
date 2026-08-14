# Datenblatt Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the site UI as the "Datenblatt" one-pager per `docs/superpowers/specs/2026-08-13-datenblatt-redesign-design.md`.

**Architecture:** In-place rewrite on branch `redesign/datenblatt`. New token set + fonts in `layout.css`, new `Sidebar` shell, section components rewritten against unchanged data files, retired routes 301-redirect to anchors via `hooks.server.ts`, contact action moves to the root route.

**Tech Stack:** SvelteKit 2 (Svelte 5 runes), Tailwind 4 (`@theme` tokens), @fontsource, Vitest, adapter-vercel.

**Conventions used throughout:**

- Breakpoint for the sidebar is `min-[900px]:` (Tailwind arbitrary variant).
- Color utilities (`text-copper`, `border-line`, `bg-paper`, …) come from the `@theme` block in Task 3 and flip automatically with `.dark` because they reference runtime CSS vars.
- Token rename map for kept files: `--surface→--paper`, `--surface-muted→--card`, `--surface-elevated→--card`, `--text→--ink`, `--text-muted→--muted`, `--border→--line`, `--accent→--copper`, `--accent-soft→--copper-soft`, `--highlight→--copper`, `--ring→--copper-soft`.

---

### Task 0: Branch + fonts

**Files:** `package.json` (via npm)

- [ ] **Step 0.1:** `git checkout -b redesign/datenblatt`
- [ ] **Step 0.2:** `npm remove @fontsource/fira-mono && npm install -D @fontsource/archivo @fontsource/ibm-plex-mono`
- [ ] **Step 0.3:** Commit: `chore: swap fonts to Archivo + IBM Plex Mono (self-hosted)`

### Task 1: Retired-route redirects (TDD)

**Files:**

- Test: `src/hooks.server.test.ts`
- Create: `src/hooks.server.ts`

- [ ] **Step 1.1: Write the failing test** — `src/hooks.server.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import type { RequestEvent } from '@sveltejs/kit';
import { handle } from './hooks.server';

const redirects: Array<[string, string]> = [
	['/about', '/#a-profil'],
	['/experience', '/#a-werdegang'],
	['/skills', '/#a-skills'],
	['/projects', '/#a-projekte'],
	['/education', '/#a-ausbildung'],
	['/lab', '/#a-lab'],
	['/notes', '/#a-notes'],
	['/contact', '/#a-kontakt']
];

function invoke(pathname: string) {
	const event = { url: new URL(`http://localhost${pathname}`) } as unknown as RequestEvent;
	const resolve = async () => new Response('ok');
	return handle({ event, resolve } as never);
}

describe('hooks.server handle', () => {
	it.each(redirects)('301-redirects %s to %s', async (from, to) => {
		const err = await invoke(from).then(
			() => null,
			(e) => e
		);
		expect(err).toMatchObject({ status: 301, location: to });
	});

	it('redirects trailing-slash variants', async () => {
		const err = await invoke('/about/').then(
			() => null,
			(e) => e
		);
		expect(err).toMatchObject({ status: 301, location: '/#a-profil' });
	});

	it('resolves untouched routes normally', async () => {
		const res = (await invoke('/')) as Response;
		expect(await res.text()).toBe('ok');
	});
});
```

- [ ] **Step 1.2:** Run `npx vitest run --project server src/hooks.server.test.ts` — expect FAIL (module not found).
- [ ] **Step 1.3: Implement** — `src/hooks.server.ts`:

```ts
import { redirect, type Handle } from '@sveltejs/kit';

/** Routes retired by the Datenblatt one-pager redesign → their section anchors. */
const retiredRoutes: Record<string, string> = {
	'/about': '/#a-profil',
	'/experience': '/#a-werdegang',
	'/skills': '/#a-skills',
	'/projects': '/#a-projekte',
	'/education': '/#a-ausbildung',
	'/lab': '/#a-lab',
	'/notes': '/#a-notes',
	'/contact': '/#a-kontakt'
};

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname.replace(/\/+$/, '') || '/';
	const target = retiredRoutes[pathname];
	if (target) redirect(301, target);
	return resolve(event);
};
```

- [ ] **Step 1.4:** Re-run the test — expect PASS (10 tests).
- [ ] **Step 1.5:** Commit: `feat: 301-redirect retired routes to one-pager anchors`

### Task 2: Data layer

**Files:**

- Rewrite: `src/lib/data/navigation.ts`
- Modify: `src/lib/data/site.ts`, `src/lib/data/faq.ts`, `src/lib/data/skills.ts:24`
- Create: `src/lib/data/lab.ts`, `src/lib/data/notes.ts`
- Delete: `src/lib/data/testimonials.ts`, `src/lib/data/caseStudies.ts`

- [ ] **Step 2.1:** Rewrite `src/lib/data/navigation.ts`:

```ts
export interface SectionNav {
	id: string;
	num: string;
	label: string;
}

/** The one-pager's section index — single source for sidebar nav and section numbering. */
export const sections: SectionNav[] = [
	{ id: 'a-profil', num: '01', label: 'PROFIL' },
	{ id: 'a-werdegang', num: '02', label: 'WERDEGANG' },
	{ id: 'a-skills', num: '03', label: 'SKILLS' },
	{ id: 'a-projekte', num: '04', label: 'PROJEKTE' },
	{ id: 'a-ausbildung', num: '05', label: 'AUSBILDUNG' },
	{ id: 'a-lab', num: '06', label: 'LAB' },
	{ id: 'a-notes', num: '07', label: 'NOTES' },
	{ id: 'a-kontakt', num: '08', label: 'KONTAKT' }
];
```

- [ ] **Step 2.2:** In `src/lib/data/site.ts`: shrink `publicPages` to `[{ path: '/', priority: 1.0 }, { path: '/datenschutz', priority: 0.3 }]`; replace the responseTime block with:

```ts
/** Response-time window shown in the spec table, Kontakt section and FAQ. */
export const responseTime = '48 Stunden';
export const responseTimePromise = `Ich antworte innerhalb von ${responseTime}.`;
```

- [ ] **Step 2.3:** In `src/lib/data/faq.ts`: Q1 answer loses the `[PLACEHOLDER — Jahr]` sentence (ends after "…Elektroinstallateur EFZ abgeschlossen."); Q5 answer becomes `'Am einfachsten über das Kontaktformular oder per E-Mail. Ich antworte innerhalb von 48 Stunden.'`
- [ ] **Step 2.4:** In `src/lib/data/skills.ts` change category title `'Sprachen'` → `'Sprachen & Markup'` (avoids collision with the spoken-languages block).
- [ ] **Step 2.5:** Create `src/lib/data/lab.ts` (data moved from `routes/lab/+page.svelte`):

```ts
export interface LabExperiment {
	title: string;
	description: string;
	state: 'geplant' | 'skizziert' | 'bald';
}

export const experiments: LabExperiment[] = [
	{
		title: 'Security Sandbox',
		description:
			'Hier werden Experimente zu Vulnerability Scanning, Logging-Pipelines und Zero-Trust-Konzepten landen.',
		state: 'geplant'
	},
	{
		title: 'OPC UA Playground',
		description:
			'Kleine Demos zur Kommunikation zwischen industriellen Geräten und modernen Web-Frontends.',
		state: 'skizziert'
	},
	{
		title: 'Svelte + Industrie-UI',
		description:
			'Prototypen für Oberflächen, die direkt mit Maschinen sprechen — inspiriert von Angular-Frontends bei Delta.',
		state: 'bald'
	}
];
```

- [ ] **Step 2.6:** Create `src/lib/data/notes.ts` (data moved from `routes/notes/+page.svelte`):

```ts
export interface Note {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
}

export const notes: Note[] = [
	{
		slug: 'vom-schaltschrank-zur-shell',
		title: 'Vom Schaltschrank zur Shell',
		date: '2026-03-01',
		excerpt:
			'Was meine Elektriker-Lehre mir über Software beigebracht hat — und warum Siemens Logo ein überraschend guter Einstieg in Logik war.'
	},
	{
		slug: 'security-als-einsteiger',
		title: 'Security als Einsteiger: Erwartung vs. Realität',
		date: '2026-02-12',
		excerpt:
			'Notizen dazu, warum Security mich wirklich interessiert — jenseits der Hollywood-Vorstellung vom Hacker.'
	}
];
```

- [ ] **Step 2.7:** Delete `src/lib/data/testimonials.ts` and `src/lib/data/caseStudies.ts`.
- [ ] **Step 2.8:** `npx tsc --noEmit -p tsconfig.json` will fail where old exports are used — expected; consumers are rewritten in later tasks. Commit: `feat: data layer for Datenblatt one-pager`

### Task 3: Design tokens + fonts (`layout.css`) and `app.html`

**Files:**

- Rewrite: `src/routes/layout.css`
- Modify: `src/app.html:7` (theme-color)

- [ ] **Step 3.1:** Replace `src/routes/layout.css` entirely:

```css
@import 'tailwindcss';
@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';
@import '@fontsource/archivo/400.css';
@import '@fontsource/archivo/500.css';
@import '@fontsource/archivo/600.css';
@import '@fontsource/archivo/700.css';
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/500.css';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
	--font-sans: 'Archivo', ui-sans-serif, system-ui, sans-serif;
	--font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

	/* Utility hooks (bg-paper, text-ink, border-line, text-copper, …).
	   They point at runtime vars so `.dark` flips them without extra classes. */
	--color-paper: var(--paper);
	--color-card: var(--card);
	--color-ink: var(--ink);
	--color-muted: var(--muted);
	--color-line: var(--line);
	--color-line-strong: var(--line-strong);
	--color-copper: var(--copper);
	--color-copper-soft: var(--copper-soft);
}

:root {
	color-scheme: light;
	--paper: #fafaf7;
	--ink: #171614;
	--muted: #6e6b64;
	--line: #e2dfd7;
	--line-strong: #c9c5ba;
	--copper: #b45309;
	--copper-soft: rgba(180, 83, 9, 0.09);
	--card: #ffffff;
}

:root.dark {
	color-scheme: dark;
	--paper: #151412;
	--ink: #edebe6;
	--muted: #8f8b82;
	--line: #2c2a26;
	--line-strong: #403d37;
	--copper: #d9803e;
	--copper-soft: rgba(217, 128, 62, 0.12);
	--card: #1b1a17;
}

html {
	scroll-behavior: smooth;
	scroll-padding-top: 4.5rem;
}

@media (min-width: 900px) {
	html {
		scroll-padding-top: 1.5rem;
	}
}

body {
	min-height: 100vh;
	margin: 0;
	font-family: var(--font-sans);
	background: var(--paper);
	color: var(--ink);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	transition:
		background-color 0.3s ease,
		color 0.3s ease;
}

a {
	color: inherit;
	text-decoration: none;
}

*:focus-visible {
	outline: 2px solid var(--copper);
	outline-offset: 2px;
}

::selection {
	background: var(--copper);
	color: #fff;
}

/* Spec-sheet row hover (dl rows, education rows, lab/notes rows). */
.spec-row {
	transition: background-color 0.25s ease;
}
.spec-row:hover {
	background: var(--copper-soft);
}

/* Circuit-trace dash flow in the profile section's SVG. */
@keyframes pulseflow {
	0% {
		stroke-dashoffset: 0;
	}
	100% {
		stroke-dashoffset: -240;
	}
}
.pulseflow {
	animation: pulseflow 5s linear infinite;
}

.reveal {
	opacity: 0;
	transform: translate3d(0, 18px, 0);
	transition:
		opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
		transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	transition-delay: var(--reveal-delay, 0ms);
	will-change: opacity, transform;
}

.reveal.is-visible {
	opacity: 1;
	transform: none;
}

@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
	.reveal {
		opacity: 1;
		transform: none;
		transition: none;
	}
	.pulseflow {
		animation: none;
	}
	* {
		animation-duration: 0.001ms !important;
		transition-duration: 0.001ms !important;
	}
}
```

- [ ] **Step 3.2:** In `src/app.html` set `<meta name="theme-color" content="#151412" />`.
- [ ] **Step 3.3:** Commit: `feat: Datenblatt design tokens, self-hosted fonts`

### Task 4: ThemeToggle + Section

**Files:**

- Rewrite: `src/lib/components/ThemeToggle.svelte`, `src/lib/components/Section.svelte`

- [ ] **Step 4.1:** `ThemeToggle.svelte`:

```svelte
<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	aria-label="Farbschema wechseln"
	class="self-start border border-line-strong px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink transition-colors hover:border-copper hover:text-copper"
>
	{theme.value === 'dark' ? 'MODUS: DUNKEL' : 'MODUS: HELL'}
</button>
```

- [ ] **Step 4.2:** `Section.svelte`:

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		num: string;
		title: string;
		lead?: string;
		first?: boolean;
		children: Snippet;
	}

	let { id, num, title, lead, first = false, children }: Props = $props();
</script>

<section
	{id}
	data-reveal
	class={first
		? 'pt-10 min-[900px]:pt-22'
		: 'mt-24 border-t border-line-strong pt-8 min-[900px]:mt-30'}
>
	<h2 class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">
		{num} — {title.toUpperCase()}
	</h2>
	{#if lead}
		<p class="mb-10 max-w-[600px] text-[15px] leading-[1.65] text-muted">{lead}</p>
	{/if}
	{@render children()}
</section>
```

- [ ] **Step 4.3:** Commit: `feat: Datenblatt Section wrapper + text ThemeToggle`

### Task 5: Sidebar (desktop rail, mobile top bar, scrollspy)

**Files:**

- Create: `src/lib/components/Sidebar.svelte`

- [ ] **Step 5.1:**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { sections } from '$data/navigation';
	import { profile } from '$data/profile';
	import ThemeToggle from './ThemeToggle.svelte';

	let active = $state('a-profil');
	let open = $state(false);

	const onHome = $derived(page.url.pathname === resolve('/'));
	const activeNum = $derived(sections.find((s) => s.id === active)?.num ?? '01');
	const firstName = profile.name.split(' ')[0];

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
		for (const s of sections) {
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
		return onHome ? `#${id}` : `${resolve('/')}#${id}`;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<!-- Desktop rail -->
<aside
	class="fixed inset-y-0 left-0 z-10 hidden w-[264px] flex-col gap-10 border-r border-line bg-paper px-7 py-9 min-[900px]:flex"
>
	<div>
		<p class="mb-3 font-mono text-[11px] tracking-[0.12em] text-muted">LEBENSLAUF / 2026</p>
		<a href={resolve('/')} class="text-xl font-semibold tracking-tight">{firstName} Scherrer</a>
		<p class="mt-1.5 text-[13px] leading-normal text-muted">
			Informatiker in Ausbildung<br />Elektroinstallateur EFZ
		</p>
	</div>

	<nav class="flex flex-col gap-0.5" aria-label="Index">
		{#each sections as s (s.id)}
			<a
				href={href(s.id)}
				aria-current={onHome && active === s.id ? 'true' : undefined}
				class="-mx-2.5 flex items-baseline gap-3 px-2.5 py-2 font-mono text-xs tracking-[0.06em] transition-colors {onHome &&
				active === s.id
					? 'bg-copper-soft text-copper'
					: 'text-muted hover:text-copper'}"
			>
				<span class="text-[11px] opacity-70">{s.num}</span>
				<span>{s.label}</span>
			</a>
		{/each}
	</nav>

	<div class="mt-auto flex flex-col gap-4">
		<ThemeToggle />
		<p class="font-mono text-[11px] leading-[1.8] text-muted">
			{profile.location}<br />{profile.citizenship} · * {profile.birthDate}
		</p>
	</div>
</aside>

<!-- Mobile top bar (stays above the overlay so INDEX/SCHLIESSEN keeps working) -->
<header
	class="fixed inset-x-0 top-0 z-40 flex items-center gap-3 border-b border-line bg-paper px-4 py-3 min-[900px]:hidden"
>
	<a href={resolve('/')} class="text-sm font-semibold tracking-tight">{firstName} Scherrer</a>
	{#if onHome}
		<span class="font-mono text-[11px] text-copper" aria-hidden="true">{activeNum}</span>
	{/if}
	<div class="ml-auto flex items-center gap-3">
		<ThemeToggle />
		<button
			type="button"
			aria-expanded={open}
			aria-label="Index umschalten"
			onclick={() => (open = !open)}
			class="py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink transition-colors hover:text-copper"
		>
			{open ? 'SCHLIESSEN' : 'INDEX'}
		</button>
	</div>
</header>

{#if open}
	<nav
		class="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-paper px-5 pt-20 pb-10 min-[900px]:hidden"
		aria-label="Index"
	>
		{#each sections as s (s.id)}
			<a
				href={href(s.id)}
				onclick={() => (open = false)}
				class="flex items-baseline gap-4 border-b border-line py-4 font-mono text-sm tracking-[0.06em] {onHome &&
				active === s.id
					? 'text-copper'
					: 'text-ink'}"
			>
				<span class="text-xs text-muted">{s.num}</span>
				<span>{s.label}</span>
			</a>
		{/each}
		<p class="mt-auto pt-10 font-mono text-[11px] text-muted">
			{profile.location} · {profile.citizenship}
		</p>
	</nav>
{/if}
```

- [ ] **Step 5.2:** Commit: `feat: Sidebar with scrollspy + mobile index overlay`

### Task 6: Layout shell

**Files:**

- Rewrite: `src/routes/+layout.svelte`

- [ ] **Step 6.1:**

```svelte
<script lang="ts">
	import Sidebar from '$components/Sidebar.svelte';
	import CookieConsent from '$components/CookieConsent.svelte';
	import Analytics from '$components/Analytics.svelte';
	import { reveal } from '$lib/actions/reveal';
	import './layout.css';

	let { children } = $props();
</script>

<Sidebar />
<main
	use:reveal
	class="px-5 pt-16 pb-16 min-[900px]:ml-[264px] min-[900px]:px-16 min-[900px]:pt-0 min-[900px]:pb-24"
>
	<div class="w-full max-w-[920px]">
		{@render children()}
	</div>
</main>
<CookieConsent />
<Analytics />
```

- [ ] **Step 6.2:** Commit: `feat: sidebar layout shell, drop header/footer/sticky-cta chrome`

### Task 7: Hero → section 01 Profil

**Files:**

- Rewrite: `src/lib/components/Hero.svelte`

- [ ] **Step 7.1:**

```svelte
<script lang="ts">
	import Section from './Section.svelte';
	import { profile } from '$data/profile';
	import { hobbies } from '$data/interests';
	import { responseTime } from '$data/site';

	const birthYear = profile.birthDate.slice(-4);
	const birthDay = profile.birthDate.slice(0, 6);

	const specs = [
		{ k: 'NAME', v: profile.name },
		{ k: 'STANDORT', v: profile.location },
		{ k: 'JAHRGANG', v: `${birthYear} (* ${birthDay})` },
		{ k: 'NATIONALITÄT', v: profile.citizenship },
		{ k: 'SPRACHEN', v: 'DE · IT · EN · FR' },
		{ k: 'STATUS', v: 'Informatik-Lernender, 2. Lehrjahr · Komax AG' },
		{ k: 'ANTWORTZEIT', v: `innerhalb von ${responseTime}` }
	];

	const tracePath = 'M0 20 H180 L200 8 H320 L340 20 H480 V32 H620 L640 20 H800';
</script>

<Section id="a-profil" num="01" title="Profil" first>
	<h1
		class="text-[clamp(2.5rem,7.5vw,5.5rem)] leading-none font-bold tracking-[-0.035em] text-balance"
	>
		Strom verstanden.<br /><span class="text-copper">Jetzt Code.</span>
	</h1>
	<p class="mt-7 max-w-[600px] text-lg leading-[1.65] text-muted">
		Vier Jahre Elektroinstallation, jetzt Zweitausbildung zum Informatiker bei der Komax AG. Mein
		besonderes Interesse gilt IT-Security, Algorithmen und der Kommunikation zwischen Systemen.
	</p>

	<svg
		class="mt-10 mb-2 block w-full"
		height="40"
		viewBox="0 0 800 40"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path d={tracePath} fill="none" stroke="var(--line-strong)" stroke-width="1" />
		<path
			d={tracePath}
			fill="none"
			stroke="var(--copper)"
			stroke-width="1.5"
			stroke-dasharray="18 222"
			class="pulseflow"
		/>
		<circle cx="480" cy="20" r="3" fill="var(--copper)" />
		<circle cx="180" cy="20" r="3" fill="var(--line-strong)" />
	</svg>

	<div
		class="mt-10 grid items-start gap-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(200px,300px)] min-[900px]:gap-14"
	>
		<dl>
			{#each specs as s (s.k)}
				<div
					class="spec-row -mx-2.5 grid grid-cols-[minmax(110px,180px)_1fr] gap-6 border-b border-line px-2.5 py-3"
				>
					<dt class="self-baseline font-mono text-xs tracking-[0.1em] text-muted">{s.k}</dt>
					<dd class="m-0 text-[15px] font-medium">{s.v}</dd>
				</div>
			{/each}
		</dl>

		<figure class="mx-auto w-full max-w-[300px] min-[900px]:mx-0">
			<div class="relative p-3.5">
				<span class="absolute top-0 left-0 h-[18px] w-[18px] border-t-2 border-l-2 border-copper"
				></span>
				<span class="absolute top-0 right-0 h-[18px] w-[18px] border-t-2 border-r-2 border-copper"
				></span>
				<span class="absolute bottom-0 left-0 h-[18px] w-[18px] border-b-2 border-l-2 border-copper"
				></span>
				<span
					class="absolute right-0 bottom-0 h-[18px] w-[18px] border-r-2 border-b-2 border-copper"
				></span>
				<img
					src="/profile.jpeg"
					alt="Porträt von Laurent Scherrer"
					class="block h-auto w-full contrast-[1.03] saturate-[.85]"
				/>
			</div>
			<figcaption class="mt-2.5 text-center font-mono text-[11px] tracking-[0.08em] text-muted">
				ABB. 1 — SCHERRER, LAURENT LUCIEN
			</figcaption>
		</figure>
	</div>

	<p class="mt-8 max-w-[640px] leading-[1.7]">{profile.bio}</p>

	<p class="mt-6 max-w-[640px] text-sm leading-[1.7] text-muted">
		<span class="font-mono text-[11px] tracking-[0.12em] text-copper"
			>AUSSERHALB DES BÜROS&nbsp;&nbsp;</span
		>{hobbies.join(' · ')}
	</p>
</Section>
```

- [ ] **Step 7.2:** Commit: `feat: Profil section (01) — headline, circuit trace, spec table, portrait`

### Task 8: Timeline → section 02 Werdegang

**Files:**

- Rewrite: `src/lib/components/Timeline.svelte`

- [ ] **Step 8.1:**

```svelte
<script lang="ts">
	import Section from './Section.svelte';
	import { experience } from '$data/experience';
</script>

<Section id="a-werdegang" num="02" title="Werdegang">
	<div class="flex flex-col" data-reveal-group data-reveal-step="90">
		{#each experience as job (job.id)}
			<article
				class="grid gap-4 border-b border-line py-9 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<div>
					<p class="font-mono text-[13px]">{job.period}</p>
					{#if job.location}
						<p class="mt-1.5 font-mono text-xs leading-relaxed text-muted">{job.location}</p>
					{/if}
				</div>
				<div>
					<h3 class="text-[26px] leading-tight font-semibold tracking-[-0.015em]">{job.role}</h3>
					<p class="mt-1.5 font-mono text-[13px] text-copper">{job.company.toUpperCase()}</p>
					<p class="mt-4 text-[15px] leading-[1.7] text-muted">{job.summary}</p>
					<ul class="mt-4 flex flex-col gap-2">
						{#each job.highlights as h (h)}
							<li class="flex gap-3 text-[15px] leading-relaxed">
								<span class="text-copper" aria-hidden="true">→</span><span>{h}</span>
							</li>
						{/each}
					</ul>
					<p class="mt-4 font-mono text-xs tracking-[0.04em] text-muted">
						{job.tags.join(' · ').toUpperCase()}
					</p>
				</div>
			</article>
		{/each}
	</div>
</Section>
```

- [ ] **Step 8.2:** Commit: `feat: Werdegang section (02)`

### Task 9: Skills → section 03

**Files:**

- Rewrite: `src/lib/components/Skills.svelte`

- [ ] **Step 9.1:**

```svelte
<script lang="ts">
	import Section from './Section.svelte';
	import { skillCategories, languages } from '$data/skills';
	import { interestAreas } from '$data/interests';

	const ticks = [1, 2, 3, 4, 5] as const;
</script>

<Section
	id="a-skills"
	num="03"
	title="Skills"
	lead="Skills aus beiden Ausbildungen. Die Levels folgen der Skala aus meinem offiziellen Lebenslauf — L1 Grundkenntnisse bis L5 Experte."
>
	<div class="grid gap-x-16 min-[900px]:grid-cols-2">
		{#each skillCategories as g (g.id)}
			<div class="mb-11">
				<h3
					class="flex items-baseline justify-between border-b border-line-strong pb-2.5 font-mono text-xs font-medium tracking-[0.1em]"
				>
					{g.title.toUpperCase()}<span class="text-muted"
						>{String(g.skills.length).padStart(2, '0')}</span
					>
				</h3>
				<ul>
					{#each g.skills as s (s.name)}
						<li class="flex items-baseline gap-3 border-b border-line py-2 text-sm">
							<span class="font-medium">{s.name}</span>
							<span class="flex-1 -translate-y-1 border-b border-dotted border-line-strong"></span>
							<span class="flex items-center gap-[3px]" aria-hidden="true">
								{#each ticks as t (t)}
									<span class="h-1 w-2.5 {t <= s.level ? 'bg-copper' : 'bg-line-strong'}"></span>
								{/each}
							</span>
							<span class="w-[22px] text-right font-mono text-xs text-muted">L{s.level}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="mt-2 grid gap-x-16 gap-y-11 min-[900px]:grid-cols-2">
		<div>
			<h3 class="border-b border-line-strong pb-2.5 font-mono text-xs font-medium tracking-[0.1em]">
				SPRACHEN
			</h3>
			<ul>
				{#each languages as l (l.name)}
					<li class="flex justify-between gap-3 border-b border-line py-2 text-sm">
						<span class="font-medium">{l.name}</span>
						<span class="text-right font-mono text-xs text-muted">{l.level.toUpperCase()}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<h3 class="border-b border-line-strong pb-2.5 font-mono text-xs font-medium tracking-[0.1em]">
				INTERESSENSCHWERPUNKTE
			</h3>
			<ol>
				{#each interestAreas as i (i.priority)}
					<li class="border-b border-line py-3">
						<p class="text-sm font-semibold">
							<span class="mr-2.5 font-mono text-copper">{i.priority}</span>{i.title}
						</p>
						<p class="mt-1.5 ml-[26px] text-[13px] leading-[1.6] text-muted">{i.description}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</Section>
```

- [ ] **Step 9.2:** Commit: `feat: Skills section (03) — tick meters, Sprachen, Interessen`

### Task 10: Projects → section 04

**Files:**

- Rewrite: `src/lib/components/Projects.svelte`

- [ ] **Step 10.1:**

```svelte
<script lang="ts">
	import Section from './Section.svelte';
	import { projects, type Project } from '$data/projects';

	const statusLabel: Record<Project['status'], string> = {
		'in-progress': 'IN ARBEIT',
		live: 'LIVE',
		archived: 'ARCHIVIERT',
		concept: 'KONZEPT'
	};
</script>

<Section
	id="a-projekte"
	num="04"
	title="Projekte"
	lead="Kein poliertes Portfolio-Grid, sondern die Werkbank: Dinge, an denen ich gerade arbeite."
>
	<div class="flex flex-col" data-reveal-group data-reveal-step="90">
		{#each projects as p (p.id)}
			<article
				class="grid gap-4 border-b border-line py-9 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<div>
					<p class="font-mono text-[13px]">{p.year}</p>
					<p class="mt-1.5 font-mono text-xs text-copper">{statusLabel[p.status]}</p>
				</div>
				<div>
					<h3 class="text-[26px] leading-tight font-semibold tracking-[-0.015em]">{p.title}</h3>
					<p class="mt-3.5 max-w-[560px] text-[15px] leading-[1.7] text-muted">{p.description}</p>
					<p class="mt-4 font-mono text-xs tracking-[0.04em] text-muted">
						{p.stack.join(' · ').toUpperCase()}
					</p>
					<p class="mt-3.5 flex flex-wrap gap-x-6 gap-y-2">
						{#each p.links as link (link.href)}
							<a
								href={link.href}
								target="_blank"
								rel="noreferrer"
								class="border-b border-copper pb-px text-sm font-medium text-copper"
							>
								{link.label} ansehen →
							</a>
						{/each}
					</p>
				</div>
			</article>
		{/each}
	</div>
</Section>
```

- [ ] **Step 10.2:** Commit: `feat: Projekte section (04)`

### Task 11: Education → section 05

**Files:**

- Rewrite: `src/lib/components/Education.svelte`

- [ ] **Step 11.1:**

```svelte
<script lang="ts">
	import Section from './Section.svelte';
	import { education, type Education } from '$data/education';

	const typeLabel: Record<Education['type'], string> = {
		apprenticeship: 'LEHRE',
		school: 'SCHULE',
		certification: 'ZERTIFIKAT'
	};
</script>

<Section id="a-ausbildung" num="05" title="Ausbildung">
	<ul>
		{#each education as e (e.id)}
			<li
				class="spec-row -mx-2.5 grid items-baseline gap-1 border-b border-line px-2.5 py-4 min-[900px]:grid-cols-[200px_1fr_120px] min-[900px]:gap-8"
			>
				<span class="font-mono text-[13px]">{e.period}</span>
				<span>
					<span class="text-[15px] font-semibold">{e.title}</span><span class="text-sm text-muted">
						· {e.institution}</span
					>
				</span>
				<span class="font-mono text-[11px] tracking-[0.08em] text-muted min-[900px]:text-right">
					{typeLabel[e.type]}
				</span>
			</li>
		{/each}
	</ul>
</Section>
```

- [ ] **Step 11.2:** Commit: `feat: Ausbildung section (05)`

### Task 12: Lab (06) + Notes (07) components

**Files:**

- Create: `src/lib/components/Lab.svelte`, `src/lib/components/Notes.svelte`

- [ ] **Step 12.1:** `Lab.svelte`:

```svelte
<script lang="ts">
	import Section from './Section.svelte';
	import { experiments } from '$data/lab';
</script>

<Section
	id="a-lab"
	num="06"
	title="Lab"
	lead="Werkstatt für Halbfertiges — Prototypen, die noch nicht produktionsreif sind, aber etwas erzählen."
>
	<ul>
		{#each experiments as x (x.title)}
			<li
				class="spec-row -mx-2.5 grid items-baseline gap-1 border-b border-line px-2.5 py-4 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<span class="font-mono text-xs tracking-[0.08em] text-copper">{x.state.toUpperCase()}</span>
				<span>
					<span class="text-base font-semibold">{x.title}</span><br />
					<span class="text-sm leading-[1.65] text-muted">{x.description}</span>
				</span>
			</li>
		{/each}
	</ul>
	<p class="mt-6 font-mono text-[11px] tracking-[0.06em] text-muted">
		DIESE SEITE WÄCHST MIT — NEUE EXPERIMENTE, KEIN UI-REFACTORING.
	</p>
</Section>
```

- [ ] **Step 12.2:** `Notes.svelte`:

```svelte
<script lang="ts">
	import Section from './Section.svelte';
	import { notes } from '$data/notes';

	const formatter = new Intl.DateTimeFormat('de-CH', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
</script>

<Section
	id="a-notes"
	num="07"
	title="Notes"
	lead="Kurze Write-ups zu Themen, mit denen ich mich gerade beschäftige. Noch in Vorbereitung — Inhalte folgen."
>
	<ul>
		{#each notes as n (n.slug)}
			<li
				class="spec-row -mx-2.5 grid gap-1 border-b border-line px-2.5 py-5 min-[900px]:grid-cols-[200px_1fr] min-[900px]:gap-8"
			>
				<span class="font-mono text-xs text-muted">
					<time datetime={n.date}>{formatter.format(new Date(n.date))}</time><br />
					<span class="text-copper">DRAFT</span>
				</span>
				<span>
					<span class="text-lg font-semibold">{n.title}</span><br />
					<span class="text-sm leading-[1.65] text-muted">{n.excerpt}</span>
				</span>
			</li>
		{/each}
	</ul>
</Section>
```

- [ ] **Step 12.3:** Commit: `feat: Lab (06) + Notes (07) sections`

### Task 13: Faq restyle + Contact → section 08

**Files:**

- Rewrite: `src/lib/components/Faq.svelte` (drops its Section wrapper — now embedded in Contact)
- Rewrite: `src/lib/components/Contact.svelte`

- [ ] **Step 13.1:** `Faq.svelte`:

```svelte
<script lang="ts">
	import { faq } from '$data/faq';
	import JsonLd from './JsonLd.svelte';

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((entry) => ({
			'@type': 'Question',
			name: entry.question,
			acceptedAnswer: { '@type': 'Answer', text: entry.answer }
		}))
	};
</script>

<JsonLd data={schema} />

<div class="mt-16 max-w-[720px]">
	<h3 class="border-b border-line-strong pb-2.5 font-mono text-xs font-medium tracking-[0.1em]">
		HÄUFIGE FRAGEN
	</h3>
	{#each faq as entry (entry.question)}
		<details class="group border-b border-line">
			<summary
				class="flex cursor-pointer items-baseline justify-between gap-4 py-3.5 text-[15px] font-medium select-none"
			>
				{entry.question}
				<span
					class="shrink-0 font-mono text-copper transition-transform group-open:rotate-45"
					aria-hidden="true">+</span
				>
			</summary>
			<p class="max-w-[640px] pb-4 text-sm leading-[1.7] text-muted">{entry.answer}</p>
		</details>
	{/each}
</div>
```

- [ ] **Step 13.2:** `Contact.svelte` (form logic preserved from the old component):

```svelte
<script lang="ts">
	import Section from './Section.svelte';
	import Faq from './Faq.svelte';
	import { profile } from '$data/profile';
	import { responseTime } from '$data/site';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';

	interface Props {
		form?: { success?: boolean; error?: string; values?: Record<string, string> } | null;
	}

	let { form }: Props = $props();
	let submitting = $state(false);

	const socials = profile.social.filter((s) => s.icon === 'github' || s.icon === 'linkedin');
	const inputClass =
		'border border-line bg-card px-3 py-2 text-base text-ink sm:text-sm focus:border-copper';
</script>

<Section id="a-kontakt" num="08" title="Kontakt">
	<h3 class="text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.025em]">
		Lass uns reden.
	</h3>
	<p class="mt-5 max-w-[560px] leading-[1.65] text-muted">
		Ob Praktikum, Security-Projekt oder ein Austausch über Schnittstellen — schreib mir. Ich
		antworte innerhalb von {responseTime}.
	</p>

	<div class="mt-9 flex flex-col gap-3.5">
		<a
			href="mailto:{profile.email}"
			class="self-start border-b border-copper pb-1 font-mono text-lg break-all transition-colors hover:text-copper min-[900px]:text-[22px]"
		>
			{profile.email}
		</a>
		<a
			href="tel:{profile.phone.replace(/\s/g, '')}"
			class="self-start font-mono text-base text-muted transition-colors hover:text-copper"
		>
			{profile.phone}
		</a>
	</div>

	<div class="mt-7 flex gap-6 text-sm font-medium">
		{#each socials as s (s.href)}
			<a
				href={s.href}
				target="_blank"
				rel="noreferrer"
				class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
			>
				{s.label} →
			</a>
		{/each}
	</div>

	<form
		method="POST"
		action="?/contact"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
		class="mt-16 flex max-w-[720px] flex-col gap-4 border border-line p-5 sm:p-6"
	>
		<h3 class="font-mono text-xs font-medium tracking-[0.1em]">NACHRICHT SENDEN</h3>
		<div class="grid gap-4 sm:grid-cols-2">
			<label class="flex flex-col gap-1 text-sm">
				<span class="font-mono text-[11px] tracking-[0.1em] text-muted">NAME</span>
				<input
					type="text"
					name="name"
					required
					minlength="2"
					value={form?.values?.name ?? ''}
					class={inputClass}
				/>
			</label>
			<label class="flex flex-col gap-1 text-sm">
				<span class="font-mono text-[11px] tracking-[0.1em] text-muted">E-MAIL</span>
				<input
					type="email"
					name="email"
					required
					value={form?.values?.email ?? ''}
					class={inputClass}
				/>
			</label>
		</div>
		<label class="flex flex-col gap-1 text-sm">
			<span class="font-mono text-[11px] tracking-[0.1em] text-muted">NACHRICHT</span>
			<textarea name="message" required minlength="10" rows="5" class="resize-y {inputClass}"
				>{form?.values?.message ?? ''}</textarea
			>
		</label>

		{#if form?.error}
			<p class="border border-copper px-3 py-2 text-sm text-copper" role="alert">{form.error}</p>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="self-start bg-copper px-5 py-3 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
		>
			{submitting ? 'Senden …' : 'Nachricht senden'}
		</button>
	</form>

	<Faq />

	<p class="mt-20 border-t border-line pt-5 font-mono text-[11px] tracking-[0.06em] text-muted">
		© 2026 LAURENT SCHERRER · MEGGEN CH ·
		<a href={resolve('/datenschutz')} class="transition-colors hover:text-copper">DATENSCHUTZ</a> · BUILT
		WITH SVELTEKIT
	</p>
</Section>
```

- [ ] **Step 13.3:** Commit: `feat: Kontakt section (08) with inlined form + FAQ`

### Task 14: One-pager route, form action move, deletions, sitemap

**Files:**

- Rewrite: `src/routes/+page.svelte`
- Create: `src/routes/+page.server.ts` (moved from `src/routes/contact/+page.server.ts`)
- Delete: route dirs `about/ experience/ skills/ projects/ education/ lab/ notes/ contact/`
- Delete: `src/lib/components/{Header,Footer,StickyCta,Breadcrumbs,RelatedLinks,ResponsePromise}.svelte`

- [ ] **Step 14.1:** Move the action: `git mv src/routes/contact/+page.server.ts src/routes/+page.server.ts` (content unchanged — action name stays `contact`, redirect to `/danke` stays).
- [ ] **Step 14.2:** Rewrite `src/routes/+page.svelte`:

```svelte
<script lang="ts">
	import Hero from '$components/Hero.svelte';
	import Timeline from '$components/Timeline.svelte';
	import Skills from '$components/Skills.svelte';
	import Projects from '$components/Projects.svelte';
	import Education from '$components/Education.svelte';
	import Lab from '$components/Lab.svelte';
	import Notes from '$components/Notes.svelte';
	import Contact from '$components/Contact.svelte';
	import Seo from '$components/Seo.svelte';
	import JsonLd from '$components/JsonLd.svelte';
	import { page } from '$app/state';
	import { profile } from '$data/profile';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const personSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: profile.name,
		jobTitle: 'Informatiker in Ausbildung',
		url: page.url.origin,
		image: `${page.url.origin}/profile.jpeg`,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Meggen',
			addressCountry: 'CH'
		},
		sameAs: profile.social
			.filter((s) => s.icon === 'github' || s.icon === 'linkedin')
			.map((s) => s.href)
	});
</script>

<Seo
	title={`${profile.name.split(' ')[0]} Scherrer · Informatiker in Ausbildung · CV`}
	description="Persönlicher CV & Tech Lab von Laurent Scherrer — Informatiker in Ausbildung mit Elektro-Background. Fokus auf IT-Security, Algorithmen und Schnittstellen."
	type="profile"
/>
<JsonLd data={personSchema} />

<Hero />
<Timeline />
<Skills />
<Projects />
<Education />
<Lab />
<Notes />
<Contact {form} />
```

- [ ] **Step 14.3:** Delete retired route dirs and dead components:

```bash
git rm -r src/routes/about src/routes/experience src/routes/skills src/routes/projects src/routes/education src/routes/lab src/routes/notes src/routes/contact
git rm src/lib/components/Header.svelte src/lib/components/Footer.svelte src/lib/components/StickyCta.svelte src/lib/components/Breadcrumbs.svelte src/lib/components/RelatedLinks.svelte src/lib/components/ResponsePromise.svelte
```

- [ ] **Step 14.4:** Commit: `feat: one-pager route with inlined contact action; retire sub-routes`

### Task 15: Kept-page restyle sweep (error, danke, datenschutz, CookieConsent)

**Files:**

- Modify: `src/routes/+error.svelte`, `src/routes/danke/+page.svelte`, `src/routes/datenschutz/+page.svelte`, `src/lib/components/CookieConsent.svelte`

- [ ] **Step 15.1:** `+error.svelte` — replace gradient/pill styling with Datenblatt idiom; drop the dead `/contact` link:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Seo from '$components/Seo.svelte';

	const isNotFound = $derived(page.status === 404);
	const title = $derived(
		isNotFound ? 'Seite nicht gefunden · Laurent Scherrer' : 'Fehler · Laurent Scherrer'
	);
</script>

<Seo
	{title}
	description="Diese Seite existiert nicht (mehr). Zurück zur Startseite oder direkt Kontakt aufnehmen."
	noindex
/>

<section class="flex min-h-[70svh] flex-col justify-center py-16">
	<p class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">FEHLER — {page.status}</p>
	<h1 class="text-[clamp(3rem,10vw,5.5rem)] leading-none font-bold tracking-[-0.035em]">
		{page.status}
	</h1>
	<p class="mt-6 max-w-[560px] leading-[1.65] text-muted">
		{#if isNotFound}
			Diese Seite gibt es nicht — vielleicht ein Tippfehler in der URL, vielleicht habe ich sie
			umgebaut. Kein Problem: Von hier aus geht's weiter.
		{:else}
			Da ist etwas schiefgelaufen. Versuch es später noch einmal — oder sag mir kurz Bescheid.
		{/if}
	</p>
	<div class="mt-10 flex flex-wrap gap-6 text-sm font-medium">
		<a href={resolve('/')} class="border-b border-copper pb-0.5 text-copper">Zur Startseite →</a>
		<a
			href="{resolve('/')}#a-kontakt"
			class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
		>
			Kontakt →
		</a>
	</div>
</section>
```

- [ ] **Step 15.2:** `danke/+page.svelte` — same idiom; drop `ResponsePromise` import (deleted), reference `responseTimePromise` from site data:

```svelte
<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import { responseTimePromise } from '$data/site';
	import { resolve } from '$app/paths';
</script>

<Seo
	title="Danke für deine Nachricht · Laurent Scherrer"
	description="Deine Nachricht ist angekommen — ich melde mich so schnell wie möglich."
	noindex
/>

<section class="flex min-h-[70svh] flex-col justify-center py-16">
	<p class="mb-5 font-mono text-xs tracking-[0.12em] text-copper">STATUS — ZUGESTELLT ✓</p>
	<h1 class="text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.025em]">
		Danke — deine Nachricht ist angekommen.
	</h1>
	<p class="mt-6 max-w-[560px] leading-[1.65] text-muted">
		So geht es weiter: Ich lese jede Nachricht persönlich und melde mich per E-Mail bei dir. Du
		musst nichts weiter tun. {responseTimePromise}
	</p>
	<div class="mt-10 flex flex-wrap gap-6 text-sm font-medium">
		<a href={resolve('/')} class="border-b border-copper pb-0.5 text-copper">Zur Startseite →</a>
		<a
			href="{resolve('/')}#a-projekte"
			class="border-b border-line-strong pb-0.5 transition-colors hover:border-copper hover:text-copper"
		>
			Projekte ansehen →
		</a>
	</div>
</section>
```

- [ ] **Step 15.3:** `CookieConsent.svelte` — square corners + new tokens (logic unchanged):

```svelte
<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { resolve } from '$app/paths';
	import { consent } from '$lib/stores/consent.svelte';

	// Without a configured GA ID there is nothing to consent to.
	const gaId = env.PUBLIC_GA_ID;
	const visible = $derived(Boolean(gaId) && consent.value === 'unknown');
</script>

{#if visible}
	<section
		aria-label="Cookie-Hinweis"
		class="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md border border-line-strong bg-card p-4 shadow-lg md:inset-x-auto md:right-6 md:bottom-6 md:mx-0"
	>
		<p class="text-sm leading-relaxed">
			Ich würde gerne mit Google Analytics verstehen, wie diese Seite genutzt wird — aber nur mit
			deinem Einverständnis. Ohne Zustimmung wird nichts geladen.
			<a
				href={resolve('/datenschutz')}
				class="text-muted underline transition-colors hover:text-copper"
			>
				Mehr dazu in der Datenschutzerklärung.
			</a>
		</p>
		<div class="mt-4 flex gap-3">
			<button
				type="button"
				class="flex-1 border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:border-copper hover:text-copper"
				onclick={() => consent.set('denied')}
			>
				Ablehnen
			</button>
			<button
				type="button"
				class="flex-1 bg-copper px-4 py-2 text-sm font-medium text-white"
				onclick={() => consent.set('granted')}
			>
				Einverstanden
			</button>
		</div>
	</section>
{/if}
```

- [ ] **Step 15.4:** `datenschutz/+page.svelte` — apply the token rename map (see Conventions) to every `var(--…)` reference and old Tailwind color class; if it uses `Section`/`Breadcrumbs`, replace with a plain header (`<h1>` + mono eyebrow). Keep all content text unchanged.
- [ ] **Step 15.5:** Grep for stragglers — `grep -rn "var(--surface\|var(--text\|var(--accent\|var(--highlight\|var(--ring\|var(--border" src/` must return nothing.
- [ ] **Step 15.6:** Commit: `feat: restyle error/danke/datenschutz/consent to Datenblatt tokens`

### Task 16: Verification

- [ ] **Step 16.1:** `npm run check` — 0 errors.
- [ ] **Step 16.2:** `npx vitest run --project server` — hooks tests pass.
- [ ] **Step 16.3:** `npm run lint` (prettier + eslint) — clean (run `npm run format` first).
- [ ] **Step 16.4:** `npm run build` — succeeds.
- [ ] **Step 16.5:** Visual pass via dev server + Playwright browser: desktop 1280px + mobile 390px, light + dark, `/` (all 8 sections, sidebar scrollspy, mobile INDEX overlay), `/danke`, a 404, plus a retired-route redirect (`/skills` → `/#a-skills`).
- [ ] **Step 16.6:** Fix anything found; final commit.

## Self-review notes

- Spec coverage: routing/redirects (T1, T14), tokens/fonts (T0, T3), all 8 sections (T7–T13), sidebar/mobile (T5, T6), data layer (T2), kept-page restyle (T15), form move (T14), sitemap via `site.ts` (T2), verification incl. a11y/visual (T16). `app.html` theme-color (T3). No gaps found.
- Type consistency: `sections` (navigation), `responseTime`/`responseTimePromise` (site), `experiments` (lab), `notes` (notes) — import sites match definitions. `Project['status']`/`Education['type']` maps match existing unions.
- Placeholder scan: Task 15.4 describes a mechanical rename with an explicit map rather than full code (source file is 101 lines of legal text; content unchanged) — acceptable as the transformation is fully specified.
