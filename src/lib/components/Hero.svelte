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

<Section id="a-profil" num="01" title={t.title} first>
	<h1
		class="text-[clamp(2.5rem,7.5vw,5.5rem)] leading-none font-bold tracking-[-0.035em] text-balance"
	>
		{t.headline1}<br /><span class="text-copper">{t.headline2}</span>
	</h1>
	<p class="mt-7 max-w-[600px] text-lg leading-[1.65] text-muted">
		{t.intro}
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
					alt={t.portraitAlt}
					class="block h-auto w-full contrast-[1.03] saturate-[.85]"
				/>
			</div>
			<figcaption class="mt-2.5 text-center font-mono text-[11px] tracking-[0.08em] text-muted">
				{t.portraitCaption}
			</figcaption>
		</figure>
	</div>

	<p class="mt-8 max-w-[640px] leading-[1.7]">{p.bio}</p>

	<p class="mt-6 max-w-[640px] text-sm leading-[1.7] text-muted">
		<span class="font-mono text-[11px] tracking-[0.12em] text-copper">{t.offWork}&nbsp;&nbsp;</span
		>{hobbies[locale].join(' · ')}
	</p>
</Section>
